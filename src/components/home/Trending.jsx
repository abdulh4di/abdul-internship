import VerifiedIcon from "../../assets/verified.png";
import { Link } from "react-router-dom";
import TrendingSkeleton from "../ui/TrendingSkeleton";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Trending() {
  const { trendingNFTs, loading } = useContext(AppContext);

  return (
    <section id="trending">
      <div className="container">
        <div className="row trending__row">
          <div className="trending__header">
            <h2 className="trending__header__title">Trending NFTs</h2>
            <Link className="trending__header__button" to={"/collections"}>
              View All
            </Link>
          </div>
          <div className="trending__body">
            <div className="trending-column">
              <div className="trending-column__header">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">Collection</div>
                <div className="trending-column__header__price">Floor Price</div>
                <div className="trending-column__header__price">Volume</div>
              </div>

              {loading
                ? new Array(5)
                    .fill(0)
                    .map((_, index) => <TrendingSkeleton key={index} startRank={1 + index} />)
                : trendingNFTs.slice(0, 5).map((trendingNFT, index) => (
                    <div className="trending-column__body" key={trendingNFT.collectionId}>
                      <Link
                        to={`/collection/${trendingNFT.collectionId}`}
                        key={index}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">{index + 1}</div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={trendingNFT.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">{trendingNFT.title}</div>
                          <img src={VerifiedIcon} className="trending-collection__verified" />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Math.round(trendingNFT.floor * 100) / 100} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {trendingNFT.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>

            <div className="trending-column">
              <div className="trending-column__header trending-column__header2">
                <div className="trending-column__header__rank">#</div>
                <div className="trending-column__header__collection">Collection</div>
                <div className="trending-column__header__price">Floor Price</div>
                <div className="trending-column__header__price">Volume</div>
              </div>

              {loading
                ? new Array(5)
                    .fill(0)
                    .map((_, index) => <TrendingSkeleton key={index} startRank={6 + index} />)
                : trendingNFTs.slice(5, 10).map((trendingNFT, index) => (
                    <div className="trending-column__body" key={trendingNFT.collectionId}>
                      <Link
                        to={`/collection/${trendingNFT.collectionId}`}
                        className="trending-collection"
                      >
                        <div className="trending-collection__rank">{index + 6}</div>
                        <div className="trending-collection__collection">
                          <figure className="trending-collection__img__wrapper">
                            <img
                              src={trendingNFT.imageLink}
                              alt=""
                              className="trending-collection__img"
                            />
                          </figure>
                          <div className="trending-collection__name">{trendingNFT.title}</div>
                          <img src={VerifiedIcon} className="trending-collection__verified" />
                        </div>
                        <div className="trending-collection__price">
                          <span className="trending-collection__price__span">
                            {Math.round(trendingNFT.floor * 100) / 100} ETH
                          </span>
                        </div>
                        <div className="trending-collection__volume">
                          <span className="trending-collection__volume__span">
                            {trendingNFT.totalVolume} ETH
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
