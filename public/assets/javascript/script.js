console.log('hello world')

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('html, body').animate({
        scrollTop: 0
    })
})

//Dynamically set max-height of list based on window size
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
function setHeight() {
    let innerHeight = $(window).height() - 86
    $('.body-wrapper').css('height', innerHeight)
}
$(document).ready(setHeight())

$(window).resize(function () {
    setHeight()
})

$(document).on('click', '.talk-btn', function() {
    // $('.first-row').css('height', //here)
})