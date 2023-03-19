$(".en").click(function() {
    window.localStorage.setItem("language", "ar");
})

var options = {
    strings: ['Welcome to our Site...  ', 'We Hope That We Will Help You...', ' A site For All Dentists...', 'A site For All patients...'],
    typeSpeed: 120,
    backspeed: 140,
    loop: true,
    smartBackspace: false
};
var typed = new Typed('.text-Landing', options);


$(".w-50-mob").click(function() {
    $(this).toggleClass("animate__animated animate__flash")
})


let navbarc = document.querySelector(".navbar");
$(document).scroll(function() {
    if (navbarc.offsetTop > 0) {
        navbarc.style.backgroundColor = "#eee";
        navbarc.style.opacity = ".5";
    } else {
        navbarc.style.backgroundColor = "white";
        navbarc.style.opacity = "1";
    }
})