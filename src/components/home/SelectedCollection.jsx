import { useEffect, useState } from "react";
import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "../ui/Skeleton";

export default function SelectedCollection() {
  const [selectedCollection, setSelectedCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchSelectedCollection() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/selectedCollection"
    );

    const collections = data.data;

    setSelectedCollection(collections);
    setLoading(false);
  }

  useEffect(() => {
    fetchSelectedCollection();
  }, []);

  return (
    <header>
      {loading ? (
        <Skeleton />
      ) : (
        <div className="selected-collection">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={selectedCollection.thumbnail}
            src={selectedCollection.videoLink}
            className="selected-collection__bg"
          />
          <div className="selected-collection__description">
            <img src={selectedCollection.logo} alt="" className="selected-collection__logo" />
            <h1 className="selected-collection__title">{selectedCollection.title}</h1>
            <Link
              to={`collection/${selectedCollection.creatorId}`}
              className="selected-collection__author"
            >
              By {selectedCollection.creator}
              <img src={VerifiedIcon} className="selected-collection__author__verified" />
            </Link>
            <div className="selected-collection__details">
              {selectedCollection.amountOfItems} items · {selectedCollection.floorPrice} ETH
            </div>
            <Link
              to={`collection/${selectedCollection.collectionId}`}
              className="selected-collection__button"
            >
              <div className="green-pulse"></div>
              View Collection
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
