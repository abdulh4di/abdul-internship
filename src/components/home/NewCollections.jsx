import { useContext } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/less/navigation";
import { Navigation } from "swiper/modules";
import { AppContext } from "../../context/AppContext";
import CollectionsSkeleton from "../ui/CollectionsSkeleton";

export default function NewCollections() {
  const { newCollections, loading } = useContext(AppContext);

  return (
    <section id="new-collections">
      <div className="container">
        <div className="row">
          <h2 className="new-collections__title">New Collections</h2>

          <div className="new-collections__body">
            <Swiper
              className="swiper-slide"
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
                : newCollections.map((newCollection, index) => (
                    <SwiperSlide key={index}>
                      <Link to={`/collection/${newCollection.collectionId}`} className="collection">
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
                    </SwiperSlide>
                  ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
