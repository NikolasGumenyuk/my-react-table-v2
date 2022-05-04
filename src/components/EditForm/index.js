import React from "react";
import { useForm } from "react-hook-form";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
};

const EditForm = ({itemToEdit, handleCancel}) => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  console.log(itemToEdit);

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("value_name")}
          placeholder="Username"
          style={styles.input}
        />
        <input
          {...register("value_name")}
          placeholder="Email"
          style={styles.input}
        />
        <input
          {...register("value_name")}
          placeholder="Password"
          style={styles.input}
        />
        
        <button type="submit" className="button confirm">Submit</button>
        <button className="button primary" onClick={handleCancel}>
        Cancel
      </button>
      </form>
    </div>
  );
};

export default EditForm;
