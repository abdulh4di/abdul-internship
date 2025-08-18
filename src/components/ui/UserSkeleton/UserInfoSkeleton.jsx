
const UserInfoSkeleton = () => {
  return (
    <>
      <section id="user-info">
        <div className="row">
          <div className="user-info__wrapper">
            <div className="user-info__img__wrapper">
              <div className="skeleton skeleton-user-info__img"></div>
            </div>
            <div className="user-info__name">
              <div className="skeleton skeleton-user-info__name"></div>
            </div>
            <div className="user-info__details">
              <div className="user-info__wallet">
                <div className="skeleton skeleton-user-info__wallet"></div>
              </div>
              <div className="user-info__year">
                <div className="skeleton skeleton-user-info__year"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInfoSkeleton;
