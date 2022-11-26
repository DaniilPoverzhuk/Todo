import React from "react";
import style from "./ModalWindow.module.scss";
import ModalWindowItem from "./ModalWindowItem";

function ModalWindow({ files }) {
  return (
    <div className={style.modal}>
      <h4 className={style.modalTitle}>Прикрепленные Файлы</h4>
      <ul className={style.modalList}>
        {files.length ? (
          files.map((file) => <ModalWindowItem url={file} key={file} />)
        ) : (
          <h3 style={{ fontStyle: "italic", color: "#fff" }}>
            Нет прикрепленных файлов
          </h3>
        )}
      </ul>
    </div>
  );
}

export default ModalWindow;
