import React from "react";
import Task from "../Task/Task";
import style from "./ListTasks.module.scss";

function ListTasks({ todo }) {
  console.log(todo);
  return (
    <div className={style.listTasks}>
      <h1 className={style.listTasksTitle}>Tasks of List</h1>
      <ul>
        {todo.length ? (
          todo.map((item) => <Task {...item} key={item.id} />)
        ) : (
          <h3 style={{ color: "#fff", fontStyle: "italic", opacity: "0.5" }}>
            Пока нет задач
          </h3>
        )}
      </ul>
    </div>
  );
}

export default ListTasks;
