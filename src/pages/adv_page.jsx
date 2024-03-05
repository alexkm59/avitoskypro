import { React, useEffect, useState } from "react";
import "../css/article.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAds, fetchAllImages } from "../store/thunks/thunk";
import { monthTransform } from "../components/date_transform";
import { PhotoBar } from "../components/photo_bar";
import {TimeTransform} from "../components/time_transform";
import { getAllCommentsApi } from "../api";


export const AdvPage = () => {
    const dispatch = useDispatch();
    const allAds = useSelector((state) => state.ads.allAds);
    const activeAdsId = useSelector((state) => state.ads.activeAdsId);
    const allImages = useSelector((state) => state.images.allImages);
    const [numberOfAdv, setNumberOfAdv] = useState("");
    let activeAds = null;
    let sellsFromMonth;
    let sellsFromYear;
    const [isTelShow, setIsTelShow] = useState(false);
    const URL = "http://localhost:8090/";
    // поиск выбранного объявления activeAds по ID
    if (activeAdsId) {
        let idToLookFor = activeAdsId;
         activeAds = allAds.find(function (item) {
            return item.id === idToLookFor;
        });
        console.log(activeAds);
        sellsFromMonth = monthTransform(activeAds.user?.sells_from);
        sellsFromYear = activeAds.user?.sells_from.slice(0,4);
    }


// получаем все комментарии к объявлению для подсчета
useEffect(() => {
    getAllCommentsApi({ id: activeAdsId }).then((res) => {
      console.log(res);
      console.log(res.length);
      setNumberOfAdv(res.length);
    });
  }, []);


//    Переключение просмотра телефона

const toggleTelShow = () =>{
    !isTelShow ? setIsTelShow(true) : setIsTelShow(false);

}

// поиск картинки для отображения
let imgUrl = null;
if (activeAds?.images[0]?.id) {
    let idToLookFor = activeAds?.images[0]?.id;
    let foundObject = allImages.find(function (item) {
      return item.id === idToLookFor;
    });

    imgUrl = `${URL}` + `${foundObject?.url}`;
  }

let imgArr = [];
  if (activeAds?.images) {
    for(let i=1; i < activeAds?.images.length; i++ ){
        let idToLookFor = activeAds?.images[i]?.id;
        let foundObject = allImages.find(function (item) {
          return item.id === idToLookFor;
        });
    
       let imgUrlItem = `${URL}` + `${foundObject?.url}`;
       imgArr.push(imgUrlItem);
        }

  }

  
  



  let dateTime = TimeTransform(activeAds.created_on);

return(
    <div className="wrapper">
        <div className="container">
            <header className="header">
                <nav className="header__nav">
                    <div className="header__logo logo-mob">
                        <a className="logo-mob__link" href="" target="_blank">
                            <img className="logo-mob__img" src="img/logo-mob.png" alt="logo"/>
                        </a>
                    </div>
                    <button className="header__btn-putAd btn-hov01" id="btputAd">Разместить объявление</button>
                    <button className="header__btn-lk btn-hov01" id="btnlk">Личный кабинет</button>
                </nav>
            </header>

            <main className="main">
                
                <div className="main__container">
                    <div className="main__menu menu">
                        <a className="menu__logo-link" href="" target="_blank">
                            <img className="menu__logo-img" src="img/logo.png" alt="logo"/>
                        </a>
                        <form className="menu__form" action="#">
                            <Link to='/'>
                            <button className="menu__btn-serch btn-hov02" id="btnGoBack">Вернуться на главную</button>
                            </Link>
                           
                        
                        </form>                    
                    </div>                    
                </div>

                    <div className="main__artic artic">
                        <div className="artic__content article">                           
                            <div className="article__left">
                                <div className="article__fill-img">
                                    
                                    <div className="article__img">                                        
                                            <img src={`${imgUrl}`} alt="mein Image"/>                                        
                                    </div>                                    
                                    <div className="article__img-bar">
                                        {/*Отрисовка подвала с доп картинками  */}
                                    {imgArr.map((oneImg) => {  
                                            return (
                                            <PhotoBar 
                                                imgUrl={oneImg}>
                                                
                                            </PhotoBar>
                                                
                                            );
                                        })}
                                        
                                        
                                    </div>
                                    <div className="article__img-bar-mob img-bar-mob">
                                        <div className="img-bar-mob__circle circle-active"></div>
                                        <div className="img-bar-mob__circle"></div>
                                        <div className="img-bar-mob__circle"></div>
                                        <div className="img-bar-mob__circle"></div>
                                        <div className="img-bar-mob__circle"></div>
                                    </div>
                                </div>                                
                            </div>
                            <div className="article__right">
                                <div className="article__block">
                                    <h3 className="article__title title">{activeAds.title}</h3>
                                    <div className="article__info">
                                        <p className="article__date">{dateTime}</p>
                                        <p className="article__city">{activeAds.user?.city}</p>
                                    <Link to="/adv_page/reviews">   
                                        <a className="article__link" href="" target="_blank" rel="">{numberOfAdv} отзыва</a>
                                    </Link> 
                                    </div>
                                    <p className="article__price">{activeAds.price} ₽</p>
                                    {isTelShow ? (<button className="article__btn btn-hov02" onClick={()=>toggleTelShow()}>
                                        
                                        <span>{activeAds.user?.phone}</span>
                                    
                                    </button>):(<button className="article__btn btn-hov02" onClick={()=>toggleTelShow()}>
                                        Показать&nbsp;телефон 
                                        <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                                    
                                    </button>)}
                                    
                                    <div className="article__author author">
                                        <div className="author__img">
                                            <img src="" alt=""/>
                                        </div>
                                        <div className="author__cont">
                                        <Link to='/seller_profile'>
                                            <a className="author__name" >{activeAds.user?.name}</a>
                                        </Link>
                                            

                                            <p className="author__about">Продает товары с {sellsFromMonth} {sellsFromYear}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="main__container">
                    <h3 className="main__title title">
                        Описание товара
                    </h3>
                    <div className="main__content">
                        <p className="main__text">{activeAds?.description}</p>
                                                
                    </div>
                    
                </div>
                
            </main>
            
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_01.png" alt="home"/>
                        </a>                        
                    </div>
                    <div className="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_02.png" alt="home"/>
                        </a>
                    </div>
                    <div className="footer__img">
                        <a href="" target="_self">
                            <img src="img/icon_03.png" alt="home"/>
                        </a>
                    </div>
                </div>
                
            </footer>
        </div>
    </div>
)



}