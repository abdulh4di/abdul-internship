import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import PopularSkeleton from "../ui/PopularSkeleton";

export default function PopularCollections() {
  const [popularCollections, setPopularCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchPopularCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/popularCollections"
    );
    const collections = data.data;

    setPopularCollection(collections);
    setLoading(false);
  }

  useEffect(() => {
    fetchPopularCollections();
  }, []);

  return (
    <section id="popular-collections">
      <div className="container">
        <div className="row">
          <h2 className="popular-collections__title">Popular Collections</h2>

          <div className="popular-collections__body">
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
                ? new Array(7).fill(0).map((_, index) => (
                    <SwiperSlide>
                      <PopularSkeleton />
                    </SwiperSlide>
                  ))
                : popularCollections.map((popularCollection, index) => (
                    <SwiperSlide key={index}>
                      <Link
                        to={`/collection/${popularCollection.collectionId}`}
                        className="collection"
                      >
                        <img src={popularCollection.imageLink} alt="" className="collection__img" />
                        <div className="collection__info">
                          <h3 className="collection__name">{popularCollection.title}</h3>
                          <div className="collection__stats">
                            <div className="collection__stat">
                              <span className="collection__stat__label">Floor</span>
                              <span className="collection__stat__data">
                                {(Math.round(popularCollection.floor * 100) / 100).toFixed(2)} ETH
                              </span>
                            </div>
                            <div className="collection__stat">
                              <span className="collection__stat__label">Total Volume</span>
                              <span className="collection__stat__data">
                                {popularCollection.totalVolume} ETH
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
