/*Start Drop Down Language*/
    $(".dropdown dt").mouseover(function() {
        $(this).parent().addClass('hover');
    });
    $(".dropdown dt").mouseout(function() {
        $(this).parent().removeClass('hover');
    });
    $(".dropdown dt").click(function() {
        $(this).next().children().toggle();
        $(this).parent().toggleClass('active');
    });

    $(".dropdown dd ul li").click(function() {
        var text = $(this).html();
        $(this).parent().parent().prev().html(text);
        $(this).parent().parent().parent().removeClass('active');
        $(this).parent().hide();
        if (event.target !== this) {
               $(this).parent().parent().parent().removeClass('active');
        }
    });
/*End Drop Down Language*/

/*Start gift popup*/
var newList=$('<div class="popup"><div class="gift"><button class="close_btn">×</button><div class="gift_inner"><span class="gift-from">John White</span><span class="gift-text">gave you a</span><span class="gift-title">free lottery</span><a href="all-lotteries.html"><img src="assets/images/ticket.jpg" alt="" class="gift-img"></a><span class="gift-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi, optio.</span><a href="all-lotteries.html" class="button">Play Now</a></div></div></div>');

$( document ).ready(function() {
    setTimeout(() => {
        $('.baner').append(newList);
        $(".gift .close_btn").click(function() {
            $(this).parent().parent().remove();
            $("body").removeClass('lock');
        });
        setTimeout(() => {
            $(".gift").addClass('end');
            $(".gift_inner").css('display','flex');
            $(".gift_inner").css('width','100%');
            $(".gift_inner").css('opacity','1');
            if ($( ".gift" ).hasClass( 'end' )){

                var duration = 2 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 5 };

                function randomInRange(min, max) {
                  return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function() {
                  var timeLeft = animationEnd - Date.now();

                  if (timeLeft <= 0) {
                    return clearInterval(interval);
                  }

                  var particleCount = 50 * (timeLeft / duration);

                  // since particles fall down, start a bit higher than random
                  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);

                    var canvas = document.getElementsByClassName('.gift');
                // you should  only initialize a canvas once, so save this function
                // we'll save it to the canvas itself for the purpose of this demo
                    canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
                  confetti({
                  particleCount: 100,
                  startVelocity: 50,
                  spread: 360,
                  ticks: 100,
                  gravity: 0.5,
                  decay: 0.9,
                  scalar: 1.2,
                });
            } else{
            }

        }, 1300);
        $('.popup').click(function(event) {
           if (event.target == this) {
               $(this).remove();
               $('body').removeClass('lock');

               var duration = 0 * 1000;
                var animationEnd = Date.now() + duration;
                var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 5 };

                function randomInRange(min, max) {
                  return Math.random() * (max - min) + min;
                }

                var interval = setInterval(function() {
                  var timeLeft = animationEnd - Date.now();

                  if (timeLeft <= 0) {
                    return clearInterval(interval);
                  }

                  var particleCount = 0 * (timeLeft / duration);

                  // since particles fall down, start a bit higher than random
                  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                }, 250);
           }
        });
    }, 1000);
});

/*End Drop gift popup*/



/*Menu nav toggle*/
$("#nav_toggle").on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("active");
        $(".nav").toggleClass("active");
        $(".account").toggleClass("active");
//        $('body').toggleClass('lock');

});

    /*Collapse*/
   $("[data-collapse]").on("click", function (event) {
        event.preventDefault();

        var $this = $(this),
            blockId = $(this).data('collapse');

        $this.toggleClass("active");
   })

/* select */
    $('.select').on("click", function (event) {
        event.preventDefault();

        $('.select_body').toggleClass("active");

   })

/* password */
function myFunction() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

    /* pey method */
   $('#first_choice').on("click", function (event) {
        event.preventDefault();

        $(this).addClass("active");
        $('#first_form').css('display','flex');
       $('#second_choise').removeClass("active");
        $('#second_form').css('display','none');

   })
   $('#second_choise').on("click", function (event) {
        event.preventDefault();

        $(this).addClass("active");
        $('#second_form').css('display','flex');
        $('#first_choice').removeClass("active");
        $('#first_form').css('display','none');

   })

    /* withdraw */
   $('#withdraw').on("click", function (event) {
        event.preventDefault();

        $(this).addClass("active");
        $('#withdraw_form').css('display','block');
       $('#transactions').removeClass("active");
        $('#transactions_form').css('display','none');

   })
   $('#transactions').on("click", function (event) {
        event.preventDefault();

        $(this).addClass("active");
        $('#transactions_form').css('display','block');
        $('#withdraw').removeClass("active");
        $('#withdraw_form').css('display','none');

   })

        /* personal_information */
$('#personal_information').on("click", function (event) {
    event.preventDefault();

    $(this).addClass("active");
   $('#address_information').removeClass("active");
   $('#login_information').removeClass("active");
   $('#card_information').removeClass("active");

    $('#personal_information_form').css('display','block');
    $('#address_information_form').css('display','none');
    $('#login_information_form').css('display','none');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#address_information').on("click", function (event) {
    event.preventDefault();

    $(this).addClass("active");
   $('#personal_information').removeClass("active");
   $('#login_information').removeClass("active");
   $('#card_information').removeClass("active");

    $('#personal_information_form').css('display','none');
    $('#address_information_form').css('display','block');
    $('#login_information_form').css('display','none');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#login_information').on("click", function (event) {
    event.preventDefault();

    $(this).addClass("active");
   $('#address_information').removeClass("active");
   $('#personal_information').removeClass("active");
   $('#card_information').removeClass("active");

    $('#personal_information_form').css('display','none');
    $('#address_information_form').css('display','none');
    $('#login_information_form').css('display','block');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#card_information').on("click", function (event) {
        event.preventDefault();

        $(this).addClass("active");
       $('#address_information').removeClass("active");
       $('#login_information').removeClass("active");
       $('#personal_information').removeClass("active");

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','flex');
        $('#card_information_form').css('display','none');
        $('#card_information_filled').css('display','none');

   })
$('.add_card_link').on("click", function (event) {
        event.preventDefault();

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','none');
        $('#card_information_form').css('display','block');
        $('#card_information_filled').css('display','none');

   })
$('#add_card').on("click", function (event) {
        event.preventDefault();

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','none');
        $('#card_information_form').css('display','none');
        $('#card_information_filled').css('display','block');

   })

    /* error */
    $( ".personality_error" ).hover( function () {

        $('.error_text').css('opacity','1');
      }, function() {
        $('.error_text').css('opacity','0');
      }
    );

    /*mobil width 375px*/
function mobilFunction(x) {
  if (x.matches) { // Если медиа запрос совпадает

      /* pey method */
    $('#first_choice').on("click", function (event) {
        event.preventDefault();

        //$(this).addClass("active");
        $('.discount').css('display','none');
        $('.paymethod_mobil_title').css('display','none');
        $('.payment_method_choice').css('display','none');

        $('.payment_back').css('display','flex');
        $('#first_form').css('display','flex');
        $('#second_choise').removeClass("active");
        $('#second_form').css('display','none');
   })

    $('#second_choise').on("click", function (event) {
        event.preventDefault();

        //$(this).addClass("active");
        $('.discount').css('display','none');
        $('.paymethod_mobil_title').css('display','none');
        $('.payment_method_choice').css('display','none');

        $('.payment_back').css('display','flex');
        $('#second_form').css('display','flex');
        $('#first_choice').removeClass("active");
        $('#first_form').css('display','none');
   })

      /* payment_back button */
        $('.payment_back').on("click", function (event) {
        event.preventDefault();

        $('.discount').css('display','flex');
        $('.paymethod_mobil_title').css('display','flex');
        $('.payment_method_choice').css('display','block');
        $('.payment_back').css('display','none');
        //$('#first_choice').removeClass("active") ;
        $('#first_form').css('display','none');
        //$('#second_choise').removeClass("active") ;
        $('#second_form').css('display','none');

        $('.personal_information_title').css('display','none');
        $('.personal_help_link').css('display','none');
        $('.personal_information_left').css('display','block');

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','none');
        $('#card_information_form').css('display','none');
        $('#card_information_filled').css('display','none');


        $('#withdraw_form').css('display','none');
        $('#transactions_form').css('display','none');
   })

    /* withdraw */
   $('#withdraw').on("click", function (event) {
        event.preventDefault();

        $('.payment_back').css('display','block');
        $('.personal_help_link').css('display','block');
        $('.personal_information_left').css('display','none');

        $('#withdraw_form').css('display','block');
        $('#transactions').removeClass("active");
        $('#transactions_form').css('display','none');

   })
   $('#transactions').on("click", function (event) {
        event.preventDefault();

        $('.payment_back').css('display','block');
        $('.personal_help_link').css('display','block');
        $('.personal_information_left').css('display','none');

        $('#transactions_form').css('display','block');
        $('#withdraw').removeClass("active");
        $('#withdraw_form').css('display','none');

   })


              /* personal_information */
$('#personal_information').on("click", function (event) {
    event.preventDefault();

    $('.payment_back').css('display','block');
    $('.personal_information_title').css('display','block');
    $('.personal_help_link').css('display','block');
    $('.personal_information_left').css('display','none');

    $('#personal_information_form').css('display','block');
    $('#address_information_form').css('display','none');
    $('#login_information_form').css('display','none');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#address_information').on("click", function (event) {
    event.preventDefault();

    $('.payment_back').css('display','block');
    $('.personal_information_title').css('display','none');
    $('.personal_help_link').css('display','block');
    $('.personal_information_left').css('display','none');

    $('#personal_information_form').css('display','none');
    $('#address_information_form').css('display','block');
    $('#login_information_form').css('display','none');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#login_information').on("click", function (event) {
    event.preventDefault();

    $('.payment_back').css('display','block');
    $('.personal_information_title').css('display','none');
    $('.personal_help_link').css('display','block');
    $('.personal_information_left').css('display','none');

    $('#personal_information_form').css('display','none');
    $('#address_information_form').css('display','none');
    $('#login_information_form').css('display','block');
    $('#card_information_empty').css('display','none');
    $('#card_information_form').css('display','none');
    $('#card_information_filled').css('display','none');

})
$('#card_information').on("click", function (event) {
        event.preventDefault();

        $('.payment_back').css('display','block');
        $('.personal_information_title').css('display','none');
        $('.personal_help_link').css('display','block');
        $('.personal_information_left').css('display','none');

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','block');
        $('#card_information_form').css('display','none') ;
        $('#card_information_filled').css('display','none');

   })
$('.add_card_link').on("click", function (event) {
        event.preventDefault();

        $('.payment_back').css('display','block');
        $('.personal_information_title').css('display','none');
        $('.add_card_title').css('display','block');
        $('.personal_help_link').css('display','block');
        $('.personal_information_left').css('display','none');

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','none');
        $('#card_information_form').css('display','block');
        $('#card_information_filled').css('display','none');

   })
$('#add_card').on("click", function (event) {
        event.preventDefault();

        $('.payment_back').css('display','block');
        $('.personal_information_title').css('display','none');
        $('.personal_help_link').css('display','block');
        $('.personal_information_left').css('display','none');

        $('#personal_information_form').css('display','none');
        $('#address_information_form').css('display','none');
        $('#login_information_form').css('display','none');
        $('#card_information_empty').css('display','none');
        $('#card_information_form').css('display','none');
        $('#card_information_filled').css('display','block');

   })

} else {
   $('.payment_back').css('display','none');
  }
}

var x = window.matchMedia("(max-width: 275px)")
mobilFunction(x) // Вызов функции прослушивателя во время выполнения
x.addListener(mobilFunction) // Присоединить функцию прослушивателя при изменении состояния

    /*sms code input*/
$('.number_input').on('keyup', function (e) {
  let value = $(this).val();
  let len = value.length;
  let curTabIndex = parseInt($(this).attr('tabindex'));
  let nextTabIndex = curTabIndex + 1;
  let prevTabIndex = curTabIndex - 1;
  if (len >= 2) {
    $(this).val(value.substr(0, 2));
    $('[tabindex=' + nextTabIndex + ']').focus();
  } else if (len == 0 && prevTabIndex !== 0) {
    $('[tabindex=' + prevTabIndex + ']').focus();
  }
});



/*Picker*/

/* Lines collapse*/
$(document).ready(function() {
    $('.lines_item').on('click', linesCollapse);

});

function linesCollapse(){
    $('.lines_item').not($(this).next()).removeClass("active");
    $(this).toggleClass("active");
    $('.lines_choose').not($(this).next()).slideUp(500);
    $(this).next().slideToggle(500);
    $(this).next().css('display','flex');
//    $('.linenumber').not($(this).next()).removeClass("active");

}

/*Сlear Line*/
$('.lines_clear').on("click", function (event) {
        event.preventDefault();
        $(this).prev().children().next().children().empty();
        $('.linenumber').removeClass("active");
   })

/*Picker number*/
$('.linenumber').on("click", function (event) {
        event.preventDefault();

        $(this).toggleClass("active");
        var clickNumber = $(this).text();
            console.log(clickNumber);
//        var line = $('.lines_item.active').children('.lines_list').children().each(function(){
//            if ($(this).text == '') {
//            $(this).html == '1';
//            }
//        });
//console.log(line);

   })

/*Audio play*/

/*Audio lines*/
jQuery(function($){
$('.lines_item').on('click', function(){
$('#selectinglines')[0].play()
});
$('#selectinglines').hide();
});

/*Audio lines*/
jQuery(function($){
$('.linenumber').on('click', function(){
$('#selectingnumber')[0].play()
});
$('#selectingnumber').hide();
});

/* All loteries redirect */

jQuery(function($){
$('.lotteries_item').on('click', function(){
window.location.href = "promo-picker.html"});
});

/*Start Modal Group Change*/
$(".withdraw_method-button").click(function() {
        $("#add_bank").addClass('active');
        $("body").addClass('lock');
    });

$(".close_btn").click(function() {
        $("#add_bank").removeClass('active');
        $("#verify_bank").removeClass('active');
        $("body").removeClass('lock');
    });

$(".modal_cancel").click(function() {
        $("#add_bank").removeClass('active');
        $("#verify_bank").removeClass('active');
        $("body").removeClass('lock');
    });

function AccountInfo(){
    $("#choice_bank").prop("checked",!0);
    $("#choice_iban").prop("checked",!1);
    $("#iban").prop("disabled",!0);
    $("#bank_code").prop("disabled",!1);
    $("#branch_number").prop("disabled",!1);
    $("#account_number").prop("disabled",!1)
}

function IBANFun(){
    $("#bank_code").prop("disabled",!0);
    $("#branch_number").prop("disabled",!0);
    $("#account_number").prop("disabled",!0);
    $("#iban").prop("disabled",!1)
}

$('#balance_withdraw').on('click', function(){
window.location.href = "successfull.html"});
/*End Modal Group Change*/

/*Start Add Bank Details*/
$("#bank_submit").click(function() {
    if($('.modal_group #bank_code').val().length == 0 || $('.modal_group #branch_number').val().length == 0 || $('.modal_group #account_number').val().length == 0){
        alert("Kindly enter all information!!!!")
    }
    else{
//        document.querySelector('.bank_details').innerHTML += `
//            <div class="bank_item">
//                <div class="bank_info">
//                    <span class="bank_country">
//                        ${document.querySelector('#modal_country dt a').innerHTML}
//                    </span>
//                    <ul class="bank_list">
//                        <li class="bank_text">     ${document.querySelector('#bank_code').previousElementSibling.innerHTML}
//                            <b>
//                                ${document.querySelector('#bank_code').value}
//                            </b>
//                        </li>
//                        <li class="bank_text">
//                        ${document.querySelector('#branch_number').previousElementSibling.innerHTML}
//                            <b>
//                                ${document.querySelector('#branch_number').value}
//                            </b>
//                        </li>
//                        <li class="bank_text">
//                            ${document.querySelector('#account_number').previousElementSibling.innerHTML}
//                            <b>
//                                ${document.querySelector('#account_number').value}
//                            </b>
//                        </li>
//                        <li class="bank_text">
//                            ${document.querySelector('#iban').previousElementSibling.innerHTML}
//                            <b>
//                                ${document.querySelector('#iban').value}
//                            </b>
//                        </li>
//                        <li class="bank_text">
//                            ${document.querySelector('#modal_receiver').previousElementSibling.innerHTML}
//                            <b>
//                                ${document.querySelector('#modal_receiver dt a').innerHTML}
//                            </b>
//                        </li>
//                    </ul>
//                    <span class="status status_notverified">Status:
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
//                           <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"></path>
//                       </svg>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                           <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"/>
//                       </svg>
//                       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
//                           <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path>
//                        </svg>
//                       <b>Not verified</b>
//                    </span>
//                </div>
//                <div class="bank_nav">
//                   <button class="bank_verify">Verify</button>
//                   <button class="bank_icon bank_edit">
//                       <img class="bank_img" src="assets/images/edit.svg" alt="edit">
//                   </button>
//                   <button class="bank_icon bank_delete">
//                       <img class="bank_img" src="assets/images/delete.svg" alt="delete">
//                   </button>
//                </div>
//            </div>
//        `;

        $('#add_bank').removeClass("active");
        $("body").removeClass('lock');
        }
    });

/*End Add Bank Details*/


/*Start Verify bank*/
        $(".bank_verify").click(function() {
                $("#verify_bank").addClass('active');
                $("body").addClass('lock');

            if($("#verify_submit").click(function(){
                $(this).addClass("send");
                var n,t,i;
             if(document.getElementById("identityCard").files[0]==undefined)return $("#identityCard").parent("div").children(".invalid-tooltip").show(),!1;

                if($("#identityCard").parent("div").children(".invalid-tooltip").hide(),n=new FormData,t=document.getElementById("identityCard").files[0],n.append("identityCard",t),$("#ContentPlaceHolder1_divOther").index()!=-1){
                if(document.getElementById("bankDetails").files[0]==undefined)
                        return $("#bankDetails").parent("div").children(".invalid-tooltip").show(),!1;$("#bankDetails").parent("div").children(".invalid-tooltip").hide();i=document.getElementById("bankDetails").files[0];
                }
                $('#verify_bank').removeClass("active");
                $("body").removeClass('lock');
                if($("#verify_submit").hasClass('send')){
                $(".bank_verify").parent().parent().addClass('checking');
                $(".bank_verify").addClass('bank_checking').text('Again verify?');
                $(".bank_verify").removeClass('bank_verify');
                $(".status_notverified").addClass('status_checking');
                $('.icon').attr('viewBox', '0 0 512 512');
                $('.status_notverified .icon path').attr('d', 'M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z');
                $(".status_notverified b").text('Waiting for verification');
                $(".status_notverified").removeClass('status_notverified');
                $("#verify_submit").removeClass("send");
                };
            }));
        });
        /*End Verify bank*/

        /*Start Again Verify bank*/
$(".bank_checking").click(function() {
        $("#verify_bank").addClass('active');
        $("body").addClass('lock');

    if($("#verify_submit").click(function(){
        $(this).addClass("send");
        var n,t,i;
     if(document.getElementById("identityCard").files[0]==undefined)return $("#identityCard").parent("div").children(".invalid-tooltip").show(),!1;

        if($("#identityCard").parent("div").children(".invalid-tooltip").hide(),n=new FormData,t=document.getElementById("identityCard").files[0],n.append("identityCard",t),$("#ContentPlaceHolder1_divOther").index()!=-1){
        if(document.getElementById("bankDetails").files[0]==undefined)
                return $("#bankDetails").parent("div").children(".invalid-tooltip").show(),!1;$("#bankDetails").parent("div").children(".invalid-tooltip").hide();i=document.getElementById("bankDetails").files[0];
        }
        $('#verify_bank').removeClass("active");
        $("body").removeClass('lock');
        if($("#verify_submit").hasClass('send')){
        $(".bank_checking").parent().parent().addClass('verified');
        $(".bank_checking").addClass('bank_withdraw').text('Withdraw');
        $(".bank_checking").removeClass('bank_checking');
        $(".status_checking").addClass('status_verified');
        $('.status_checking .icon path').attr('d', 'M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z');
        $(".status_checking b").text('Verified');
        $(".status_checking").removeClass('status_checking');
        $("#verify_submit").removeClass("send");
        };
    }));
});
        /*End Again Verify bank*/

        $(".bank_delete").click(function() {
            $(this).parent().parent().remove();
        });
        $('.bank_withdraw').on('click', function(){
            window.location.href = "withdraw-balance.html"
        });


/*Start UploadDocument*/
function UploadDocument(n){$("#"+n).parent("div").children(".invalid-tooltip").hide();var t=document.getElementById(n).files[0].name,i=t.substr(t.lastIndexOf(".")+1);if($.inArray(i,["jpeg","gif","png","pdf"])==-1)return $("#"+n).parent("div").children(".invalid-tooltip").show(),!1;document.getElementById("identityCard").files[0]?($("#identityCardSpan").html(document.getElementById("identityCard").files[0].name),$("#identityCardDiv").addClass("alert-success")):($("#identityCardSpan").html("Upload identity card"),$("#identityCardDiv").removeClass("alert-success"));document.getElementById("bankDetails").files[0]?($("#bankDetailsSpan").html(document.getElementById("bankDetails").files[0].name),$("#bankDetailsDiv").addClass("alert-success")):($("#bankDetailsSpan").html("Upload bank details"),$("#bankDetailsDiv").removeClass("alert-success"))}
/*End UploadDocument*/

