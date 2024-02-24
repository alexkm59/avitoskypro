import {React, useEffect, useState} from 'react';
import '../css/profile.css';
import {Link, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInput } from '../store/thunks/thunk';
export const ProfilePage = ()  => {

    const token = useSelector((state)=> state.user.accessToken);
   
    const activeUser = useSelector((state) => state.user);
    const userName = useSelector((state)=> state.user.userName);
    const userSurname = useSelector((state)=> state.user.userSurname);
    const userCity = useSelector((state)=> state.user.userCity);
    const userPhone = useSelector((state)=> state.user.userPhone);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        surname: "",
        city: "",
        phone: "",
        avatar:"",
        isChange: false,
    });


   useEffect(() => {
    
        dispatch(fetchUserInput({token}))
        
        
      }, []);

    

// Перенаправляем пользователя на страницу логирования если нет токена
// useEffect(() => {
//     if(token.length == 0){
//         navigate("/login");
//     }
//   }, [token]);




// функция обновления состояния данных пользователя
const handleInputChange = (e) =>{
    const {name, value} = e.target; // Извлекаем имя поля и его значение
    setUserData({
        ...userData, // Копируем текущие данные из состояния
        [name]: value, // Обновляем нужное поле
      });
      checkProfileChange();
}

// функция проверки изменения данных профиля
const checkProfileChange = () =>{
    
if(userData.name !== userName){
    setUserData({
        ...userData,
        isChange: true, 
      });
}else{
    setUserData({
        ...userData, 
        isChange: false, 
      });
}


      
}


    return(

    <div className="wrapper">
        <div className="container">
            <header className="header">
                <nav className="header__nav">
                    <div className="header__logo logo-mob">
                        <a className="logo-mob__link" href="/" target="_blank">
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
                            <a className="menu__logo-link" href="/" target="_blank">
                                <img className="menu__logo-img" src="img/logo.png" alt="logo"/>
                            </a>
                            <form className="menu__form" action="#">
                            <Link to="/">
                                <button className="menu__btn btn-hov02" id="btnGoBack">Вернуться на&nbsp;главную</button>
                                </Link>
                            </form>
                        
                        </div>
                        
                        <h2 className="main__h2">Здравствуйте, {userName}!</h2>
                        
                        <div className="main__profile profile">
                            <div className="profile__content">
                                <h3 className="profile__title title">Настройки профиля</h3>
                                <div className="profile__settings settings">
                                    <div className="settings__left">
                                        <div className="settings__img">
                                            <a href="/" target="_self">
                                                <img src="#" alt=""/>
                                            </a>
                        
                                        </div>
                                        <a className="settings__change-photo" href="/" target="_self">
                                            Заменить
                                        </a>
                                    </div>
                                    <div className="settings__right">
                                        <form className="settings__form" action="#">
                                            <div className="settings__div">
                                                <label for="fname">Имя</label>
                                                <input className="settings__f-name" id="settings-fname" name="name" type="text" defaultValue={`${userName}`} placeholder="" onChange={handleInputChange}></input>
                                            </div>
                        
                                            <div className="settings__div">
                                                <label for="lname">Фамилия</label>
                                                <input className="settings__l-name" id="settings-lname" name=" surname" type="text" defaultValue={`${userSurname}`} placeholder="" onChange={handleInputChange}></input>
                                            </div>
                        
                                            <div className="settings__div">
                                                <label for="city">Город</label>
                                                <input className="settings__city" id="settings-city" name="city" type="text" defaultValue={`${userCity}`} placeholder=""/>
                                            </div>
                        
                                            <div className="settings__div">
                                                <label for="phone">Телефон</label>
                                                <input className="settings__phone" id="settings-phone" name="phone" type="tel" defaultValue={`${userPhone}`} placeholder="+79161234567"/>
                                            </div>
                                            {userData.isChange ? (<button className="settings__btn btn-hov02" id="settings-btn">Сохранить</button>):(<button className="settings__btn_notActive" disabled="true"  id="settings-btn">Сохранить</button>) }
                                            
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <h3 className="main__title title">
                            Мои товары
                        </h3>
                    </div>
                    <div className="main__content">
                        
                        <div className="content__cards cards">                            

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="#" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="#" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="#" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="#" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>

                            <div className="cards__item">
                                <div className="cards__card card">
                                    <div className="card__image">
                                        <a href="/" target="_blank">
                                            {/* <img src="#" alt="picture"/> */}
                                        </a>
                                    </div>
                                    <div className="card__content">
                                        <a href="/" target="_blank">
                                            <h3 className="card__title">Ракетка для большого тенниса Triumph Pro ST</h3>
                                        </a>
                                        <p className="card__price">2&nbsp;200&nbsp;₽</p>
                                        <p className="card__place">Санкт Петербург</p>
                                        <p className="card__date">Сегодня в&nbsp;10:45</p>
                                    </div>
                                </div>
                            </div>                 


                        </div>                        
                    </div>
                    
                </div>
                
            </main>
            
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__img">
                        <a href="/" target="_self">
                            <img src="img/icon_01.png" alt="home"/>
                        </a>                        
                    </div>
                    <div className="footer__img">
                        <a href="/" target="_self">
                            <img src="img/icon_02.png" alt="home"/>
                        </a>
                    </div>
                    <div className="footer__img">
                        <a href="/" target="_self">
                            <img src="img/icon_03.png" alt="home"/>
                        </a>
                    </div>
                </div>
                
            </footer>
        </div>
    </div>

)
}