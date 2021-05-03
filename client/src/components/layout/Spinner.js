import React from "react";
import spinner from "../../img/spinner.gif";

export default () => (
  <div className="bg-white height-100vh d-flex align-items-center">
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </div>
);
