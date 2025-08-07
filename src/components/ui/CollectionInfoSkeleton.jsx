const CollectionInfoSkeleton = () => {
  return (
    <>
      <div className="row">
        <div className="collection-info__wrapper">
          <div className="collection-info__description">
            <div className="skeleton skeleton-collection-info__description"></div>
            <div className="skeleton skeleton-collection-info__description"></div>
            <div className="skeleton skeleton-collection-info__description2"></div>
          </div>

          <div className="collection-info__details">
            <div className="collection-info__detail">
              <div className="skeleton skeleton-collection-info__detail__data1"></div>
            </div>
            <div className="collection-info__detail">
              <div className="skeleton skeleton-collection-info__detail__data2"></div>
            </div>
            <div className="collection-info__detail">
              <div className="skeleton skeleton-collection-info__detail__data3"></div>
            </div>
            <div className="collection-info__detail">
              <div className="skeleton skeleton-collection-info__detail__data4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionInfoSkeleton;
