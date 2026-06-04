import React from "react";

function NotFound({ text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: "50%",
      }}
    >
      <img
        className="d-block w-50"
        src={require("../../assets/icons/404-error.png")}
        alt="First slide"
      />

     <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop:'10%',
          textAlign:'center'
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default NotFound;
