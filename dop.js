function validate() {
    let a = document.forms["Myform"]["name"].value;
    if (a == "") {
        alert("Укажите ваше имя");
        return false;
    }
    let d = document.forms["Myform"]["phone"].value;
    if (d == "") {
        alert("Укажите ваш телефон");
        return false;
    }
    let x = document.forms["Myform"]["region"].selectedIndex;
    if (x == 0) {
        alert("Выберите регион");
        return false;
    }
}

$('#form').submit(function(e) {
    e.preventDefault();
    let a;
    if (document.forms["Myform"]["name"].value != "" && document.forms["Myform"]["phone"].value != "" && document.forms["Myform"]["region"].selectedIndex != 0)
        $.ajax({
            type: "POST",
            url: "https://formcarry.com",
            data: $(this).serialize()
        })
    if (document.forms["Myform"]["name"].value != "" && document.forms["Myform"]["phone"].value != "" && document.forms["Myform"]["region"].selectedIndex != 0) {
        a = function done() {
            $(this).find("input").val("");
            alert("Спасибо за заявку! Мы скоро свяжемся с Вами!");
            $('#form').trigger("reset");
        }
    } else {
        a = function fail() {
            alert("Что-то пошло не так");
        }
    }
    a();
    return false;
});

$('document').ready(function() {
    $('.knopochka').on('click', function(e) {
        e.preventDefault();
        let href = $(this).attr('href');
        getContent(href, true);
    });

    $('.close').click(function() {
        $('.pop_up').fadeOut();
        $('main').css('filter', 'none');
        window.history.back();
    });
});

window.addEventListener("popstate", function(e) {
    getContent(location.pathname, false);
});

function getContent(url, addEntry) {
    if (addEntry === true) {
        $('.pop_up').fadeIn();
        $('main').css('filter', 'blur(5px)');
        window.history.pushState({
            page: 1
        }, null, '?#popup');
    } else {
        $('.pop_up').fadeOut();
        $('main').css('filter', 'none');
        window.history.replaceState({
            page: 0
        }, null, 'https://egordashko.gitlab.io/agro/');
    }
}