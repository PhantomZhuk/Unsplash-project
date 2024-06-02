let timerThemeId;
let timerId;
let timeActive;
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
    $(`#textRewindSpeed`).text($('#rewindSpeed').val().slice(0, -3) + ' секунди')
}

updateInterval();

$('#rewindSpeed').on('input', updateInterval);

$('#themeInput').click(() => {
    clearInterval(timerId);
    clearInterval(timerThemeId);
    clearInterval(timeActive);
});

$('#search').click(() => {
    getPhoto($('#themeInput').val());
    clearInterval(timerThemeId);
    timerThemeId = setInterval(() => {
        getPhoto($('#themeInput').val());
    }, $('#rewindSpeed').val());

    timeActive = setInterval(() => {
        activeTime++
        if (activeTime > 5) {
            $(`.inputContainer`).hide();
        } else {
            $(`.inputContainer`).show();
        }
    }, 1000);
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

let numberPhoto = 0;
let db = JSON.parse(localStorage.getItem('db')) || [];
$('.heartContainer').click(function () {
    let fullLink = $('.wrap').css('background-image').substring(5);
    let normalizeLink = fullLink.substring(0, (fullLink.length - 2));
    db.push(
        {
            url: normalizeLink,
            number: numberPhoto++
        }
    );
    localStorage.setItem('db', JSON.stringify(db));
    $(`.pictureWindow`).empty();
    showSavedPicture();
    $('.photoPopup').hide();
});

function showSavedPicture() {
    let db = JSON.parse(localStorage.getItem('db'));
    for (let el of db) {
        $('.pictureWindow').append(`
            <div 
            id="photo${el.numberl}" 
            class="pictureItem" 
            style="background-image: url(${el.url});">
                <div id="popup${el.number}" 
                class="photoPopup">
                    <a class="downloadPhoto"
                    id="downloadPhoto${el.number}"
                    href="${el.url}"
                    download="Photo${el.number}.jpg"
                    >
                        <i class="fa-solid fa-file-arrow-down"></i>
                    </a>
                    <div class="deletePhoto"
                    id="deletePhoto${el.number}">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                </div>
            </div>
        `);
    };
};

showSavedPicture();

let activeTime = 0;

timeActive = setInterval(() => {
    activeTime++
    if (activeTime > 5) {
        $(`.inputContainer`).hide();
    } else {
        $(`.inputContainer`).show();
    }
}, 1000);

$(`.wrap`).mousemove(function () {
    activeTime = 0;
});


$(`#clearLikedPhoto`).click(() => {
    db = [];
    localStorage.setItem('db', JSON.stringify(db));
    $('.pictureWindow').empty();
    showSavedPicture();
    $('.photoPopup').hide();
});

$('.pictureWindow').on('click', '.deletePhoto', function(e) {
    let index = $(this).closest('.pictureItem').index();
    db.splice(index, 1);
    localStorage.setItem('db', JSON.stringify(db));
    $(this).closest('.pictureItem').remove();
    $('.photoPopup').hide();
});

$('.pictureWindow').on('mouseenter', '.pictureItem', function() {
    $(this).find('.photoPopup').show();
});

$('.pictureWindow').on('mouseleave', '.pictureItem', function() {
    $(this).find('.photoPopup').hide();
});
