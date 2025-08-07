import { useContext } from "react";
import { Link } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";
import CollectionHeaderSkeleton from "../ui/CollectionHeaderSkeleton";

export default function CollectionHeader() {
  const { loading, collectionInfo } = useContext(CollectionContext);

  return (
    <>
      {loading ? (
        <CollectionHeaderSkeleton />
      ) : (
        <header
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.2)), 
        url(${collectionInfo.imageLink})`,
          }}
          id="collection-header"
        >
          <div className="row collection-header__row">
            <div className="collection-header__content">
              <div className="collection-header__left">
                <img src={collectionInfo.logo} alt="" className="collection-header__img" />
                <div className="collection-header__name">{collectionInfo.title}</div>
                <Link
                  to={`/user/${collectionInfo.creatorId}`}
                  className="collection-header__author"
                >
                  {collectionInfo.creator}
                </Link>
              </div>
              <div className="collection-header__right">
                <div className="collection-header__columns">
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collectionInfo.totalVolume}</span> ETH
                    </span>
                    <span className="collection-header__column__label">Total volume</span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collectionInfo.floor}</span> ETH
                    </span>
                    <span className="collection-header__column__label">Floor price</span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collectionInfo.bestOffer}</span> ETH
                    </span>
                    <span className="collection-header__column__label">Best offer</span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collectionInfo.listed}%</span>
                    </span>
                    <span className="collection-header__column__label">Listed</span>
                  </div>
                  <div className="collection-header__column">
                    <span className="collection-header__column__data">
                      <span className="semibold">{collectionInfo.owners}</span>
                    </span>
                    <span className="collection-header__column__label">Owners (Unique)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
}
