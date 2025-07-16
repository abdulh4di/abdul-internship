import React from "react";
import "./Skeleton.css";

const Skeleton = ({ width, height, borderRadius }) => {
  return (
    <>
    <div className="skeleton" style={{
        width,
        height,
        borderRadius,
      }}
    ></div>
    
    <div className="selected-collection">
      <div className="skeleton skeleton-bg"></div>
    </div>

    </>

  );
};

export default Skeleton;
