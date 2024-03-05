import { React, useEffect, useState } from "react";
import "../css/atclsetting.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, userTokensRefresh } from "../store/thunks/thunk";
import { monthTransform } from "../components/date_transform";
import { changeAdsApi, deleteImageInAdsApi, postImageToAdsApi } from "../api";

export const AdsChangePage = () => {
  const allAds = useSelector((state) => state.ads.allAds);
  const activeAdsId = useSelector((state) => state.ads.activeAdsId);
  const allImages = useSelector((state) => state.images.allImages);
  const token = useSelector((state) => state.user.accessToken);
  const refrToken = useSelector((state) => state.user.refreshToken);
  const [numberOfAdv, setNumberOfAdv] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let activeAds = null;
  const URL1 = "http://localhost:8090/";
  const [imageURL, setImageURL] = useState();
  const [initialImgArr, setInitialImgArr] = useState([]);
  const [addAdvForm, setAddAdvForm] = useState({
    title: "",
    text: "",
    goodsImg: [],
    price: null,
  });

  let stateImgArr = [];
  let imgChangeArr = [];
  // поиск выбранного объявления activeAds по ID
  if (activeAdsId) {
    let idToLookFor = activeAdsId;
    activeAds = allAds.find(function (item) {
      return item.id === idToLookFor;
    });

    console.log(activeAds);

    for (let i = 0; i < 5; i++) {
      if (activeAds.images[i]) {
        stateImgArr[i] = activeAds.images[i];
      } else {
        stateImgArr[i] = undefined;
      }
    }
    console.log(stateImgArr);
  }

  useEffect(() => {
    setInitialImgArr(stateImgArr);
  }, []);

  console.log(initialImgArr);

  // функция обновления состояния данных пользователя
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение

    setAddAdvForm({
      ...addAdvForm,
      [name]: value,
    });
  };

  // функция обновления состояния выбора картинок
  const handleImageSet = (event, index) => {
    const element = event.target.value;
    console.log(event);
    console.log(index);
    console.log(element);

    console.log(`Выбрали элемент с индексом ${index}`);

    console.log(event);

    console.log(event.target.files[0]);

    imgChangeArr[index] = event.target.files[0];
    console.log(imgChangeArr);

    //     setAddAdvForm({
    //     ...addAdvForm,
    //     goodsImg: imgChangeArr,
    //   });
    let newArr = [];
    for (let i = 0; i < initialImgArr.length; i++) {
      if (i === index) {
        newArr[i] = imgChangeArr[index];
      } else {
        newArr[i] = initialImgArr[i];
      }
    }

    setInitialImgArr(newArr);
  };

  const changeAds = () => {
    let newTitle = "";
    let newText = "";
    let newPrice = "";
    addAdvForm.title
      ? (newTitle = addAdvForm.title)
      : (newTitle = activeAds.title);
    addAdvForm.text
      ? (newText = addAdvForm.text)
      : (newText = activeAds.description);
    addAdvForm.price
      ? (newPrice = addAdvForm.price)
      : (newPrice = activeAds.price);
    console.log(newTitle);

    changeAdsApi({
      token,
      id: activeAdsId,
      title: newTitle,
      text: newText,
      price: newPrice,
    }).then((res) => {
      if (res.status === 200) {
        console.log(res.status);
        dispatch(fetchAds());
        navigate("/profile");
      }
      if (res.status === 401) {
        console.log(res.status);
        dispatch(
          userTokensRefresh({ accessToken: token, refreshToken: refrToken })
        )
          .then(
            changeAdsApi({
              token,
              id: activeAdsId,
              title: newTitle,
              text: newText,
              price: newPrice,
            })
          )
          .then((res) => {
            if (res.status === 200) {
              console.log(res.status);
              dispatch(fetchAds());
              navigate("/adv_page/myads");
            } else {
              navigate("/login");
            }
          });
      }
    });

    for (let i = 0; i < 5; i++) {
      console.log(i);
      console.log(initialImgArr[i]);
      console.log(initialImgArr[0]);
      if (initialImgArr[i]) {
        console.log(initialImgArr[i]);
        if (initialImgArr[i].id === stateImgArr[i].id) {
          console.log(initialImgArr[i].id);
          console.log(stateImgArr[i].id);
          console.log(initialImgArr[i].url);
        } else {
          // 1. удаляем старую картинку по id картинки
          deleteImageInAdsApi({
            token,
            id: activeAdsId,
            fileUrl: stateImgArr[i].url,
          })
            // 2. добавляем новую картинку
            .then(
              postImageToAdsApi({
                token,
                id: activeAdsId,
                file: initialImgArr[i],
              })
            );
        }
      }
    }

    navigate("/profile");
  };

  return (
    <div className="wrapper">
      <div className="container-bg">
        <div className="modal__block">
          <div className="modal__content">
            <h3 className="modal__title">Редактировать объявление</h3>
            <div className="modal__btn-close">
              <div
                className="modal__btn-close-line"
                onClick={() => navigate(-1)}
              ></div>
            </div>
            <form
              className="modal__form-newArt form-newArt"
              id="formNewArt"
              action="#"
            >
              <div className="form-newArt__block">
                <label for="name">Название</label>
                <input
                  className="form-newArt__input"
                  type="text"
                  name="title"
                  id="formName"
                  placeholder="Введите название"
                  defaultValue={activeAds.title}
                  onChange={handleInputChange}
                ></input>
              </div>
              <div className="form-newArt__block">
                <label for="text">Описание</label>
                <textarea
                  className="form-newArt__area"
                  name="text"
                  id="formArea"
                  cols="auto"
                  rows="10"
                  placeholder="Введите описание"
                  defaultValue={activeAds.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form-newArt__block">
                <p className="form-newArt__p">
                  Фотографии товара<span>не более 5 фотографий</span>
                </p>
                <div className="form-newArt__bar-img">
                  {initialImgArr.map((el, index) => {
                    console.log(initialImgArr);
                    console.log(el);
                    console.log(index);
                    return initialImgArr[index]?.id ? (
                      <div className="form-newArt__img">
                        <label
                          htmlFor={index}
                          className="form-newArt__img-cover"
                          value={el}
                          onChange={(event) => handleImageSet(event, index)}
                        >
                          <img
                            src={`${URL1}` + `${initialImgArr[index].url}`}
                            alt=""
                          />

                          <input
                            className="input"
                            type="file"
                            name="goodsImg"
                            accept="image/*,.png,.jpg,.git,.web"
                            id={index}
                            hidden
                          ></input>
                        </label>
                      </div>
                    ) : initialImgArr[index]?.name ? (
                      <div className="form-newArt__img">
                        <img
                          src={URL.createObjectURL(initialImgArr[index])}
                          alt=""
                        />
                        <label
                          htmlFor={el}
                          className="form-newArt__img-cover"
                          value={addAdvForm.goodsImg[index]}
                          onChange={(event) => {
                            handleImageSet(event, index);
                          }}
                        >
                          <input
                            className="input"
                            type="file"
                            name="goodsImg"
                            accept="image/*,.png,.jpg,.git,.web"
                            id={el}
                            hidden
                          ></input>
                        </label>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="form-newArt__block block-price">
                <label for="price">Цена</label>
                <input
                  className="form-newArt__input-price"
                  type="text"
                  name="price"
                  id="formName"
                  defaultValue={activeAds.price}
                  onChange={handleInputChange}
                />
                <div className="form-newArt__input-price-cover"></div>
              </div>

              <div
                className="form-newArt__btn-pub btn-hov02"
                id="btnPublish"
                onClick={() => changeAds()}
              >
                Сохранить
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
