import React from "react";

const Spinner = (props) => {
  const type = props.type || "spinner";
  const action = props.action || "spin";
  const size =props.size || "1";


  return (
    <i className={`fa fa-${type} fa-${action} fa-${size}x fa-fw`}></i>
  );
};

export default Spinner;
