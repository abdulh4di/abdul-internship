import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CollectionsPageSkeleton from "../components/ui/CollectionsPageSkeleton";

export default function CollectionsPage() {
  const { collections, loading } = useContext(AppContext);
  const [collectionPerPage, setCollectionsPerPage] = useState(12);

  const showMoreCollections = () => {
    setCollectionsPerPage((prevValue) => prevValue + 6);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <h1 className="collections-page__title">Collections</h1>
        <div className="collections__body">
          {loading
            ? new Array(12).fill(0).map((_, index) => <CollectionsPageSkeleton key ={index} />)
            : collections.slice(0, collectionPerPage).map((collection, index) => (
                <div className="collection-column" key={index}>
                  <Link to={`/collection/${collection.id}`} key={index} className="collection">
                    <img src={collection.imageLink} alt="" className="collection__img" />
                    <div className="collection__info">
                      <h3 className="collection__name">{collection.title}</h3>
                      <div className="collection__stats">
                        <div className="collection__stat">
                          <span className="collection__stat__label">Floor</span>
                          <span className="collection__stat__data">
                            {(Math.round(collection.floor * 100) / 100).toFixed(2)} ETH
                          </span>
                        </div>
                        <div className="collection__stat">
                          <span className="collection__stat__label">Total Volume</span>
                          <span className="collection__stat__data">
                            {collection.totalVolume} ETH
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
        {collectionPerPage < collections.length && (
          <button className="collections-page__button" onClick={showMoreCollections}>
            Load more
          </button>
        )}
      </div>
    </div>
  );
}
