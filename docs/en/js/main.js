(async() => {
    let apiUrl = await GetServerDomain();
    let language = window.localStorage.getItem("language")
    if (language == null) {
        language = "en";
    }

    $(".w-50-mob").click(function() {
        $(this).toggleClass("animate__animated animate__flash")
    })

    let navbarc = document.querySelector(".navbar");
    $(document).scroll(function() {
        if (navbarc.offsetTop > 0) {
            navbarc.style.backgroundColor = "#CBE4DE";
            navbarc.style.opacity = ".5";
        } else {
            navbarc.style.backgroundColor = "#CBE4DE";
            navbarc.style.opacity = "1";
        }
    })


    //##########     ON LOAD         #####################
    let pageIndex = 1;
    // $.ajax({
    //         "method": "GET",
    //         "url": apiUrl + "/api/Landing/GetReviews?page=" + pageIndex,
    //         "xhrFields": {
    //             "withCredentials": true
    //         },
    //         "headers": {
    //             "Content-Type": "application/json",
    //             "ngrok-skip-browser-warning": "69420",
    //             "Accept-Language": language
    //         },
    //         "data": "{}",
    //         success: function(data, st, xhr) {
    //             let reviewerNames = document.querySelectorAll(".reviewer");
    //             let reviewText = document.querySelectorAll(".review-text");
    //             let rateStar = document.querySelectorAll(".review-content .averge-rate");
    //             let stars = "";

    //             for (let i = 0; i < data.length; i++) {
    //                 let numStar = data[i].rating;
    //                 for (let j = 0; j < 5; j++) {
    //                     if (j <= numStar) {
    //                         stars += "<i class='fa-solid fa-star' style='color: #0E8388;'></i>"
    //                     } else {
    //                         stars += '<i class="fa-regular fa-star"></i>'
    //                     }
    //                 }
    //                 reviewerNames[i].innerHTML = data[i].reviewer;
    //                 reviewText[i].innerHTML = data[i].opinion;
    //                 rateStar[i].innerHTML = stars;
    //                 stars = "";
    //             }
    //             console.log(data)
    //         },
    //         error: function(xhr, status, err) {

    //         }
    //     })

    $.ajax({
            "method": "GET",
            "url": apiUrl + "/api/Landing/GetReviews?page=" + pageIndex,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            "data": "{}",
            success: function(data, st, xhr) {
                let content = "";
                let stars = "";
                for (let i = 0; i < data.length; i++) {
                    let numStar = data[i].rating;
                    for (let j = 0; j < 5; j++) {
                        if (j <= numStar) {
                            stars += "<i class='fa-solid fa-star' style='color: #0E8388;'></i>";
                        } else {
                            stars += '<i class="fa-regular fa-star"></i>';
                        }
                    }
                    content += `<div class="reviews-info d-flex flex-column mb-30">
                    <p class="fw-bold fs-25 mb-15 reviewer">${ data[i].reviewer} </p>
                    <div class="averge-rate fs-25 d-block mb-40">${stars}
                    </div>
                    <p class="fs-15 mb-40 review-text">${data[i].opinion}</p>
                    <hr class="breaker">
                </div>`;
                    stars = "";
                }
                $(".review-content").html(content)
                console.log(data)
            },
            error: function(xhr, status, err) {}
        })
        //##########     Over ALL       #####################
    $.ajax({
        "method": "GET",
        "url": apiUrl + "/api/Landing/GetStats",
        "xhrFields": {
            "withCredentials": true
        },
        "headers": {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Accept-Language": language
        },
        "data": "{}",
        success: function(data, st, xhr) {
            $(".numOfPosts").text(data.numberOfPosts);
            $(".numOfDentist").text(data.numberOfDentists);
            $(".numOfPatient").text(data.numberOfPatients);
        },
        error: function(xhr, status, err) {
            $(".numOfPosts").text("0");
            $(".numOfDentist").text("0");
            $(".numOfPatient").text("0");
        }
    })

    $.ajax({
        "method": "GET",
        "url": apiUrl + "/api/Landing/GetReviewsOverview",
        "xhrFields": {
            "withCredentials": true
        },
        "headers": {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Accept-Language": language
        },
        "data": "{}",
        // Math.ceil(data.averageRating)
        success: function(data, st, xhr) {
            let stars = "";
            for (let i = 0; i < 5; i++) {
                if (i <= Math.ceil(data.averageRating)) {
                    if (i == Math.ceil(data.averageRating) - 1) {
                        stars += "<i class='fa-solid fa-star-half-stroke' style='color: #0E8388;'></i>"
                        continue;
                    }
                    stars += "<i class='fa-solid fa-star' style='color: #0E8388;'></i>"
                } else {
                    stars += "<i class='fa-regular fa-star'></i>"
                }
            }
            $(".stats-review").html(stars);
            $(".stats-review").attr("title", data.averageRating.toFixed(2))
            $(".reviewNumber").text(data.reviewsCount)
            console.log(data);
        },
        error: function(xhr, status, err) {
            console.log(xhr)
        }
    })

    //##########     pervious BUTTON        #####################

    $(".pervious-review").click(function() {
            if (pageIndex == 1) {
                $(".pervious-review").css("cursor", "context-menu");
                $(".pervious-review").css("color", "grey")
            } else {
                $(".pervious-review").css("cursor", "pointer");
                $(".pervious-review").css("color", "#012f63")
                    --pageIndex
                $.ajax({
                    "method": "GET",
                    "url": apiUrl + "/api/Landing/GetReviews?page=" + pageIndex,
                    "xhrFields": {
                        "withCredentials": true
                    },
                    "headers": {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                        "Accept-Language": language
                    },
                    "data": "{}",
                    success: function(data, st, xhr) {
                        let content = "";
                        let stars = "";
                        for (let i = 0; i < data.length; i++) {
                            let numStar = data[i].rating;
                            for (let j = 0; j < 5; j++) {
                                if (j <= numStar) {
                                    stars += "<i class='fa-solid fa-star' style='color: #0E8388;'></i>";
                                } else {
                                    stars += '<i class="fa-regular fa-star"></i>';
                                }
                            }
                            content += `<div class="reviews-info d-flex flex-column mb-30">
                    <p class="fw-bold fs-25 mb-15 reviewer">${ data[i].reviewer} </p>
                    <div class="averge-rate fs-25 d-block mb-40">${stars}
                    </div>
                    <p class="fs-15 mb-40 review-text">${data[i].opinion}</p>
                    <hr class="breaker">
                </div>`;
                            stars = "";
                        }
                        $(".review-content").html(content)
                        console.log(data)
                    },
                    error: function(xhr, status, err) {}
                })
            }
        })
        //##########     NEXT BUTTON        #####################
    $(".next-review").click(function() {
        if (pageIndex >= 1) {
            $(".pervious-review").css("cursor", "pointer");
            $(".pervious-review").css("color", "#012f63")
                ++pageIndex;
            $.ajax({
                "method": "GET",
                "url": apiUrl + "/api/Landing/GetReviews?page=" + pageIndex,
                "xhrFields": {
                    "withCredentials": true
                },
                "headers": {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                    "Accept-Language": language
                },
                "data": "{}",
                success: function(data, st, xhr) {
                    let content = "";
                    let stars = "";
                    for (let i = 0; i < data.length; i++) {
                        let numStar = data[i].rating;
                        for (let j = 0; j < 5; j++) {
                            if (j <= numStar) {
                                stars += "<i class='fa-solid fa-star' style='color: #0E8388;'></i>";
                            } else {
                                stars += '<i class="fa-regular fa-star"></i>';
                            }
                        }
                        content += `<div class="reviews-info d-flex flex-column mb-30">
                    <p class="fw-bold fs-25 mb-15 reviewer">${ data[i].reviewer} </p>
                    <div class="averge-rate fs-25 d-block mb-40">${stars}
                    </div>
                    <p class="fs-15 mb-40 review-text">${data[i].opinion}</p>
                    <hr class="breaker">
                </div>`;
                        stars = "";
                    }
                    $(".review-content").html(content)
                    console.log(data)
                },
                error: function(xhr, status, err) {}
            })
        }
    })







})();