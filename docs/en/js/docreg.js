(async() => {
    let errorMessages;

    let apiUrl = await GetServerDomain();


    $("#fname").keypress(function(event) {
        if (isNaN(event.key) || event.keyCode == 8 || event.keyCode == 32) {

        } else {
            event.preventDefault();
        }
    })

    $(".phonenum").keypress(function(event) {
        if (isNaN(event.key)) {
            event.preventDefault();

        } else if (event.key == 0 && $(".phonenum").val().length == 0) {
            event.preventDefault();
        }
    })



    $("#vpassword").keyup(function() {
        if ($("#vpassword").val() != $("#password").val()) {
            // $(".wrong-pass").css("display", "block");
            document.querySelector(".wrong-pass").style.display = "block"

        } else {
            $(".wrong-pass").css("display", "none");
        }
    })

    $("#submit").click(function(event) {
        if ($("#vpassword").val() != $("#password").val()) {
            event.preventDefault();
        }
    })



    let language = window.localStorage.getItem("language")

    if (language == null) {
        language = "en";
    } else {
        language = window.localStorage.getItem("language");
    }

    $("form").submit(function(event) {

        event.preventDefault();

        let fullName = $("#fname").val();
        let userName = $("#username").val();
        let email = $("#email").val();
        let phoneNumber = $(".phonenum").val();
        let gender = $('input[name="gender"]:checked').val();
        let inPassword = $("#password").val();


        let obData = {
            "username": userName,
            "email": email,
            "phone": phoneNumber,
            "password": inPassword,
            "fullname": fullName,

            "gender": gender == "true",

        }
        let jsonData = JSON.stringify(obData);

        $.ajax({
            "method": "POST",
            "url": apiUrl + "/api/Users/RegisterDentist",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "Accept-Language": language
            },
            "data": jsonData,
            success: function(data, st, xhr) {
                window.sessionStorage.setItem("regeter", "reg");
                window.location.href = "otp.html"
            },
            error: function(xhr, status, err) {
                errorMessages = xhr.responseJSON;
                objofmessage = errorMessages.errors
                var key, keys = Object.keys(objofmessage);
                var n = keys.length;
                var newobj = {}
                while (n--) {
                    key = keys[n];
                    newobj[key.toLowerCase()] = objofmessage[key];
                }
                console.log(newobj);
                if (newobj.hasOwnProperty('email')) {
                    $(".emailerror").text(newobj.email[0]);
                    $(".emailerror").css('display', 'block');
                } else {
                    $(".emailerror").text(" ");
                    $(".emailerror").css('display', 'none');
                }
                if (newobj.hasOwnProperty('fullname')) {
                    $(".fullnameerror").text(newobj.fullname[0]);
                    $(".fullnameerror").css('display', 'block');
                } else {
                    $(".fullnameerror").text(" ");
                    $(".fullnameerror").css('display', 'none');
                }
                if (newobj.hasOwnProperty('username')) {
                    $(".usernameerror").text(newobj.username[0]);
                    $(".usernameerror").css('display', 'block');
                } else {
                    $(".usernameerror").text(" ");
                    $(".usernameerror").css('display', 'none');
                }
                if (newobj.hasOwnProperty('password')) {
                    $(".passworderror").text(newobj.password[0]);
                    $(".passworderror").css('display', 'block');
                } else {
                    $(".passworderror").text(" ");
                    $(".passworderror").css('display', 'none');
                }
                if (newobj.hasOwnProperty('phone')) {
                    $(".phonenumerror").text(newobj.phone[0]);
                    $(".phonenumerror").css('display', 'block');
                } else {
                    $(".phonenumerror").text(" ");
                    $(".phonenumerror").css('display', 'none');
                }


            }
        })

    })
})();