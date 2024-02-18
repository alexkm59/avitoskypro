import { React, useEffect, useState } from "react";
import "../css/main.css";
import { Link } from "react-router-dom";
import { getAlladvertis } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { allAdsLoading } from "../store/slices/ads";
import { fetchAds, fetchAllImages } from "../store/thunks/thunk";
import { CardsItem } from "../components/cards_item";

export const MainPage = () => {
  const dispatch = useDispatch();
  const allAds = useSelector((state) => state.ads.allAds);
  const isLoading = useSelector((state) => state.ads.loading);
  const error = useSelector((state) => state.ads.error);
  const allImages = useSelector((state) => state.images.allImages);

  useEffect(() => {
    
    dispatch(fetchAds());
    dispatch(fetchAllImages());
    // })
  }, []);



  
  if (isLoading) {
    console.log(`Идет загрузка...`);
  }

  if (allAds) {
    console.log(`Объявления получены`);
    
  }

  console.log(allAds);
  console.log(allImages);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <header className="header">
            <nav className="header__nav">
              <Link to="/login">
                <button
                  className="header__btn-main-enter btn-hov01"
                  id="btnMainEnter"
                >
                  Вход в личный кабинет
                </button>
              </Link>
            </nav>
          </header>
          <main className="main">
            <div className="main__search search">
              <a className="search__logo-link" href="/" target="_blank">
                <img
                  className="search__logo-img"
                  src={`img/logo.png`}
                  alt="logo"
                />
              </a>
              <a className="search__logo-mob-link" href="/" target="_blank">
                {/* <img className="search__logo-mob-img" src="img/logo-mob.png" alt="logo"></img> */}
              </a>
              <form className="search__form" action="#">
                <input
                  className="search__text"
                  type="search"
                  placeholder="Поиск по объявлениям"
                  name="search"
                />
                <input
                  className="search__text-mob"
                  type="search"
                  placeholder="Поиск"
                  name="search-mob"
                />
                <button className="search__btn btn-hov02">Найти</button>
              </form>
            </div>
            <div className="main__container">
              <h2 className="main__h2">Объявления</h2>

              <div className="main__content">
                {isLoading ? (
                  <div>Выполняется загрузка объявлений... </div>
                ) : null}
                <div className="content__cards main_cards">
                  {/* Вызов компонента отрисовки объявлений */}

                  {allAds.map((oneAds) => {
                    
                    
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
                <a href="/" target="_self">
                  {/* <img src="/img/icon_01.png" alt="home"></img> */}
                </a>
              </div>
              <div className="footer__img">
                <a href="/" target="_self">
                  {/* <img src="/img/icon_02.png" alt="home"></img> */}
                </a>
              </div>
              <div className="footer__img">
                <a href="/" target="_self">
                  {/* <img src="/img/icon_03.png" alt="home"></img> */}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
