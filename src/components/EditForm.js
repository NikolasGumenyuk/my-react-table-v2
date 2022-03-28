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

const EditForm = () => {
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data); 

  }

  return (
    <div style={styles.container}>
      <h4>My Form</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('value_name')}
          placeholder="Username"
          style={styles.input}
        />
        <input
          {...register('value_name')}
          placeholder="Email"
          style={styles.input}
        />
        <input
          {...register('value_name')}
          placeholder="Password"
          style={styles.input}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
