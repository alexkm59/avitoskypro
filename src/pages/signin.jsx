import {React} from 'react';
import '../css/signin.css';
import {Link, useNavigate} from 'react-router-dom';
export const LoginPage = ()  => {
return(
<div className="wrapper">
        <div className="container-enter"> 
            <div className="modal__block-signin">
                <form className="modal__form-login_signin" id="formLogIn" action="#">
                    <div className="modal__logo">
                        <img src="../img/logo_modal.png" alt="logo"/>
                    </div>
                    <input className="modal__input login" type="text" name="login" id="formlogin" placeholder="email"/>
                    <input className="modal__input password" type="password" name="password" id="formpassword" placeholder="Пароль"/>
                    <Link to="/profile">
                    <button className="modal__btn-enter" id="btnEnter"><a>Войти</a></button>
                    </Link>
                    <Link to="/signup">
                    <button className="modal__btn-signup" id="btnSignUp">Зарегистрироваться</button>
                     </Link>   
                </form>
            </div>
        </div>
    </div>


)
    
}