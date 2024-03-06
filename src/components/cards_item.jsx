import { React } from "react";
import "../css/main.css";
import { getImagesById } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllImages, getActiveAdsId } from "../store/thunks/thunk";
import { TimeTransform } from "./time_transform";


export const CardsItem = ({ id, title, price, city, time, imagesId, adsOwner }) => {
  const dispatch = useDispatch();
  const allImages = useSelector((state) => state.images.allImages);
  const activeAdsId = useSelector((state) => state.ads.activeAdsId);
  const allAds = useSelector((state) => state.ads.allAds);
  const userId = useSelector((state)=> state.user.userId);
  const URL = "http://localhost:8090/";
  let imgUrl;
  let activeAds = null;
  
  const setActiveAds = (id) => {
    console.log(`Выбрано объявление №${id}`);
    dispatch(getActiveAdsId(id));
  };

console.log(userId);
console.log(adsOwner);

  // поиск выбранного объявления activeAds по ID
  if (activeAdsId) {
    let idToLookFor = activeAdsId;
    activeAds = allAds.find(function (item) {
      return item.id === idToLookFor;
    });
  }

  if (imagesId) {
    console.log(allImages);
    let idToLookFor = imagesId;
    let foundObject = allImages.find(function (item) {
      return item.id === idToLookFor;
    });

    imgUrl = `${URL}` + `${foundObject?.url}`;
  }

  let dateTime = TimeTransform(time);

  return (
    <div className="cards__item" key={id}>
      <div className="cards__card card">
        <div className="card__image">
          <Link to="/adv_page">
            <a href="/" target="_blank"
              onClick={() => {
                setActiveAds(id);
              }}
            >
              {imagesId ? <img src={`${imgUrl}`} alt="ads_picture" /> : null}
            </a>
          </Link>
        </div>
        <div className="card__content">
          
          {(userId !== adsOwner) ? (<Link to="/adv_page">
            <a href="/" target="_blank" onClick={() => {
                setActiveAds(id);
              }}>
              <h3 className="card__title">{title}</h3>
            </a>
          </Link>):(<Link to="/adv_page/myads">
            <a href="/" target="_blank" onClick={() => {
                setActiveAds(id);
              }}>
              <h3 className="card__title">{title}</h3>
            </a>
          </Link>)}
          

          <p className="card__price">{price}₽</p>
          <p className="card__place">{city}</p>
          <p className="card__date">{dateTime}</p>
        </div>
      </div>
    </div>
  );
};
