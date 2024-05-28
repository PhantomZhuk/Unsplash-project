let timerThemeId;
let timerId;
function getPhoto(theme = `random`) {
    fetch(`https://source.unsplash.com/1920x1080/?` + theme)
        .then(res => {
            $(`#wrap`).css(`background-image`, `url(${res.url})`);
        });
}

getPhoto();

function updateInterval() {
    clearInterval(timerId);
    timerId = setInterval(() => {
        getPhoto();
    }, $('#rewindSpeed').val());
    $(`#textRewindSpeed`).text($('#rewindSpeed').val().slice(0,-3)+' секунди')
}

updateInterval();

$('#rewindSpeed').on('input', updateInterval);

$('#themeInput').click(() => {
    clearInterval(timerId);
    clearInterval(timerThemeId);
});

$('#search').click(() => {
    getPhoto($('#themeInput').val());
    clearInterval(timerThemeId);
    timerThemeId = setInterval(() => {
        getPhoto($('#themeInput').val());
    }, $('#rewindSpeed').val());
});

let menuOpen = false;
$(`.rewindSpeedContainer`).hide();
$(`#clearLikedPhoto`).hide();
$(`#closeBtn`).click(() => {
    if (menuOpen == false) {
        $(`.menuBtn`).css(`width`, `100%`)
        $(`.menuBtn`).css(`height`, `100%`)
        $(`.menuBtn`).css(`border-radius`, `0`)
        $(`.menuBtn`).css(`top`, `0`)
        $(`.menuBtn`).css(`right`, `0`)
        $(`#closeBtn`).css(`top`, `20px`)
        $(`#closeBtn`).css(`right`, `30px`)
        $(`.pictureWindow`).css(`display`, `flex`)
        $(`.rewindSpeedContainer`).show();
        $(`.heartContainer`).hide();
        $(`#clearLikedPhoto`).show()
        menuOpen = true
    } else if (menuOpen == true) {
        $(`.menuBtn`).css(`width`, `40px`)
        $(`.menuBtn`).css(`height`, `40px`)
        $(`.menuBtn`).css(`border-radius`, `50%`)
        $(`.menuBtn`).css(`top`, `20px`)
        $(`.menuBtn`).css(`right`, `30px`)
        $(`.pictureWindow`).css(`display`, `none`)
        $(`.rewindSpeedContainer`).hide()
        $(`.heartContainer`).show()
        $(`#clearLikedPhoto`).hide()
        menuOpen = false
    }
})


let db = JSON.parse(localStorage.getItem('db')) || [];
$('.heartContainer').click(function () {

    let fullLink = $('.wrap').css('background-image').substring(5);
    let normalizeLink = fullLink.substring(0, (fullLink.length - 2));
    db.push(normalizeLink);
    console.log(db);
    localStorage.setItem('db', JSON.stringify(db))
    $(`.pictureWindow`).empty();
    showSavedPicture();
});

function showSavedPicture() {
    let db = JSON.parse(localStorage.getItem(`db`));
    for (let el of db) {
        $(`.pictureWindow`).append(`
        <div class="pictureItem" style="background-image: url(${el});">

        </div>`
        )
    }
}

showSavedPicture();

let activeTime = 0;

setInterval(() => {
    activeTime++
    console.log(activeTime);
    if (activeTime > 5) {
        $(`.inputContainer`).hide();
    } else {
        $(`.inputContainer`).show();
    }
}, 1000);

$(`.wrap`).mousemove(function () {
    activeTime = 0;
});


$(`#clearLikedPhoto`).click(()=>{
    let db = JSON.parse(localStorage.getItem(`db`));
    db.length = 0;
    localStorage.setItem('db', JSON.stringify(db));
    $(`.pictureWindow`).empty();
    showSavedPicture();
});