//  get variable server domain



async function GetServerDomain() {
    try {
        const response = await fetch('https://api.github.com/gists/458cc68066d2c1e0fa01ba1271e81699');
        const gist = await response.json();
        const content = gist.files['ngrok.txt'].content;
        return content;
    } catch (error) {
        console.error(error);
    }
}

function addanimations() {
    $(".watingtext").addClass("animate__tada");
    setTimeout(function() {
        $(".watingtext").removeClass("animate__tada")
    }, 1000)
}

// get server domain from json file 

function getServerDomainJson() {
    $.getJSON("../json/file.json", function(data) {

        return data['apiurl'];
    })
}


function logOut() {

    (async() => {
        let apiUrl = await GetServerDomain();
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }



        $.ajax({
            "method": "GET",
            "url": apiUrl + "/api/Users/Logout",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            success: function(data, st, xhr) {
                console.log(data);
                window.location.href = "../login.html"
            },
            error: function(xhr, status, err) {
                $(".logouterror").css("display", "block");
            }
        })



    })();



}


function getMarketPlacePostsOnChange() {


    (async() => {
        let pageIndex = 1;
        let apiUrl = await GetServerDomain();;
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }



        // request when university changes

        $(".home-posts").html(" ");
        idlist = [];
        governateValue = $(".getgevernate").val();
        cartegoryValue = $(".casetype").val();
        sortValue = $("#sorting").val();

        $.ajax({
            "method": "GET",
            "url": apiUrl + `/api/Dentists/GetListings?Size=2&GovernorateId=${governateValue}&ListingCategoryId=${cartegoryValue}&sortBy=${sortValue}`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            "data": {},
            beforeSend: function() {
                $(".skeleton-loading").removeClass("d-none")
            },
            success: function(data, st, xhr) {
                console.log(data);
                console.log(governateValue);

                if (data.length == 0) {

                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-grey">There is no posts with the condtions you chossed</h1>`);
                    $(".skeleton-loading").addClass("d-none")
                } else {

                    $(".home-posts").html(``);
                    for (var counter = 0; counter < data.length; counter++) {
                        idlist.push(data[counter].postId)

                        $(".home-posts").append(`<div class="home-post" id="${data[counter].postId}">
                        <div class="mb-30 post-body d-flex flex-column p-30 bg-white  rad-10">
                            <div class="post-head d-flex justify-content-between">
                                <div class="post-user-info d-flex flex-row">
                                    <div class="user-image rad-half mr-10">
                                        <img src="../imgs/profilepic.svg" class = "profile${data[counter].postId} rad-half" alt="" style="max-width: 100%;">
                                    </div>
                                    <div class="post-info d-flex flex-column">
                                        <div class="d-flex usernames align-center">
                                            <span class="fs-rem-14 fw-bold name">${data[counter].userInfo.fullName}</span><span class="username fs-rem-12 c-grey">@${data[counter].userInfo.username}</span></div>
                                       
                                        <span class="user-mohafza c-grey fs-rem-10">${data[counter].governorate}</span>
                                        <div>
                                            <span class="post-time c-grey fs-rem-10 mr-px-5">${data[counter].timeWritten}</span><span class="fs-rem-10 c-grey mr-px-5 edited">Edited at</span><span class="editedtime${data[counter].postId} edited fs-rem-10 c-grey">8</span></div>
                                        <div class="casetype-bg p-1 txt-c w-fit case-type-rad"><span class="case-type c-white casetype-bg fs-rem-11  overflow-hidden" title = "${data[counter].category}" >${data[counter].category}</span></div>
                                    </div>
                                </div>
                                <div class="more-about-post d-flex flex-column align-center align-items-end">
                                    <img src="../imgs/more.svg" class="moreimg cur-point" style="width: 30px; max-width: 35px;">
                                    <ul class="p-10 dropbutton-bg mt-px-5 d-none">
                                        <li class="p-10 share-links${data[counter].postId} share-links">Share via</li>
                                        <!-- share moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none sharemodal " data-bs-toggle="modal" data-bs-target="#exampleModal${data[counter].postId}">
                                                Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content sharemodal-bg">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title c-white" id="exampleModalLabel${data[counter].postId}">Share</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="social-media-icons row flex-row p-20">
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point share-icon post1" style="width: fit-content;">
                                                                <a class="whatsapp${data[counter].postId}" target="_blank"> <img src="../imgs/what's-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="facebook-share${data[counter].postId}" target="_blank"> <img src="../imgs/facebook-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="twitter-share${data[counter].postId}" target="_blank" > <img src="../imgs/twitter-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                        </div>

                                                        <div class=" social-link cur-point mt-20 w-100 p-px-5 d-flex align-center justify-content-between" data-post-id ="${data[counter].postId}">
                                                            <input class="overflow-hidden cur-point w-80 copied-link " readonly id="share-link${data[counter].postId}"  data-post-id ="${data[counter].postId}">
                                                            <span class="copy cur-point">Copy</span>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 report">report</li>

                                        <!-- report moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal100${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal100${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel100${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                    <div class="modal-body reportmodaldiv w-70 case-bg">
                                                        <div class="d-flex ">
                                                            <p>Report <span class="reporteduser c-grey">@${data[counter].userInfo.username}’s post</span></p>
                                                        </div>
                                                        <div>
                                                            <form>


                                                                <div class="mb-3 w-100">

                                                                    <textarea  placeholder="The reason of report" class="form-control reportarea${data[counter].postId}" id="exampleFormControlTextarea2${data[counter].postId}" rows="10"></textarea>

                                                                </div>

                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <input type="submit" class="btn btn-primary reportbuton rad-25 p-30 shadow" data-post-id="${data[counter].postId}">
                                                                    <button type="button" class="btn btn-secondary rad-25 reportbutoncancel shadow" data-bs-dismiss="modal">Cancel</button>
                                                                </div>
                                                                <div class = "mt-30 ">
                                                                <span class="reporterror  txt-c  fs-rem-14 d-block"></span>    
                                                                </div>

                                                                
                                                            </form>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 block  lastli">block</li>
                                        <!-- block moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal1000${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel1000${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                <div class="modal-content rad-20">

                                                    <div class="modal-body">
                                                        <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername">@${data[counter].userInfo.username}</span> ?</p>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-evenly">
                                                        <button type="button" class="btn btn-primary blockbutton   rad-25 p-30 shadow " data-user-id="${data[counter].userInfo.userId}">Yes</button>
                                                        <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel shadow" data-bs-dismiss="modal">No</button>

                                                    </div>
                                                    <div class = "mt-30 mb-20">
                                                    <span class = "blockerror blockerror c-red txt-c fs-rem-14 d-block"></span>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </ul>
                                </div>
                            </div>
                            <div class="post-text">
                             <div class="d-flex justify-content-between mb-20 ">
                                    <h3 class="post-title">${data[counter].title}</h3>
                                    <div class="c-white fw-bold  button-bg txt-c rad-10 d-flex justify-content-center align-center pricing hvr-bounce-in">
                                        <span class="mr-px-5">EGP</span> <span class="post-price">${data[counter].price}</span>
                                    </div>
                                </div>
                                <p class="m-0 d-inline post-description" style="white-space: pre; text-wrap: wrap; max-width:100%">${data[counter].body}</p><span class="cur-point seemore">... See more</span>
                            </div>
                              <div class="post-images post-images${data[counter].postId}">
                                <div class="d-flex w-100 mt-40 justify-content-center">
                                  
                                    <div id="carouselExampleControls${data[counter].postId}" class="carousel slide w-100" data-bs-ride="carousel">
                                            <div class="carousel-inner images${data[counter].postId} ">
                                              
                                               
                                            </div>
                                            <button class="carousel-control-prev carousel-control-prev${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next carousel-control-next${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            </div>

                                </div>

                            </div>
                            <div class="post-call mt-40">
                                <div class="w-full d-flex justify-content-between align-center">
                                    <div class="call call${data[counter].postId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-toggle="tooltip" data-bs-placement="top" title="01016218389">
                                           <i class="fa-solid fa-phone-volume hvr-buzz mr-px-5"></i> <span>Call</span>
                                        </button>
                                    </div>
                                    <div class="chat">
                                        <a href = "../chat.html?id=${data[counter].userInfo.userId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-placement="top">
                                           <i class="fa-regular fa-comment mr-px-5"></i> <span>Chat</span>
                                        </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)


                        // check if there is phone or not 
                        if (data[counter].phone == null) {
                            $(`.call${data[counter].postId} button`).attr('disabled', 'disabled');
                        } else {
                            $(`.call${data[counter].postId} button`).attr('title', data[counter].phone);
                        }

                        // check if Post is edited or not
                        if (data[counter].timeUpdated == null) {
                            $(".edited").css("display", "none");
                        } else {
                            $(`editedtime${data[counter].postId}`).text(data[counter].timeUpdated)
                        }

                        // check if user have profile pic or not
                        if (data[counter].userInfo.profilePicture == null) {} else {
                            $(`.profile${data[counter].postId}`).attr("src", `data:image/png;base64,${data[counter].userInfo.profilePicture}`);
                        }

                        //check if user have images and display it
                        if (data[counter].images == null || data[counter].length == 0) {
                            $(`.images${data[counter].postId}`).css("display", "none");
                        } else {
                            for (var i = 0; i < data[counter].images.length; i++) {
                                let activeClass2 = i == 0 ? "active" : " ";
                                console.log(i)
                                $(`.images${data[counter].postId}`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data[counter].images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                            }
                        }

                        if (data[counter].images.length == 1) {

                            $(`.carousel-control-prev${data[counter].postId}`).addClass('d-none');
                            $(`.carousel-control-next${data[counter].postId}`).addClass('d-none');
                        }



                        let everyPostId = $(`#share-link${data[counter].postId}`).attr("data-post-id");
                        $(`#share-link${data[counter].postId}`).val(window.location.href + `#${everyPostId}`);


                        var link = encodeURI(window.location.href + `#${everyPostId}`);
                        var msg = encodeURIComponent('Hey, I found this article');
                        var title = encodeURIComponent('Article or Post Title Here');

                        var fb = document.querySelector(`.facebook-share${data[counter].postId}`);
                        fb.href = `https://www.facebook.com/share.php?u=${link}`;

                        var twitter = document.querySelector(`.twitter-share${data[counter].postId}`);
                        twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

                        var whatsapp = document.querySelector(`.whatsapp${data[counter].postId}`);
                        whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;


                    }
                    // end of for loop






                    $(".social-link").click(function(e) {
                        let copiedinput = $(this).find('input')[0];
                        copiedinput.select();
                        document.execCommand('copy');
                        copiedinput.blur();

                    })




                    //enable tolltip of bootstrap
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl)
                    })

                    //   facebook seemore effect 
                    var showMoreLinks = document.querySelectorAll('.seemore');
                    var maxChars = 150;
                    showMoreLinks.forEach(link => {
                        var postText = link.closest('.post-text');
                        var postDescription = postText.querySelector('.post-description');
                        var descriptionText = postDescription.textContent.trim();
                        var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                        if (descriptionText.length <= maxChars) {
                            link.style.display = 'none';
                        } else {
                            postDescription.textContent = truncatedText;
                        }
                        link.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (postDescription.textContent === truncatedText) {
                                postDescription.textContent = descriptionText;
                                link.textContent = 'Show less';
                            } else {
                                postDescription.textContent = truncatedText;
                                link.textContent = 'See more';
                            }
                        });
                    });

                    $(".moreimg").click(function() {
                        $(this).toggleClass("rotate-90");
                        $(this).next("ul").toggleClass("d-none");
                    })

                    $(`.share-links`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.block`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.report`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })


                    //request of report button
                    $(`.reportbuton`).click(function(e) {
                        e.preventDefault();
                        let postId = $(this).attr("data-post-id");
                        let parentofButton = $(this).parent();
                        let perviosDiv = parentofButton.prev()[0];
                        let textarea = $(perviosDiv).find('textarea')[0];
                        let reason = $(textarea).val();

                        let button = $(this);

                        console.log(reason);
                        console.log(postId);
                        let reportObj = {
                            "reported_post_id": postId,
                            "reason": reason
                        }

                        let jsonData = JSON.stringify(reportObj);

                        if (reason.length == 0 || reason == null) {
                            delete reportObj.reason
                        }
                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/ReportPost",
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },
                            "data": jsonData,

                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("Report Sent Sucssfully")

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)


                            },
                            error: function(xhr, status, err) {
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "red")
                                $(errorspan).text(xhr.responseJSON.error)

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            }
                        })
                    });


                    //request of block button
                    $(`.blockbutton`).click(function(e) {
                        e.preventDefault();
                        userId = $(this).attr("data-user-id");
                        let blockbutton = $(this)
                        let blockObj = {
                            "blocked_user_id": userId
                        }
                        let jsonData = JSON.stringify(blockObj);

                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },


                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(blockbutton).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("User is blocked")
                                setTimeout(function() {
                                    let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            },
                            error: function(xhr, status, err) {
                                if (xhr.status == 400) {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text(xhr.responseJSON.error)


                                } else {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text("Something went wrong, please try again")

                                }


                            }
                        })

                    });
                }
            },
            error: function(xhr, status, err) {
                if (xhr.status == 500) {
                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-red">There is some thing wrong , please try again later </h1>`);
                }
            }
        })








    })();

}


function getPostOnLoad() {
    (async() => {

        let apiUrl = await GetServerDomain();;
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }
        var documentHeight = $(document).height();

        // Get the height of the viewport
        var viewportHeight = $(window).height();

        // Get the current scroll position
        var scrollPosition = $(window).scrollTop();

        // Check if we have scrolled to the bottom of the page

        if (scrollPosition >= 0.9 * (documentHeight - viewportHeight)) {
            governateValue = $(".getgevernate").val();
            cartegoryValue = $(".casetype").val();
            sortValue = $(".sort").val();
            if (!isRequestInProgress) {
                isRequestInProgress = true;
                console.log("at first " + isRequestInProgress)
                $.ajax({
                    "method": "GET",
                    "url": apiUrl + `/api/Dentists/GetListings?Size=2&previouslyFetched=${idlist}&GovernorateId=${governateValue}&ListingCategoryId=${cartegoryValue}&sortBy=${sortValue}`,
                    "xhrFields": {
                        "withCredentials": true
                    },
                    "headers": {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                        "Accept-Language": language
                    },
                    "data": {},
                    beforeSend: function() {
                        if (notRemanning == 0) {
                            $(".skeleton-loading").removeClass("d-none")

                        }

                    },
                    success: function(data, st, xhr) {

                        $(".skeleton-loading").addClass("d-none")
                        console.log(data);
                        if (data.length == 0) {
                            if (notRemanning == 0) {
                                notRemanning = 1;
                                console.log(notRemanning)
                                $(".home-posts").append(`<h1 class = "txt-c mt-40 mb-20 text-grident">There is no remanning posts</h1>`);
                                console.log("if data = 0 " + isRequestInProgress)
                            }
                            isRequestInProgress = false;
                        } else {


                            $(".social-link").click(function(e) {
                                let copiedinput = $(this).find('input')[0];
                                copiedinput.select();
                                document.execCommand('copy');
                                copiedinput.blur();

                            })
                            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                                return new bootstrap.Tooltip(tooltipTriggerEl)
                            })

                            //   facebook seemore effect 
                            var showMoreLinks = document.querySelectorAll('.seemore');
                            var maxChars = 150;
                            showMoreLinks.forEach(link => {
                                var postText = link.closest('.post-text');
                                var postDescription = postText.querySelector('.post-description');
                                var descriptionText = postDescription.textContent.trim();
                                var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                                if (descriptionText.length <= maxChars) {
                                    link.style.display = 'none';
                                } else {
                                    postDescription.textContent = truncatedText;
                                }
                                link.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    if (postDescription.textContent === truncatedText) {
                                        postDescription.textContent = descriptionText;
                                        link.textContent = 'Show less';
                                    } else {
                                        postDescription.textContent = truncatedText;
                                        link.textContent = 'See more';
                                    }
                                });
                            });

                            $(".moreimg").click(function() {
                                $(this).toggleClass("rotate-90");
                                $(this).next("ul").toggleClass("d-none");
                            })

                            $(`.share-links`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.block`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.report`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })


                            //request of report button
                            $(`.reportbuton`).click(function(e) {
                                e.preventDefault();
                                let postId = $(this).attr("data-post-id");
                                let parentofButton = $(this).parent();
                                let perviosDiv = parentofButton.prev()[0];
                                let textarea = $(perviosDiv).find('textarea')[0];
                                let reason = $(textarea).val();

                                let button = $(this);

                                console.log(reason);
                                console.log(postId);
                                let reportObj = {
                                    "reported_post_id": postId,
                                    "reason": reason
                                }

                                let jsonData = JSON.stringify(reportObj);

                                if (reason.length == 0 || reason == null) {
                                    delete reportObj.reason
                                }
                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/ReportPost",
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },
                                    "data": jsonData,

                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("Report Sent Sucssfully")

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)


                                    },
                                    error: function(xhr, status, err) {
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "red")
                                        $(errorspan).text(xhr.responseJSON.error)

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    }
                                })
                            });


                            //request of block button
                            $(`.blockbutton`).click(function(e) {
                                e.preventDefault();
                                userId = $(this).attr("data-user-id");
                                let blockbutton = $(this)
                                let blockObj = {
                                    "blocked_user_id": userId
                                }
                                let jsonData = JSON.stringify(blockObj);

                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },


                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(blockbutton).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("User is blocked")
                                        setTimeout(function() {
                                            let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    },
                                    error: function(xhr, status, err) {
                                        if (xhr.status == 400) {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text(xhr.responseJSON.error)


                                        } else {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text("Something went wrong, please try again")

                                        }


                                    }
                                })

                            });

                            for (var counter = 0; counter < data.length; counter++) {
                                idlist.push(data[counter].postId);
                                console.log(idlist);
                                console.log("at every request " + isRequestInProgress)
                                $(".home-posts").append(`<div class="home-post" id="${data[counter].postId}">
                        <div class="mb-30 post-body d-flex flex-column p-30 bg-white  rad-10">
                            <div class="post-head d-flex justify-content-between">
                                <div class="post-user-info d-flex flex-row">
                                    <div class="user-image rad-half mr-10">
                                        <img src="../imgs/profilepic.svg" class = "profile${data[counter].postId} rad-half" alt="" style="max-width: 100%;">
                                    </div>
                                    <div class="post-info d-flex flex-column">
                                        <div class="d-flex usernames align-center">
                                            <span class="fs-rem-14 fw-bold name">${data[counter].userInfo.fullName}</span><span class="username fs-rem-12 c-grey">@${data[counter].userInfo.username}</span></div>
                              
                                        <span class="user-mohafza c-grey fs-rem-10">${data[counter].governorate}</span>
                                        <div>
                                            <span class="post-time c-grey fs-rem-10 mr-px-5">${data[counter].timeWritten}</span><span class="fs-rem-10 c-grey mr-px-5 edited">Edited at</span><span class="editedtime${data[counter].postId} edited fs-rem-10 c-grey">8</span></div>
                                        <div class="casetype-bg p-1 txt-c w-fit case-type-rad"><span class="case-type c-white casetype-bg fs-rem-11  overflow-hidden" title = "${data[counter].category}" >${data[counter].category}</span></div>
                                    </div>
                                </div>
                                <div class="more-about-post d-flex flex-column align-items-end">
                                    <img src="../imgs/more.svg" class="moreimg cur-point" style="width: 30px; max-width: 35px;">
                                    <ul class="p-10 dropbutton-bg mt-px-5 d-none">
                                        <li class="p-10 share-links${data[counter].postId} share-links">Share via</li>
                                        <!-- share moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none sharemodal " data-bs-toggle="modal" data-bs-target="#exampleModal${data[counter].postId}">
                                                Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content sharemodal-bg">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title c-white" id="exampleModalLabel${data[counter].postId}">Share</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="social-media-icons row flex-row p-20">
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point share-icon post1" style="width: fit-content;">
                                                                <a class="whatsapp${data[counter].postId}" target="_blank"> <img src="../imgs/what's-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="facebook-share${data[counter].postId}" target="_blank"> <img src="../imgs/facebook-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="twitter-share${data[counter].postId}" target="_blank" > <img src="../imgs/twitter-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                        </div>

                                                        <div class=" social-link cur-point mt-20 w-100 p-px-5 d-flex align-center justify-content-between" data-post-id ="${data[counter].postId}">
                                                            <input class="overflow-hidden cur-point w-80 copied-link " readonly id="share-link${data[counter].postId}"  data-post-id ="${data[counter].postId}">
                                                            <span class="copy cur-point">Copy</span>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 report">report</li>

                                        <!-- report moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal100${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal100${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel100${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                    <div class="modal-body reportmodaldiv w-70 case-bg">
                                                        <div class="d-flex ">
                                                            <p>Report <span class="reporteduser c-grey">@${data[counter].userInfo.username}’s post</span></p>
                                                        </div>
                                                        <div>
                                                            <form>


                                                                <div class="mb-3 w-100">

                                                                    <textarea  placeholder="The reason of report" class="form-control reportarea${data[counter].postId}" id="exampleFormControlTextarea2${data[counter].postId}" rows="10"></textarea>

                                                                </div>

                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <input type="submit" class="btn btn-primary reportbuton rad-25 p-30 shadow" data-post-id="${data[counter].postId}">
                                                                    <button type="button" class="btn btn-secondary rad-25 reportbutoncancel shadow" data-bs-dismiss="modal">Cancel</button>
                                                                </div>
                                                                <div class = "mt-30 ">
                                                                <span class="reporterror  txt-c  fs-rem-14 d-block"></span>    
                                                                </div>


                                                            </form>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 block  lastli">block</li>
                                        <!-- block moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal1000${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel1000${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                <div class="modal-content rad-20">

                                                    <div class="modal-body">
                                                        <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername">@${data[counter].userInfo.username}</span> ?</p>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-evenly">
                                                        <button type="button" class="btn btn-primary blockbutton   rad-25 p-30 shadow " data-user-id="${data[counter].userInfo.userId}">Yes</button>
                                                        <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel shadow" data-bs-dismiss="modal">No</button>

                                                    </div>
                                                    <div class = "mt-30 mb-20">
                                                    <span class = "blockerror blockerror c-red txt-c fs-rem-14 d-block"></span>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </ul>
                                </div>
                            </div>
                            <div class="post-text">
                              <div class="d-flex justify-content-between mb-20 ">
                                    <h3 class="post-title">${data[counter].title}</h3>
                                    <div class="c-white fw-bold  button-bg txt-c rad-10 d-flex justify-content-center align-center pricing hvr-bounce-in">
                                        <span class="mr-px-5">EGP</span> <span class="post-price">${data[counter].price}</span>
                                    </div>
                             
                            </div>
                               <p class="m-0 d-inline post-description" style="white-space: pre; text-wrap: wrap; max-width:100%">${data[counter].body}</p><span class="cur-point seemore">... See more</span>
                             <div class="post-images post-images${data[counter].postId}">
                                <div class="d-flex w-100 mt-40 justify-content-center">
                                  
                                    <div id="carouselExampleControls${data[counter].postId}" class="carousel slide w-100" data-bs-ride="carousel">
                                            <div class="carousel-inner images${data[counter].postId} ">
                                              
                                               
                                            </div>
                                            <button class="carousel-control-prev carousel-control-prev${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next carousel-control-next${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            </div>

                                </div>

                            </div>
                            <div class="post-call mt-40">
                                <div class="w-full d-flex justify-content-between align-center">
                                    <div class="call call${data[counter].postId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-toggle="tooltip" data-bs-placement="top" title="01016218389">
                                           <i class="fa-solid fa-phone-volume hvr-buzz mr-px-5"></i> <span>Call</span>
                                        </button>
                                    </div>
                                    <div class="chat">
                                        <a href = "../chat.html?id=${data[counter].userInfo.userId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-placement="top">
                                           <i class="fa-regular fa-comment mr-px-5"></i> <span>Chat</span>
                                        </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)


                                // check if there is phone or not 
                                if (data[counter].phone == null) {
                                    $(`.call${data[counter].postId} button`).attr('disabled', 'disabled');
                                } else {
                                    $(`.call${data[counter].postId} button`).attr('title', data[counter].phone);
                                }

                                // check if Post is edited or not
                                if (data[counter].timeUpdated == null) {
                                    $(".edited").css("display", "none");
                                } else {
                                    $(`editedtime${data[counter].postId}`).text(data[counter].timeUpdated)
                                }

                                // check if user have profile pic or not
                                if (data[counter].userInfo.profilePicture == null) {} else {
                                    $(`.profile${data[counter].postId}`).attr("src", `data:image/png;base64,${data[counter].userInfo.profilePicture}`);
                                }

                                //check if user have images and display it
                                if (data[counter].images == null || data[counter].length == 0) {
                                    $(`.images${data[counter].postId}`).css("display", "none");
                                } else {
                                    for (var i = 0; i < data[counter].images.length; i++) {
                                        let activeClass2 = i == 0 ? "active" : " ";
                                        console.log(i)
                                        $(`.images${data[counter].postId}`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data[counter].images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                                    }
                                }


                                if (data[counter].images.length == 1) {

                                    $(`.carousel-control-prev${data[counter].postId}`).addClass('d-none');
                                    $(`.carousel-control-next${data[counter].postId}`).addClass('d-none');
                                }







                                let everyPostId = $(`#share-link${data[counter].postId}`).attr("data-post-id");
                                $(`#share-link${data[counter].postId}`).val(window.location.href + `#${everyPostId}`);


                                var link = encodeURI(window.location.href + `#${everyPostId}`);
                                var msg = encodeURIComponent('Hey, I found this article');
                                var title = encodeURIComponent('Article or Post Title Here');

                                var fb = document.querySelector(`.facebook-share${data[counter].postId}`);
                                fb.href = `https://www.facebook.com/share.php?u=${link}`;

                                var twitter = document.querySelector(`.twitter-share${data[counter].postId}`);
                                twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

                                var whatsapp = document.querySelector(`.whatsapp${data[counter].postId}`);
                                whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;


                            }
                            // end of for loop






                            $(".social-link").click(function(e) {
                                let copiedinput = $(this).find('input')[0];
                                copiedinput.select();
                                document.execCommand('copy');
                                copiedinput.blur();

                            })




                            //enable tolltip of bootstrap
                            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                                return new bootstrap.Tooltip(tooltipTriggerEl)
                            })

                            //   facebook seemore effect 
                            var showMoreLinks = document.querySelectorAll('.seemore');
                            var maxChars = 150;
                            showMoreLinks.forEach(link => {
                                var postText = link.closest('.post-text');
                                var postDescription = postText.querySelector('.post-description');
                                var descriptionText = postDescription.textContent.trim();
                                var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                                if (descriptionText.length <= maxChars) {
                                    link.style.display = 'none';
                                } else {
                                    postDescription.textContent = truncatedText;
                                }
                                link.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    if (postDescription.textContent === truncatedText) {
                                        postDescription.textContent = descriptionText;
                                        link.textContent = 'Show less';
                                    } else {
                                        postDescription.textContent = truncatedText;
                                        link.textContent = 'See more';
                                    }
                                });
                            });

                            $(".moreimg").click(function() {
                                $(this).toggleClass("rotate-90");
                                $(this).next("ul").toggleClass("d-none");
                            })

                            $(`.share-links`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.block`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.report`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })


                            //request of report button
                            $(`.reportbuton`).click(function(e) {
                                e.preventDefault();
                                let postId = $(this).attr("data-post-id");
                                let parentofButton = $(this).parent();
                                let perviosDiv = parentofButton.prev()[0];
                                let textarea = $(perviosDiv).find('textarea')[0];
                                let reason = $(textarea).val();

                                let button = $(this);

                                console.log(reason);
                                console.log(postId);
                                let reportObj = {
                                    "reported_post_id": postId,
                                    "reason": reason
                                }

                                let jsonData = JSON.stringify(reportObj);

                                if (reason.length == 0 || reason == null) {
                                    delete reportObj.reason
                                }
                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/ReportPost",
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },
                                    "data": jsonData,

                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("Report Sent Sucssfully")

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)


                                    },
                                    error: function(xhr, status, err) {
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "red")
                                        $(errorspan).text(xhr.responseJSON.error)

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    }
                                })
                            });


                            //request of block button
                            $(`.blockbutton`).click(function(e) {
                                e.preventDefault();
                                userId = $(this).attr("data-user-id");
                                let blockbutton = $(this)
                                let blockObj = {
                                    "blocked_user_id": userId
                                }
                                let jsonData = JSON.stringify(blockObj);

                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },


                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(blockbutton).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("User is blocked")
                                        setTimeout(function() {
                                            let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    },
                                    error: function(xhr, status, err) {
                                        if (xhr.status == 400) {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text(xhr.responseJSON.error)


                                        } else {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text("Something went wrong, please try again")

                                        }


                                    }
                                })

                            });
                            isRequestInProgress = false;
                            console.log("at end " + isRequestInProgress)
                            $(window).scrollTop(scrollPosition - 100);
                        }
                    },
                    error: function(xhr, status, err) {
                        $(".home-posts").append("<h2>Some thing went wrong please try again later</h2>")
                        isRequestInProgress = false;

                    }
                })


            }

        }
    })();
}




function getHomePostsOnChange(detiestOrPatient) {

    (async() => {
        let pageIndex = 1;
        let apiUrl = await GetServerDomain();;
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }



        // request when university changes

        $(".home-posts").html(" ");
        idlist = [];
        governateValue = $(".getgevernate").val();
        caseTypeValue = $(".casetype").val();

        $.ajax({
            "method": "GET",
            "url": apiUrl + `/api/${detiestOrPatient}?Page=${pageIndex}&Size=2&GovernorateId=${governateValue}&CaseTypeId=${caseTypeValue}`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            "data": {},
            beforeSend: function() {
                $(".skeleton-loading").removeClass("d-none")
            },
            success: function(data, st, xhr) {
                console.log(data);
                console.log(governateValue);

                if (data.length == 0) {

                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-grey">There is no posts with the condtions you chossed</h1>`);
                } else {

                    $(".home-posts").html(``);
                    for (var counter = 0; counter < data.length; counter++) {
                        idlist.push(data[counter].postId)

                        $(".home-posts").append(`<div class="home-post" id="${data[counter].postId}">
                        <div class="mb-30 post-body d-flex flex-column p-30 bg-white  rad-10">
                            <div class="post-head d-flex justify-content-between">
                                <div class="post-user-info d-flex flex-row">
                                    <div class="user-image rad-half mr-10">
                                        <img src="../imgs/profilepic.svg" class = "profile${data[counter].postId} rad-half" alt="" style="max-width: 100%;">
                                    </div>
                                    <div class="post-info d-flex flex-column">
                                        <div class="d-flex usernames align-center">
                                            <span class="fs-rem-14 fw-bold name">${data[counter].userInfo.fullName}</span><span class="username fs-rem-12 c-grey">@${data[counter].userInfo.username}</span></div>
                                       
                                        <span class="user-mohafza c-grey fs-rem-10">${data[counter].governorate}</span>
                                        <div>
                                            <span class="post-time c-grey fs-rem-10 mr-px-5">${data[counter].timeWritten}</span><span class="fs-rem-10 c-grey mr-px-5 edited">Edited at</span><span class="editedtime${data[counter].postId} edited fs-rem-10 c-grey">8</span></div>
                                        <div class="casetype-bg p-1 txt-c w-fit case-type-rad"><span class="case-type c-white casetype-bg fs-rem-11  overflow-hidden" title = "${data[counter].category}" >${data[counter].category}</span></div>
                                    </div>
                                </div>
                                <div class="more-about-post d-flex flex-column align-center align-items-end">
                                    <img src="../imgs/more.svg" class="moreimg cur-point" style="width: 30px; max-width: 35px;">
                                    <ul class="p-10 dropbutton-bg mt-px-5 d-none">
                                        <li class="p-10 share-links${data[counter].postId} share-links">Share via</li>
                                        <!-- share moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none sharemodal " data-bs-toggle="modal" data-bs-target="#exampleModal${data[counter].postId}">
                                                Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content sharemodal-bg">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title c-white" id="exampleModalLabel${data[counter].postId}">Share</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="social-media-icons row flex-row p-20">
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point share-icon post1" style="width: fit-content;">
                                                                <a class="whatsapp${data[counter].postId}" target="_blank"> <img src="../imgs/what's-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="facebook-share${data[counter].postId}" target="_blank"> <img src="../imgs/facebook-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="twitter-share${data[counter].postId}" target="_blank" > <img src="../imgs/twitter-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                        </div>

                                                        <div class=" social-link cur-point mt-20 w-100 p-px-5 d-flex align-center justify-content-between" data-post-id ="${data[counter].postId}">
                                                            <input class="overflow-hidden cur-point w-80 copied-link " readonly id="share-link${data[counter].postId}"  data-post-id ="${data[counter].postId}">
                                                            <span class="copy cur-point">Copy</span>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 report">report</li>

                                        <!-- report moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal100${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal100${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel100${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                    <div class="modal-body reportmodaldiv w-70 case-bg">
                                                        <div class="d-flex ">
                                                            <p>Report <span class="reporteduser c-grey">@${data[counter].userInfo.username}’s post</span></p>
                                                        </div>
                                                        <div>
                                                            <form>


                                                                <div class="mb-3 w-100">

                                                                    <textarea  placeholder="The reason of report" class="form-control reportarea${data[counter].postId}" id="exampleFormControlTextarea2${data[counter].postId}" rows="10"></textarea>

                                                                </div>

                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <input type="submit" class="btn btn-primary reportbuton rad-25 p-30 shadow" data-post-id="${data[counter].postId}">
                                                                    <button type="button" class="btn btn-secondary rad-25 reportbutoncancel shadow" data-bs-dismiss="modal">Cancel</button>
                                                                </div>
                                                                <div class = "mt-30 ">
                                                                <span class="reporterror  txt-c  fs-rem-14 d-block"></span>    
                                                                </div>

                                                                
                                                            </form>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 block  lastli">block</li>
                                        <!-- block moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal1000${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel1000${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                <div class="modal-content rad-20">

                                                    <div class="modal-body">
                                                        <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername">@${data[counter].userInfo.username}</span> ?</p>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-evenly">
                                                        <button type="button" class="btn btn-primary blockbutton   rad-25 p-30 shadow " data-user-id="${data[counter].userInfo.userId}">Yes</button>
                                                        <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel shadow" data-bs-dismiss="modal">No</button>

                                                    </div>
                                                    <div class = "mt-30 mb-20">
                                                    <span class = "blockerror blockerror c-red txt-c fs-rem-14 d-block"></span>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </ul>
                                </div>
                            </div>
                            <div class="post-text">
                                <h3 class="post-title">${data[counter].title}</h3>
                                <p class="m-0 d-inline post-description" style="white-space: pre; text-wrap: wrap; max-width:100%">${data[counter].body}</p><span class="cur-point seemore">... See more</span>
                            </div>
                             <div class="post-images post-images${data[counter].postId}">
                                <div class="d-flex w-100 mt-40 justify-content-center">
                                  
                                    <div id="carouselExampleControls${data[counter].postId}" class="carousel slide w-100" data-bs-ride="carousel">
                                            <div class="carousel-inner images${data[counter].postId} ">
                                              
                                               
                                            </div>
                                            <button class="carousel-control-prev carousel-control-prev${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next carousel-control-next${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls${data[counter].postId}" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            </div>

                                </div>

                            </div>
                            <div class="post-call mt-40">
                                <div class="w-full d-flex justify-content-between align-center">
                                    <div class="call call${data[counter].postId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-toggle="tooltip" data-bs-placement="top" title="01016218389">
                                           <i class="fa-solid fa-phone-volume hvr-buzz mr-px-5"></i> <span>Call</span>
                                        </button>
                                    </div>
                                    <div class="chat">
                                        <a href = "../chat.html?id=${data[counter].userInfo.userId}">
                                        <button type="button" class="btn btn-secondary button-bg " data-bs-placement="top">
                                           <i class="fa-regular fa-comment mr-px-5"></i> <span>Chat</span>
                                        </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`)


                        // check if there is phone or not 
                        if (data[counter].phone == null) {
                            $(`.call${data[counter].postId} button`).attr('disabled', 'disabled');
                        } else {
                            $(`.call${data[counter].postId} button`).attr('title', data[counter].phone);
                        }

                        // check if Post is edited or not
                        if (data[counter].timeUpdated == null) {
                            $(".edited").css("display", "none");
                        } else {
                            $(`editedtime${data[counter].postId}`).text(data[counter].timeUpdated)
                        }

                        // check if user have profile pic or not
                        if (data[counter].userInfo.profilePicture == null) {} else {
                            $(`.profile${data[counter].postId}`).attr("src", `data:image/png;base64,${data[counter].userInfo.profilePicture}`);
                        }

                        //check if user have images and display it
                        if (data[counter].images == null || data[counter].length == 0) {
                            $(`.images${data[counter].postId}`).css("display", "none");
                        } else {
                            for (var i = 0; i < data[counter].images.length; i++) {
                                let activeClass2 = i == 0 ? "active" : " ";
                                console.log(i)
                                $(`.images${data[counter].postId}`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data[counter].images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                            }
                        }


                        if (data[counter].images.length == 1) {

                            $(`.carousel-control-prev${data[counter].postId}`).addClass('d-none');
                            $(`.carousel-control-next${data[counter].postId}`).addClass('d-none');
                        }



                        let everyPostId = $(`#share-link${data[counter].postId}`).attr("data-post-id");
                        $(`#share-link${data[counter].postId}`).val(window.location.href + `#${everyPostId}`);


                        var link = encodeURI(window.location.href + `#${everyPostId}`);
                        var msg = encodeURIComponent('Hey, I found this article');
                        var title = encodeURIComponent('Article or Post Title Here');

                        var fb = document.querySelector(`.facebook-share${data[counter].postId}`);
                        fb.href = `https://www.facebook.com/share.php?u=${link}`;

                        var twitter = document.querySelector(`.twitter-share${data[counter].postId}`);
                        twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

                        var whatsapp = document.querySelector(`.whatsapp${data[counter].postId}`);
                        whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;


                    }
                    // end of for loop






                    $(".social-link").click(function(e) {
                        let copiedinput = $(this).find('input')[0];
                        copiedinput.select();
                        document.execCommand('copy');
                        copiedinput.blur();

                    })




                    //enable tolltip of bootstrap
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl)
                    })

                    //   facebook seemore effect 
                    var showMoreLinks = document.querySelectorAll('.seemore');
                    var maxChars = 150;
                    showMoreLinks.forEach(link => {
                        var postText = link.closest('.post-text');
                        var postDescription = postText.querySelector('.post-description');
                        var descriptionText = postDescription.textContent.trim();
                        var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                        if (descriptionText.length <= maxChars) {
                            link.style.display = 'none';
                        } else {
                            postDescription.textContent = truncatedText;
                        }
                        link.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (postDescription.textContent === truncatedText) {
                                postDescription.textContent = descriptionText;
                                link.textContent = 'Show less';
                            } else {
                                postDescription.textContent = truncatedText;
                                link.textContent = 'See more';
                            }
                        });
                    });

                    $(".moreimg").click(function() {
                        $(this).toggleClass("rotate-90");
                        $(this).next("ul").toggleClass("d-none");
                    })

                    $(`.share-links`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.block`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.report`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })


                    //request of report button
                    $(`.reportbuton`).click(function(e) {
                        e.preventDefault();
                        let postId = $(this).attr("data-post-id");
                        let parentofButton = $(this).parent();
                        let perviosDiv = parentofButton.prev()[0];
                        let textarea = $(perviosDiv).find('textarea')[0];
                        let reason = $(textarea).val();

                        let button = $(this);

                        console.log(reason);
                        console.log(postId);
                        let reportObj = {
                            "reported_post_id": postId,
                            "reason": reason
                        }

                        let jsonData = JSON.stringify(reportObj);

                        if (reason.length == 0 || reason == null) {
                            delete reportObj.reason
                        }
                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/ReportPost",
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },
                            "data": jsonData,

                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("Report Sent Sucssfully")

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)


                            },
                            error: function(xhr, status, err) {
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "red")
                                $(errorspan).text(xhr.responseJSON.error)

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            }
                        })
                    });


                    //request of block button
                    $(`.blockbutton`).click(function(e) {
                        e.preventDefault();
                        userId = $(this).attr("data-user-id");
                        let blockbutton = $(this)
                        let blockObj = {
                            "blocked_user_id": userId
                        }
                        let jsonData = JSON.stringify(blockObj);

                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },


                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(blockbutton).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("User is blocked")
                                setTimeout(function() {
                                    let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            },
                            error: function(xhr, status, err) {
                                if (xhr.status == 400) {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text(xhr.responseJSON.error)


                                } else {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text("Something went wrong, please try again")

                                }


                            }
                        })

                    });
                }
            },
            error: function(xhr, status, err) {
                if (xhr.status == 500) {
                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-red">There is some thing wrong , please try again later </h1>`);
                }
            }
        })









    })();


}

// load user info

function GetUserInfo(chooseDenistOrUser) {

    (async() => {
        let apiUrl = await GetServerDomain();
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }



        $.ajax({
            "method": "GET",
            "url": apiUrl + `/api/${chooseDenistOrUser}/GetSettings`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            success: function(data, st, xhr) {
                if (data.profilePicture != null) {
                    $("#userphoto").attr("src", `data:image/png;base64,${data.profilePicture}`)
                }
                $('#username').text(data.fullName);

            },

        })



    })();



}


function getArticlePostOnLoad() {
    (async() => {

        let apiUrl = await GetServerDomain();;
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }
        var documentHeight = $(document).height();

        // Get the height of the viewport
        var viewportHeight = $(window).height();

        // Get the current scroll position
        var scrollPosition = $(window).scrollTop();

        // Check if we have scrolled to the bottom of the page

        if (scrollPosition >= 0.9 * (documentHeight - viewportHeight)) {

            cartegoryValue = $(".casetype").val();
            sortValue = $(".sort").val();
            if (!isRequestInProgress) {
                isRequestInProgress = true;
                console.log("at first " + isRequestInProgress)
                $.ajax({
                    "method": "GET",
                    "url": apiUrl + `/api/Dentists/GetArticles?Size=2&previouslyFetched=${idlist}&ArticleCategoryId=${cartegoryValue}&sortBy=${sortValue}`,
                    "xhrFields": {
                        "withCredentials": true
                    },
                    "headers": {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                        "Accept-Language": language
                    },
                    "data": {},
                    beforeSend: function() {
                        if (notRemanning == 0) {
                            $(".skeleton-loading").removeClass("d-none")

                        }

                    },
                    success: function(data, st, xhr) {

                        $(".skeleton-loading").addClass("d-none")
                        console.log(data);
                        if (data.length == 0) {
                            if (notRemanning == 0) {
                                notRemanning = 1;
                                console.log(notRemanning)
                                $(".home-posts").append(`<h1 class = "txt-c mt-40 mb-20 text-grident">There is no remanning posts</h1>`);
                                console.log("if data = 0 " + isRequestInProgress)
                            }
                            isRequestInProgress = false;
                        } else {


                            $(".social-link").click(function(e) {
                                let copiedinput = $(this).find('input')[0];
                                copiedinput.select();
                                document.execCommand('copy');
                                copiedinput.blur();

                            })
                            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                                return new bootstrap.Tooltip(tooltipTriggerEl)
                            })

                            //   facebook seemore effect 
                            var showMoreLinks = document.querySelectorAll('.seemore');
                            var maxChars = 150;
                            showMoreLinks.forEach(link => {
                                var postText = link.closest('.post-text');
                                var postDescription = postText.querySelector('.post-description');
                                var descriptionText = postDescription.textContent.trim();
                                var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                                if (descriptionText.length <= maxChars) {
                                    link.style.display = 'none';
                                } else {
                                    postDescription.textContent = truncatedText;
                                }
                                link.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    if (postDescription.textContent === truncatedText) {
                                        postDescription.textContent = descriptionText;
                                        link.textContent = 'Show less';
                                    } else {
                                        postDescription.textContent = truncatedText;
                                        link.textContent = 'See more';
                                    }
                                });
                            });

                            $(".moreimg").click(function() {
                                $(this).toggleClass("rotate-90");
                                $(this).next("ul").toggleClass("d-none");
                            })

                            $(`.share-links`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.block`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.report`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })


                            //request of report button
                            $(`.reportbuton`).click(function(e) {
                                e.preventDefault();
                                let postId = $(this).attr("data-post-id");
                                let parentofButton = $(this).parent();
                                let perviosDiv = parentofButton.prev()[0];
                                let textarea = $(perviosDiv).find('textarea')[0];
                                let reason = $(textarea).val();

                                let button = $(this);

                                console.log(reason);
                                console.log(postId);
                                let reportObj = {
                                    "reported_post_id": postId,
                                    "reason": reason
                                }

                                let jsonData = JSON.stringify(reportObj);

                                if (reason.length == 0 || reason == null) {
                                    delete reportObj.reason
                                }
                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/ReportPost",
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },
                                    "data": jsonData,

                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("Report Sent Sucssfully")

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)


                                    },
                                    error: function(xhr, status, err) {
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "red")
                                        $(errorspan).text(xhr.responseJSON.error)

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    }
                                })
                            });


                            //request of block button
                            $(`.blockbutton`).click(function(e) {
                                e.preventDefault();
                                userId = $(this).attr("data-user-id");
                                let blockbutton = $(this)
                                let blockObj = {
                                    "blocked_user_id": userId
                                }
                                let jsonData = JSON.stringify(blockObj);

                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },


                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(blockbutton).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("User is blocked")
                                        setTimeout(function() {
                                            let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    },
                                    error: function(xhr, status, err) {
                                        if (xhr.status == 400) {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text(xhr.responseJSON.error)


                                        } else {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text("Something went wrong, please try again")

                                        }


                                    }
                                })

                            });

                            for (var counter = 0; counter < data.length; counter++) {
                                idlist.push(data[counter].postId);
                                console.log(idlist);
                                console.log("at every request " + isRequestInProgress)
                                $(".home-posts").append(`<div class="home-post" id="${data[counter].postId}">
                        <div class="mb-30 post-body d-flex flex-column p-30 bg-white  rad-10">
                            <div class="post-head d-flex justify-content-between">
                                <div class="post-user-info d-flex flex-row">
                                    <div class="user-image rad-half mr-10">
                                        <img src="../imgs/profilepic.svg" class = "profile${data[counter].postId} rad-half" alt="" style="max-width: 100%;">
                                    </div>
                                    <div class="post-info d-flex flex-column">
                                        <div class="d-flex usernames align-center">
                                            <span class="fs-rem-14 fw-bold name">${data[counter].userInfo.fullName}</span><span class="username fs-rem-12 c-grey">@${data[counter].userInfo.username}</span></div>
                                     <span class="user-case fw-bold c-blue fs-rem-12">${data[counter].dentistInfo.academicDegree}</span>
                                        <span class="user-mohafza c-grey fs-rem-10">${data[counter].dentistInfo.university}</span>
                                        <div>
                                            <span class="post-time c-grey fs-rem-10 mr-px-5">${data[counter].timeWritten}</span><span class="fs-rem-10 c-grey mr-px-5 edited">Edited at</span><span class="editedtime${data[counter].postId} edited fs-rem-10 c-grey">8</span></div>
                                        <div class="casetype-bg p-1 txt-c w-fit case-type-rad"><span class="case-type c-white casetype-bg fs-rem-11  overflow-hidden" title = "${data[counter].category}" >${data[counter].category}</span></div>
                                    </div>
                                </div>
                                <div class="more-about-post d-flex flex-column align-items-end">
                                    <img src="../imgs/more.svg" class="moreimg cur-point" style="width: 30px; max-width: 35px;">
                                    <ul class="p-10 dropbutton-bg mt-px-5 d-none">
                                        <li class="p-10 share-links${data[counter].postId} share-links">Share via</li>
                                        <!-- share moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none sharemodal " data-bs-toggle="modal" data-bs-target="#exampleModal${data[counter].postId}">
                                                Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content sharemodal-bg">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title c-white" id="exampleModalLabel${data[counter].postId}">Share</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="social-media-icons row flex-row p-20">
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point share-icon post1" style="width: fit-content;">
                                                                <a class="whatsapp${data[counter].postId}" target="_blank"> <img src="../imgs/what's-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="facebook-share${data[counter].postId}" target="_blank"> <img src="../imgs/facebook-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="twitter-share${data[counter].postId}" target="_blank" > <img src="../imgs/twitter-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                        </div>

                                                        <div class=" social-link cur-point mt-20 w-100 p-px-5 d-flex align-center justify-content-between" data-post-id ="${data[counter].postId}">
                                                            <input class="overflow-hidden cur-point w-80 copied-link " readonly id="share-link${data[counter].postId}"  data-post-id ="${data[counter].postId}">
                                                            <span class="copy cur-point">Copy</span>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 report">report</li>

                                        <!-- report moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal100${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal100${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel100${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                    <div class="modal-body reportmodaldiv w-70 case-bg">
                                                        <div class="d-flex ">
                                                            <p>Report <span class="reporteduser c-grey">@${data[counter].userInfo.username}’s post</span></p>
                                                        </div>
                                                        <div>
                                                            <form>


                                                                <div class="mb-3 w-100">

                                                                    <textarea  placeholder="The reason of report" class="form-control reportarea${data[counter].postId}" id="exampleFormControlTextarea2${data[counter].postId}" rows="10"></textarea>

                                                                </div>

                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <input type="submit" class="btn btn-primary reportbuton rad-25 p-30 shadow" data-post-id="${data[counter].postId}">
                                                                    <button type="button" class="btn btn-secondary rad-25 reportbutoncancel shadow" data-bs-dismiss="modal">Cancel</button>
                                                                </div>
                                                                <div class = "mt-30 ">
                                                                <span class="reporterror  txt-c  fs-rem-14 d-block"></span>    
                                                                </div>

                                                                
                                                            </form>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 block  lastli">block</li>
                                        <!-- block moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal1000${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel1000${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                <div class="modal-content rad-20">

                                                    <div class="modal-body">
                                                        <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername">@${data[counter].userInfo.username}</span> ?</p>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-evenly">
                                                        <button type="button" class="btn btn-primary blockbutton   rad-25 p-30 shadow " data-user-id="${data[counter].userInfo.userId}">Yes</button>
                                                        <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel shadow" data-bs-dismiss="modal">No</button>

                                                    </div>
                                                    <div class = "mt-30 mb-20">
                                                    <span class = "blockerror blockerror c-red txt-c fs-rem-14 d-block"></span>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </ul>
                                </div>
                            </div>
                            <div class="post-text">
                                 <div class="d-flex justify-content-between mb-20 ">
                                    <h3 class="post-title">${data[counter].title}</h3>
                                    
                                </div>
                                <p class="m-0 d-inline post-description" style="white-space: pre; text-wrap:wrap">${data[counter].body}</p><span class="cur-point seemore">... See more</span>
                            </div>
                            <div class="post-images post-images${data[counter].postId}">
                                <div class=" d-flex w-100 mt-40 justify-content-center">
                                  

                                         <div id="carouselExampleControls" class="carousel slide w-100" data-bs-ride="carousel">
                                            <div class="carousel-inner images${data[counter].postId} ">
                                              
                                               
                                            </div>
                                            <button class="carousel-control-prev carousel-control-prev${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next carousel-control-next${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            </div>

                               

                                </div>

                            </div>
                            <div class="post-call mt-40">
                                <div class="w-full d-flex justify-content-between align-center">
                                    <div class="likes">
                                        <i class="fa-solid fa-hands-clapping  fs-rem-30" style="color: #0e8388;"></i><span class="numoflikes fw-bold fs-rem-25 ml-10">${data[counter].likes}</span>
                                    </div>
                                    <a href = "post.html?Id=${data[counter].postId}">
                                        <div class="comments">
                                        <i class="fa-regular fa-comment fa-flip-horizontal fs-rem-30" style="color: #0e8388;"></i><span class="numofcomments fw-bold fs-rem-25 ml-10">${data[counter].comments}</span>
                                    </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`)




                                // check if there is phone or not 
                                if (data[counter].phone == null) {
                                    $(`.call${data[counter].postId} button`).attr('disabled', 'disabled');
                                } else {
                                    $(`.call${data[counter].postId} button`).attr('title', data[counter].phone);
                                }

                                // check if Post is edited or not
                                if (data[counter].timeUpdated == null) {
                                    $(".edited").css("display", "none");
                                } else {
                                    $(`editedtime${data[counter].postId}`).text(data[counter].timeUpdated)
                                }

                                // check if user have profile pic or not
                                if (data[counter].userInfo.profilePicture == null) {} else {
                                    $(`.profile${data[counter].postId}`).attr("src", `data:image/png;base64,${data[counter].userInfo.profilePicture}`);
                                }

                                //check if user have images and display it
                                if (data[counter].images == null || data[counter].length == 0) {
                                    $(`.images${data[counter].postId}`).css("display", "none");
                                } else {
                                    for (var i = 0; i < data[counter].images.length; i++) {
                                        let activeClass2 = i == 0 ? "active" : " ";
                                        console.log(i)
                                        $(`.images${data[counter].postId}`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data[counter].images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                                    }
                                }


                                if (data[counter].images.length == 1) {

                                    $(`.carousel-control-prev${data[counter].postId}`).addClass('d-none');
                                    $(`.carousel-control-next${data[counter].postId}`).addClass('d-none');
                                }







                                let everyPostId = $(`#share-link${data[counter].postId}`).attr("data-post-id");
                                $(`#share-link${data[counter].postId}`).val(window.location.href + `#${everyPostId}`);


                                var link = encodeURI(window.location.href + `#${everyPostId}`);
                                var msg = encodeURIComponent('Hey, I found this article');
                                var title = encodeURIComponent('Article or Post Title Here');

                                var fb = document.querySelector(`.facebook-share${data[counter].postId}`);
                                fb.href = `https://www.facebook.com/share.php?u=${link}`;

                                var twitter = document.querySelector(`.twitter-share${data[counter].postId}`);
                                twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

                                var whatsapp = document.querySelector(`.whatsapp${data[counter].postId}`);
                                whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;


                            }
                            // end of for loop






                            $(".social-link").click(function(e) {
                                let copiedinput = $(this).find('input')[0];
                                copiedinput.select();
                                document.execCommand('copy');
                                copiedinput.blur();

                            })




                            //enable tolltip of bootstrap
                            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                            var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                                return new bootstrap.Tooltip(tooltipTriggerEl)
                            })

                            //   facebook seemore effect 
                            var showMoreLinks = document.querySelectorAll('.seemore');
                            var maxChars = 150;
                            showMoreLinks.forEach(link => {
                                var postText = link.closest('.post-text');
                                var postDescription = postText.querySelector('.post-description');
                                var descriptionText = postDescription.textContent.trim();
                                var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                                if (descriptionText.length <= maxChars) {
                                    link.style.display = 'none';
                                } else {
                                    postDescription.textContent = truncatedText;
                                }
                                link.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    if (postDescription.textContent === truncatedText) {
                                        postDescription.textContent = descriptionText;
                                        link.textContent = 'Show less';
                                    } else {
                                        postDescription.textContent = truncatedText;
                                        link.textContent = 'See more';
                                    }
                                });
                            });

                            $(".moreimg").click(function() {
                                $(this).toggleClass("rotate-90");
                                $(this).next("ul").toggleClass("d-none");
                            })

                            $(`.share-links`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.block`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })

                            $(`.report`).click(function() {
                                $(this).next(`button`).trigger("click");
                            })


                            //request of report button
                            $(`.reportbuton`).click(function(e) {
                                e.preventDefault();
                                let postId = $(this).attr("data-post-id");
                                let parentofButton = $(this).parent();
                                let perviosDiv = parentofButton.prev()[0];
                                let textarea = $(perviosDiv).find('textarea')[0];
                                let reason = $(textarea).val();

                                let button = $(this);

                                console.log(reason);
                                console.log(postId);
                                let reportObj = {
                                    "reported_post_id": postId,
                                    "reason": reason
                                }

                                let jsonData = JSON.stringify(reportObj);

                                if (reason.length == 0 || reason == null) {
                                    delete reportObj.reason
                                }
                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/ReportPost",
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },
                                    "data": jsonData,

                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("Report Sent Sucssfully")

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)


                                    },
                                    error: function(xhr, status, err) {
                                        let buttondiv = $(button).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "red")
                                        $(errorspan).text(xhr.responseJSON.error)

                                        setTimeout(function() {
                                            let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    }
                                })
                            });


                            //request of block button
                            $(`.blockbutton`).click(function(e) {
                                e.preventDefault();
                                userId = $(this).attr("data-user-id");
                                let blockbutton = $(this)
                                let blockObj = {
                                    "blocked_user_id": userId
                                }
                                let jsonData = JSON.stringify(blockObj);

                                $.ajax({
                                    "method": "POST",
                                    "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                                    "xhrFields": {
                                        "withCredentials": true
                                    },
                                    "headers": {
                                        "Content-Type": "application/json",
                                        "ngrok-skip-browser-warning": "69420",
                                        "Accept-Language": language
                                    },


                                    success: function(data, st, xhr) {
                                        console.log(data);
                                        let buttondiv = $(blockbutton).parent()[0];
                                        let errordiv = $(buttondiv).next('div')[0]
                                        let errorspan = $(errordiv).find('span')[0];
                                        $(errorspan).css("color", "green")
                                        $(errorspan).text("User is blocked")
                                        setTimeout(function() {
                                            let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                            $(Cancelbutton).trigger('click');
                                        }, 2000)

                                    },
                                    error: function(xhr, status, err) {
                                        if (xhr.status == 400) {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text(xhr.responseJSON.error)


                                        } else {
                                            let buttondiv = $(blockbutton).parent()[0];
                                            let errordiv = $(buttondiv).next('div')[0]
                                            let errorspan = $(errordiv).find('span')[0];
                                            $(errorspan).css("color", "red")
                                            $(errorspan).text("Something went wrong, please try again")

                                        }


                                    }
                                })

                            });
                            isRequestInProgress = false;
                            console.log("at end " + isRequestInProgress)
                            $(window).scrollTop(scrollPosition - 100);
                        }
                    },
                    error: function(xhr, status, err) {
                        $(".home-posts").append("<h2>Some thing went wrong please try again later</h2>")
                        isRequestInProgress = false;

                    }
                })


            }

        }
    })();
}


function getArticlePostsOnChange() {


    (async() => {
        let pageIndex = 1;
        let apiUrl = await GetServerDomain();;
        let language;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }



        // request when university changes

        $(".home-posts").html(" ");
        idlist = [];

        cartegoryValue = $(".casetype").val();
        sortValue = $("#sorting").val();

        $.ajax({
            "method": "GET",
            "url": apiUrl + `/api/Dentists/GetArticles?Size=2&ArticleCategoryId=${cartegoryValue}&sortBy=${sortValue}`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            "data": {},
            beforeSend: function() {
                $(".skeleton-loading").removeClass("d-none")
            },
            success: function(data, st, xhr) {
                console.log(data);
                console.log(governateValue);

                if (data.length == 0) {

                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-grey">There is no posts with the condtions you chossed</h1>`);
                    $(".skeleton-loading").addClass("d-none")
                } else {

                    $(".home-posts").html(``);
                    for (var counter = 0; counter < data.length; counter++) {
                        idlist.push(data[counter].postId)

                        $(".home-posts").append(`<div class="home-post" id="${data[counter].postId}">
                        <div class="mb-30 post-body d-flex flex-column p-30 bg-white  rad-10">
                            <div class="post-head d-flex justify-content-between">
                                <div class="post-user-info d-flex flex-row">
                                    <div class="user-image rad-half mr-10">
                                        <img src="../imgs/profilepic.svg" class = "profile${data[counter].postId} rad-half" alt="" style="max-width: 100%;">
                                    </div>
                                    <div class="post-info d-flex flex-column">
                                        <div class="d-flex usernames align-center">
                                            <span class="fs-rem-14 fw-bold name">${data[counter].userInfo.fullName}</span><span class="username fs-rem-12 c-grey">@${data[counter].userInfo.username}</span></div>
                                     <span class="user-case fw-bold c-blue fs-rem-12">${data[counter].dentistInfo.academicDegree}</span>
                                        <span class="user-mohafza c-grey fs-rem-10">${data[counter].dentistInfo.university}</span>
                                        <div>
                                            <span class="post-time c-grey fs-rem-10 mr-px-5">${data[counter].timeWritten}</span><span class="fs-rem-10 c-grey mr-px-5 edited">Edited at</span><span class="editedtime${data[counter].postId} edited fs-rem-10 c-grey">8</span></div>
                                        <div class="casetype-bg p-1 txt-c w-fit case-type-rad"><span class="case-type c-white casetype-bg fs-rem-11  overflow-hidden" title = "${data[counter].category}" >${data[counter].category}</span></div>
                                    </div>
                                </div>
                                <div class="more-about-post d-flex flex-column align-items-end">
                                    <img src="../imgs/more.svg" class="moreimg cur-point" style="width: 30px; max-width: 35px;">
                                    <ul class="p-10 dropbutton-bg mt-px-5 d-none">
                                        <li class="p-10 share-links${data[counter].postId} share-links">Share via</li>
                                        <!-- share moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none sharemodal " data-bs-toggle="modal" data-bs-target="#exampleModal${data[counter].postId}">
                                                Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered">
                                                <div class="modal-content sharemodal-bg">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title c-white" id="exampleModalLabel${data[counter].postId}">Share</h5>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="social-media-icons row flex-row p-20">
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point share-icon post1" style="width: fit-content;">
                                                                <a class="whatsapp${data[counter].postId}" target="_blank"> <img src="../imgs/what's-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="facebook-share${data[counter].postId}" target="_blank"> <img src="../imgs/facebook-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                            <div class="col-6 col-md-3 p-0 p-1 cur-point  share-icon" style="width: fit-content;">
                                                                <a class="twitter-share${data[counter].postId}" target="_blank" > <img src="../imgs/twitter-share.svg" alt="" style="max-width: 100%;"></a>
                                                            </div>
                                                        </div>

                                                        <div class=" social-link cur-point mt-20 w-100 p-px-5 d-flex align-center justify-content-between" data-post-id ="${data[counter].postId}">
                                                            <input class="overflow-hidden cur-point w-80 copied-link " readonly id="share-link${data[counter].postId}"  data-post-id ="${data[counter].postId}">
                                                            <span class="copy cur-point">Copy</span>

                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 report">report</li>

                                        <!-- report moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal100${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal100${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel100${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                    <div class="modal-body reportmodaldiv w-70 case-bg">
                                                        <div class="d-flex ">
                                                            <p>Report <span class="reporteduser c-grey">@${data[counter].userInfo.username}’s post</span></p>
                                                        </div>
                                                        <div>
                                                            <form>


                                                                <div class="mb-3 w-100">

                                                                    <textarea  placeholder="The reason of report" class="form-control reportarea${data[counter].postId}" id="exampleFormControlTextarea2${data[counter].postId}" rows="10"></textarea>

                                                                </div>

                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <input type="submit" class="btn btn-primary reportbuton rad-25 p-30 shadow" data-post-id="${data[counter].postId}">
                                                                    <button type="button" class="btn btn-secondary rad-25 reportbutoncancel shadow" data-bs-dismiss="modal">Cancel</button>
                                                                </div>
                                                                <div class = "mt-30 ">
                                                                <span class="reporterror  txt-c  fs-rem-14 d-block"></span>    
                                                                </div>

                                                                
                                                            </form>
                                                        </div>


                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <li class="p-10 block  lastli">block</li>
                                        <!-- block moadale -->

                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-primary d-none blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000${data[counter].postId}">
                                            Launch demo modal
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal1000${data[counter].postId}" tabindex="-1" aria-labelledby="exampleModalLabel1000${data[counter].postId}" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                <div class="modal-content rad-20">

                                                    <div class="modal-body">
                                                        <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername">@${data[counter].userInfo.username}</span> ?</p>
                                                    </div>
                                                    <div class="modal-footer d-flex justify-content-evenly">
                                                        <button type="button" class="btn btn-primary blockbutton   rad-25 p-30 shadow " data-user-id="${data[counter].userInfo.userId}">Yes</button>
                                                        <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel shadow" data-bs-dismiss="modal">No</button>

                                                    </div>
                                                    <div class = "mt-30 mb-20">
                                                    <span class = "blockerror blockerror c-red txt-c fs-rem-14 d-block"></span>    
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </ul>
                                </div>
                            </div>
                            <div class="post-text">
                                 <div class="d-flex justify-content-between mb-20 ">
                                    <h3 class="post-title">${data[counter].title}</h3>
                                    
                                </div>
                                <p class="m-0 d-inline post-description" style="white-space: pre; text-wrap:wrap">${data[counter].body}</p><span class="cur-point seemore">... See more</span>
                            </div>
                            <div class="post-images post-images${data[counter].postId}">
                                <div class=" d-flex w-100 mt-40 justify-content-center">
                                  

                                         <div id="carouselExampleControls" class="carousel slide w-100" data-bs-ride="carousel">
                                            <div class="carousel-inner images${data[counter].postId} ">
                                              
                                               
                                            </div>
                                            <button class="carousel-control-prev carousel-control-prev${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Previous</span>
                                            </button>
                                            <button class="carousel-control-next carousel-control-next${data[counter].postId}" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span class="visually-hidden">Next</span>
                                            </button>
                                            </div>

                               

                                </div>

                            </div>
                            <div class="post-call mt-40">
                                <div class="w-full d-flex justify-content-between align-center">
                                    <div class="likes">
                                        <i class="fa-solid fa-hands-clapping  fs-rem-30" style="color: #0e8388;"></i><span class="numoflikes fw-bold fs-rem-25 ml-10">${data[counter].likes}</span>
                                    </div>
                                    <a href = "post.html?Id=${data[counter].postId}">
                                        <div class="comments">
                                        <i class="fa-regular fa-comment fa-flip-horizontal fs-rem-30" style="color: #0e8388;"></i><span class="numofcomments fw-bold fs-rem-25 ml-10">${data[counter].comments}</span>
                                    </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>`)

                        // check if there is phone or not 
                        if (data[counter].phone == null) {
                            $(`.call${data[counter].postId} button`).attr('disabled', 'disabled');
                        } else {
                            $(`.call${data[counter].postId} button`).attr('title', data[counter].phone);
                        }

                        // check if Post is edited or not
                        if (data[counter].timeUpdated == null) {
                            $(".edited").css("display", "none");
                        } else {
                            $(`editedtime${data[counter].postId}`).text(data[counter].timeUpdated)
                        }

                        // check if user have profile pic or not
                        if (data[counter].userInfo.profilePicture == null) {} else {
                            $(`.profile${data[counter].postId}`).attr("src", `data:image/png;base64,${data[counter].userInfo.profilePicture}`);
                        }

                        //check if user have images and display it
                        if (data[counter].images == null || data[counter].length == 0) {
                            $(`.images${data[counter].postId}`).css("display", "none");
                        } else {
                            for (var i = 0; i < data[counter].images.length; i++) {
                                let activeClass2 = i == 0 ? "active" : " ";
                                console.log(i)
                                $(`.images${data[counter].postId}`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data[counter].images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                            }
                        }

                        if (data[counter].images.length == 1) {

                            $(`.carousel-control-prev${data[counter].postId}`).addClass('d-none');
                            $(`.carousel-control-next${data[counter].postId}`).addClass('d-none');
                        }



                        let everyPostId = $(`#share-link${data[counter].postId}`).attr("data-post-id");
                        $(`#share-link${data[counter].postId}`).val(window.location.href + `#${everyPostId}`);


                        var link = encodeURI(window.location.href + `#${everyPostId}`);
                        var msg = encodeURIComponent('Hey, I found this article');
                        var title = encodeURIComponent('Article or Post Title Here');

                        var fb = document.querySelector(`.facebook-share${data[counter].postId}`);
                        fb.href = `https://www.facebook.com/share.php?u=${link}`;

                        var twitter = document.querySelector(`.twitter-share${data[counter].postId}`);
                        twitter.href = `http://twitter.com/share?&url=${link}&text=${msg}&hashtags=javascript,programming`;

                        var whatsapp = document.querySelector(`.whatsapp${data[counter].postId}`);
                        whatsapp.href = `https://api.whatsapp.com/send?text=${msg}: ${link}`;


                    }
                    // end of for loop






                    $(".social-link").click(function(e) {
                        let copiedinput = $(this).find('input')[0];
                        copiedinput.select();
                        document.execCommand('copy');
                        copiedinput.blur();

                    })




                    //enable tolltip of bootstrap
                    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
                    var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
                        return new bootstrap.Tooltip(tooltipTriggerEl)
                    })

                    //   facebook seemore effect 
                    var showMoreLinks = document.querySelectorAll('.seemore');
                    var maxChars = 150;
                    showMoreLinks.forEach(link => {
                        var postText = link.closest('.post-text');
                        var postDescription = postText.querySelector('.post-description');
                        var descriptionText = postDescription.textContent.trim();
                        var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';
                        if (descriptionText.length <= maxChars) {
                            link.style.display = 'none';
                        } else {
                            postDescription.textContent = truncatedText;
                        }
                        link.addEventListener('click', (event) => {
                            event.preventDefault();
                            if (postDescription.textContent === truncatedText) {
                                postDescription.textContent = descriptionText;
                                link.textContent = 'Show less';
                            } else {
                                postDescription.textContent = truncatedText;
                                link.textContent = 'See more';
                            }
                        });
                    });

                    $(".moreimg").click(function() {
                        $(this).toggleClass("rotate-90");
                        $(this).next("ul").toggleClass("d-none");
                    })

                    $(`.share-links`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.block`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })

                    $(`.report`).click(function() {
                        $(this).next(`button`).trigger("click");
                    })


                    //request of report button
                    $(`.reportbuton`).click(function(e) {
                        e.preventDefault();
                        let postId = $(this).attr("data-post-id");
                        let parentofButton = $(this).parent();
                        let perviosDiv = parentofButton.prev()[0];
                        let textarea = $(perviosDiv).find('textarea')[0];
                        let reason = $(textarea).val();

                        let button = $(this);

                        console.log(reason);
                        console.log(postId);
                        let reportObj = {
                            "reported_post_id": postId,
                            "reason": reason
                        }

                        let jsonData = JSON.stringify(reportObj);

                        if (reason.length == 0 || reason == null) {
                            delete reportObj.reason
                        }
                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/ReportPost",
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },
                            "data": jsonData,

                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("Report Sent Sucssfully")

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)


                            },
                            error: function(xhr, status, err) {
                                let buttondiv = $(button).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "red")
                                $(errorspan).text(xhr.responseJSON.error)

                                setTimeout(function() {
                                    let Cancelbutton = $(button).next(`.reportbutoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            }
                        })
                    });


                    //request of block button
                    $(`.blockbutton`).click(function(e) {
                        e.preventDefault();
                        userId = $(this).attr("data-user-id");
                        let blockbutton = $(this)
                        let blockObj = {
                            "blocked_user_id": userId
                        }
                        let jsonData = JSON.stringify(blockObj);

                        $.ajax({
                            "method": "POST",
                            "url": apiUrl + "/api/Common/BlockUser?blocked_user_id=" + userId,
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },


                            success: function(data, st, xhr) {
                                console.log(data);
                                let buttondiv = $(blockbutton).parent()[0];
                                let errordiv = $(buttondiv).next('div')[0]
                                let errorspan = $(errordiv).find('span')[0];
                                $(errorspan).css("color", "green")
                                $(errorspan).text("User is blocked")
                                setTimeout(function() {
                                    let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel`)[0];
                                    $(Cancelbutton).trigger('click');
                                }, 2000)

                            },
                            error: function(xhr, status, err) {
                                if (xhr.status == 400) {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text(xhr.responseJSON.error)


                                } else {
                                    let buttondiv = $(blockbutton).parent()[0];
                                    let errordiv = $(buttondiv).next('div')[0]
                                    let errorspan = $(errordiv).find('span')[0];
                                    $(errorspan).css("color", "red")
                                    $(errorspan).text("Something went wrong, please try again")

                                }


                            }
                        })

                    });
                }
            },
            error: function(xhr, status, err) {
                if (xhr.status == 500) {
                    $(".home-posts").html(`<h1 class = "txt-c mt-40 fs-20 c-red">There is some thing wrong , please try again later </h1>`);
                }
            }
        })








    })();

}