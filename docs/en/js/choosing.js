   $(".patient").click(function() {
       $(".patient #patient").prop("checked", true);
   })
   $(".doctor").click(function() {
       $(".doctor #doctor").prop("checked", true);
   })

   $(".submit").click(function(event) {
       event.preventDefault();
       var radioValue = $("input[name='case']:checked").val();
       console.log(radioValue);
       if (radioValue == "patient") {
           window.location.href = "patient/patreg.html";
       } else {
           window.location.href = "doctor/docreg.html";
       }
   })