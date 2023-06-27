function getNotification() {
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
            "url": apiUrl + `/api/Common/GetNotifications?Page=1&Size=4`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            success: function(data, st, xhr) {
                console.log(data)
                if (data.length != 0) {
                    for (let i = 0; i < data.length; i++) {
                        $(".notification-ul").append(`<a href="../posts.html?id=${data[i].notificationId}">
                <li style="max-height: 93px;" class="w-full ">
                    <div class="notification-div w-full d-flex justify-content-start p-10">
                        <div class="d-flex justify-content-start align-items-start">
                            <img src="../imgs/notifacations/notifaction-${data[i].icon}.svg" alt="" class="mr-px-5">
                            <div class="d-flex flex-column w-70">
                                <span class="notifaction-user fw-bold">Fouad Mohame</span>
                                <div>
                                    <span class="notification-discribtion c-grey fs-13">${data[i].body}</span> <span class="notification-time c-grey fs-13">${data[i].Time}</span>
                                </div>
                            </div>
                        </div>
                        <div class="seen-or-not ">

                        </div>

                    </div>

                </li>
            </a>
        `)
                        if (data[i].seen == true) {
                            $(".seen-or-not").addClass("d-none");
                        }

                        console.log(data)
                    }
                }
            },

        })



    })();
}

getNotification();

function getNotificationOnScroll() {
    let pageIndex2 = 2;

    // gwr notifacion's poeple when scroll 

    $('.notification-content').scroll(function() {
        var container = $(this);
        var scrollHeight = container.prop('scrollHeight');
        var scrollTop = container.scrollTop();
        var containerHeight = container.height();

        if (scrollTop + containerHeight >= scrollHeight) {
            // User has scrolled to the bottom
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
                    "url": apiUrl + `/api/Common/GetNotifications?Page=${pageIndex2}&Size=4`,
                    "xhrFields": {
                        "withCredentials": true
                    },
                    "headers": {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "69420",
                        "Accept-Language": language
                    },
                    success: function(data, st, xhr) {
                        console.log(data)
                        if (data.length != 0) {
                            pageIndex2++;
                            for (let i = 0; i < data.length; i++) {
                                $(".notification-ul").append(`<a href="../posts.html?id=${data[i].notificationId}">
                <li style="max-height: 93px;" class="w-full ">
                    <div class="notification-div w-full d-flex justify-content-start p-10">
                        <div class="d-flex justify-content-start align-items-start">
                            <img src="../imgs/notifacations/notifaction-comment.svg" alt="" class="mr-px-5">
                            <div class="d-flex flex-column w-70">
                                <span class="notifaction-user fw-bold">Fouad Mohame</span>
                                <div>
                                    <span class="notification-discribtion c-grey fs-13">${data[i].body}</span> <span class="notification-time c-grey fs-13">${data[i].Time}</span>
                                </div>
                            </div>
                        </div>
                        <div class="seen-or-not ">

                        </div>

                    </div>

                </li>
            </a>
        `)
                                if (data[i].seen == true) {
                                    $(".seen-or-not").addClass("d-none");
                                }

                            }
                        }
                    },

                })



            })();
        }
    });



}


$(".likes").click(function() {
    $(".likes").toggleClass("c-green");
})

getNotificationOnScroll();

GetUserInfo("Dentists");
$(".logout").click(function() {
    $(".logoutbutton").trigger("click");

})
$("#log-out").click(function() {
    logOut()
})


let articleId = window.location.href.split("Id=")[1];
let commentIdList = [];




(async() => {
    let apiUrl = await GetServerDomain();
    let language;
    let notRemainnigComments = true
    if (window.localStorage.getItem("language") == null) {
        language = "en";
    } else {
        language = window.localStorage.getItem("language");
    }



    $.ajax({
        "method": "GET",
        "url": apiUrl + `/api/Public/GetPost?Id=${articleId}`,
        "xhrFields": {
            "withCredentials": true
        },
        "headers": {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Accept-Language": language
        },
        beforeSend: function() {
            $(".skeleton-loading").removeClass("d-none")
        },
        success: function(data, st, xhr) {
            console.log(data)
            $(".skeleton-loading").addClass("d-none")
            if (data.userInfo.profilePicture != null) {
                $(".user-profile").attr("src", `data:image/png;base64,${data.userInfo.profilePicture}`)
            }
            $(".usernames .name").text(data.userInfo.fullName)
            $(".usernames .username").text("@" + data.userInfo.username)
            $(".user-case").text(data.dentistInfo.academicDegree)
            $(".user-mohafza").text(data.dentistInfo.university)
            $(".case-typee").text(data.category)
            $(".post-time").text(data.timeWritten)

            $(".reportbuton").attr("data-post-id", data.postId)
            $(".blockbutton").attr("data-user-id", data.userInfo.userId)

            if (data.updated == null) {
                $(".update-post").addClass("d-none")
            } else {
                $(".editedtime").text(data.updated)
            }

            $(".post-title").text(data.title)
            $(".post-description").text(data.body)

            //check if user have images and display it
            if (data.images == null || data.images.length == 0) {
                $(`.post-images`).css("display", "none");
            } else {
                for (var i = 0; i < data.images.length; i++) {
                    let activeClass2 = i == 0 ? "active" : " ";
                    console.log(i)
                    $(`.images`).append(`<div class="carousel-item  ${activeClass2}">
                                                <img src="data:image/png;base64,${data.images[i]}" class="h-full w-full control-slider-img-width" alt="" style="max-width:100%; max-height:300px; height:300px">
                                                </div>`)
                }
            }

            $(".numofcomments").text(data.comments);
            $(".numoflikes").text(data.likes);

            if (data.comments == 0) {
                $(".post-comments").addClass("d-none");
                $(".see-more-comments").addClass("d-none");
            } else if (data.comments == 1) {
                $(".see-more-comments").addClass("d-none");
            }

            $(".blockedusername").text("@" + data.userInfo.username);
            $(".reporteduser").text("@" + data.userInfo.username + "'s post");

            $(".home-post").removeClass("d-none");









        },
        error: function(xhr, status, err) {
            console.log(xhr)
        }
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

    $.ajax({
        "method": "GET",
        "url": apiUrl + `/api/Public/GetArticleComments?Size=1&previouslyFetched=&articleId=${articleId}`,
        "xhrFields": {
            "withCredentials": true
        },
        "headers": {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Accept-Language": language
        },
        success: function(data, st, xhr) {
            console.log(data)
            if (data.length == 1) {
                commentIdList.push(data[0].commentId)

                if (data[0].userInfo.profilePicture != null) {
                    $(".post-comment-profile").attr("src", `data:image/png;base64,${data.userInfo.profilePicture}`)
                }
                $(".post-commenter-info .user").text(data[0].userInfo.fullName)
                $(".post-commenter-info .username").text("@" + data[0].userInfo.username)
                $(".post-commenter-info .comment-case").text(data[0].dentistInfo.university)
                $(".comment-body").text(data[0].body)
                $(".reporteduser-comment").text("@" + data[0].userInfo.username + "'s comment");
                $(".reportbuton-comment").attr("data-commentId", data[0].commentId);
                $(".blockedusername-comment").text("@" + data[0].userInfo.username);
                $(".blockbutton-comment").attr("data-userId", data[0].userInfo.userId);
                $(".commented-time").text(data[0].timeWritten);

            }


        },
        error: function(xhr, status, err) {
            console.log(xhr)
        }
    })

    $(".see-more-comments").click(function() {

        $.ajax({
            "method": "GET",
            "url": apiUrl + `/api/Public/GetArticleComments?Size=4&previouslyFetched=${commentIdList}&articleId=${articleId}`,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            success: function(data, st, xhr) {
                console.log(data)
                if (data.length > 0) {

                    $(".comment-block").click(function() {
                        $(this).next("button").trigger("click");
                    })
                    $(".comment-report").click(function() {
                        $(this).next("button").trigger("click");
                    })
                    $(".comment-options").click(function() {
                        $(this).next("ul").toggleClass("d-none");
                    })

                    //request of block button
                    $(`.blockbutton-comment`).click(function(e) {
                        e.preventDefault();
                        userId = $(this).attr("data-personId");
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
                                    let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel-comment`)[0];
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



                    for (var i = 0; i < data.length; i++) {
                        commentIdList.push(data[i].commentId)
                        let imageSrc = "../imgs/profilepic.svg";
                        if (data[i].userInfo.profilePicture != null) {
                            imageSrc = "data:image/png;base64," + data[i].userInfo.profilePicture
                        }



                        $(".post-comment-container").append(` <div class="post-comments d-flex w-full mt-25 ">
                                    <div class="post-comments-image rad-half mr-10" style="width: 50px; max-width:50px">
                                        <a href=""><img src=${imageSrc} class="w-full cur-point post-comment-profile" alt="" style="max-width: 100%;border-radius: 50%"></a>
                                    </div>
                                    <div class="post-comments-info w-full p-10 rad-10 nav-bg">
                                        <div class="head-of-post-commnent d-flex justify-content-between mb-20">
                                            <div class="post-commenter-info d-flex flex-column l-1-1">
                                                <div>
                                                    <span class="user">${data[i].userInfo.fullName}</span><span class="username c-grey fs-14">@${data[i].userInfo.username}</span>
                                                </div>
                                                <span class="c-blue fs-14 comment-case comment-case${data[i].commentId}">${data[i].dentistInfo.university}</span>
                                                <span class="commented-time c-grey fs-14">${data[i].timeWritten}</span>
                                            </div>
                                            <div class="comment-more  d-flex flex-column  ">
                                                <img src="../imgs/comment-more.svg" class="w-full comment-options cur-point " alt="" style="max-width: 30px;">
                                                <ul class="p-10 dropbutton-bg mt-px-5 d-none p-absolute">


                                                    <li class="p-10 comment-report">report</li>

                                                    <!-- report moadale -->

                                                    <!-- Button trigger modal -->
                                                    <button type="button" class="btn btn-primary d-none comment-reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal${data[i].commentId}">
                                            Launch demo modal
                                                </button>

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal${data[i].commentId}" tabindex="-1" aria-labelledby="exampleModalLabel300" aria-hidden="true">
                                                        <div class="modal-dialog modal-lg">
                                                            <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                                <div class="modal-body reportmodaldiv w-70 case-bg">
                                                                    <div class="d-flex ">
                                                                        <p>Report <span class="reporteduser-comment c-grey">@${data[i].userInfo.username}’s Comment</span></p>
                                                                    </div>
                                                                    <div>
                                                                        <form>


                                                                            <div class="mb-3 w-100">

                                                                                <textarea required placeholder="The reason of report" class="form-control reportarea" id="exampleFormControlTextarea${data[i].commentId}" rows="10"></textarea>

                                                                            </div>

                                                                            <div class="modal-footer d-flex justify-content-evenly">
                                                                                <input type="submit" class="btn btn-primary reportbuton-comment rad-25 p-30 shadow" data-commentId = "${data[i].commentId}">
                                                                                <button type="button" class="btn btn-secondary rad-25 reportbutoncancel-comment shadow" data-bs-dismiss="modal">Cancel</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>


                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <li class="p-10 comment-block lastli">block</li>
                                                    <!-- block moadale -->

                                                    <!-- Button trigger modal -->
                                                    <button type="button" class="btn btn-primary d-none comment-blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1${data[i].commentId}">
                                            Launch demo modal
                                                </button>

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal1${data[i].commentId}" tabindex="-1" aria-labelledby="exampleModalLabel3000" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                            <div class="modal-content rad-20">

                                                                <div class="modal-body">
                                                                    <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername-comment">@${data[i].userInfo.username}</span> ?</p>
                                                                </div>
                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <button type="button" class="btn btn-primary blockbutton-comment rad-25 p-30 shadow" data-personId="${data[i].userInfo.userId}">Yes</button>
                                                                    <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel-comment shadow" data-bs-dismiss="modal">No</button>

                                                                </div>
                                                                <div class = "d-flex"><span class = "txt-c fw-bold fw-20"></span></div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </ul>
                                            </div>
                                        </div>

                                        <div class="comment-info w-full">
                                            <span class="w-full comment-body">${data[i].body}</span>
                                        </div>


                                    </div>

                                </div> `)

                        if (data[i].dentistInfo.university == null) {
                            $(`.comment-case${data[i].commentId}`).addClass("d-none")
                        }

                    }


                    console.log(commentIdList)

                    $(".comment-block").click(function() {
                        $(this).next("button").trigger("click");
                    })
                    $(".comment-report").click(function() {
                        $(this).next("button").trigger("click");
                    })

                    $(".comment-options").click(function() {
                        $(this).next("ul").toggleClass("d-none");
                    })

                    //request of block button
                    $(`.blockbutton-comment`).click(function(e) {
                        e.preventDefault();
                        userId = $(this).attr("data-personId");
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
                                    let Cancelbutton = $(blockbutton).next(`.blockbuttoncancel-comment`)[0];
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


                } else {
                    if (notRemainnigComments) {
                        $(".see-more-comments").addClass("d-none");
                        $(".post-comment-container").after(`<p class ="fw-bold mt-20 fs-20 txt-c c-black"> There is no more comments to show </p>`)
                        notRemainnigComments = false;
                    }
                }




            },
            error: function(xhr, status, err) {
                console.log(xhr)
            }
        })


    })


    $(".sendcomment").keyup(function(e) {

        if (e.key == "Enter") {
            let commentt = $(".sendcomment").val()
            $(".post-comment-container").append(` <div class="post-comments d-flex w-full mt-25 ">
                                    <div class="post-comments-image rad-half mr-10" style="width: 50px; max-width:50px">
                                        <a href=""><img src="../imgs/profilepic.svg" class="w-full cur-point post-comment-profile" alt="" style="max-width: 100%;border-radius: 50%"></a>
                                    </div>
                                    <div class="post-comments-info w-full p-10 rad-10 nav-bg">
                                        <div class="head-of-post-commnent d-flex justify-content-between mb-20">
                                            <div class="post-commenter-info d-flex flex-column l-1-1">
                                                <div>
                                                    <span class="user">Fouad</span><span class="username c-grey fs-14">@mo20</span>
                                                </div>
                                                <span class="c-blue fs-14 comment-case comment-case">Undergraduate</span>
                                                <span class="commented-time c-grey fs-14">1s</span>
                                            </div>
                                            <div class="comment-more  d-flex flex-column  ">
                                                <img src="../imgs/comment-more.svg" class="w-full comment-options cur-point " alt="" style="max-width: 30px;">
                                                <ul class="p-10 dropbutton-bg mt-px-5 d-none p-absolute">


                                                    <li class="p-10 comment-report">report</li>

                                                    <!-- report moadale -->

                                                    <!-- Button trigger modal -->
                                                    <button type="button" class="btn btn-primary d-none comment-reportmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1000">
                                            Launch demo modal
                                                </button>

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal1000" tabindex="-1" aria-labelledby="exampleModalLabel300" aria-hidden="true">
                                                        <div class="modal-dialog modal-lg">
                                                            <div class="modal-content rad-20 d-flex justify-content-center align-center p-50 reportmodal-bg">

                                                                <div class="modal-body reportmodaldiv w-70 case-bg">
                                                                    <div class="d-flex ">
                                                                        <p>Report <span class="reporteduser-comment c-grey">@’s Comment</span></p>
                                                                    </div>
                                                                    <div>
                                                                        <form>


                                                                            <div class="mb-3 w-100">

                                                                                <textarea required placeholder="The reason of report" class="form-control reportarea" id="exampleFormControlTextarea" rows="10"></textarea>

                                                                            </div>

                                                                            <div class="modal-footer d-flex justify-content-evenly">
                                                                                <input type="submit" class="btn btn-primary reportbuton-comment rad-25 p-30 shadow" data-commentId = "">
                                                                                <button type="button" class="btn btn-secondary rad-25 reportbutoncancel-comment shadow" data-bs-dismiss="modal">Cancel</button>
                                                                            </div>
                                                                        </form>
                                                                    </div>


                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <li class="p-10 comment-block lastli">block</li>
                                                    <!-- block moadale -->

                                                    <!-- Button trigger modal -->
                                                    <button type="button" class="btn btn-primary d-none comment-blockmodal" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                            Launch demo modal
                                                </button>

                                                    <!-- Modal -->
                                                    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel3000" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered blockmodaldiv">
                                                            <div class="modal-content rad-20">

                                                                <div class="modal-body">
                                                                    <p class="fw-bold txt-c">Are you sure you want to block<span class="c-grey blockedusername-comment">@</span> ?</p>
                                                                </div>
                                                                <div class="modal-footer d-flex justify-content-evenly">
                                                                    <button type="button" class="btn btn-primary blockbutton-comment rad-25 p-30 shadow" data-personId="">Yes</button>
                                                                    <button type="button" class="btn btn-secondary rad-25 blockbuttoncancel-comment shadow" data-bs-dismiss="modal">No</button>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </ul>
                                            </div>
                                        </div>

                                        <div class="comment-info w-full">
                                            <span class="w-full comment-body">${commentt}</span>
                                        </div>


                                    </div>

                                </div> `)

            $(".sendcomment").val("")
        }
    })

})();