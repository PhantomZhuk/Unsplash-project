let timerThemeId;
function getPhoto(theme = `random`) {
    fetch(`https://source.unsplash.com/1920x1080/?` + theme)
        .then(res => {
            $(`#wrap`).css(`background-image`, `url(${res.url})`)
        });
}

getPhoto();

let timerId = setInterval(() => {
    getPhoto();
}, 2000);

$(`#themeInput`).click(()=>{
    clearInterval(timerId);
    clearInterval(timerThemeId);
})

$(`#search`).click(()=>{
    getPhoto();
    timerThemeId = setInterval(() => {
        getPhoto($(`#themeInput`).val());
    }, 2000);
})

// let timerMove = setTimeout(() => {
//     $(`.inputContainer`).hide();
//     $(`.wrap`).mousemove(function(){
//         $(`.inputContainer`).show();
//     })
// }, 5000);

let db = JSON.parse(localStorage.getItem(`db`))||[];
$(`.heartContainer`).click(()=>{
    let fullLink = $(`.wrap`).css(`background-image`).substring(5);
    let normallizeLink = fullLink.substring(0, (fullLink.length - 2));
    db.push(normallizeLink);
    localStorage.setItem(`db`, JSON.stringify(db));
}); 

$(`.menuBtn`).click(()=>{
    $(`.menuBtn`).css(`width`, `100%`)
    $(`.menuBtn`).css(`height`, `100%`)
    $(`.menuBtn`).css(`border-radius`, `0`)
    $(`.menuBtn`).css(`top`, `0`)
    $(`.menuBtn`).css(`left`, `0`)
    $(`#closeBtn`).css(`top`, `35px`)
    $(`#closeBtn`).css(`right`, `50px`)
    $(`.pictureWindow`).css(`display`, `flex`)

})

function showSavedPicture (){
    let db = JSON.parse(localStorage.getItem(`db`));
    for(let el of db){
        $(`.pictureWindow`).append(`
        <div class="pictureItem" style="background-image: url(${el});"></div>`)
    }
}

showSavedPicture();

let activeTime = 0;

setInterval(() => {
    activeTime++
    console.log(activeTime);
    if (activeTime>5){
        $(`.inputContainer`).hide();
    }else {
        $(`.inputContainer`).show();
    }
}, 1000);

$(`.wrap`).mousemove(function(){
    activeTime = 0;
});