import React from "react";
import "./Skeleton.css";

const NewCollectionsSkeleton = () => {
  return (
    <>
      <div className="collection">
        <div className="skeleton skeleton-collection-img"></div>
        <div className="collection__info">
          <h3 className="collection__name"></h3>
          <div className="collection__stats">
            <div className="collection__stat">
              <span className="collection__stat__label">
                <div className="skeleton skeleton__stat__label"></div>
              </span>

              <span className="collection__stat__data">
                <div className="skeleton skeleton__stat__data"></div>
              </span>
            </div>
            <div className="collection__stat">
              <span className="collection__stat__label">
                <div className="skeleton skeleton__stat__label"></div>
              </span>

              <span className="collection__stat__data">
                <div className="skeleton skeleton__stat__data"></div>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewCollectionsSkeleton;
