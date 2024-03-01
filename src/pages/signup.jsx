import {React, useEffect, useState} from 'react';
import '../css/signup.css';
import {useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { fetchUserRegistration } from '../store/thunks/thunk';

export const SignUpPage = ()  => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        userEmail: "",
        userPassword: "",
        confirmPassword:"",
        userName: "",
        userSurname: "",
        userCity:"",
    });


const [registrationError, setRegistrationError] = useState(null);
const [registrationLoading, setRegistrationLoading] = useState(false);
const activeUserId = useSelector((state) => state.user.id);
const isLoading = useSelector((state)=> state.user.loading);
const registrationAPIError = useSelector((state)=> state.user.error);
const dispatch = useDispatch();


// Установка стейтов регистрации и валидация формы регистрации
const userRegistration = ()=>{
    
        if(userData.userEmail !== ""){
            console.log(userData.userEmail);
        }
        else{
            setRegistrationError("Заполните почту!");
            return
        }
        if(userData.userPassword !== ""){
            console.log(userData.userPassword);
        }
        else{
            setRegistrationError("Укажите пароль!");
            return
        }
        if(userData.userPassword === userData.confirmPassword){
            console.log(userData.userPassword);
        }
        else{
            setRegistrationError("Укажите идентичные пароли!");
        return
        }
    
// после проверки вызвать диспатч регистрации пользователя
  
dispatch(fetchUserRegistration({email: userData.userEmail, password: userData.userPassword, name: userData.userName, surname: userData.userSurname, city: userData.userCity}))
.then(()=>{if(!registrationAPIError){
    console.log(registrationAPIError);
    navigate("/login");
} });


    }
// функция обновления состояния данных пользователя
    const handleInputChange = (e) =>{
        const {name, value} = e.target; // Извлекаем имя поля и его значение
        setUserData({
            ...userData, // Копируем текущие данные из состояния
            [name]: value, // Обновляем нужное поле
          });

    }

// Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
    useEffect(() => {
    setRegistrationError(null);
  }, [userData]);




    return(


    <div className="wrapper">
        <div className="container-signup">
            <div className="modal__block">
                <form className="modal__form-login" >
                    <div className="modal__logo">
                        <img src="../img/logo_modal.png" alt="logo"/>
                    </div>
                    <input className="modal__input login" type="text" placeholder="email" name="userEmail" onChange={handleInputChange}/>
                    <input className="modal__input password-first" type="password"  placeholder="Пароль" name="userPassword" onChange={handleInputChange}/>
                    <input className="modal__input password-double" type="password"  placeholder="Повторите пароль" name="confirmPassword" onChange={handleInputChange}/>
                    <input className="modal__input first-name" type="text" placeholder="Имя (необязательно)" name="userName" onChange={handleInputChange}/>
                    <input className="modal__input first-last" type="text" placeholder="Фамилия (необязательно)" name="userSurname" onChange={handleInputChange}/>
                    <input className="modal__input city" type="text" placeholder="Город (необязательно)" name="userSity" onChange={handleInputChange}/>
                    
                    <div className="modal__error">{registrationError ? registrationError : null}</div>
                    
                    <div className="modal__btn-signup-ent" >
                    {isLoading ?(<a> Регистрация...</a> ):(<a onClick={()=> userRegistration()}>Зарегистрироваться</a>)}  
                        

                    </div>
                </form>
            </div>
        </div>
    </div>
  )
  }