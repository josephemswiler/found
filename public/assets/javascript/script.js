let actionOpen = false

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('html, body').animate({
        scrollTop: 0
    })

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault()
            sumbitTalk($('.add-talk-btn'))
        }
    })

    $('.nav-link').children('i').removeClass('text-blue')

    switch (window.location.pathname) {
        case '/':
            $('[data-path="profile"]').addClass('text-blue')
            break
        case '/index':
            $('[data-path="index"]').addClass('text-blue')
            setHeight()
            break
        case '/about':
            $('[data-path="about"]').addClass('text-blue')
            break
    }
})

//Dynamically set max-height of list based on window size
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
function setHeight() {
    let targetHeight = $(window).height() - 86
    $('.body-wrapper').css('height', targetHeight)
    $('.outer-card').css('max-height', targetHeight)
    shopHeight($('.shop-btn'))
    return targetHeight
}

$(window).resize(function () {
    setHeight()
    talkHeight($('.talk-btn'))
    if (actionOpen) {
        if ($(window).width() > 767) {
            $('.selected').fadeIn()
        } else {
            $('.selected').fadeOut()
        }
    }
})

//Talk screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.talk-btn', function () {

    let cardId = $(this).closest('.outer-card').attr('data-id')

    $(`[data-id="talk-${cardId}"]`)

    $(this).closest('.outer-card').removeClass('unselected-item').addClass('selected')
    $('.unselected-item').fadeOut()

    actionOpen = true

    if ($(window).width() <= 767) {
        smScreen()
    }

    talkHeight($(this))

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(this).closest('.top-row').find('.outer-talk-card').fadeIn()

    $(this).closest('.top-row').find('.talk-input').focus().select()

    let history = $(this).closest('.top-row').find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)
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
    $(this).closest('.outer-card').removeClass('selected').addClass('unselected-item')
    $('.unselected-item').fadeIn()
    actionOpen = false
    if ($('.outer-card').css('display') === 'none')
        $('.outer-card').fadeIn()
})

$(document).on('click', '.close-action', function () {
    $('.outer-talk-card').fadeOut()
    $('.outer-shop-card').fadeOut()
    $('.back-btn').parent().fadeOut(function () {
        $(this).closest('.top-row').find('.action-col').fadeIn()
    })

    $(this).closest('.top-row').find('.selected').removeClass('selected').addClass('unselected-item')
    $('.unselected-item').fadeIn()
    actionOpen = false
    if ($('.outer-card').css('display') === 'none')
        $('.outer-card').fadeIn()
})

//Shop screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.shop-btn', function () {

    console.log($('[data-position="1"]').position())

    console.log($('[data-position="2"]').position())

    $(this).closest('.outer-card').removeClass('unselected-item').addClass('selected')
    $('.unselected-item').fadeOut()

    actionOpen = true

    if ($(window).width() <= 767) {
        smScreen()
    }

    shopHeight($(this))

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(this).closest('.top-row').find('.outer-shop-card').fadeIn()
})

function shopHeight(button) {

    if ($('.selected').css('display') === 'none')
        return

    let targetHeight = button.closest('.outer-card').find('.inner-card-img')[0].offsetHeight

    let outerTargetHeight = button.closest('.outer-card').height()

    button.closest('.top-row').find('.shop-card').css('height', targetHeight)

    button.closest('.top-row').find('.outer-shop-card').css('height', outerTargetHeight)
}

function smScreen() {
    $('.outer-card').fadeOut()
}