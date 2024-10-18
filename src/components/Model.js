import React from "react";
import "../styles/modal.css";
export default function Modal({modalFun,modalState,data}) {
  return (
      <div className={`modal-popup ${modalState ? "active-modal" : ""}`}>
        <div className="modal-inner">
          <h3>Employee Detail</h3>
          <p>
          Employee Name: <strong>{data?.firstName}</strong> 
          </p>
          <p>
          Employee Zone: <strong>{data?.zone}</strong> 
          </p>
          <button className="cm-btn" onClick={modalFun}>Close</button>
        </div>
      </div>
  );
}
