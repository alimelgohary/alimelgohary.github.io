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

        $("#vpassword").keyup(function() {
            if ($("#vpassword").val() != $("#password").val()) {
                document.querySelector(".confirm-pass").style.display = "block"
            } else {
                $(".confirm-pass").css("display", "none");
            }
        })
        $(".otp-confirm-pass input[type='text']").keypress(function(event) {
            if (isNaN(event.key)) {
                event.preventDefault();
            }
        })

        $("#submit").click(function(event) {
            if ($("#vpassword").val() != $("#password").val()) {
                event.preventDefault();
            }
        })

        let apiUrl = await GetServerDomain();
        let language, otpcode, otpcode1, otpcode2, otpcode3, otpcode4, otpcode5, otpcode6;
        let errorMessage;

        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }

        $("form").submit(function(event) {
            console.log(otpcode);
            event.preventDefault();
            otpcode1 = $("#otp1").val();
            otpcode2 = $("#otp2").val();
            otpcode3 = $("#otp3").val();
            otpcode4 = $("#otp4").val();
            otpcode5 = $("#otp5").val();
            otpcode6 = $("#otp6").val();
            otpcode = otpcode1 + otpcode2 + otpcode3 + otpcode4 + otpcode5 + otpcode6;
            let obData = {
                "UsernameOrEmail": window.sessionStorage.getItem("username"),
                "Otp": otpcode,
                "newPassword": $("#vpassword").val()
            }
            let jsonData = JSON.stringify(obData);
            $.ajax({
                "method": "put",
                "url": apiUrl + "/api/Users/ForgotPassword",
                "headers": {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "69420",
                    "Accept-Language": language
                },
                "data": jsonData,
                success: function(data) {
                    $(".confirm-pass").text(data['message']);
                    $(".confirm-pass").css("display", "block");
                    $(".confirm-pass").css("color", "green");
                    setTimeout(function() {
                        window.location.href = "login.html"
                    }, 1000)
                },
                error: function(xhr, status, err) {
                    errorMessages = xhr.responseJSON;

                    console.log(xhr)
                    if (errorMessages.hasOwnProperty('errors')) {
                        if (errorMessages.errors.hasOwnProperty('UsernameOrEmail')) {
                            $(".confirm-pass").text(errorMessages.errors.UsernameOrEmail);
                            $(".confirm-pass").css("display", "block");
                            setTimeout(function() {
                                window.location.href = "forgot.html"
                            }, 1000)

                        }
                    } else if (errorMessages.hasOwnProperty('error')) {
                        $(".confirm-pass").text(errorMessages.error);
                        $(".confirm-pass").css("display", "block");
                    } else if (xhr.status == 500) {
                        $(".confirm-pass").text("Something went wrong, please try again later.");
                        $(".confirm-pass").css("display", "block");
                    }
                }
            })
        })
    })();