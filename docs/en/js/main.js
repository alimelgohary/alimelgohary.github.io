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