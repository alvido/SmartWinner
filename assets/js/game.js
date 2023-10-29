/*game*/

/* Lines collapse*/
$(document).ready(function () {
  $('.game__lines--wrap').on('click', gameCollapse);

});

function gameCollapse() {
  $(this).toggleClass("active");
  $('.game__lines--wrap').not($(this)).removeClass("active");
  $('.chance').not($(this).next()).slideUp(500);
  $(this).next().slideToggle(500);
  $(this).next().css('display', 'flex');
}


/*clear*/

// Получите все кнопки с классом "lines__clear"
var clearButtons = document.querySelectorAll(".lines__clear");

// Переберите каждую кнопку и добавьте обработчик события для очистки списка
clearButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    event.stopPropagation();
    
    //Найдите соседний список
    var ulCards = this.previousElementSibling;

    // Получите все элементы <i> внутри соседнего <ul>
    var iElements = ulCards.querySelectorAll("li.cards i");

    // Переберите элементы <i> и очистите их содержимое
    iElements.forEach(function (iElement) {
      iElement.textContent = "";
    });
    // Найдите ближайший элемент с классом "game__lines--wrap active" относительно кнопки
    var gameLinesCardsActive = button.closest(".game__lines--wrap.active");

    if (gameLinesCardsActive) {
      // Найдите следующий элемент с классом "chance" после "game__lines--wrap active"
      var chanceElement = gameLinesCardsActive.nextElementSibling;

      // Если следующий элемент с классом "chance" найден, выполните дальнейшие действия
      if (chanceElement && chanceElement.classList.contains("chance")) {
        // Получите все активные элементы "chance__item" внутри ближайшего "chance__list"
        var activeChanceItems = chanceElement.querySelectorAll(".chance__list .chance__item.active");

        // Переберите активные элементы и удалите у них класс "active"
        activeChanceItems.forEach(function (activeItem) {
          activeItem.classList.remove("active");
        });
      }
    }
    
  });
});



/*game number*/

// Получите все списки с классом "chance__list"
var chanceLists = document.querySelectorAll(".chance__list");

// Переберите каждый список и добавьте обработчик события
chanceLists.forEach(function (chanceList) {
  // Получите все элементы "chance__item" в текущем списке
  var chanceItems = chanceList.querySelectorAll(".chance__item");

  // Переберите каждый элемент "chance__item" в текущем списке
  chanceItems.forEach(function (chanceItem) {
    // Добавьте обработчик события "click" к текущему элементу "chance__item"
    chanceItem.addEventListener("click", function () {
      // Проверьте, есть ли у текущего элемента класс "active"
      var isActive = chanceItem.classList.contains("active");
      const valueToInsert = chanceItem.textContent;

      // Удалите класс "active" у всех элементов "chance__item" в текущем списке
      chanceItems.forEach(function (item) {
        item.classList.remove("active");

        // Если текущий элемент был активным, удалите значение из связанного элемента <i>

        var chanceList = chanceItem.closest('.chance__list');
        var suitElement = chanceList.querySelector('.suit em');

        var suitClass = suitElement.getAttribute('class');

        var activeLine = document.querySelector('.game__lines--wrap.active');

        var iElementToChange = activeLine.querySelector('em.' + suitClass).nextElementSibling;


        iElementToChange.textContent = '';
      });

      // Если текущий элемент не был активным, добавьте класс "active" к нему
      if (!isActive) {
        chanceItem.classList.add("active");
        console.log(valueToInsert);

        var chanceList = chanceItem.closest('.chance__list');
        var suitElement = chanceList.querySelector('.suit em');

        var suitClass = suitElement.getAttribute('class');

        var activeLine = document.querySelector('.game__lines--wrap.active');

        var iElementToChange = activeLine.querySelector('em.' + suitClass).nextElementSibling;

        iElementToChange.textContent = chanceItem.textContent;

      }
    });
  });
});


/*Audio lines*/
jQuery(function ($) {
  $('.game__lines--wrap').on('click', function () {
    $('#selectinglines')[0].play()
  });
  $('#selectinglines').hide();
});

/*Audio lines*/
jQuery(function ($) {
  $('.chance__item').on('click', function () {
    $('#selectingnumber')[0].play()
  });
  $('#selectingnumber').hide();
});

