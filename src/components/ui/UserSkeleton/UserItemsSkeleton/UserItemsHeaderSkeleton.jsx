const UserItemsHeaderSkeleton = () => {
  return (
    <>
          <div className="user-items__header">
            <div className="user-items__header__left">
              <div className="skeleton skeleton-user-items__header__left"></div>
            </div>
            <div className="skeleton skeleton-user-items__header__sort"></div>
          </div>
    </>
  );
};

export default UserItemsHeaderSkeleton;
