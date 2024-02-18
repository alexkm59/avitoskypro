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