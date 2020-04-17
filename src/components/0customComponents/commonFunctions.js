import React from 'react';

// Get some text to make text in between %STRONG% => STRONG
export const ToStrong = (text) =>{
    return text.split('%STRONG%').map((el,i)=>{
        if(i % 2 !== 0){
            return <span style={{color:'white'}} key={`text_${i}`}>{el}</span >
        }else{ return <span key={`text_${i}`}>{el}</span>}
    });
}

// If if index does not exits jump to next element
export const IndexWrap = (arr, i) =>{
    if(i> arr.length-1){
        return 0;
    }else if(i < 0){
        return arr.length-1;
    }else {
        return i}
}

// Resize images to screen size 
// it could be optimized passing a variable
export const ResizeBackGroundImages = () =>{
    const headerHeight = document.getElementsByClassName('header')[0].clientHeight;
    const sliderHeight = document.getElementsByClassName('home')[0].clientHeight;
    const backImages = document.getElementsByClassName('background-images');
    for(let el of backImages){
        el.style.height = `${headerHeight+sliderHeight+50}px`;
    }
}


// Hit an endpoint and set the value if any 
export const ServerData=async (path)=>{
    try {
        let response = await fetch(`/api${path}`);
        if (response.status !== 200) {
            throw new Error('bad request');
        }
        response = await response.json();
        return response;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

// set how many slides can be display in the carousel based in screen size 
export const SlidesToShow = (numberofslides) =>{
    const width = document.body.clientWidth;
    const slides = numberofslides && numberofslides.length > 0 ? numberofslides.length : 1;
    if(width > 1800){
        if(slides >= 4){
            return 4;
        }else{
            return slides;
        }
    }else if(width> 1200 && width< 1800 ){
        if(slides >= 3){
            return 3;
        }else{
            return slides;
        }
    }
    else if(width> 800 && width< 1200 ){
        if(slides >= 2){
            return 2;
        }else{
            return slides;
        }
    }else{
        return 1;
    }
}
