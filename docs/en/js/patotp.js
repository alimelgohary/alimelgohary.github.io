(async() => {

    if (!window.sessionStorage.getItem("regeter")) {
        window.location.href = "patreg.html"
    }

    let apiUrl = await GetServerDomain();
    let language = window.localStorage.getItem("language")
    if (language == null) {
        language = "en";
    }

    if (!window.localStorage.getItem("resend")) {
        $.ajax({
            "method": "PUT",
            "url": apiUrl + "/api/Users/RequestOtp",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "Accept-Language": language
            },
            "data": "{}",
            success: function(data, st, xhr) {
                window.localStorage.setItem("resend", "done");
            },
            error: function(xhr, status, err) {}
        })

    }
    let errorMessages, otpcode, otpcode1, otpcode2, otpcode3, otpcode4, otpcode5, otpcode6;


    $(".otppage input[type='text']").keypress(function(event) {

        if (isNaN(event.key)) {
            event.preventDefault();
        }
    })


    $("form").submit(function(event) {
        event.preventDefault();
        otpcode1 = $("#otp1").val();
        otpcode2 = $("#otp2").val();
        otpcode3 = $("#otp3").val();
        otpcode4 = $("#otp4").val();
        otpcode5 = $("#otp5").val();
        otpcode6 = $("#otp6").val();
        otpcode = otpcode1 + otpcode2 + otpcode3 + otpcode4 + otpcode5 + otpcode6;
        let obData = {
            "otp": otpcode

        }
        let jsonData = JSON.stringify(obData);

        $.ajax({
            "method": "PUT",
            "url": apiUrl + "/api/Users/VerifyAccount",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "Accept-Language": language
            },
            "data": jsonData,
            success: function(data, st, xhr) {


                window.location.href = "../login.html"
            },
            error: function(xhr, status, err) {

                if (xhr.status == 401) {
                    $(".wrong-pass").text("you are not authorithed");
                    $(".wrong-pass").css("display", "block");
                    setTimeout(function() {
                        window.location.href = "../login.html"
                    }, 1000)
                } else if (xhr.status == 400) {
                    $(".wrong-pass").text(xhr.responseJSON.error);
                    $(".wrong-pass").css("display", "block");
                } else if (xhr.status >= 500) {
                    $(".wrong-pass").text("Something with server went wrong , Please try again later");
                    $(".wrong-pass").css("display", "block");
                }

            }
        })

    })

    // Make resend anchor

    $(".resend").click(function(event) {

        event.preventDefault();
        $(".resend").css("pointer-events", "none")
        let minuts = 1;
        let seconds = 60;
        timer = setInterval(function() {
            seconds--
            if (seconds < 10) {
                $(".lefttime").html("0" + minuts + " " + ":" + " " + "0" + seconds + "    " + "Remaind to resend again");
            } else {
                $(".lefttime").html("0" + minuts + " " + ":" + " " + seconds + "    " + "Remaind to resend again");
            }
            if (seconds == 0) {
                seconds = 59
                if (minuts == "0") {

                    clearInterval(timer);
                    $(".lefttime").html(" ")
                    $(".resend").css("pointer-events", "all");
                    $.ajax({
                        "method": "PUT",
                        "url": apiUrl + "/api/Users/RequestOtp",
                        "xhrFields": {
                            "withCredentials": true
                        },
                        "headers": {
                            "Content-Type": "application/json",
                            "Accept-Language": language
                        },
                        "data": "{}",
                        success: function(data, st, xhr) {},
                        error: function(xhr, status, err) {}
                    })
                }
                minuts--;
            }
        }, 1000)

    })



})();