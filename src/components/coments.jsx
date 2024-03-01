import { React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeTransform } from "./time_transform";

export const UsersComments = ({id, authorName, createdOn, text }) => {
 
     return (
  <div className="reviews__review review" key={id}>
 <div className="review__item">
   <div className="review__left">
     {id ? (<div className="review__img">
       <img src="" alt="" />
     </div>):(null)}
     
   </div>
   <div className="review__right">
     <p className="review__name font-t">
       {authorName} <span>{createdOn}</span>
     </p>
     {id ? (<h5 className="review__title font-t">Комментарий</h5>):(null)}
     <p className="review__text font-t"> {text} </p>
   </div>
 </div>
</div>

      
    

)
  
};
