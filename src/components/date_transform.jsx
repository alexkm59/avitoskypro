import { React } from "react";

export const monthTransform = ( date ) => {
let transformDate;
let month = date?.slice(5,7);
let monthText;
let day;


switch(month){
    case "01": monthText = "Января";
    break;
    case "02": monthText = "Февраля";
    break;
    case "03": monthText = "Марта";
    break;
    case "04": monthText = "Апреля";
    break;
    case "05": monthText = "Мая";
    break;
    case "06": monthText = "Июня";
    break;
    case "07": monthText = "Июля";
    break;
    case "08": monthText = "Августа";
    break;
    case "09": monthText = "Сентября";
    break;
    case "10": monthText = "Октября";
    break;
    case "11": monthText = "Ноября";
    break;
    case "12": monthText = "Декабря";
    break;
}


return monthText;


}