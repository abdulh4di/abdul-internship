import React from "react";

const CollectionItemsSkeletonHeader = () => {
  return (
    <>
      <div className="collection-items__header">
        <div className="collection-items__header__left">
          <div className="collection-items__header__live">
            <div className="skeleton skeleton-items__header__live"></div>
          </div>
          <div className="collection-items__header__results">
            <div className="skeleton skeleton-items__header__results"></div>
          </div>
        </div>
        <div className="skeleton skeleton-items__header__sort"></div>
      </div>
    </>
  );
};

export default CollectionItemsSkeletonHeader;
