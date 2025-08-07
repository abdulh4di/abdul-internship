import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CollectionContext } from "../../context/CollectionContext";
import CollectionItemsSkeletonHeader from "../ui/CollectionItemsSkeletonHeader";
import CollectionItemsSkeletonBody from "../ui/CollectionItemsSkeletonBody";

export default function CollectionItems() {
  const { loading, collectionInfo, collectionItemsInfo } = useContext(CollectionContext);
  const [sort, setSort] = useState("");
  const [collectionItemsPerPage, setcollectionItemsPerPage] = useState(12);

  const sortItems = (collectionItemsInfo ?? []).slice().sort((a, b) => {
    if (sort === "HIGH_TO_LOW") return b.price - a.price;
    if (sort === "LOW_TO_HIGH") return a.price - b.price;
    return 0;
  });

  const showMoreCollectionItems = () => {
    setcollectionItemsPerPage((prevValue) => prevValue + 6);
  };
  return (
    <section id="collection-items">
      <div className="row collection-items__row">
        {loading ? (
          <CollectionItemsSkeletonHeader />
        ) : (
          <>
            <div className="collection-items__header">
              <div className="collection-items__header__left">
                <span className="collection-items__header__live">
                  <div className="green-pulse"></div>
                  Live
                </span>
                <span className="collection-items__header__results">
                  {collectionInfo.items.length} results
                </span>
              </div>
              <select
                value={sort}
                className="collection-items__header__sort"
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="" default disabled>
                  Default
                </option>
                <option value="HIGH_TO_LOW">Price high to low</option>
                <option value="LOW_TO_HIGH">Price low to high</option>
              </select>
            </div>
          </>
        )}

        <div className="collection-items__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => <CollectionItemsSkeletonBody key={index}/>)
            : sortItems.slice(0, collectionItemsPerPage).map((collectionItemInfo, index) => (
                <div className="item-column" key={index}>
                  <Link to={`/item/${collectionItemInfo.itemId}`} className="item">
                    <figure className="item__img__wrapper">
                      <img src={collectionItemInfo.imageLink} alt="" className="item__img" />
                    </figure>
                    <div className="item__details">
                      <span className="item__details__name">{collectionItemInfo.title}</span>
                      <span className="item__details__price">{collectionItemInfo.price} ETH</span>
                      <span className="item__details__last-sale">
                        Last sale: {collectionItemInfo.lastSale} ETH
                      </span>
                    </div>

                    <div className="item__see-more">
                      <button className="item__see-more__button">See More</button>
                      <div className="item__see-more__icon">
                        <FontAwesomeIcon icon={faShoppingBag} />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>

        {collectionItemsPerPage < sortItems.length && (
          <button className="collection-page__button" onClick={showMoreCollectionItems}>
            Load more
          </button>
        )}
      </div>
    </section>
  );
}
