(async() => {
    let apiUrl = await GetServerDomain();
    let errorMessages;
    let language = window.localStorage.getItem("language")
    if (language == null) {
        language = "en";
    }
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
    $(".fidphoto").click(function() {
        $(".idphoto").trigger("click");
    })
    $(".fidphoto2").click(function() {
        $(".idphoto2").trigger("click");
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
            url: apiUrl + "/api/Dentists/RequestVerification",
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
                let errorobj = xhr.responseJSON.errors

                if (xhr.responseJSON.error == "You have already requested verification") {
                    window.location.href = "wait.html"
                } else if (errorobj.hasOwnProperty('NatIdPhoto')) {
                    $(".idphotoerror").text(errorobj.NatIdPhoto[0]);
                    $(".idphotoerror").css('display', 'block');
                } else if (errorobj.hasOwnProperty('ProofOfDegreePhoto')) {
                    $(".universityiderror").text(errorobj.ProofOfDegreePhoto[0]);
                    $(".universityiderror").css('display', 'block');
                } else if (xhr.status == 401) {
                    $(".universityiderror").text("You are not authorithed");
                    $(".universityiderror").css('display', 'block');
                    setTimeout(function() {
                        window.location.replace(".../login.html");
                    }, 1000)
                } else if (xhr.status == 500) {
                    $(".servererror").text(xhr.responseJSON.error);
                    $(".servererror").css('display', 'block');
                }
            }
        });
    })
})();