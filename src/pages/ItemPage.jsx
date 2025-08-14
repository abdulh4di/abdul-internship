import { faEye, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faShapes, faTag, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import RecommendedItems from "../components/item/RecommendedItems";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ItemsSkeleton from "../components/ui/ItemsSkeleton";

export default function ItemPage() {
  const { id } = useParams();
  const [itemInfo, setItemInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");
  const [expired, setExpired] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const cancelId = useRef(null);

  async function fetchItemInfo() {
    setLoading(true);
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/item/${id}`
    );

    setItemInfo(data.data);
    setTimeRemaining(data.data.expiryDate);
    setLoading(false);
  }

  function updateTimer() {
    if (!timeRemaining) return;

    const remainingMillis = timeRemaining - Date.now();
    if (remainingMillis < 0) {
      cancelAnimationFrame(cancelId.current);
      setExpired(true);
      return;
    }

    const totalSeconds = Math.floor(remainingMillis / 1000);
    const remainingHours = Math.floor(totalSeconds / 3600);
    const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;

    setSeconds(remainingSeconds.toString().padStart(2, "0"));
    setMinutes(remainingMinutes.toString());
    setHours(remainingHours.toString());

    cancelId.current = requestAnimationFrame(updateTimer);
  }

  useEffect(() => {
    fetchItemInfo();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!loading && timeRemaining) {
      cancelAnimationFrame(cancelId.current);
      cancelId.current = requestAnimationFrame(updateTimer);
    }

    return () => cancelAnimationFrame(cancelId.current);
  }, [timeRemaining, loading]);

  return (
    <>
      <section id="item-info">
        <div className="container">
          {loading ? (
            <ItemsSkeleton />
          ) : (
            <div className="row item-page__row">
              <div className="item-page__left">
                <figure className="item-page__img__wrapper">
                  <div className="item-page__img__details">
                    <FontAwesomeIcon icon={faEthereum} className="item-page__img__icon" />
                    <div className="item-page__img__likes">
                      <FontAwesomeIcon icon={faHeart} className="item-page__img__icon" />
                      <span className="item-page__img__likes__text">{itemInfo.favorites}</span>
                    </div>
                  </div>
                  <img src={itemInfo.imageLink} alt="" className="item-page__img" />
                </figure>
              </div>
              <div className="item-page__right">
                <Link
                  to={`/collection/${itemInfo.collectionId}`}
                  className="item-page__collection light-blue"
                >
                  {itemInfo.collection}
                </Link>
                <h1 className="item-page__name">{itemInfo.title}</h1>
                <span className="item-page__owner">
                  Owned by{" "}
                  <Link
                    to={`/user/${itemInfo.ownerId}`}
                    className="light-blue item-page__owner__link"
                  >
                    {itemInfo.owner}
                  </Link>
                </span>
                <div className="item-page__details">
                  <div className="item-page__detail">
                    <FontAwesomeIcon icon={faEye} className="item-page__detail__icon" />
                    <span className="item-page__detail__text">{itemInfo.views} views</span>
                  </div>
                  <div className="item-page__detail">
                    <FontAwesomeIcon icon={faHeart} className="item-page__detail__icon" />
                    <span className="item-page__detail__text">{itemInfo.favorites} favorites</span>
                  </div>
                  <div className="item-page__detail">
                    <FontAwesomeIcon icon={faShapes} className="item-page__detail__icon" />
                    <span className="item-page__detail__text">{itemInfo.category}</span>
                  </div>
                </div>
                <div className="item-page__sale">
                  <div className="item-page__sale__header">
                    <div className="green-pulse"></div>
                    <span>
                      Sale ends in{" "}
                      {expired ? (
                        "Expired"
                      ) : (
                        <>
                          {" "}
                          {hours}h {minutes}m {seconds}s
                        </>
                      )}
                    </span>
                  </div>
                  <div className="item-page__sale__body">
                    <span className="item-page__sale__label">Current price</span>
                    <div className="item-page__sale__price">
                      <span className="item-page__sale__price__eth">{itemInfo.ethPrice} ETH</span>
                      <span className="item-page__sale__price__dollars">{itemInfo.usdPrice}</span>
                    </div>
                    <div className="item-page__sale__buttons">
                      <div className="item-page__sale__buy">
                        <button className="item-page__sale__buy__button disabled">Buy now</button>
                        <button className="item-page__sale__buy__icon disabled">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </button>
                      </div>
                      <button className="item-page__sale__offer disabled">
                        <FontAwesomeIcon icon={faTag} />
                        Make offer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <RecommendedItems collectionId={itemInfo?.collectionId} currentItemId={itemInfo?.id} />
    </>
  );
}
