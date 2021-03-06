import React, { useState, useMemo } from "react";
import MOCK_DATA from "../MOCK_DATA.json";
import COLUMNS from "../columns";
import Headers from "../Headers";
import Body from "../Body";
import Pagination from "../Pagination";
import Modal from "../Modal";
import DeleteForm from "../DeleteForm";
import EditForm from "../EditForm";

let pageSizeArr = [5, 10, 20];

export const BasicTable = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns = COLUMNS;
  const [isSortDesc, setIsSortDesc] = useState(true);
  const [sortedField, setsortedField] = useState("");
  const [deletedId, setDeletedId] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [data, setData] = useState(MOCK_DATA);

  const sortData = (fieldName) => {
    if (sortedField === fieldName) {
      setIsSortDesc((prev) => !prev);
      return;
    }
    setsortedField(fieldName);
  };

  const handleDelete = (item) => {
    setItemToDelete(item);
  };

  const handleConfirm = (itemToDelete) => {
    setDeletedId((prev) => [...prev, itemToDelete.id]);
    setItemToDelete(false);
  };

  const handleCancel = () => {
    setItemToDelete(false);
    setItemToEdit(false);
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (updatedItem) => {
    setData((prev) => prev.map((item) => item.id === updatedItem.id ? updatedItem : item))
    setItemToEdit(null)
  }

  const filteredData = useMemo(() => {
    const existingItems = data.filter((item) => {
      return !deletedId.includes(item.id);
    });

    return existingItems.filter((item) => {
      const valueArray = Object.values(item).map((item) =>
        item.toString().toLowerCase()
      );

      return valueArray.some((str) => str.includes(search.toLowerCase()));
    });
  }, [search, deletedId, data]);

  const sortedData = useMemo(() => {
    const sortDownFunc = (a, b) =>
      a[sortedField] > b[sortedField]
        ? 1
        : b[sortedField] > a[sortedField]
        ? -1
        : 0;

    const sortUpFunc = (a, b) =>
      a[sortedField] < b[sortedField]
        ? 1
        : b[sortedField] < a[sortedField]
        ? -1
        : 0;

    const selectedDirection = isSortDesc ? sortDownFunc : sortUpFunc;

    return filteredData.slice().sort(selectedDirection);
  }, [isSortDesc, sortedField, filteredData]);

  const firstPageIndex = useMemo(
    () => (currentPage - 1) * pageSize,
    [currentPage, pageSize]
  );
  const lastPageIndex = useMemo(
    () => firstPageIndex + pageSize,
    [firstPageIndex, pageSize]
  );
  const currentItem = useMemo(
    () => sortedData.slice(firstPageIndex, lastPageIndex),
    [firstPageIndex, lastPageIndex, sortedData]
  );

  const reset = () => {
    setsortedField("");
    setCurrentPage(1);
    setPageSize(10);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
      <select
        name="select"
        value={pageSize}
        onChange={(e) => {
          setPageSize(Number(e.target.value));
        }}
      >
        {pageSizeArr.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={reset}>Reset</button>
      <table>
        <thead>
          <tr key="header">
            {columns.map((column) => (
              <Headers
                key={column.header}
                column={column}
                onClick={sortData}
                sortedField={sortedField}
                isSortDesc={isSortDesc}
              />
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItem.map((item, index) => (
            <tr key={index}>
              <Body columns={columns} item={item} search={search} />
              <td>
                <button onClick={() => handleDelete(item)}>DEL</button>
                <button onClick={() => handleEdit(item)}>EDIT</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <span>Total: {filteredData.length}</span>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={filteredData.length}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
      />
      <Modal isOpen={itemToDelete} onClose={handleCancel}>
        <DeleteForm
          handleCancel={handleCancel}
          handleConfirm={handleConfirm}
          itemToDelete={itemToDelete}
        />
      </Modal>
      <Modal isOpen={itemToEdit} onClose={handleCancel}>
        <EditForm itemToEdit={itemToEdit} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
