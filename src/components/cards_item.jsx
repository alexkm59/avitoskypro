import { React } from "react";
import "../css/main.css";
import { getImagesById } from "../api";
import { useSelector } from "react-redux";

export const CardsItem = ({ key, title, price, city, time, imagesId }) => {
    const allImages = useSelector((state) => state.images.allImages);
    const URL = "http://localhost:8090/";
    console.log(imagesId);
    console.log(allImages.imagesId);

    let idToLookFor = imagesId;
    let foundObject = allImages.find(function(item) {
      return item.id === idToLookFor;
    });

    console.log(foundObject);
  
    let u = `${URL}`+`${foundObject.url}`;

    console.log(u);
    
return (
    <div className="cards__item" key={key}>
      <div className="cards__card card">
        <div className="card__image">
          <a href="/" target="_blank">
            <img src={`${URL}`+ `${foundObject.url}`} alt="picture4"> </img>
          </a>
        </div>
        <div className="card__content">
          <a href="/" target="_blank">
            <h3 className="card__title">{title}</h3>
          </a>
          <p className="card__price">{price}₽</p>
          <p className="card__place">{city}</p>
          <p className="card__date">{time}</p>
        </div>
      </div>
    </div>
  );
};
