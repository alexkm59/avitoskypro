import {React, useEffect, useState} from 'react';
import '../css/signup.css';
import {useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { fetchUserRegistration } from '../store/thunks/thunk';

export const SignUpPage = ()  => {

const [userEmail, setUserEmail] = useState("");
const [userPassword, setUserPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [userName, setUserName] = useState("");
const [userSurname, setUserSurname] = useState("");
const [userSity, setUserSity] = useState("");
const [registrationError, setRegistrationError] = useState(null);
const [registrationLoading, setRegistrationLoading] = useState(false);
const activeUserName = useSelector((state) => state.user.userName);
const dispatch = useDispatch();
// const navigate = useNavigate();

// Установка стейтов регистрации и валидация формы регистрации
const userRegistration = ()=>{
    // Выключаем кнопку регистрации на время загрузки 
        setRegistrationLoading(true);
    
        if(userEmail !== ""){
            console.log({userEmail});
        }
        else{
            setRegistrationError("Заполните почту!");
            return
        }
        if(userPassword !== ""){
            console.log({userPassword});
        }
        else{
            setRegistrationError("Укажите пароль!");
            return
        }
        if(userPassword === confirmPassword){
            console.log({userPassword});
        }
        else{
            setRegistrationError("Укажите идентичные пароли!");
        return
        }
    
// после проверки вызвать диспатч регистрации пользователя
    dispatch(fetchUserRegistration());



    }

// Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
    useEffect(() => {
    setRegistrationError(null);
  }, [userEmail, userPassword, confirmPassword]);


console.log(activeUserName);

    return(


    <div className="wrapper">
        <div className="container-signup">
            <div className="modal__block">
                <form className="modal__form-login" >
                    <div className="modal__logo">
                        <img src="../img/logo_modal.png" alt="logo"/>
                    </div>
                    <input className="modal__input login" type="text" placeholder="email" value={userEmail} onChange={(event)=>{setUserEmail(event.target.value)}}/>
                    <input className="modal__input password-first" type="password"  placeholder="Пароль" value={userPassword} onChange={(event)=>{setUserPassword(event.target.value)}}/>
                    <input className="modal__input password-double" type="password"  placeholder="Повторите пароль" value={confirmPassword} onChange={(event)=>{setConfirmPassword(event.target.value)}}/>
                    <input className="modal__input first-name" type="text" placeholder="Имя (необязательно)" value={userName} onChange={(event)=>{setUserName(event.target.value)}}/>
                    <input className="modal__input first-last" type="text" placeholder="Фамилия (необязательно)" value={userSurname} onChange={(event)=>{setUserSurname(event.target.value)}}/>
                    <input className="modal__input city" type="text" placeholder="Город (необязательно)" value={userSity} onChange={(event)=>{setUserSity(event.target.value)}}/>
                    
                    <div className="modal__error">{registrationError ? registrationError : null}</div>
                    
                    <div className="modal__btn-signup-ent" >
                        <a onClick={()=> userRegistration()}>Зарегистрироваться</a> 
                        
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
  }