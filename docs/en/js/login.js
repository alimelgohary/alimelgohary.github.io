   (async() => {
       let apiUrl = await GetServerDomain();;
       let language;
       // $.getJSON("../json/file.json", function(data) {

       //     apiUrl = data['apiurl'];
       // })



       if (window.sessionStorage.getItem("login") == 'patient') {
           window.location.href = "patient/home.html";
       } else if (window.sessionStorage.getItem("login") == 'doctor') {
           window.location.href = "doctor/home.html";
       }

       if (window.localStorage.getItem("language") == null) {
           language = "en";
       } else {
           language = window.localStorage.getItem("language");
       }

       $("form").submit(function(event) {

           event.preventDefault();
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
                   "Accept-Language": language
               },
               "data": jsonData,
               success: function(data, st, xhr) {
                   console.log(data)
                   if (data['nextPage'] == 'homePatient') {
                       window.location.href = "patient/home.html";
                       window.sessionStorage.setItem("login", "patient");
                   } else if (data['nextPage'] == "pendingVerificationAcceptance") {
                       window.location.href = "doctor/docverfiy.html";
                   } else if (data['nextPage'] == 'homeDentist') {
                       window.location.href = "doctor/home.html";
                       window.sessionStorage.setItem("login", "doctor");
                   } else if (data['nextPage'] == 'verifyDentist') {
                       window.location.href = "doctor/docverfiy.html";
                       window.sessionStorage.setItem("login", "doctor");
                   }
               },
               error: function(xhr, status, err) {
                   $(".passoruser").css("display", "block");
                   console.log(xhr)

               }
           })

       })
   })();