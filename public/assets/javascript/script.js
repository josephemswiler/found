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
    shopHeight($('.shop-btn'))
    return targetHeight
}

$(window).resize(function () {
    setHeight()
    talkHeight($('.talk-btn'))
})

//Talk screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.talk-btn', function () {

    talkHeight($(this))

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(this).closest('.top-row').find('.outer-talk-card').fadeIn()

    $(this).closest('.top-row').find('.talk-input').focus().select()
})

function talkHeight(button) {
    let targetHeight = setHeight()

    button.closest('.top-row').css('height', targetHeight)

    button.closest('.top-row').find('.talk-card').css('max-height', targetHeight - 76)

    button.closest('.top-row').find('.outer-talk-card').css('height', targetHeight)

    let history = button.closest('.top-row').find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)
}


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
    $(this).parent().fadeOut(function () {
        $(this).closest('.top-row').find('.action-col').fadeIn()
    })
})

$(document).on('click', '.close-action', function () {
    $('.outer-talk-card').fadeOut()
    $('.outer-shop-card').fadeOut()
    $('.back-btn').parent().fadeOut(function () {
        $(this).closest('.top-row').find('.action-col').fadeIn()
    })
})

//Shop screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.shop-btn', function () {

    shopHeight($(this))

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(this).closest('.top-row').find('.outer-shop-card').fadeIn()
})

function shopHeight(button) {

    let targetHeight = button.closest('.outer-card').find('.inner-card-img')[0].offsetHeight

    let outerTargetHeight = button.closest('.outer-card').height()

    button.closest('.top-row').find('.shop-card').css('height', targetHeight)

    button.closest('.top-row').find('.outer-shop-card').css('height', outerTargetHeight)

}