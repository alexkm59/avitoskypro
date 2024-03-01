const URL = "http://localhost:8090/";
// Получение всех объявлений
export async function getAlladvertis() {
  const Response = await fetch(URL + "ads");

  if (!Response.ok) {
    if (Response.status === 500) {
      throw new Error("Ошибка сервера");
    }
  }
  const data = await Response.json();
  return data;
}

// Получение всех изображение 
export async function getImages() {
    const Response = await fetch(URL + "images");
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
    const data = await Response.json();
    console.log(data);
    return data;
  }

// Получение объявления по ID
export async function getAdvertisById(id) {
  const Response = await fetch(URL + "ads" + "/" + `${id}`);

  if (!Response.ok) {
    if (Response.status === 500) {
      throw new Error("Ошибка сервера");
    }
  }
  const data = await Response.json();
  return data;
}



// Получение изображение по ID
export async function getImagesById(id) {
    const Response = await fetch(URL + `images/${id}`);
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
  
    console.log(Response);
    return Response;
  }

  // Регистрация пользователя
export async function userRegistration({email, password, name, surname, city}) {
  const Response = await fetch(`${URL}auth/register`, {
  method: "POST",
  body: JSON.stringify({
    password: password,
    email: email,
    name: name,
    surname: surname,
    city: city

  }),
  headers: {
    // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
    "content-type": "application/json",
  },
})

  if (!Response.ok) {
    if (Response.status === 500) {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await Response.json();
  console.log(data);
  return data;
}


  // Логирование пользователя, получение токена
  export async function userLoginApi({login, password}) {
    const Response = await fetch(`${URL}auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: login,
      password: password,
      
    }),
    headers: {
      // API требует обязательного указания заголовка content-type, так апи понимает что мы посылаем ему json строчку в теле запроса
      "content-type": "application/json",
    },
  })
  
  return Response;

  }

  // Логирование пользователя, получение данных пользователя

  export async function userInputApi ({token}){
    console.log(token);
    const Response = await fetch(`${URL}user`, {
     
      method: "GET",
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    
      if (!Response.ok) {
        if (Response.status === 500) {
          throw new Error("Ошибка сервера");
        }
      }
    
      return Response;


  }

 //  смена данных пользователя
 export async function userDataChangeApi({token, email, name, surname, city}) {
  
console.log(email);
console.log(name);
console.log(surname);
console.log(city);
  const Response = await fetch(`${URL}user`, {
  method: "PATCH",

  body: JSON.stringify({
    email: email,
    name: name,
    surname: surname,
    city: city,
  }),
  headers: {
    Authorization: `Bearer ${token}`,
    "content-type": "application/json",
  },

})

  if (!Response.ok) {
    if (Response.status === 500) {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await Response.json();
  console.log(data);
  return data;
}

// загрузка аватарки пользователя
export async function  postUserAvatarApi({token, file}) {
  console.log(file);
  const formData = new FormData();
  formData.append("file", file);
  console.log(formData);
  const Response = await fetch(`${URL}user/avatar`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${token}`,
  },

  body: formData,
  
})

  if (!Response.ok) {
    if (Response.status === 500) {
      throw new Error("Ошибка сервера");
    }
  }

  const data = await Response.json();
  console.log(data);
  return data;
}

// создание сообщения без фотографий

export async function postNewAdsTextOnly({token, title, description, price}){
  const Response = await fetch(`${URL}adstext`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      
    }),
    
  })
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
  
    const data = await Response.json();
    console.log(data);
    return data;

}

// создание сообщения c фотографиями

export async function postNewAds({token, title, files, description, price}){
  const Response = await fetch(`${URL}ads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
    }),
   
    
  })
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
  
    const data = await Response.json();
    console.log(data);
    return data;

}

// Получение всех объявлений пользователя

export async function getUserAds({token}){
  const Response = await fetch(`${URL}ads/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  
       
  })
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
  
    const data = await Response.json();
    console.log(data);
    return data;

}

// Добавление комментария

export async function postCommentApi({token, id, text}){
  console.log(token);
  console.log(id);
  const Response = await fetch(`${URL}ads/${id}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      text: text,
      
    }),
       
  })
  
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
  
    const data = await Response.json();
    console.log(data);
    return data;

}

// Получение всех комментариев по id объявления
export async function getAllCommentsApi({id}){
  const Response = await fetch(`${URL}ads/${id}/comments`, {
    method: "GET",   
  })
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
    const data = await Response.json();
    console.log(data);
    return data;
}

// Загрузка картинки в объявление
export async function postImageToAdsApi({token, id, file}){
  console.log(token);
  console.log(id);
  console.log(file);
  
  const formData = new FormData();
  formData.append("file", file);
  
  console.log(formData);
  const Response = await fetch(`${URL}ads/${id}/image`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
      
    
  })
    if (!Response.ok) {
      if (Response.status === 500) {
        throw new Error("Ошибка сервера");
      }
    }
    const data = await Response.json();
    console.log(data);
    return data;
}