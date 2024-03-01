import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/addnewat.css";
import { fetchNewAdv, fetchNewAdvTextOnly } from "../store/thunks/thunk";
import { postImageToAdsApi, postNewAdsTextOnly } from "../api";

export const AddNewAdv = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.accessToken);
  const [imageURL, setImageURL] = useState();
  const [addAdvForm, setAddAdvForm] = useState({
    title: "",
    text: "",
    goodsImg: [],
    price: null,
  });

  // функция обновления состояния данных пользователя
  const handleInputChange = async (e) => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение
    
    
    if (name == "goodsImg") {
      console.log(e.target.files[0]);
    console.log(value);
      let imgArr = addAdvForm.goodsImg;
   
      

      imgArr.push(e.target.files[0]);
      console.log(imgArr);
      
        setAddAdvForm({
        ...addAdvForm,
        goodsImg: imgArr,
      });
      const id = 18;
      const res = await postImageToAdsApi({token, id: id, file: imgArr})
      const data = await res.json();
      console.log(res);
      setImageURL(data.images.url);




    } else {
      setAddAdvForm({
        ...addAdvForm,
        [name]: value,
      });
    }
  };

  const postNewAds = async () => {
    console.log(addAdvForm);
    // если нет картинок, то создаем объявление без картинки
    
    // const data = await postNewAdsTextOnly({token, title: addAdvForm.title, description: addAdvForm.text, price: addAdvForm.price});

const id = 18;
      //   dispatch(fetchNewAdvTextOnly({
      //   token,
      //   title: addAdvForm.title,
      //   description: addAdvForm.text,
      //   price: addAdvForm.price,
      // }));
// создание объявления с картинками
// 1. создаем объявление без картинки и получаем его id (data.id)
// 2. добавляем картинки по одной к созданному id

console.log(addAdvForm.goodsImg.length);
    if(addAdvForm.goodsImg.length > 0){

      addAdvForm.goodsImg.forEach(async (el)=> {
        const res = await postImageToAdsApi({token, id: id, file: el})
        const data = await res.json();
        console.log(res);
        setImageURL(data.images.url);
        
      })
    }



    // dispatch(
    //   fetchNewAdvTextOnly({
    //     token,
    //     title: addAdvForm.title,
    //     description: addAdvForm.text,
    //     price: addAdvForm.price,
    //   })
    // );
  };

  return (
    <div className="wrapper">
      <div className="container-bg">
        <div className="modal__block">
          <div className="modal__content">
            <h3 className="modal__title">Новое объявление</h3>
            <div className="modal__btn-close">
              <div className="modal__btn-close-line"></div>
            </div>
            <form
              className="modal__form-newArt form-newArt"
              id="formNewArt"
              action="#"
            >
              <div className="form-newArt__block">
                <label htmlFor="name">Название</label>
                <input
                  className="form-newArt__input"
                  type="text"
                  name="title"
                  id="formName"
                  placeholder="Введите название"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-newArt__block">
                <label htmlFor="text">Описание</label>
                <textarea
                  className="form-newArt__area"
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-newArt__block">
                <p className="form-newArt__p">
                  Фотографии товара<span>не более 5 фотографий</span>
                </p>
                <div className="form-newArt__bar-img">
                  <div className="form-newArt__img">
                    <img src="" alt="" />
                    <label
                      htmlFor="userPhoto"
                      className="form-newArt__img-cover"
                    >
                      <input
                        className="input"
                        type="file"
                        name="goodsImg"
                        accept="image/*,.png,.jpg,.git,.web"
                        id="userPhoto"
                        hidden
                        onChange={handleInputChange}
                      />
                    </label>
                  </div>
                  <div className="form-newArt__img">
                    <img src={imageURL} alt="" />
                    <div className="form-newArt__img-cover"></div>
                  </div>
                  <div className="form-newArt__img">
                    <div className="form-newArt__img-cover"></div>
                    <img src="" alt="" />
                  </div>
                  <div className="form-newArt__img">
                    <div className="form-newArt__img-cover"></div>
                    <img src="" alt="" />
                  </div>
                  <div className="form-newArt__img">
                    <div className="form-newArt__img-cover"></div>
                    <img src="" alt="" />
                  </div>
                </div>
              </div>
              <div className="form-newArt__block block-price">
                <label htmlFor="price">Цена</label>
                <input
                  className="form-newArt__input-price"
                  type="text"
                  name="price"
                  id="formName"
                  onChange={handleInputChange}
                />
                <div className="form-newArt__input-price-cover"></div>
              </div>

              <div
                className="form-newArt__btn-pub btn-hov02"
                id="btnPublish"
                onClick={() => postNewAds()}
              >
                Опубликовать
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
