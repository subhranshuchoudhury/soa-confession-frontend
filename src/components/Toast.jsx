import React from "react";

const Toast = (props) => {
  return (
    <div
      className={`m-5 alert alert-${props.toastColor} alert-dismissible fade show`}
      role="alert"
    >
      <strong>{props.toastTitle}</strong>
      {props.toastMessage}
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  );
};

export default Toast;
