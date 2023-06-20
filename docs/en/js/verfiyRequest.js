function getVeficationReques() {
    (async() => {
        let apiUrl = await GetServerDomain();
        let language;
        let getRequestsNumber = false;
        let requestsNumber = 0;
        if (window.localStorage.getItem("language") == null) {
            language = "en";
        } else {
            language = window.localStorage.getItem("language");
        }






        $.ajax({
            "method": "GET",
            "url": apiUrl + "/api/Admins/GetVerificationRequest?number=1",
            "xhrFields": {
                "withCredentials": true
            },
            "headers": {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420",
                "Accept-Language": language
            },
            success: function(data, st, xhr) {

                console.log(data)
                let userName = data.fullName
                $(".reject-button").click(function() {
                    $(".requestRejectButton").trigger("click");
                })
                $(".accept-button").click(function() {
                    $(".requestAcceptButton ").trigger("click");
                })

                if (data) {
                    $(".requests-body").html(``);
                    $(".requests-body").append(`<div class="request-contanier p-20 bg-white rad-10">

                    <div class="row">
                        <div class="d-flex justify-content-between align-center">
                            <div class="col-8">
                                <p class="c-black fw-bold fs-rem-25 mt-px-5">Request 1 out of (${requestsNumber})</p>
                            </div>
                            <div class="d-flex justify-content-center col-4">

                                <button type="button" disabled class="btn btn-secondary next-ver-req next-bg ml-30 ">Next</button>

                            </div>
                        </div>

                    </div>

                    <div class="d-flex mt-10  align-center">
                        <img src="en/imgs/profilepic.svg" alt="" class="rad-half mr-15" style="width: 35px;height: 35px; max-width: 35px; max-height: 35px;">
                        <span class="c-black fs-15 fw-bold requsted-fullname">${data.fullName}</span>
                        <span class="c-grey fs-15 requested-username fw-bold">@${data.username}</span>
                    </div>

                    <div class="w-40 mt-35">
                        <div class="w-full row justify-content-evenly">
                            <div class="requested-uni d-flex flex-column justify-content-center col-12 col-lg-6">
                                <p class="fs-15 fw-bold txt-c ">Requested University</p>
                                <p class=" mt-px-5 selected-uni fs-15 txt-c hvr-bob cur-point" style="min-width: fit-content;">${data.requestedUniversity}</p>
                            </div>

                            <div class="requested-degree d-flex flex-column justify-content-center col-12 col-lg-6">
                                <p class="fs-15 fw-bold txt-c">Requested Degree</p>
                                <p class=" mt-px-5 selected-Degree fs-15 txt-c hvr-bob cur-point" style="min-width: fit-content;">${data.requestedDegree}</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>

                    <div class="w-full  mt-40">
                        <div class="image-contain row justify-content-evenly">
                            <div class="d-flex flex-column col-12 col-md-6">
                                <p class="fw-bold fs-20 txt-c">National Id photo</p>
                                <img class="w-full" src="data:image/png;base64,${data.images[0]}" style="max-width: 100%; height: 350px; max-height: 350px;">
                            </div>

                            <div class=" flex-column col-12 col-md-6">
                                <p class="fw-bold fs-20 txt-c">Degree photo</p>
                                <img class=" w-full" src="data:image/png;base64,${data.images[1]}" style="max-width: 100%; height: 350px; max-height: 350px;">
                            </div>


                        </div>


                    </div>

                    <div class="d-flex w-full justify-content-end">

                        <div class="button-contain mt-40 d-flex justify-content-end w-50">
                            <div class="d-flex justify-content-evenly w-full">
                                <button type="button" class="btn btn-danger  reject-button "> Reject</button>
                                <button type="button" class="btn btn-success accept-button">Accept</button>

                            </div>
                        </div>

                    </div>



                </div>
                
                
                   <button type="button" class="btn btn-primary requestAcceptButton d-none" data-bs-toggle="modal" data-bs-target="#exampleModal1">
  Launch demo modal
</button>

    <div class="modal fade acceptmodal" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel1">Accept Request</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body mt-20">
                    <p class="fs-25 fw-bold txt-c">Are you sure ?</p>
                </div>
                <div class="modal-footer mb-30 d-flex justify-content-evenly accept-modal-footer">
                    <div class ="d-flex align-items-center">
                    <button type="button" class="btn btn-success acc-buttton mr-10" data-id = "${data.userId}">Accept</button>
                    <div class="spinner-border text-primary accspin d-none" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div>
                    </div>
                    <button type="button" class="btn btn-secondary acc-close" data-bs-dismiss="modal">No</button>

                </div>
            </div>
        </div>
    </div>



    <button type="button" class="btn btn-primary requestRejectButton d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
  Launch demo modal
</button>


    <div class="modal fade acceptmodal" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel2">Reject Request</h5>
                    <button type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body mt-20">
                    <p class="fs-25 fw-bold txt-c">Are you sure ?</p>
                    <div class="mt-20">
                        <p class="p-20 fw-bold fs-20">Rejection Cause :</p>
                    </div>
                </div>
                <form class="">

                    <div class="d-flex reject-cause-option ">
                        <input type="radio" required value = "1" id="cause1" name="reject-cause" class="d-inline-block" style="width: 20px;"><label for="cause1" class="ml-10 fw-bold fs-20 cur-point">Incorrect Info</label>
                    </div>
                    <div class="d-flex  reject-cause-option">
                        <input type="radio" required value = "2" id="cause2" name="reject-cause" class="d-inline-block" style="width: 20px;"><label for="cause2" class="ml-10 fw-bold fs-20 cur-point">Photos Not Clear</label>
                    </div>
                    <div class="d-flex  reject-cause-option">
                        <input type="radio" required value = "3" id="cause3" name="reject-cause" class="d-inline-block" style="width: 20px;"><label for="cause3" class="ml-10 fw-bold fs-20 cur-point">Missing Photos</label>
                    </div>

                    <div class="modal-footer mb-30 d-flex justify-content-evenly accept-modal-footer">
                        <div class ="d-flex align-items-center">
                            <button type="submit" class="btn btn-danger rej-button  mr-10" data-id = "${data.userId}">Reject</button>
                        <div class="spinner-border text-primary rejectspin d-none " role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div>
                        <button type="button" class="btn btn-secondary rej-close" data-bs-dismiss="modal">No</button>

                    </div>
                </form>
            </div>
        </div>
    </div>
 
                `)
                    $(".reject-button").click(function() {
                        $(".requestRejectButton").trigger("click");
                    })
                    $(".accept-button").click(function() {
                        $(".requestAcceptButton ").trigger("click");
                    })

                    $(".acc-buttton").click(function(e) {
                        e.preventDefault()
                        let id = $(this).attr("data-id");
                        $.ajax({
                            "method": "PUT",
                            "url": apiUrl + "/api/Admins/AcceptVerificationRequest?Id=" + id,
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },
                            beforeSend: function() {
                                $(".accspin").removeClass("d-none");
                                $(".acc-buttton").attr("disabled", "true");

                            },
                            success: function(data, st, xhr) {
                                $(".accspin").addClass("d-none");
                                $(".acc-buttton").removeAttr("disabled");
                                $(".next-ver-req").removeAttr("disabled");
                                $(".button-contain").html(`<p class = "c-green fs-30 fw-bold">${userName} is Accepted </p>`)
                                $(".acc-close").trigger("click");





                            },
                            error: function(xhr, status, err) {
                                $(".accspin").addClass("d-none");
                                $(".acc-buttton").removeAttr("disabled");
                                console.log(xhr)
                            }
                        })

                    })



                    $(".rej-button").click(function(e) {
                        e.preventDefault();
                        let id = $(this).attr("data-id");
                        let cause = $("input[name='reject-cause']:checked").val()

                        $.ajax({
                            "method": "PUT",
                            "url": apiUrl + `/api/Admins/RejectVerificationRequest?Id=${id}&rejectReason=${cause}`,
                            "xhrFields": {
                                "withCredentials": true
                            },
                            "headers": {
                                "Content-Type": "application/json",
                                "ngrok-skip-browser-warning": "69420",
                                "Accept-Language": language
                            },
                            beforeSend: function() {
                                $(".rejectspin").removeClass("d-none");
                                $(".rej-button").attr("disabled", "true");

                            },
                            success: function(data, st, xhr) {
                                $(".rejectspin").addClass("d-none");
                                $(".rej-button").removeAttr("disabled");
                                $(".next-ver-req").removeAttr("disabled");
                                $(".button-contain").html(`<p class = "c-red fs-30 fw-bold">${userName} is Rejected </p>`)
                                $(".rej-close").trigger("click");


                            },
                            error: function(xhr, status, err) {
                                $(".rejectspin").addClass("d-none");
                                $(".rej-button").removeAttr("disabled");
                            }
                        })



                    })

                    $(".next-ver-req").click(function() {
                        getVeficationReques()
                    })



                } else {

                }





            },
            error: function(xhr, status, err) {
                $(".requests-body").html(`<h2 class = " c-black fw-bold txt-c">There is no Requests</h2>`);
            }
        })






    })();
}