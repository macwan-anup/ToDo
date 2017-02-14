/**
 * Created by anupm on 2/4/2017.
 */
$(document).ready(function () {

/* ------- RANGE SLIDER --------- */

    var rangeSlider = document.getElementById('slider-range');

    noUiSlider.create(rangeSlider, {
        start: [ 1 ],
        step: 1,
        range: {
            'min': [  1 ],
            'max': [ 10 ]
        }
    });

/*    var editRangeSlider = document.getElementById('editSlider-range');

    noUiSlider.create(editRangeSlider, {
        start: [ 1 ],
        step: 1,
        range: {
            'min': [  1 ],
            'max': [ 10 ]
        }
    });
*/
    var taskColorCollection = [
        {id:"1.00",color:"Ocean-Sunset",hex:"#E27A3F"},
        {id:"2.00",color:"Emerald-Green",hex:"#468966"},
        {id:"3.00",color:"Honey-Pot",hex:"#BD4932"},
        {id:"4.00",color:"Gettysburg",hex:"#374140"},
        {id:"5.00",color:"Vintage-Ralph",hex:"#C77966"},
        {id:"6.00",color:"CheeseCake",hex:"#FDEEA7"},
        {id:"7.00",color:"Beach-Sky",hex:"#046380"},
        {id:"8.00",color:"Ventana-Azul",hex:"#8FB259"},
        {id:"9.00",color:"Stone-Beach",hex:"#306E73"},
        {id:"10.00",color:"Camp-Fire",hex:"#AF7575"}
    ];

    var rangeSliderValueElement = document.getElementById('slider-range-value');
    $(".noUi-handle").append($("<p/>")
        .addClass("colorNameDisplay")
        .html("hi"));
    rangeSlider.noUiSlider.on('update', function( values, handle ) {

        $(taskColorCollection).each(function () {
            if($(this)[0].id == values[handle]){
                $("p.colorNameDisplay").html($(this)[0].color);
                $("h1:first").css("background-color",$(this)[0].hex);
                $("p.colorNameDisplay").css("color",$(this)[0].hex);
            }
        });

    });

    /* ------- RANGE SLIDER --------- */
    
    
    $("button:first").click(function () {
        $("#addTask").slideToggle(800);
    });

    $("h4.lead").click(function () {
        var divRow = $(this).closest("div.row");
        if(divRow.find($(".optionTask")).length == 0){

            var optionTask = $("<div/>")
                .addClass("optionTask text-center");
            var editImage = $("<img/>")
                .attr("src","assets/res/-profile-edit-account-edit-profile-edit-user-sign-icon--icon-32.png")
                .click(function () {
                    editImageClick($(this));
                });
            var removeImage = $("<img/>")
                .attr("src","assets/res/blue-delete-button-png-29.png")
                .click(function () {
                    deleteImageClick($(this));
                });
            optionTask.append(editImage);
            optionTask.append(removeImage);

            divRow.append(optionTask);
        }
        divRow.find($(".optionTask")).slideToggle(800);
    });

    function editImageClick(thisImage){
        var todo = thisImage.closest("div.row").find("h4.lead").html();
        $("#addTask").slideDown(800);
        console.log($(this).closest("div.optionTask"))
        $(this).closest("div.row").find($(".optionTask")).slideUp("fast");
    }
    function deleteImageClick(thisImage) {
        thisImage.closest("div.row").fadeOut(1000,function () {
            $(this).remove();
        });

    }

    $("input[type=checkbox]").click(function () {
        if($(this).is(":checked")){
            console.log("checked");
        }
        else{
            console.log("not checked");
        }
    });

    $("#anup").click(function () {
        $("#editTask").slideDown();
    });

});