import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/less/navigation";
import { Navigation } from "swiper/modules";

export default function NewCollections() {
  const [newCollections, setNewCollections] = useState([]);
  async function fetchNewCollections() {
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/newCollections"
    );

    const collections = data.data;

    setNewCollections(collections);
  }

  useEffect(() => {
    fetchNewCollections();
  }, []);
  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>

          <div className="new-collections__body">
          <Swiper
            className="custom-swiper"
            spaceBetween={10}
            slidesPerView={6}
            loop
            navigation
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              368: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1220: { slidesPerView: 4 },
              1440: { slidesPerView: 5 },
            }}
          >
              {newCollections.map((newCollection, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="collection-column">
                    <Link to="/collection" className="collection">
                      <img src={newCollection.imageLink} alt="" className="collection__img" />
                      <div className="collection__info">
                        <h3 className="collection__name">{newCollection.title}</h3>
                        <div className="collection__stats">
                          <div className="collection__stat">
                            <span className="collection__stat__label">Floor</span>
                            <span className="collection__stat__data">
                              {(Math.round(newCollection.floor * 100) / 100).toFixed(2)} ETH
                            </span>
                          </div>
                          <div className="collection__stat">
                            <span className="collection__stat__label">Total Volume</span>
                            <span className="collection__stat__data">
                              {newCollection.totalVolume} ETH
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
            </div>
        </div>
      </div>
    </section>
  );
}
