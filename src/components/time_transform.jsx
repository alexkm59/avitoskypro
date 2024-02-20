import { React } from "react";

export const TimeTransform = (data)=> {
    let day = data?.slice(8,10);
    let month = data?.slice(5,7);
    let year = data?.slice(0,4);

    let dateInfo = day + '.'+ month + '.' + year;
    let myDate = new Date(data);
    // let dateInfo = (myDate.getDate() < 10 ? ('0'+ myDate.getDate()):(myDate.getDate())) + '.'+ myDate.getMonth() + '.' + myDate.getFullYear();
    let timeInfo = (myDate.getHours() < 10 ? ('0'+ myDate.getHours()):(myDate.getHours()))+ ':' + (myDate.getMinutes() === 0 ? ('0'+ myDate.getMinutes()):(myDate.getMinutes()));
    let dateTime = dateInfo + ' '+ timeInfo;

    return dateTime;
}


