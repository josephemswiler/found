//Check if client is mobile browser
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//
let isMobile = false

    window.checkIfMobile = function () {

        (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) isMobile = true
        })(navigator.userAgent || navigator.vendor || window.opera)
        return isMobile
    }

//Document ready
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

let actionOpen = false

$(function () {
    if (!checkIfMobile())
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
        case '/profile':
            $('[data-path="profile"]').addClass('text-blue')
            break
        case '/index':
            $('[data-path="index"]').addClass('text-blue')
            $('.found-row').hide()
            $('.search-btn-row').show()
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
            $('.profile-wrapper').fadeIn()
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

    $.post(`/api/talk/${cardId}`, {
        text: div.text()
    })

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

    $('.profile-wrapper').fadeIn()

    if ($('.outer-card').css('display') === 'none')
        $('.outer-card').fadeIn()
})

//Shop screen
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.shop-btn', function () {

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
    $('.profile-wrapper').fadeOut()
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

//AJAX calls
//-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-//

$(document).on('click', '.shop-search-btn', function () {
    $.get(`/search/${$(this).attr('data-search')}`)
        .then(response => showFound())

    $('.search-btn-row').fadeOut(function () {
        $('.status-display').fadeIn()
    })
})

function showFound() {
    $('.status-display').fadeOut(function () {
        $('.found-row').fadeIn()
    })
}

$(document).on('click', '.found-btn', function() {
    setTimeout(function() {
        location.href = '/index'
      }, 1000)
})