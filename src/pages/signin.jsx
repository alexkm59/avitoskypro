import {React, useEffect, useState} from 'react';
import '../css/signin.css';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector } from "react-redux";
import { fetchUserLogin } from '../store/thunks/thunk';
import { userLoginFailure } from '../store/slices/user';
export const LoginPage = ()  => {
const activeUserId = useSelector((state) => state.user.userId);

const dispatch = useDispatch();
const navigate = useNavigate();

const userAccessToken = useSelector((state)=> state.user.accessToken);
const isLoading = useSelector((state)=> state.user.loading);
const loginErrorApi = useSelector((state)=> state.user.error);
const [loginError, setLoginError] = useState(null);
  
const [userLoginForm, setUserLoginForm] = useState({
    login: "",
    password: "",
});

console.log(loginError);
console.log(loginErrorApi);

// Проверка на ошибку регистрации
useEffect(() => {
    setLoginError(loginErrorApi);
  
  }, [loginErrorApi]);

const startLogin = ({loginError, loginErrorApi}) => {
    console.log(loginError);
    console.log(loginErrorApi);
    
        if(!loginError && !loginErrorApi){
    // после проверки вызвать диспатч регистрации пользователя
    console.log(`зашли в диспатч`);
    dispatch(fetchUserLogin({login: userLoginForm.login, password: userLoginForm.password}))
    .then(()=>{
        
           
                // navigate("/profile");
        });
    
        }else{
            setLoginError(loginErrorApi);
        }


}



// Установка стейтов регистрации и валидация формы регистрации
const userLogin = ({loginError, loginErrorApi})=>{
   
    if(userLoginForm.login !== ""){
        console.log(userLoginForm.login);
    }
    else{
        setLoginError("Заполните логин!");
        return
    }
    if(userLoginForm.password !== ""){
        console.log(userLoginForm.password);
    }
    else{
        setLoginError("Укажите пароль!");
        return
    }

    startLogin({loginError, loginErrorApi});

}


// функция обновления состояния данных пользователя
const handleInputChange = (e) =>{
    const {name, value} = e.target; // Извлекаем имя поля и его значение
    setUserLoginForm({
        ...userLoginForm, // Копируем текущие данные из состояния
        [name]: value, // Обновляем нужное поле
      });
}

// Сбрасываем ошибку если пользователь меняет данные на форме или меняется режим формы
useEffect(() => {
    setLoginError(null);
    dispatch(userLoginFailure(""));
  }, [userLoginForm]);

return(
<div className="wrapper">
        <div className="container-enter"> 
            <div className="modal__block-signin">
                <form className="modal__form-login_signin" id="formLogIn" action="#">
                    <div className="modal__logo">
                        <img src="../img/logo_modal.png" alt="logo"/>
                    </div>
                    <input className="modal__input login" type="text" name="login"  placeholder="email" onChange={handleInputChange}/>
                    <input className="modal__input password" type="password" name="password"  placeholder="Пароль" onChange={handleInputChange}/>
                   
                    <div className="modal__error">{loginError ? loginError : null}</div>
                    <div className="modal__btn-enter" id="btnEnter">
                    {isLoading ?(<a>Вход...</a> ):(<a onClick={()=> userLogin({loginError, loginErrorApi})}>Войти</a>)} 
                        
                        </div>
                  
                    <Link to="/signup">
                    <button className="modal__btn-signup" id="btnSignUp">Зарегистрироваться</button>
                     </Link> 
                     {activeUserId ? (<div>Поздравляем! Регистрация прошла успешно. Выполните вход.</div>):(null) }  
                </form>
            </div>
        </div>
    </div>


)
    
}