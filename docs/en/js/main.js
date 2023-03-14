// $(document).scroll(function() {

//     let postionOfPage = $(this).scrollTop();
//     if (postionOfPage > 0) {
//         $(".navbar").css("background-color ", "#eee");
//         $(".navbar").css("opacity ", ".5 ");

//     } else {
//         $(".navbar").css("background-color ", "white ");
//         $(".navbar").css("opacity ", "1 ");
//     }


// })

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