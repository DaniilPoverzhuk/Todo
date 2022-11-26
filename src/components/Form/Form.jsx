import React from "react";
import style from "./Form.module.scss";

function Form({ value, setValue, onClick, changeHandler }) {
  const handlerTitle = (event) => {
    setValue({ ...value, title: event.target.value });
  };

  const handlerDescription = (event) => {
    setValue({ ...value, description: event.target.value });
  };

  const handlerDate = (event) => {
    setValue({ ...value, date: event.target.value });
  };

  return (
    <form className={style.form} onSubmit={onClick}>
      <input
        placeholder="Enter your title"
        value={value.title}
        required
        onChange={handlerTitle}
      />
      <textarea
        placeholder="Enter your description"
        value={value.description}
        required
        onChange={handlerDescription}
      ></textarea>
      <div className={style.formBottom}>
        <div>
          <input
            type="file"
            className={style.inputFile}
            multiple
            onChange={changeHandler}
            id="file-input"
          />
          <label htmlFor="file-input">Add File</label>
        </div>
        <div className={style.date}>
          <label for="input-time">Add deadline</label>
          <input
            type="date"
            className={style.inputDate}
            id="input-time"
            value={value.date}
            onChange={handlerDate}
          />
        </div>
      </div>
      <input
        onChange={onClick}
        value="Add Task"
        className={style.add}
        type="submit"
      />
    </form>
  );
}

export default Form;
