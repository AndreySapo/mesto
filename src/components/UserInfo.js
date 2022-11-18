export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
  }

  getUserInfo() {
    return {
      name: document.querySelector(this._nameSelector).textContent,
      job: document.querySelector(this._jobSelector).textContent
    }    
  }

  setUserInfo(data) {
    document.querySelector(this._nameSelector).textContent = data.name;
    document.querySelector(this._jobSelector).textContent = data.job;
  }

}