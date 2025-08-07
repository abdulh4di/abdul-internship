import React, { useContext } from "react";
import { CollectionContext } from "../../context/CollectionContext";
import CollectionInfoSkeleton from "../ui/CollectionInfoSkeleton";

export default function CollectionInfo() {
  const { loading, collectionInfo } = useContext(CollectionContext);

  return (
    <section id="collection-info">
      {loading ? (
        <CollectionInfoSkeleton/>
      ) : (
        <div className="row">
          <div className="collection-info__wrapper">
            <p className="collection-info__description">{collectionInfo.description}</p>
            <div className="collection-info__details">
              <span className="collection-info__detail">
                Items
                <span className="collection-info__detail__data"> {collectionInfo.items.length}</span>
              </span>
              ·
              <span className="collection-info__detail">
                Created
                <span className="collection-info__detail__data"> {collectionInfo.createdDate}</span>
              </span>
              ·
              <span className="collection-info__detail">
                Creator earnings
                <span className="collection-info__detail__data"> {collectionInfo.creatorEarnings}%</span>
              </span>
              ·
              <span className="collection-info__detail">
                Chain
                <span className="collection-info__detail__data"> {collectionInfo.chain}</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
