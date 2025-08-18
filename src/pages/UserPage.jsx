import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserHeaderSkeleton from "../components/ui/UserSkeleton/UserHeaderSkeleton";
import UserInfoSkeleton from "../components/ui/UserSkeleton/UserInfoSkeleton";
import UserItemsHeaderSkeleton from "../components/ui/UserSkeleton/UserItemsSkeleton/UserItemsHeaderSkeleton";
import UserItemSkeleton from "../components/ui/UserSkeleton/UserItemsSkeleton/UserItemSkeleton";

export default function UserPage() {
  const { id } = useParams();
  const [usersInfo, setUsersInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [userInfoDetails, setUserInfoDetails] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState(12);
  const [sort, setSort] = useState("");

  async function fetchUserInfo() {
    setLoading(true);
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/user/${id}`
    );
    setUsersInfo(data.data);
    setUserInfoDetails(data.data.items);
    setLoading(false);
  }

  const showMoreUserItems = () => {
    setUsersPerPage((prevValue) => prevValue + 6);
  };

  const sortUserItems = (userInfoDetails ?? []).slice().sort((a, b) => {
    if (sort === "HIGH_TO_LOW") return b.price - a.price;
    if (sort === "LOW_TO_HIGH") return a.price - b.price;
    return 0;
  });

  useEffect(() => {
    fetchUserInfo();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {loading ? (
        <UserHeaderSkeleton />
      ) : (
        <header
          style={{
            backgroundImage: `url(${usersInfo.imageLink})`,
          }}
          id="user-header"
        ></header>
      )}

      {loading ? (
        <UserInfoSkeleton />
      ) : (
        <section id="user-info">
          <div className="row">
            <div className="user-info__wrapper">
              <figure className="user-info__img__wrapper">
                <img src={usersInfo.profilePicture} alt="" className="user-info__img" />
              </figure>
              <h1 className="user-info__name">{usersInfo.name}</h1>
              <div className="user-info__details">
                <span className="user-info__wallet">
                  <FontAwesomeIcon icon={faEthereum} className="user-info__wallet__icon" />
                  <span className="user-info__wallet__data">{usersInfo.walletCode}</span>
                </span>
                <span className="user-info__year">
                  <span className="user-info__year__data">Joined {usersInfo.creationDate}</span>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section id="user-items">
        <div className="row user-items__row">
          {loading ? (
            <UserItemsHeaderSkeleton />
          ) : (
            <div className="user-items__header">
              <div className="user-items__header__left">
                <span className="user-items__header__text">{usersInfo.items.length} items</span>
              </div>
              <select
                value={sort}
                className="user-items__header__sort"
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="" default disabled>
                  Default
                </option>
                <option value="HIGH_TO_LOW">Price high to low</option>
                <option value="LOW_TO_HIGH">Price low to high</option>
              </select>
            </div>
          )}

          <div className="user-items__body">
            {loading
              ? new Array(12).fill(0).map((_, index) => <UserItemSkeleton key={index} />)
              : sortUserItems.slice(0, usersPerPage).map((userInfoDetail, index) => (
                  <div className="item-column" key={index}>
                    <Link to={`/item/${userInfoDetail.itemId}`} className="item">
                      <figure className="item__img__wrapper">
                        <img src={userInfoDetail.imageLink} alt="" className="item__img" />
                      </figure>
                      <div className="item__details">
                        <span className="item__details__name">{userInfoDetail.title}</span>
                        <span className="item__details__price">{userInfoDetail.price} ETH</span>
                        <span className="item__details__last-sale">
                          Last sale: {userInfoDetail.lastSale} ETH
                        </span>
                      </div>
                      <div className="item__see-more" href="#">
                        <button className="item__see-more__button">See More</button>
                        <div className="item__see-more__icon">
                          <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>

        {usersPerPage < userInfoDetails.length && (
          <button className="collection-page__button" onClick={showMoreUserItems}>
            Load more
          </button>
        )}
      </section>
    </>
  );
}
