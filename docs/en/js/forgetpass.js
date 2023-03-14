   (async() => {

       let apiUrl = await GetServerDomain();
       let language;
       let errorMessage;


       // $.getJSON("../json/file.json", function(data) {

       //     apiUrl = data['apiurl'];
       // })


       if (window.localStorage.getItem("language") == null) {
           language = "en";
       } else {
           language = window.localStorage.getItem("language");
       }

       $("form").submit(function(event) {

           event.preventDefault();
           let emailName = $("input[type=text]").val();

           let obData = {
               "UsernameOrEmail": emailName,
           }
           let jsonData = JSON.stringify(obData);

           $.ajax({
               "method": "put",
               "url": apiUrl + "/api/Users/RequestOtp",
               "headers": {
                   "Content-Type": "application/json",
                   "Accept-Language": language
               },
               "data": jsonData,
               success: function(data) {
                   $(".passforget").text(data['message']);
                   $(".passforget").css("display", "block");
                   $(".passforget").css("color", "green");
                   window.sessionStorage.setItem("username", emailName);
                   setTimeout(function() {
                       window.location.href = "confirmpass.html"
                   }, 1000)
               },
               error: function(xhr, status, err) {
                   errorMessage = JSON.parse(xhr.responseText);
                   console.log(xhr)
                   let finErrorMessage;
                   if (errorMessage['error'] == null || errorMessage['error'] == undefined || errorMessage['error'].legnth < 1) {
                       finErrorMessage = errorMessage['errors']['UsernameOrEmail'][0];
                       console.log(errorMessage);
                   } else {
                       finErrorMessage = errorMessage['error'];
                       console.log(errorMessage);
                   }
                   $(".passforget").text(finErrorMessage);
                   $(".passforget").css("display", "block");

               }
           })
       })
   })();