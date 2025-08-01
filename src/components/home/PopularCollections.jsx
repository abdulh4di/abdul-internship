import { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { AppContext } from "../../context/AppContext";
import CollectionsSkeleton from "../ui/CollectionsSkeleton";

export default function PopularCollections() {
  const { popularCollections, loading } = useContext(AppContext);

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
                    <SwiperSlide key={index}>
                      <CollectionsSkeleton />
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
