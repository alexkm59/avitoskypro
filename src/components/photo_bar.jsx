import { React } from "react";

export const PhotoBar = (imgUrl) => {
 
    return (
    <div className="article__img-bar-div">
      <img src={`${imgUrl.imgUrl}`} alt="additional images" />
    </div>
  );
};
