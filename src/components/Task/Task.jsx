import React, { useContext, useEffect, useRef, useState } from "react";

import arrowSvg from "../../assets/images/arrow.svg";
import penSvg from "../../assets/images/pen.svg";
import closeSvg from "../../assets/images/close.svg";
import fileSvg from "../../assets/images/file.svg";
import doneSvg from "../../assets/images/done.svg";

import style from "./Task.module.scss";
import Context from "../../context";
import dayjs from "dayjs";

function Task({ title, description, date, id, completed }) {
  const [popUp, setPopUp] = useState(false);
  const [mod, setMod] = useState(false);
  const [modValue, setModValue] = useState({ title, description });
  const { deleteTodo, showModal, taskDone } = useContext(Context);

  const now = () => dayjs();
  const dateValue = () => dayjs(date);

  useEffect(() => {
    const settimeout = setTimeout(() => {
      taskDone(id);
    }, dateValue().valueOf() - now().valueOf());

    return () => {
      clearTimeout(settimeout);
    };
  }, []);

  const redactorMod = () => {
    setMod(!mod);
  };

  const handleTitle = (event) => {
    setModValue({
      description: modValue.description,
      title: event.target.value,
    });
  };

  const handleDescription = (event) => {
    setModValue({ title: modValue.title, description: event.target.value });
  };

  const showPopUp = () => {
    setPopUp(!popUp);
  };

  console.log(completed);

  return (
    <li className={completed ? style.listTaskItemDone : style.listTaskItem}>
      {!mod ? (
        <input value={modValue.title} readOnly />
      ) : (
        <input value={modValue.title} onChange={handleTitle} />
      )}
      <img
        src={arrowSvg}
        className={popUp ? style.arrowActive : style.arrow}
        onClick={showPopUp}
      />
      {popUp && (
        <div className={style.taskPopUp}>
          {!mod ? (
            <textarea value={modValue.description} readOnly></textarea>
          ) : (
            <textarea
              value={modValue.description}
              onChange={handleDescription}
            ></textarea>
          )}
          <footer className={style.footer}>
            <img className={style.pen} src={penSvg} onClick={redactorMod} />
            <img
              className={style.delete}
              src={closeSvg}
              onClick={() => deleteTodo(id)}
            />
            <img
              className={style.done}
              src={doneSvg}
              onClick={() => taskDone(id)}
            />
            <img src={fileSvg} onClick={showModal} className={style.file} />
            <div className={style.date}>Deadline {date}</div>
          </footer>
        </div>
      )}
    </li>
  );
}

export default Task;
