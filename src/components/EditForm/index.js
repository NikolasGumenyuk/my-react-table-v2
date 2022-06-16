import React from "react";
import { useForm } from "react-hook-form";
import countryList from "../../countryList";
import { emailRegex, nameRegex, phoneRegExp } from "../../constants";

const styles = {
  container: {
    width: "80%",
    margin: "0 auto",
  },
  input: {
    width: "100%",
  },
  select: {
    width: "100%",
  }
};

const EditForm = ({ itemToEdit, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: itemToEdit });

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("first_name", {
            pattern: { value: nameRegex, message: "Incorrect first name" },
          })}
          placeholder="First Name"
          style={styles.input}
        />
        {errors?.firstName && <span>{errors.firstName.message}</span>}
        <input
          {...register("last_name", {
            pattern: { value: nameRegex, message: "Incorrect last name" },
          })}
          placeholder="Last Name"
          style={styles.input}
        />
        {errors?.lastName && <span>{errors.lastName.message}</span>}
        <input
          {...register("email", {
            pattern: { value: emailRegex, message: "Ніхуя це не email" },
            required: { value: true, message: "Ніхуя немає" },
            maxLength: { value: 50, message: "Черезчур длінний email" },
          })}
          placeholder="Email"
          style={styles.input}
        />
        {errors?.email && <span>{errors.email.message}</span>}
        <input
          {...register("phone", {
            pattern: { value: phoneRegExp, message: "В тебе шо Nokia?" },
          })}
          placeholder="Phone"
          style={styles.input}
        />
        {errors?.phone && <span>{errors.phone.message}</span>}
        <select name="country" {...register("country")} style={styles.select}>
          {countryList.map((item) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))}
        </select>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
