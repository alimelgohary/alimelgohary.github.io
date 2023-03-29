(async() => {

    const inputs = document.querySelectorAll(".otp-field input");
    inputs.forEach((input, index) => {
        input.dataset.index = index;
        input.addEventListener("keyup", handleOtp);
        input.addEventListener("paste", handleOnPasteOtp);
    });

    function handleOtp(e) {
        const input = e.target;
        let value = input.value;
        let isValidInput = value.match(/[0-9a-z]/gi);
        input.value = "";
        input.value = isValidInput ? value[0] : "";
        let fieldIndex = input.dataset.index;
        if (fieldIndex < inputs.length - 1 && isValidInput) {
            input.nextElementSibling.focus();
        }
        if (e.key === "Backspace" && fieldIndex > 0) {
            input.previousElementSibling.focus();
        }
    }

    function handleOnPasteOtp(e) {
        const data = e.clipboardData.getData("text");
        const value = data.split("");
        if (value.length === inputs.length) {
            inputs.forEach((input, index) => (input.value = value[index]));
        }
    }


    let apiUrl = await GetServerDomain();
    let language = window.localStorage.getItem("language")
    if (language == null) {
        language = "en";
    }

    $.ajax({
        "method": "PUT",
        "url": apiUrl + "/api/Users/RequestOtp",
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
            window.localStorage.setItem("resend", "done");
            console.log(xhr);
            console.log(data);
        },
        error: function(xhr, status, err) {
            if (xhr.status == 401) {
                $(".wrong-pass").text("you are not authorithed");
                $(".wrong-pass").css("display", "block");
                setTimeout(function() {
                    window.location.href = "../login.html"
                }, 2000)
            } else if (xhr.status == 500) {
                $(".wrong-pass").text(xhr.responseJSON.error);
                $(".wrong-pass").css("display", "block");
            } else {
                $(".wrong-pass").text(xhr.responseJSON.error);
                $(".wrong-pass").css("display", "block");
            }
        }
    })


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
                "ngrok-skip-browser-warning": "69420",
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
                } else if (xhr.status == 500) {
                    $(".wrong-pass").text(xhr.responseJSON.error);
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
                $(".lefttime").html("0" + minuts + " " + ":" + " " + "0" + seconds + "    " + "Remained to resend again");
            } else {
                $(".lefttime").html("0" + minuts + " " + ":" + " " + seconds + "    " + "Remained to resend again");
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
                            "ngrok-skip-browser-warning": "69420",
                            "Accept-Language": language
                        },
                        "data": "{}",
                        success: function(data, st, xhr) {
                            $(".wrong-pass").text("otp sent successfully");
                            $(".wrong-pass").removeClass("c-red");
                            $(".wrong-pass").addClass("c-green");
                            $(".wrong-pass").css("display", "block");
                        },
                        error: function(xhr, status, err) {
                            $(".wrong-pass").text(xhr.responseJSON.error);
                            $(".wrong-pass").removeClass("c-green");
                            $(".wrong-pass").addClass("c-red");
                            $(".wrong-pass").css("display", "block");
                        }
                    })
                }
                minuts--;
            }
        }, 1000)
    })
})();