// Get the input field and the datalist
var inputField = document.getElementById("casetype");
var datalist = document.getElementById("casetypes");
var locationField = document.getElementById("location");
var locationDatalist = document.getElementById("locations");

// Listen for form submission
var sendcasebutton = document.querySelector('.sendcasebutton');
sendcasebutton.addEventListener('click', function(event) {
    // Get the selected option from the datalist
    var optionSelected = false;
    for (var i = 0; i < datalist.options.length; i++) {
        if (inputField.value == datalist.options[i].value) {
            optionSelected = true;
            break;
        }
    }

    var optionSelected2 = false;
    for (var i = 0; i < locationDatalist.options.length; i++) {
        if (locationField.value == locationDatalist.options[i].value) {
            optionSelected2 = true;
            break;
        }
    }


    // If the selected option is not in the datalist, prevent form submission
    if (!optionSelected && caregoryDisplay) {
        event.preventDefault();
        $(".casetypeerror").text(" Please select a valid case type.");
        $(".casetypeerror").css("display", "block");

    } else {
        $(".casetypeerror").text("");
        $(".casetypeerror").css("display", "none");
    }

    if (!optionSelected2 && locationDisplay) {
        event.preventDefault();
        $(".locationerror").text(" Please select a valid location.");
        $(".locationerror").css("display", "block");

    } else {
        $(".locationerror").text("");
        $(".locationerror").css("display", "none");
    }
});

var locationDisplay = false;

$('input[name="case"]').change(function() {
    if ($('input[name="case"]:checked').val() == "requestapatient") {
        $(".Requestapatient").css('display', 'block');
        $(".loction").css('display', 'none');
        $(".img-of-case img").attr("src", "../imgs/addcase.svg");
        $(".Casephone").addClass("d-none");

        $(".img-of-case span").text("Add Case")
        $("#location").removeAttr("required");
        locationDisplay = false;
        selectedCase = "Common/AddCase";
        caregoryDisplay = true
    } else {
        $(".Requestapatient").css('display', 'block');
        $(".loction").css('display', 'block');
        $(".img-of-case img").attr("src", "../imgs/sharecase.svg");
        $(".Casephone").removeClass("d-none");
        $(".img-of-case span").text("Share Case")
        $("#location").attr("required", "true");
        locationDisplay = true;
        selectedCase = "Dentists/AddSharing"
        caregoryDisplay = true
    }
})

$(".selectcaseimages").click(function() {
    $(".selectcaseimage").trigger("click");
    $(".image-preview").html(``)
})

$(".selectcaseimages2").click(function() {
    $(".selectcaseimage2").trigger("click");
})

// make see more sacebook effect
var showMoreLinks = document.querySelectorAll('.seemore');

var maxChars = 150;

showMoreLinks.forEach(link => {
    var postText = link.closest('.post-text');
    var postDescription = postText.querySelector('.post-description');
    var descriptionText = postDescription.textContent.trim();
    var truncatedText = descriptionText.substring(0, maxChars).trim() + '...';

    if (descriptionText.length <= maxChars) {
        link.style.display = 'none';
    } else {
        postDescription.textContent = truncatedText;
    }

    link.addEventListener('click', (event) => {
        event.preventDefault();
        if (postDescription.textContent === truncatedText) {
            postDescription.textContent = descriptionText;
            link.textContent = 'Show less';
        } else {
            postDescription.textContent = truncatedText;
            link.textContent = 'See more';
        }
    });
});
// enable tooltip of bootstrap 
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})


// thisssssssssssssssssssss 
//  display selected images in container 
function displayImages(input) {
    if (input.files && input.files.length > 0) {
        var previewContainer = document.querySelector('.image-preview');

        var imagesToDelete = [];

        for (var i = 0; i < input.files.length; i++) {
            var reader = new FileReader();
            reader.onload = function(e) {
                var image = new Image();
                var deleteMark = document.createElement('div');

                deleteMark.style.position = "absolute";
                deleteMark.style.left = "2px";
                deleteMark.style.top = "0px";
                deleteMark.classList.add('delete-mark');
                var imageWrapper = document.createElement('div');
                imageWrapper.style.position = "relative";
                $(imageWrapper).addClass("mr-10")
                $(imageWrapper).addClass("mb-10")
                imageWrapper.classList.add('image-wrapper');
                imageWrapper.appendChild(image);
                imageWrapper.appendChild(deleteMark);
                image.src = e.target.result;
                $(imageWrapper).css('max-width', '100px');
                $(imageWrapper).css('max-height', '100px');
                $(imageWrapper).css('width', '100px');
                $(imageWrapper).css('height', '100px');
                $(image).css('max-width', '100%');
                $(image).css('max-height', '100%');
                $(image).css('width', '100px');
                $(image).css('height', '100px');
                previewContainer.prepend(imageWrapper);
                $(imageWrapper).addClass('col-12 col-md-6');

                console.log('Input files:', input.files);
                imageInputSize = input.files.length;

                deleteMark.onclick = function() {
                    var index = Array.from(previewContainer.children).indexOf(imageWrapper);
                    files = Array.from(input.files);
                    imagesToDelete.push(imageWrapper);
                    imageWrapper.remove();

                    if (index !== -1) {
                        files.splice(files.length - 1 - index, 1);
                        dataTransfer = new DataTransfer();
                        files.forEach((file) => {
                            dataTransfer.items.add(file);
                        });
                        input.files = dataTransfer.files;
                    }
                    console.log('Input files:', input.files);
                }
            }
            reader.readAsDataURL(input.files[i]);
        }
    }
}

$(".moreimg").click(function() {
    $(this).toggleClass("rotate-90")
    $(this).next("ul").toggleClass("d-none")
})