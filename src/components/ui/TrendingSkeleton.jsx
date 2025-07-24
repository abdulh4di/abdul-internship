import React from "react";
import "./Skeleton.css";

const TrendingSkeleton = ({ startRank }) => {
  return (
    <>
      <div className="trending-collection">
        <div className="trending-collection__rank">{startRank}</div>
        <div className="trending-collection__collection">
          <figure className="trending-collection__img__wrapper">
            <div className="skeleton skeleton-trending-collection__img"></div>
          </figure>
          <div className="trending-collection__name">
            <div className="skeleton skeleton__name"></div>
          </div>
        </div>

        <div className="trending-collection__price">
          <span className="skeleton skeleton__price"></span>
        </div>
        <div className="trending-collection__volume">
          <span className="skeleton skeleton__price"></span>
        </div>
      </div>
    </>
  );
};

export default TrendingSkeleton;
