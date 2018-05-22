var slideIndex = 0; 
var totalslides = -1; 
var outfitArray = []; 
var outfitGenerator = function (outfit) { 
    var slide = `<div class="row outfit"> 
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
    <div class = "row"> 
    <div class = "col-12"><h2 style="margin:auto">${outfit.name}</h2></div> 
    </div> 
    </div> 
  ` 
    outfitArray.push(slide); 
    totalslides ++; 
    showSlides(slideIndex); 
} 
 
var outfitMaker = function (name, topId, bottomId, shoesId, hatId, bagId, jacketId) { 
    var outfit = {} 
    outfit.name = name 
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
        outfitGenerator(outfit)
    }); 
} 
var getOutfits = function () { 
    $.get(`/api/outfits/${userid.uid}`, function (data) { 
        for (i = 0; i < data.length; i++) { 
            slidenumber = i; 
            outfitMaker(data[i].name, data[i].top_id, data[i].bottom_id, data[i].shoes_id, data[i].hat_id, data[i].bag_id, data[i].toptwo_id) 
        } 
 
    }) 
} 
 
function showSlides(n) { 
    $("#active").empty() 
    $("#active").append(outfitArray[n]); 
} 
 
$(document).ready(function () { 
    setTimeout(function () { 
        getOutfits() 
 
    }, 500); 
    $("#left").click(function () { 
       if(slideIndex == 0) { 
           slideIndex = outfitArray.length - 1; 
           showSlides(slideIndex); 
       } else { 
           slideIndex --; 
           showSlides(slideIndex); 
       } 
    }); 
    $("#right").click(function () { 
        if(slideIndex == totalslides) { 
            slideIndex = 0; 
            showSlides(slideIndex); 
        } else { 
            slideIndex ++; 
            showSlides(slideIndex); 
        } 
    }); 
});