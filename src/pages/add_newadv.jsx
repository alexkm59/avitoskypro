import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../css/addnewat.css";
import { fetchNewAdv, fetchNewAdvTextOnly, userTokensRefresh } from "../store/thunks/thunk";
import { postImageToAdsApi, postNewAdsTextOnly } from "../api";

export const AddNewAdv = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.accessToken);
  const refrToken = useSelector((state)=> state.user.refreshToken);
  const [imageURL, setImageURL] = useState();
  const[formInputError, setFormInputError] = useState(null);
  const [addAdvForm, setAddAdvForm] = useState({
    title: "",
    text: "",
    goodsImg: [undefined, undefined, undefined, undefined, undefined],
    price: null,
  });

  

  // функция обновления состояния данных пользователя (без картинок)
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение
    
      setAddAdvForm({
        ...addAdvForm,
        [name]: value,
      });
    
  };

  // функция обновления состояния выбора картинок
  const handleImageSet = (el, index) => {
    const { name, value} = el.target;
console.log(index);
console.log(name);
console.log(value);

    console.log(`Выбрали элемент с индексом ${el}`)

    console.log(el);

      console.log(el.target.files[0]);
    
      let imgArr = addAdvForm.goodsImg;
   
      // imgArr.push(el.target.files[0]);
      imgArr[index]= el.target.files[0];
      console.log(imgArr);
      
        setAddAdvForm({
        ...addAdvForm,
        goodsImg: imgArr,
      });
      

  }

  const postNewAds = async () => {
    console.log(addAdvForm);
// валидация формы

if(!addAdvForm.title || !addAdvForm.text){

  setFormInputError("Поля название и описание должны быть заполнены");
  return;
}else{
    // 1. создаем объявление сначала как текст и получаем его id res.id
 postNewAdsTextOnly({token, title: addAdvForm.title, description: addAdvForm.text, price: addAdvForm.price})
.then(async (res)=> {
  if(res.status === 201){
      console.log(res.status);
      const data = await res.json();
      let id = data.id;
      console.log(id);
      
    addAdvForm.goodsImg.forEach((el)=> {
     
      if(el){
        postImageToAdsApi({token, id: id, file: el})
      }
      
      navigate("/profile");
    })
    
      
  }
  if(res.status === 401){
      console.log(res.status);
      dispatch(userTokensRefresh({accessToken: token, refreshToken: refrToken}))
      .then(postNewAdsTextOnly({token, title: addAdvForm.title, description: addAdvForm.text, price: addAdvForm.price}))
      .then(async (res)=>{
          if(res.status === 201){
              console.log(res.status);
              const data = await res.json();
              let id = data.id;
              console.log(id);
              addAdvForm.goodsImg.forEach((el)=> {
                if(el){
                  postImageToAdsApi({token, id: id, file: el})
                }
                
                navigate(-1);
              })
          
            }else{
              console.log(res);
              // navigate("/login");
          }

      }) 
      
  }

});


} 

    
  };

// Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
useEffect(() => {
  setFormInputError(null);
  
}, [addAdvForm]);



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
                  
                  {/* <div className="form-newArt__img">
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
                  </div> */}
                  
                  {addAdvForm.goodsImg.map((el, index)=>{
                  
                 
                  return(
                    addAdvForm.goodsImg[index] ? (
                      <div className="form-newArt__img" >
                        <img src={URL.createObjectURL(addAdvForm.goodsImg[index])} alt="" />
                            <label
                              htmlFor={el}
                              className="form-newArt__img-cover"
                              value={addAdvForm.goodsImg[index]}
                                onChange={(event)=>{
                             
                                  handleImageSet(event, index)}}
                              
                            >
                              <input
                                className="input"
                                type="file"
                                name="goodsImg"
                                accept="image/*,.png,.jpg,.git,.web"
                                id={el}
                                hidden
                                
                            >
    
                            </input>
                            </label>
                      </div>
                      ):(
                        <div className="form-newArt__img" >
                        <img src="" alt="" />
                            <label
                              htmlFor={el}
                              className="form-newArt__img-cover"
                              value={addAdvForm.goodsImg[index]}
                                onChange={(event)=>{
                             
                                  handleImageSet(event, index)}}
                              
                              
                            >
                              <input
                                className="input"
                                type="file"
                                name="goodsImg"
                                accept="image/*,.png,.jpg,.git,.web"
                                id={el}
                                hidden
                                
                            >
    
                            </input>
                            </label>
                      </div>)
                  )
                  


                
                  

                  })}
                  
                  
                  {/* <div className="form-newArt__img">
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
                  </div> */}

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
                <div>
                  Опубликовать
                </div>
                
                  
                
              </div>

              {formInputError ? (<div>{formInputError}</div>):(null)}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
