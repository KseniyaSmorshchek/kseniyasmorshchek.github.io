$(document).ready(function () {
    hidePrice();
    // $('#carouselReviews .carousel-item').matchHeight();
    $('.price__item').matchHeight();
    $('.btn--flowing-scroll').on('click', flowingScroll);
    $(".request__form").submit(formRequest);
    $(".request__form-field").blur(formValidationOnBlur);
    $('.nav-link').on('click', scrollToNavItem);
    $(".carousel").on("touchstart", function (event) {
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function (event) {
            var xMove = event.originalEvent.touches[0].pageX;
            if (Math.floor(xClick - xMove) > 5) {
                $(this).carousel('next');
            } else if (Math.floor(xClick - xMove) < -5) {
                $(this).carousel('prev');
            }
        });
        $(".carousel").on("touchend", function () {
            $(this).off("touchmove");
        });
    });
});

$(window).scroll(function () {
    const $header = $('.header'),
        scroll = $(window).scrollTop();

    $header.toggleClass('header--fixed', scroll >= $header.height());
    checkBlock();
});

$(window).on('resize', function () {
    // $(function () {
    //     $('#carouselReviews .carousel-item').matchHeight();
    // });
    // $(function () {
    //     $('.price__item').matchHeight();
    // });
});

function hidePrice() {
    $.get("https://freegeoip.app/json/", function (response) {
        if (response.country_code === 'BY') {
            $('.priceUa').remove();
            $('.priceBy').removeClass('d-none');
        } if (response.country_code === 'UA') {
            $('.priceBy').remove();
            $('.priceUa').removeClass('d-none');
        }
    }, "jsonp");
}

function flowingScroll(e) {
    e.preventDefault();
    const el = $(this),
        dest = el.attr('href');
    console.log(el);
    if ($(dest).length) {
        $('html').animate({
            scrollTop: $(dest).offset().top - $('.header').height()
        }, 1000);
    }
}

function formValidationOnBlur() {
    $(this).closest('.request__form-validation').toggleClass('invalid', $(this).val().length === 0);
}

function formValidationOnSubmit(e) {
    $(e.target).find('.request__form-field').each(function () {
        if ($(this).val().length === 0) {
            $(this).closest('.request__form-validation').addClass('invalid');
        }
    })
    if ($(e.target).find('.invalid').length) {
        return false;
    }
    return true;
}

function formRequest(e) {
    e.preventDefault();
    if (!formValidationOnSubmit(e)) {
        return false;
    }
    const $formEl = $(this),
        name = $formEl.find('#name').val(),
        phone = $formEl.find('#phone').val(),
        email = $formEl.find('#email').val(),
        inst = $formEl.find('#inst').val();
    contactVia = $formEl.find('input[name="contact"]:checked').val();
    TOKEN = "1986807830:AAGFYbtAFGkpwgfWa6lqK7Q8HWkqtvF6jrA",
        CHAT_ID = "-495628829",
        message = '*NEW STUDENT*\n\n\nName: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\nInstagram: ' + inst + '\nContact Via: ' + contactVia;

    $.ajax({
        type: "POST",
        url: 'https://api.telegram.org/bot' + TOKEN + '/sendMessage',
        data: {
            chat_id: CHAT_ID,
            parse_mode: 'HTML',
            text: message
        },
        success: function () {
            window.location.href = "https://school.codegirl.ru/public/course/fd13a49c-d7c6-4e21-a268-529d01fae528";

        },
        error: function (e) {
            // $errorMessage.removeClass('d-none');
        }
    });
}

function scrollToNavItem(e) {
    e.preventDefault();
    const dest = $(this).attr('href');
    console.log($(dest));
    if ($(dest).length) {
        $('html').animate({
            scrollTop: $(dest).offset().top - $('.header').height() - 20
        }, 500);
    }
}

function carouselEvent(e) {
    var xClick = event.originalEvent.touches[0].pageX;
    $(this).one("touchmove", function (event) {
        var xMove = event.originalEvent.touches[0].pageX;
        if (Math.floor(xClick - xMove) > 5) {
            $(this).carousel('next');
        } else if (Math.floor(xClick - xMove) < -5) {
            $(this).carousel('prev');
        }
    });
    $(".carousel").on("touchend", function () {
        $(this).off("touchmove");
    });
}

function checkBlock() {
    const $header = $('.header'),
        navItems = $('.nav-link'),
        scrollItems = navItems.map(function () {
            let item = $($(this).attr('href'));
            if (item.length) { return item; }
        });
    let lastId,
        fromTop = $(this).scrollTop() + $header.height() + 70,
        cur = scrollItems.map(function () {
            if ($(this).offset().top < fromTop)
                return this;
        });
    cur = cur[cur.length - 1];
    let id = cur && cur.length ? cur[0].id : "";
    if (lastId !== id) {
        lastId = id;

        navItems.removeClass("active");
        $header.find("[href='#" + id + "']").addClass("active");
    }
}