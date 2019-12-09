/* Настройки слайдера */
$(document).on("ready", function() {
    $(".regular").slick({
        mobileFirst: true,
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [{
                breakpoint: 990,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true
                }
            },
            {
                breakpoint: 1250,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true
                }
            }
        ]
    });
});

/* Анимация формы */
function animate(options) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {

    let timeFraction = (time - start) / options.duration;
    if (timeFraction > 50) {timeFraction = 50;}

    let progress = formingTiming(timeFraction);

    options.draw(progress);

    if (timeFraction < 50) {
      requestAnimationFrame(animate);
    }

  });
}

function formingTiming(timeFraction) { //функция расчёта времени
  return Math.pow(timeFraction, 2)
}

function bounce(timeFraction) { //функция расчёта времени
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

function show() { {
    callingUs.style.display = "inline";

    animate({
      duration: 200,
      timing: formingTiming(bounce),
      draw(progress) {
        if(progress < 75) {callingUs.style.top = progress-50 + "%";}
        else {callingUs.style.top = 75-50+ "%";}
      }
    });
  };
}

/* Анимация размытия фона*/
function getContent(url, addEntry) {
    let inter;
    if (addEntry === true) {
        let mql = window.matchMedia("(orientation: portrait)");
        if(mql.matches) {
            $(".popupAgr").fadeIn();
            $(".cont").css("filter", "blur(5px)"); //размытия экрана (mobile)
        }
        else {
            window.requestAnimationFrame(show); //вызов анимации формы через RequestAnimationFrame
            let i = 0;
            inter = setInterval(function(){ //плавное размытие экрана
                i++;
                if(i != 15) {$(".cont").css("filter", "blur(" + i + "px)");}
                else {clearInterval(inter);}
            }, 50);
        }
        window.history.pushState({ //редактирование ссылки
            page: 1
        }, null, "?#popup");
    }
    else {
        let mql = window.matchMedia("(orientation: portrait)");
        if(mql.matches) {
            $(".popupAgr").fadeOut();
            $(".cont").css("filter", "none"); clearInterval(inter); //рассеивание размытия (mobile)
        }
        else{
            $(".popupAgr").fadeOut();
            let i = 15;
            inter = setInterval(function(){ //рассеивание размытия экрана
                i--;
                if(i != 0) {$(".cont").css("filter", "blur(" + i + "px)");}
                else {$(".cont").css("filter", "none"); clearInterval(inter);}
            }, 50);
        }
        window.history.replaceState({ //редактирование ссылки
            page: 0
        }, null, "index.html");
    }
}

/* Отправка формы */
function send() {
    sendAjaxForm("CallUs", "https://api.slapform.com/yvasilin@gmail.com");
};

function sendAjaxForm(ajax_form, url) {
    if (!validate()) {
        alert("Не заполнены обязательные поля!");
        return;
    }

    $.ajax({
        url: url,
        method: "POST",
        data: $(ajax_form).serialize(),
        success: function (response) { //Обнуление формы
            document.forms.CallUs.fio.value = "";
            document.forms.CallUs.phone.value = "";
            document.forms.CallUs.region.value = "";
            document.forms.CallUs.mess.value = "";
            alert("Мы скоро свяжемся с вами!");
        },
        error: function (response) {
            alert("Ошибка. Данные не отправлены.");
        }
    });
}

function validate() { // Проверка заполнения полей
    return document.forms.CallUs.fio.value != ""
        && document.forms.CallUs.phone.value != ""
        && document.forms.CallUs.region.value != "";
}

/* Main */
$("document").ready(function() {
    $( ".PCUnseen .sub-menu-button" ).click(function(){
      let mql = window.matchMedia("(orientation: portrait)");
      if(mql.matches) {
        $( ".PCUnseen .navbar-wrapper .sub-menu" )
        .css({opacity: 0.0, visibility: "visible"})
        .animate({
          opacity: 1, // прозрачность элемента
        }, {
          duration: 1500, // продолжительность анимации
          easing: "linear", // скорость анимации
          queue: false
        });
      }
    });
    $(document).mouseup(function (){
      let mql = window.matchMedia("(orientation: portrait)");
      if(mql.matches) {
        $(".PCUnseen .navbar-wrapper .sub-menu").css({visibility: "hidden"});
      }
    });
    $(".call").on("click", function(e) {
        e.preventDefault();
        let href = $(this).attr("href");
        getContent(href, true);
    });

    $(".closeButton").click(function() {
        $(".popupAgr").fadeOut();
        let mql = window.matchMedia("(orientation: portrait)");
        if(mql.matches) {
            $(".cont").css("filter", "none");
        }
        else {
            let i = 15;
            inter = setInterval(function(){ //рассеивание размытия экрана
                i--;
                if(i != 0) {$(".cont").css("filter", "blur(" + i + "px)");}
                else {$(".cont").css("filter", "none"); clearInterval(inter);}
            }, 50);
            window.history.back();
        }
    });
});

window.addEventListener("popstate", function(e) {
    getContent(location.pathname, false);
});