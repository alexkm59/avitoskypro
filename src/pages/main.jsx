import { React, useEffect, useState } from "react";
import "../css/main.css";
import { Link } from "react-router-dom";
import { getAlladvertis } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { allAdsLoading } from "../store/slices/ads";
import { fetchAds, fetchAllImages, userExitThunk } from "../store/thunks/thunk";
import { CardsItem } from "../components/cards_item";

export const MainPage = () => {
  const dispatch = useDispatch();
  const allAds = useSelector((state) => state.ads.allAds);
  const isLoading = useSelector((state) => state.ads.loading);
  const error = useSelector((state) => state.ads.error);
  const allImages = useSelector((state) => state.images.allImages);
  const userId = useSelector((state)=> state.user.userId);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [serchAdss, setSerchAdss] = useState([]);

  let adsForView = [];
  
  useEffect(() => {
    
    dispatch(fetchAds());
    dispatch(fetchAllImages());
    // })
  }, []);

  const exitFunction =()=>{
      dispatch(userExitThunk());

  }

   // Функция поиска
const sertchFunction = (el) =>{
  let sertchAds=[];
  console.log(el.length);
  if (el.length > 0){
    setIsSearchActive(true);
  }else{
    setIsSearchActive(false);
  }

  for (let i = 0; i < allAds?.length; i++){
    if(allAds[i].title.toLowerCase().includes(el)){
      sertchAds.push(allAds[i].title.toLowerCase());
    }
  }
  
  console.log(sertchAds);
  

  if(sertchAds.length > 0){
    
    let checkArray = allAds;
    let NewAllArray = [];

    for (let i = 0; i < sertchAds.length; i++) {
      for(let j = 0; j < checkArray.length; j++){
        if(checkArray[j].title.toLowerCase() === sertchAds[i].toLowerCase()){
          NewAllArray.push(checkArray[j])
        }
      }
    }
    
      console.log(NewAllArray);
      setSerchAdss(NewAllArray);

  }else{
    let NewAllArray = [];
    setSerchAdss(NewAllArray);
  }

  
}

serchAdss?.length ?  (adsForView = serchAdss):(adsForView = allAds);
 

  

  console.log(allAds);
  console.log(allImages);
  return (
    <>
      <div className="wrapper">
        <div className="container">
          <header className="header">
            <nav className="header__nav">

  {userId ? (
                <button
                  className="header__btn-main-enter btn-hov01"
                  id="btnMainEnter"
                  onClick ={()=> exitFunction()}
                >Выйти
                </button>
              ):(
              
              <Link to="/login">
                <button
                  className="header__btn-main-enter btn-hov01"
                  id="btnMainEnter"
                >
                  Вход в личный кабинет
                </button>
              </Link>)}

             
              
            
            
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
                  onChange={(event)=> sertchFunction(event.target.value)}
                />
                <input
                  className="search__text-mob"
                  type="search"
                  placeholder="Поиск"
                  name="search-mob"
                />
                
                <div className="search__btn btn-hov02">
                  <div>
                    Найти
                  </div>
                
                  </div>
              
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

                  {(isSearchActive && serchAdss.length === 0) ? (<div>Ничего не найдено...</div>):(
                    adsForView.map((oneAds) => {
                    
                    
                    return (

                      <CardsItem
                        id={oneAds.id}
                        title={oneAds.title}
                        price={oneAds.price}
                        city={oneAds.user.city}
                        time={oneAds.created_on}
                        imagesId={oneAds?.images[0]?.id}
                        adsOwner = {oneAds.user.id}
                      />
                      
                    )
                  })
                  )
                  }
                  
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
