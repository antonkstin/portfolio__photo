class CardList {
  
  constructor(container, array) {
      this.array = array;
      this.container = container;
      this.render(this.array);
    }


    // Взял блок карточки из Card, занес туда свои данные и вставил в родителя container
    addCard = (card) => {
      this.container.appendChild(card);
    }

    // Отрисовал начальные карточки
    render(array) {
      for (let elem of array) {
        this.addCard(elem);
      }
    }
  }