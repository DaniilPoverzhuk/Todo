import React from "react";
import style from "./Overlay.module.scss";

function Overlay({ closeModal }) {
  return (
    <div className={style.overlay} onClick={closeModal}>
      Overlay
    </div>
  );
}

export default Overlay;
