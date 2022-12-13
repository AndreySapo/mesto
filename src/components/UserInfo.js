export default class UserInfo {
  constructor(nameSelector, jobSelector, avatarSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatarSelector = avatarSelector
    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }    
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._job.textContent = data.about;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}