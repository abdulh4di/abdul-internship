import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const ItemsSkeleton = () => {
  return (
    <>
      <div className="row item-page__row">
        <div className="item-page__left">
          <div className="item-page__img__wrapper">
            <div className="item-page__img__details">
            <FontAwesomeIcon icon={faEthereum} className="item-page__img__icon" />
              <div className="item-page__img__likes">
                <div className="skeleton skeleton-page__img__likes"></div>
              </div>
            </div>
            <div className="skeleton skeleton-item-page__img"></div>
          </div>
        </div>
        <div className="item-page__right">
          <div className="item-page__collection light-blue">
            <div className="skeleton skeleton-item-page__collection"></div>
          </div>
          <div className="item-page__name">
            <div className="skeleton skeleton-item-page__name"></div>
          </div>
          <div className="item-page__owner">
            <div className="skeleton skeleton-item-page__owner"></div>
          </div>
          <div className="item-page__details">
            <div className="item-page__detail">
              <div className="skeleton skeleton-item-page__detial"></div>
            </div>
            <div className="item-page__detail">
              <div className="skeleton skeleton-item-page__detial"></div>
            </div>
            <div className="item-page__detail">
              <div className="skeleton skeleton-item-page__detial"></div>
            </div>
          </div>
          <div className="item-page__sale">
            <div className="item-page__sale__header">
              <div className="skeleton skeleton-item-page__sale__header"></div>
            </div>

            <div className="item-page__sale__body">
              <div className="item-page__sale__label">
                <div className="skeleton skeleton__item-page__sale__label"></div>
              </div>

              <div className="item-page__sale__price">
                <div className="item-page__sale__price__eth">
                  <div className="skeleton skeleton-item-page__sale__price"></div>
                </div>
                <div className="item-page__sale__price__dollars">
                  <div className="skeleton skeleton-item-page__sale__price"></div>
                </div>
              </div>

              <div className="item-page__sale__buttons">
                <div className="skeleton skeleton-item-page__sale__buttonns"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsSkeleton;
