class UserInfo {
    constructor() {
      this.pageName = document.querySelector('.user-info__name');
      this.pageJob = document.querySelector('.user-info__job');
      this.textNameOnInput = document.forms.edit.elements.name;
      this.textJobOnInput = document.forms.edit.elements.job;
      this.valueOnInput();
      this.nameOnDataBase;
      this.jobOnDataBase;
    }
  
  
    // В строки input вставить значения с сайта
    valueOnInput() {
      this.textNameOnInput.value = this.pageName.textContent;
      this.textJobOnInput.value = this.pageJob.textContent;
    }
  
    // Записал в объект новые значения информации пользователя
    setUserInfo() {
      this.nameOnDataBase = this.textNameOnInput.value;
      this.jobOnDataBase = this.textJobOnInput.value;
      this.updateUserInfo();
    }
  
    // Отобразил новую информацию пользователя на странице
    updateUserInfo() {
      this.pageName.textContent = this.nameOnDataBase;
      this.pageJob.textContent = this.jobOnDataBase;
    }
  }