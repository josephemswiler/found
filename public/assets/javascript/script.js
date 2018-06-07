let actionOpen = false

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
    $('html, body').animate({
        scrollTop: 0
    })

    $(window).keydown(function (event) {
        if (event.keyCode == 13) {
            event.preventDefault()
            sumbitTalk($('.selected').attr('data-id'))
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
    }
})

//Dynamically set max-height of list based on window size
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
function setHeight() {
    let targetHeight = $(window).height() - 86
    $('.body-wrapper').css('height', targetHeight)
    $('.outer-card').css('max-height', targetHeight)
    if (actionOpen)
        shopHeight($('.selected').attr('data-id'))
    return targetHeight
}

$(window).resize(function () {
    setHeight()
    talkHeight($('.selected').attr('data-id'))
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

    $(this).closest('.outer-card').removeClass('unselected-item').addClass('selected')
    $('.unselected-item').fadeOut()

    actionOpen = true

    if ($(window).width() <= 767) {
        smScreen()
    }

    let cardId = $(this).closest('.outer-card').attr('data-id')

    talkHeight(cardId)

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(`[data-id="talk-${cardId}"]`).fadeIn()

    $(`[data-id="talk-${cardId}"]`).find('.talk-input').focus().select()

    let history = $(`[data-id="talk-${cardId}"]`).find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)
})

function talkHeight(cardId) {
    let targetHeight = setHeight()

    $('.top-row').css('height', targetHeight)

    $(`[data-id="talk-${cardId}"]`).find('.talk-card').css('max-height', targetHeight - 76)

    $(`[data-id="talk-${cardId}"]`).find('.outer-talk-card').css('height', targetHeight)

    let history = $(`[data-id="talk-${cardId}"]`).find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)
}

$(document).on('click', '.add-talk-btn', function () {
    sumbitTalk($('.selected').attr('data-id'))
})

function sumbitTalk(cardId) {
    if ($(`[data-id="talk-${cardId}"]`).find('.talk-input').val().trim() === '')
        return

    let currentHeight = $(`[data-id="talk-${cardId}"]`).find('.talk-card').height()

    let div = $('<div>')
        .css('display', 'none')
        .addClass('talk-block mt-3 text-right bg-pink')
        .text($(`[data-id="talk-${cardId}"]`).find('.talk-input').val().trim())

    $(`[data-id="talk-${cardId}"]`).find('.talk-card').animate({
        height: currentHeight + 53
    }, 300, function () {
        $(`[data-id="talk-${cardId}"]`).find('.talk-history').append(div)
        div.fadeIn()
    })

    let history = $(`[data-id="talk-${cardId}"]`).find('.talk-history')

    history.animate({
        scrollTop: history.prop('scrollHeight')
    }, 300)

    $.post(`/api/talk/${cardId}`, { text: div.text() })

    $(`[data-id="talk-${cardId}"]`).find('.talk-input').val('')
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

    // console.log($('[data-position="1"]').position())

    // console.log($('[data-position="2"]').position())

    let cardId = $(this).closest('.outer-card').attr('data-id')

    $(this).closest('.outer-card').removeClass('unselected-item').addClass('selected')
    $('.unselected-item').fadeOut()

    actionOpen = true

    if ($(window).width() <= 767) {
        smScreen()
    }

    shopHeight(cardId)

    $(this).closest('.row').children('.action-col').fadeOut(function () {
        $(this).closest('.row').find('.back-col').fadeIn()
    })

    $(`[data-id="shop-${cardId}"]`).fadeIn()
})

function shopHeight(cardId) {

    if ($('.selected').css('display') === 'none')
        return

    let targetHeight = $(`[data-id="${cardId}"]`).find('.inner-card-img')[0].offsetHeight

    let outerTargetHeight = $(`[data-id="${cardId}"]`).height()

    $(`[data-id="shop-${cardId}"]`).find('.shop-card').css('height', targetHeight)

    $(`[data-id="shop-${cardId}"]`).css('height', outerTargetHeight)
}

function smScreen() {
    $('.selected').fadeOut()
}

$(document).on('click', '.fa-star', function () {
    $(this)
        .toggleClass('text-dark far')
        .toggleClass('text-danger fas')

    $.ajax({
        method: 'PUT',
        url: `/api/item/${$(this).attr('data-id')}`,
        data: {
            favorite: $(this).hasClass('text-danger')
        }
    }).then(function (data) {})
})

$(document).on('click', '.close-item', function () {
    let cardId = $(this).attr('data-id')

    $(`[data-id="${cardId}"]`).fadeOut(function () {
        $(`[data-id="${cardId}"]`).remove()
    })
    $(`[data-id="talk-${cardId}"]`).fadeOut(function () {
        $(`[data-id="talk-${cardId}"]`).remove()
    })
    $(`[data-id="shop-${cardId}"]`).fadeOut(function () {
        $(`[data-id="shop-${cardId}"]`).remove()
    })

    if ($('.selected').length !== 0)
        location.reload()

    $.ajax({
        method: 'DELETE',
        url: `/api/item/${cardId}`,
    }).then(function (data) {})
})

$(document).on('click', '.shoe-btn', function () {
    $.get('/search/shoes')
        .then(data => showFound())
})

$(document).on('click', '.bag-btn', function () {
    $.get('/search/bags')
        .then(response => {
            console.log(response) 
            showFound()
        })
})

function showFound() {
    $('.search-btn-row').fadeOut(function () {
        $('.status-display').fadeIn(function() {
            setTimeout(function () {
                $('.status-display').fadeOut(function () {
                    $('.found-row').fadeIn()
                })
            }, 1000)
        })
    })
}

$(document).on('click', '.found-btn', function () {
    $('.found-row').fadeOut(function() {
        $('.search-btn-row').fadeIn()
    })
})