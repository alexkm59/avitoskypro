import { React, useEffect, useRef, useState } from "react";
import "../css/reviews.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllCommentsApi, postCommentApi } from "../api";
import { UsersComments } from "../components/coments";

export const ReviewsPage = () => {
  const activeAdsId = useSelector((state) => state.ads.activeAdsId);
  const token = useSelector((state) => state.user.accessToken);
  const [formInputError, setFormInputError] = useState(null);
  const userInputRef = useRef();
  const [comments, setComments] = useState([
    {
      id: "",
      text: "",
      createdOn: "",
      authorName: "",
    },
  ]);

  const [addAdvForm, setAddAdvForm] = useState({
    text: "",
  });

// функция сортировки по дате объявления

const sortArr =(newArr)=>{
  
  newArr.sort(function(a, b) {
    return a.id - b.id;
  });

  return newArr;
}



  // получаем все комментарии к объявлению
  useEffect(() => {
    getAllCommentsApi({ id: activeAdsId }).then((res) => {
      console.log(res);
      let newArr = [];
      let newArrSort = [];
      for (let i = 0; i < res.length; i++) {
        newArr.push({
          id: res[i].id,
          text: res[i].text,
          createdOn: res[i].created_on,
          authorName: res[i].author.name,
        });
          newArrSort = sortArr(newArr);
          console.log(newArrSort);
          setComments(newArrSort);
      }
      
      console.log(newArrSort);
    });
  }, [comments.length]);

  // функция обновления состояния данных пользователя
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Извлекаем имя поля и его значение
    
    setAddAdvForm({
      ...addAdvForm, // Копируем текущие данные из состояния
      [name]: value, // Обновляем нужное поле
    });
    
  
  };

  // создаем комментарий
  const sendComment = () => {
    if (addAdvForm.text.length < 4){
      setFormInputError("Кратко, но не достаточно для комменатрия...");
    return;
    }else{
      postCommentApi({ token, id: activeAdsId, text: addAdvForm.text })
      .then(getAllCommentsApi({ id: activeAdsId }))
      .then((res) => {
        console.log(res);
        let newArr2 = [];
        let newArrSort2 = [];
        for (let i = 0; i < res.length; i++) {
            newArr2.push({
              id: res[i].id,
              text: res[i].text,
              createdOn: res[i].created_on,
              authorName: res[i].author.name,
            });
            
        }
        newArrSort2 = sortArr(newArr2);
        console.log(newArrSort2);
        setComments(newArrSort2);
        userInputRef.current.value = '';
      });

      
      
    }
    
    
  };

  console.log(comments);

// Сбрасываем ошибку если пользователь меняет ввод текста
useEffect(() => {
  setFormInputError(null);
  
}, [addAdvForm]);



  return (
    <div className="wrapper">
      <div className="container-bg">
        <div className="modal__block">
          <div className="modal__content">
            <h3 className="modal__title">Отзывы о товаре</h3>
            <div className="modal__btn-close">
              <div className="modal__btn-close-line"></div>
            </div>
            <div className="modal__scroll">
              <form
                className="modal__form-newArt form-newArt"
                id="formNewArt"
                action="#"
              >
                <div className="form-newArt__block">
                  <label for="text">Добавить отзыв</label>
                  <textarea
                    className="form-newArt__area"
                    name="text"
                    id="formArea"
                    cols="auto"
                    rows="5"
                    placeholder="Введите описание"
                    ref={userInputRef}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
               {(token && (formInputError == null)) ? ( <div className="settings__btn btn-hov02" id="btnPublish" onClick={() => sendComment()}>
               <div className="text__center">
                  Опубликовать
                  </div>
                </div>
                
                
                ):( <><button className="settings__btn_notActive" disabled>
                  
                    Опубликовать
                 
                  </button>
                {!token ? (<span>Публикация возможна только для авторизованных пользователей!</span>):(<span>{formInputError}</span>)}
                </>
                )}
               
                {/* form-newArt__btn-pub */}
              </form>

              {comments.map((comment) => {
                
                return (
                  <UsersComments
                    id={comment.id}
                    authorName={comment.authorName}
                    createdOn={comment.createdOn}
                    text={comment.text}
                  ></UsersComments>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
