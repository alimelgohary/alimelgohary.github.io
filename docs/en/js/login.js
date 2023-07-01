(async() => {
    let apiUrl = await GetServerDomain();;
    let language;
    if (window.localStorage.getItem("language") == null) {
        language = "en";
    } else {
        language = window.localStorage.getItem("language");
    }


    $(document).ready(function() {

        $.ajax({
            "method": "GET",
            "url": apiUrl + "/api/Users/IsAllowedToHome",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            "data": {},
            success: function(data, st, xhr) {
                console.log(data)
                if (data.nextPage == "homePatient") {
                    window.location.href = "patient/home.html"
                } else if (data.nextPage == "homeDentist") {
                    window.location.href = "dentist/home.html";
                } else if (data.nextPage == "homeAdmin") {
                    window.location.href = "../dashboard.html";
                }
            },
            error: function(xhr, status, err) {
                if (xhr.status == 400 && xhr.responseJSON.nextPage == "pendingVerificationAcceptance") {
                    window.location.href = "dentist/wait.html";
                } else if (xhr.status == 400 && xhr.responseJSON.nextPage == 'verifyDentist') {
                    window.location.href = "dentist/verify.html";
                }
            }
        })
    });



    $("form").submit(function(event) {
        event.preventDefault();
        $("button[type=submit]").prop("disabled", true);
        let userName = $("input[type=text]").val();
        let inPassword = $("input[type=password]").val();
        if ($("input[type=email]").val() == "admin@admin.com" && $("input[type=password]").val() == "admin") {
            window.location.href = "../dashboard.html";
        }
        let obData = {
            "usernameoremail": userName,
            "password": inPassword
        }
        let jsonData = JSON.stringify(obData);
        $.ajax({
            "method": "POST",
            "url": apiUrl + "/api/Users/Login",
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
                $("button[type=submit]").prop("disabled", false);
                console.log(data)
                console.log(xhr)
                if (data['nextPage'] == 'homePatient') {
                    window.location.href = "patient/home.html";
                } else if (data['nextPage'] == 'homeDentist') {
                    window.location.href = "dentist/home.html";
                } else if (data.nextPage == "homeAdmin") {
                    window.location.href = "../dashboard.html";
                } else if (xhr.responseJSON.nextPage == "pendingVerificationAcceptance") {
                    window.location.href = "dentist/wait.html";
                } else if (xhr.responseJSON.nextPage == 'verifyDentist') {
                    window.location.href = "dentist/verify.html";
                }
            },
            error: function(xhr, status, err) {
                $("button[type=submit]").prop("disabled", false);
                console.log(xhr)
                if (xhr.status == 400) {
                    $(".passoruser").text(xhr.responseJSON.error);
                    $(".passoruser").css("display", "block");
                } else if (xhr.status = 500) {
                    $(".passoruser").text("Something went wrong , Please try again later");
                    $(".passoruser").css("display", "block");
                }
            }
        })
    })
})();
