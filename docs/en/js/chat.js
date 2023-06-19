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
                            <img src="imgs/notifacations/notifaction-comment.svg" alt="" class="mr-px-5">
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

getNotificationOnScroll();