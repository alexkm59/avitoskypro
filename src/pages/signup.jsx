import {React} from 'react';
import '../css/signup.css';
import {Link, useNavigate} from 'react-router-dom';

export const SignUpPage = ()  => {
return(


    <div class="wrapper">
        <div class="container-signup">
            <div class="modal__block">
                <form class="modal__form-login" id="formLogUp" action="#">
                    <div class="modal__logo">
                        <img src="../img/logo_modal.png" alt="logo"/>
                    </div>
                    <input class="modal__input login" type="text" name="login" id="loginReg" placeholder="email"/>
                    <input class="modal__input password-first" type="password" name="password" id="passwordFirst" placeholder="Пароль"/>
                    <input class="modal__input password-double" type="password" name="password" id="passwordSecond" placeholder="Повторите пароль"/>
                    <input class="modal__input first-name" type="text" name="first-name" id="first-name" placeholder="Имя (необязательно)"/>
                    <input class="modal__input first-last" type="text" name="first-last" id="first-last" placeholder="Фамилия (необязательно)"/>
                    <input class="modal__input city" type="text" name="city" id="city" placeholder="Город (необязательно)"/>
                    <button class="modal__btn-signup-ent" id="SignUpEnter">
                        <a href="../index.html">Зарегистрироваться</a> 
                        </button>
                </form>
            </div>
        </div>
    </div>
  )
  }