(async() => {
    let apiUrl = await GetServerDomain();
    let errorMessages;
    let language = window.localStorage.getItem("language")
    if (language == null) {
        language = "en";
    }
    // checking for user state when page load and redirect him
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
            console.log(data);
        },
        error: function(xhr, status, err) {
            console.log(xhr)
            if (xhr.status == 401) {
                $(".servererror").text("you are  Unauthorized ");
                $(".servererror").css("display", "block");
                setTimeout(function() {
                    window.location.href = "../login.html"
                }, 2000)
            } else if (xhr.status == 500) {
                $(".servererror").text(xhr.responseJSON.error);
                $(".servererror").css("display", "block");
            }
        }
    })


    // Load Universities from server
    $.ajax({
        "method": "GET",
        "url": apiUrl + "/api/Generic/GetUniversities",
        "headers": {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
            "Accept-Language": language
        },
        success: function(data, st, xhr) {
            for (let i = 0; i < data.length; i++) {
                let selectElem = document.querySelector("#CurrentUni");
                selectElem.innerHTML += ("<option value=" + data[i]['id'] + ">" + data[i]['name'] + "</option>");
            }
        },
        error: function(xhr, status, err) {
            let selectElem = document.querySelector("#CurrentUni");
            selectElem.innerHTML += ("<option> Some Thing went wrong try again later </option>");
        }
    })

    // when the field of input image is clicked go to the input image from form and click it
    $(".fidphoto").click(function() {
        $(".idphoto").trigger("click");
    })
    $(".fidphoto2").click(function() {
        $(".idphoto2").trigger("click");
    })

    // display the name of selected image
    $('#nationalphoto').change(function() {
        const fileName = $(this).val().split('\\').pop();
        $(".idphotoname").html("Selected image name: " + " " + "<span class = 'c-green'>" + fileName + "</span>");
    });

    $('#universityid').change(function() {
        const fileName = $(this).val().split('\\').pop();
        $(".universityidname").html("Selected image name: " + " " + "<span class = 'c-green'>" + fileName + "</span>");
    });

    // send data to API 


    $(".send").click(function() {
        if ($("#nationalphoto").val() == "") {
            $(".idphotoerror").text("this feild is required");
            $(".idphotoerror").css("display", "block");
        } else {
            $(".idphotoerror").text("");
            $(".idphotoerror").css("display", "none");
        }
        if ($("#universityid").val() == "") {
            $(".universityiderror").text("this feild is required");
            $(".universityiderror").css("display", "block");
        } else {
            $(".universityiderror").text("");
            $(".universityiderror").css("display", "none");
        }
    })

    $("form").submit(function(event) {
        event.preventDefault();


        let academicDegree = $("#acadimic-deg").val();
        let nationalId = $("#nationalphoto").prop('files')[0];
        let universityId = $("#universityid").prop('files')[0];
        let currentUni = $("#CurrentUni").val();
        const formData = new FormData();
        formData.append('universityRequested', currentUni);
        formData.append('degreeRequested', academicDegree);
        formData.append('natIdPhoto', nationalId);
        formData.append('proofOfDegreePhoto', universityId);

        $.ajax({
            url: apiUrl + "/api/Users/RequestVerification",
            method: 'POST',
            data: formData,
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {

                "Accept-Language": language
            },
            contentType: false,
            processData: false,
            success: function(response) {
                window.location.replace("wait.html");
            },
            error: function(xhr, status, error) {

                if (xhr.status == 401) {
                    $(".servererror").text("You are Unauthorized");
                    $(".servererror").css('display', 'block');
                    setTimeout(function() {
                        window.location.replace("../login.html");
                    }, 1000)
                } else if (xhr.status == 500) {
                    $(".servererror").text(xhr.responseJSON.error);
                    $(".servererror").css('display', 'block');
                } else {
                    let errorobj = xhr.responseJSON.errors

                    if (xhr.responseJSON.nextPage == "pendingVerificationAcceptance") {
                        window.location.href = "wait.html"
                    } else if (errorobj.hasOwnProperty('NatIdPhoto')) {
                        $(".idphotoerror").text(errorobj.NatIdPhoto[0]);
                        $(".idphotoerror").css('display', 'block');
                    } else if (errorobj.hasOwnProperty('ProofOfDegreePhoto')) {
                        $(".universityiderror").text(errorobj.ProofOfDegreePhoto[0]);
                        $(".universityiderror").css('display', 'block');
                    }
                }
            }
        });
    })
})();
