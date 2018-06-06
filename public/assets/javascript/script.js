$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('html, body').animate({
        scrollTop: 0
    })
    setHeight()
    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault()
            sumbitTalk($('.add-talk-btn'))
        }
    });
})

//Dynamically set max-height of list based on window size
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
function setHeight() {
    let targetHeight = $(window).height() - 86
    $('.body-wrapper').css('height', targetHeight)
    return targetHeight
}

$(window).resize(function () {
    setHeight()
})

//Talk screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.talk-btn', function () {
    let targetHeight = setHeight()

    $(this).closest('.top-row').css('height', targetHeight)

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(this).closest('.top-row').find('.talk-card').css('max-height', targetHeight - 76)

    $(this).closest('.top-row').find('.outer-talk-card').css('height', targetHeight).fadeIn()

    $(this).closest('.top-row').find('.talk-input').focus().select()
})


$(document).on('click', '.add-talk-btn', function () {
    sumbitTalk($(this))
})

function sumbitTalk(button) {
    if (button.closest('.outer-talk-card').find('.talk-input').val().trim() === '')
        return

    let currentHeight = button.closest('.outer-talk-card').find('.talk-card').height()

    let div = $('<div>')
        .css('display', 'none')
        .addClass('talk-block mt-3 text-right bg-pink')
        .text(button.closest('.outer-talk-card').find('.talk-input').val().trim())

    button.closest('.outer-talk-card').find('.talk-card').animate({
        height: currentHeight + 53
    }, 300, function () {
        $('.talk-history').append(div)
        div.fadeIn()
    })

    let history = button.closest('.outer-talk-card').find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)

    button.closest('.outer-talk-card').find('.talk-input').val('')
}

$(document).on('click', '.back-btn', function () {
    $('.outer-talk-card').fadeOut()
    $('.outer-shop-card').fadeOut()
    $(this).fadeOut(function () {
        $(this).closest('.row').children('.action-col').fadeIn()
    })
})