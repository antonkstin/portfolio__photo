(function()
{const initialCards = [
  {
    name: 'Защищаю дипломную работу',
    link: 'images/initialCards/diploma.jpg'
  },
  {
    name: 'Провожу геодезическую съёмку',
    link: 'images/initialCards/constructor.jpg'
  },
  {
    name: 'Участвую в "Гонке Героев"',
    link: 'images/initialCards/race.jpg'
  },
  {
    name: 'Служу России',
    link: 'images/initialCards/serve.jpg'
  },
  {
    name: 'Путешествую',
    link: 'images/initialCards/travel.jpg'
  },
  {
    name: 'Решаю задачки на "Codewars"',
    link: 'images/initialCards/work.jpg'
  },
  {
    name: 'Прыгаю с парашютом',
    link: 'images/initialCards/parachute.jpg'
  }
];

// Создание объектов конструкторами
const card = new Card();

const popup = new Popup();

const placesList = new CardList(document.querySelector('.places-list'), initialCards.map((elem)=>{return card.create(elem.name, elem.link)}));

const userInfo = new UserInfo();

const formEdit = new FormValidator(document.forms.edit, (event) => {
  event.preventDefault();
  userInfo.setUserInfo();
  resetForm(event);
});

const formNew = new FormValidator(document.forms.new, (event) => {
  event.preventDefault();
  const cardElement = card.create(document.forms.new.elements.name.value, document.forms.new.elements.link.value);
  placesList.addCard(cardElement);
  resetForm(event);
});


// Функции

// Функция, закрывающая попап, и возвращающая его в исходное положение
function resetForm(event) {
  popup.close(event);
  if(event.target.closest('.popup').classList.contains('popup_edit-user-info')) {
    formEdit.reset();
    formEdit.button.removeAttribute('disabled');
    userInfo.valueOnInput();
  }

  if(event.target.closest('.popup').classList.contains('popup_add-card')) {
    formNew.reset();
    formNew.button.setAttribute('disabled', true);
  }
}


// Добавление слушателей ---

// На иконки крестиков
for (let elem of document.querySelectorAll('.popup__close')) {
  elem.addEventListener('click', resetForm);
}

// На контейнер с карточками для лайков/удаления/открытия
placesList.container.addEventListener('click', function(event) {
  if(event.target.classList.contains('place-card__like-icon')) {
    card.like(event);
  }
  if(event.target.classList.contains('place-card__delete-icon')) {
    card.remove(event);
  }
  if(event.target.classList.contains('place-card__image')) {
    const popupContainer = document.querySelector('.popup_popup-image');
    popupContainer.querySelector('.popup__image').setAttribute('src', event.target.style.backgroundImage.substr(5, event.target.style.backgroundImage.length - 7));
    popup.open(popupContainer);
  }
});

// На контейнер в шапке для открытия попапов
document.querySelector('.user-info').addEventListener('click', function(event) {
  if (event.target === document.querySelector('.user-info__button')) {
    popup.open(document.querySelector('.popup_add-card'));
  }
  if (event.target === document.querySelector('.user-info__edit-button')) {
    userInfo.valueOnInput();
    popup.open(document.querySelector('.popup_edit-user-info'));
  }
});

// На инпуты. Валидность. Первый параметр - на какое поле с input вешать. Второй параметр - массив из методов проверки.
formEdit.addInputListeners(formEdit.fields[0], [formEdit.checkEmptyness, formEdit.checkQuanity]);
formEdit.addInputListeners(formEdit.fields[1], [formEdit.checkEmptyness, formEdit.checkQuanity]);

formNew.addInputListeners(formNew.fields[0], [formNew.checkEmptyness, formNew.checkQuanity]);
formNew.addInputListeners(formNew.fields[1], [formNew.checkEmptyness, formNew.checkLink]);

})();


/*
Я обернул код в функцию IIFE, но мне нужно обращаться к переменным в функции. Я не нашел никакого другого пути, как
содать одну единтвенную глобальную переменную, в которой будут храниться все нужные мне переменные.
Аргументом для функций-конструкторов я не могу передать эти переменные, ведь некоторые методы конструкторов используются друг в друге и
возникает ошибка о инициализации переменных.
Например в конструкторе Card нужен контейнер, из которого JS сможет удалять карточки по клику на иконку. И я пользуюсь информацией из переменной созданой конструктором CardList
и не могу передать эту переменную как аргумент в Card. Если я объявлю сначала CardList, то отрисовка начальных карточек не получится, ведь переменная Card будет только потом объявлена.
*/



/*REVIEW2 Резюме2.

Надо исправить.
1. Описанные Вами проблемы можно решить другими способами. Глобальную переменную const proj нет необходимости создавать.
Код нужно просто обернуть в IIEF функцию, не присваивая эту функцию
никакой переменной. Ни к чему и что-то возвращать из IIEF функции.

2. В классе Card просто создаётся шаблон карточки и для этого класса не нужны какие-то реально инициализированные параметры,
так как его методы (которые надо передавать в конструктор другого класса как параметр) используются в других классах,
где параметры реально и инциализируются (при рендере всех карточек на страницу, при создании новой карточки).
Подробные объяснения я Вам дала в файлах Card.js и Cardlist.js.

3. Необходимо метод show() перенести из класса Card в класс Popup, так как это метод всплывающего окна.

4. Постарайтесь отладить свой код без глобальных переменных, я думаю это получится. так как свой код вы знаете.


/*REVIEW3 Резюме3.


Можно лучше.
1. Можно предусмотреть закрытие всех Popup через ESC.

Функционал работает. Классы между собой логично взаимодействуют и не зависят друг от друга.
Задание принято!

*/