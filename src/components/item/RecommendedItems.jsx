import { faShoppingBag, faTableCells } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import RecommendedIHeaderSkeleton from "../ui/RecommendedIHeaderSkeleton";
import RecommendedItemSkeleton from "../ui/RecommendedItemSkeleton";
import RecommendedFooterSkeleton from "../ui/RecommendedFooterSkeleton";

export default function RecommendedItems({ collectionId, currentItemId }) {
  const [recommendedItemsInfo, setRecommendedItemsInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchRecommendedInfo() {
    setLoading(true);
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${collectionId}`
    );
    setRecommendedItemsInfo(data.data.items);
    setLoading(false);
  }

  useEffect(() => {
    if (!collectionId) return;
    fetchRecommendedInfo();
  }, [collectionId]);

  const filteredItems = recommendedItemsInfo.filter((item) => item.itemId !== currentItemId);

  return (
    <section id="recommended-items">
      <div className="container">
        <div className="row recommended-items__row">
          <div className="recommended-items__wrapper">
            {loading ? (
              <RecommendedIHeaderSkeleton />
            ) : (
              <div className="recommended-items__header">
                <FontAwesomeIcon icon={faTableCells} />
                <h3 className="recommended-items__header__title">More from this collection</h3>
              </div>
            )}

            <div className="recommended-items__body">
              <Swiper
                spaceBetween={16}
                loop
                navigation
                modules={[Navigation]}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  480: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1020: { slidesPerView: 4 },
                  1200: { slidesPerView: 5 },
                  1600: { slidesPerView: 6 },
                }}
              >
                {loading
                  ? new Array(10).fill(0).map((_, index) => (
                      <SwiperSlide key={index}>
                        <RecommendedItemSkeleton />
                      </SwiperSlide>
                    ))
                  : filteredItems.slice(0, 10).map((recommendedItemInfo, index) => (
                      <SwiperSlide key={index}>
                        <Link to={`/item/${recommendedItemInfo.itemId}`} className="item">
                          <figure className="item__img__wrapper">
                            <img src={recommendedItemInfo.imageLink} alt="" className="item__img" />
                          </figure>

                          <div className="item__details">
                            <span className="item__details__name">{recommendedItemInfo.title}</span>
                            <span className="item__details__price">
                              {recommendedItemInfo.price} ETH
                            </span>
                            <span className="item__details__last-sale">
                              Last sale: {recommendedItemInfo.lastSale} ETH
                            </span>
                          </div>

                          <div className="item__see-more">
                            <button className="item__see-more__button">See More</button>
                            <div className="item__see-more__icon">
                              <FontAwesomeIcon icon={faShoppingBag} />
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </div>

            {loading ? (
              <RecommendedFooterSkeleton />
            ) : (
              <div className="recommended-items__footer">
                <Link
                  to={`/collection/${collectionId}`}
                  className="recommended-items__footer__button"
                >
                  View Collection
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
