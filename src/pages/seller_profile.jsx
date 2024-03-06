import { React, useEffect, useState } from "react";
import "../css/sellerProfile.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { monthTransform } from "../components/date_transform";
import { CardsItem } from "../components/cards_item";

export const SellerProfilePage = ()  => {
    const activeAdsId = useSelector((state) => state.ads.activeAdsId);
    const allAds = useSelector((state) => state.ads.allAds);
    const [isTelShow, setIsTelShow] = useState(false);
    let activeAds = null;
    let sellsFromMonth;
    let sellsFromYear;
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

//    Переключение просмотра телефона

const toggleTelShow = () =>{
    !isTelShow ? setIsTelShow(true) : setIsTelShow(false);
}

// определяем id sellerа и находим его объявления
let sellerAds = [];
if (activeAds) {
    
const sellerID = activeAds.user.id;
console.log(sellerID);

    sellerAds = allAds.filter(function (item) {
        return item.user.id === sellerID;
     });

console.log(sellerAds);
    }

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
                    <div className="main__center-block">
                        <div className="main__menu menu">
                            <a className="menu__logo-link" href="" target="_blank">
                                <img className="menu__logo-img" src="img/logo.png" alt="logo"/>
                            </a>
                            <form className="menu__form" action="#">
                            <Link to="/">
                                <button className="menu__btn btn-hov02" id="btnGoBack">Вернуться на&nbsp;главную</button>
                                </Link>
                            </form>
                        
                        </div>
                        
                        <h2 className="main__h2">Профиль продавца</h2>
                        
                        <div className="main__profile-sell profile-sell">
                            <div className="profile-sell__content">
                        
                                <div className="profile-sell__seller seller">
                                    <div className="seller__left">
                                        <div className="seller__img">
                                            <a href="" target="_self">
                                                <img src="#" alt=""/>
                                            </a>
                        
                                        </div>
                                    </div>
                                    <div className="seller__right">
                                        <h3 className="seller__title">{activeAds.user.name}</h3>
                                        <p className="seller__city">{activeAds.user.city}</p>
                                        <p className="seller__inf">Продает товары с {sellsFromMonth} {sellsFromYear}</p>
                        
                                        <div className="seller__img-mob-block">
                                            <div className="seller__img-mob">
                                                <a href="" target="_self">
                                                    <img src="#" alt=""/>
                                                </a>
                                            </div>
                                        </div>
                        
                                        {/* <button className="seller__btn btn-hov02">Показать&nbsp;телефон
                                            <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                                        </button> */}
                                        
                                        {isTelShow ? (<button className="seller__btn btn-hov02" onClick={()=>toggleTelShow()}>
                                        
                                        <span>{activeAds.user?.phone}</span>
                                    
                                    </button>):(<button className="seller__btn btn-hov02" onClick={()=>toggleTelShow()}>
                                        Показать&nbsp;телефон 
                                        <span>8&nbsp;905&nbsp;ХХХ&nbsp;ХХ&nbsp;ХХ</span>
                                    
                                    </button>)}


                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3 className="main__title ">
                            Товары продавца
                        </h3>
                    </div>
                    <div className="main__content">
                        
                        <div className="content__cards cards">                            

                    {/* Вызов компонента отрисовки объявлений */}

                     {sellerAds.map((oneAds) => {
                        
                        console.log(oneAds);
                                        
                                        return (
                                        <CardsItem
                                            id={oneAds.id}
                                            title={oneAds.title}
                                            price={oneAds.price}
                                            city={oneAds.user.city}
                                            time={oneAds.created_on}
                                            imagesId={oneAds?.images[0]?.id}
                                        />
                                        );
                                    })} 

                        </div>                        
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