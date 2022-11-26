import React from "react";
import style from "./ModalWindow.module.scss";

function ModalWindowItem({ url }) {
  return (
    <li className={style.modalWindowItem}>
      <img src={url} alr="downloadedFile" style={{ width: "100px" }} />
    </li>
  );
}

export default ModalWindowItem;
