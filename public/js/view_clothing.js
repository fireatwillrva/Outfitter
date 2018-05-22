var outfit = {}
var slideIndex = 1;
var slideshowMaker = function (type, data) {
    dataArray = []
    for (var i = 0; i < data.length; i++) {
        dataArray.push(data[i]);
        var slide = `<div class="mySlides" >
        <div class="numbertext">${i+1} / ${data.length}</div>
        <img src="${data[i].img_url}" height="300" width="200"><br>
        <div class="text"><p>${data[i].name}</p>
        <div><button class = "btn btn-success add" id = "${type}${i}">Add to outfit</button></div>
        </div><br>
        
      </div>`
        $("#slideshow-container").append(slide);

    }
    showSlides(slideIndex);

};
var getByType = function (type) {
    $.get(`/api/clothing_item/${userid.uid}/${type}`, function (data) {
        $("#slideshow-container").empty();
        slideshowMaker(type, data);
    });
}
var outfitPlacer = function (id) {

    var i = id.replace(/\D/g, '');
    var type = id.replace(/[0-9]/g, '');
    var key = outfit[type]
    key = dataArray[i];
    console.log(key.img_url)
    $(`.${type}`).attr("src", `${key.img_url}`);
    outfit[type].id = key.id
}
var outfitGenerator = function (outfit) {
    var literal = `<div class="row" class="outfit">

    <div class="col-5">
            <img src = "${outfit.toptwo.img_url}" height = "100" width = "75" class = "toptwo">
            <img src = "${outfit.bag.img_url}"height = "100" width = "75" class = "bag">
            <img src = "${outfit.shoes.img_url}"height = "100" width = "75" class = "shoes">
            <img src = "${outfit.hat.img_url}" height = "100" width = "75" class = "hat">
    </div>

    <div class="col-7">
            <img src = "${outfit.top.img_url}" height = "180" width = "167" class = "top">
            <img src = "${outfit.bottom.img_url}" height = "210" width = "167" class = "bottom">
    </div>

</div>`
    $("#outfitDiv").append(literal);
}

var outfitMaker = function (topId, bottomId, shoesId, hatId, bagId, jacketId) {

    $.when(
        $.get(`/api/clothing_item/${topId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),

        $.get(`/api/clothing_item/${bottomId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),

        $.get(`/api/clothing_item/${shoesId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),
        $.get(`/api/clothing_item/${hatId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),

        $.get(`/api/clothing_item/${bagId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),

        $.get(`/api/clothing_item/${jacketId}`, function (data) {
            var type = data[0].type
            outfit[type] = data[0]
        }),

    ).then(function () {
        outfitGenerator(outfit);

    });
}






$(document).ready(function () {

    $(document).on("click", ".add", function () {

        outfitPlacer($(this).attr("id"))
    });


    setTimeout(function () {
        getByType("top");
    }, 500);
    outfitMaker(1, 2, 3, 4, 5, 6)
    $("#exampleFormControlSelect1").change(function () {
        var type = $('#exampleFormControlSelect1 :selected').val();
        getByType(type);

    });
    $("#indexSubmit").click(function () {
        outfit.user_id = userid.uid;
        outfit.name = $('#name').val();
        console.log(outfit);
        $.post("/api/outfits/", {
            top_id: outfit.top.id,
            bottom_id: outfit.bottom.id,
            shoes_id: outfit.shoes.id,
            bag_id: outfit.bag.id,
            toptwo_id: outfit.toptwo.id,
            hat_id: outfit.hat.id,
            name: outfit.name,
            user_id: outfit.user_id
        });
    });
});

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}