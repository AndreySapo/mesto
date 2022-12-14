(()=>{"use strict";var e=document.querySelector(".profile"),t=(e.querySelector(".profile__name"),e.querySelector(".profile__job"),e.querySelector(".profile__edit-button")),n=e.querySelector(".profile__add-button"),r=e.querySelector(".profile__avatar-edit-button"),o=(e.querySelector(".profile__avatar-img"),document.querySelector(".profile-popup")),i=o.querySelector("#name"),a=o.querySelector("#job"),u=o.querySelector(".popup__button-save"),c=document.querySelector(".avatar-edit-popup").querySelector(".popup__button-save"),s=document.querySelector(".new-post-popup").querySelector(".popup__button-save"),l={inputSelector:".popup__input",buttonSelector:".popup__button-save",inactiveButtonClass:"popup__button-save_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},f=document.forms.user,p=document.forms.new_post,d=document.forms.avatar;function h(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var _=function(){function e(t,n){var r=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderer=r,this._container=document.querySelector(n)}var t,n;return t=e,(n=[{key:"addItem",value:function(e){this._container.append(e)}},{key:"addNewCard",value:function(e){this._container.prepend(e)}},{key:"renderItems",value:function(e,t){var n=this;e.forEach((function(e){n._renderer(e,t)}))}}])&&h(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var v=function(){function e(t){var n=this,r=t.data,o=t.userID,i=t.template,a=t.handleCardClick,u=t.handleCardDelete,c=t.handleCardLike;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._cardTemplate=document.querySelector(i).content,this._cardTemplateClone=this._cardTemplate.cloneNode(!0),this._element=this._cardTemplateClone.querySelector(".element"),this._handleCardClick=a,this._handleCardDelete=u,this._handleCardLike=c,this._cardImage=this._element.querySelector(".element__image"),this._cardTitle=this._element.querySelector(".element__title"),this._cardLikes=this._element.querySelector(".element__counter-like"),this._cardImage.src=r.link,this._cardImage.alt=r.name,this._cardTitle.textContent=r.name,this._cardLikes.textContent=r.likes.length,this._cardID=r._id,this._cardLikeButton=this._element.querySelector(".element__button-like"),this._cardTrashButton=this._element.querySelector(".element__button-trash"),this._cardTrashButton.setAttribute("disabled",!0),this._cardTrashButton.style.visibility="hidden",this._cardZoomButton=this._element.querySelector(".element__button-zoom"),r.owner._id===o&&(this._cardTrashButton.removeAttribute("disabled",!0),this._cardTrashButton.style.visibility="visible"),this.likeState=!1,r.likes.forEach((function(e){e._id===o&&(n._cardLikeButton.classList.add("element__button-like_active"),n.likeState=!0)})),this._cardLikeButton.addEventListener("click",(function(){return n._handleCardLike(n)})),this._cardTrashButton.addEventListener("click",(function(){return n._handleCardDelete(r,n)})),this._cardZoomButton.addEventListener("click",this._handleCardClick),this._element}var t,n;return t=e,(n=[{key:"addLike",value:function(e){this._cardLikeButton.classList.add("element__button-like_active"),this._cardLikes.textContent=e,this.likeState=!0}},{key:"removeLike",value:function(e){this._cardLikeButton.classList.remove("element__button-like_active"),this._cardLikes.textContent=e,this.likeState=!1}},{key:"deleteCard",value:function(){this._element.remove()}}])&&y(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function b(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}const m=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._settingsObject=t,this._formElement=n,this._inputList=Array.from(n.querySelectorAll(t.inputSelector)),this._buttonElement=n.querySelector(t.buttonSelector)}var t,n;return t=e,(n=[{key:"enableValidation",value:function(){this._setEventListeners()}},{key:"_setEventListeners",value:function(){var e=this;this._inputList.forEach((function(t){t.addEventListener("input",(function(){e._isValid(t),e._toggleButtonState()}))})),this._toggleButtonState()}},{key:"_isValid",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_showInputError",value:function(e,t){var n=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.add(this._settingsObject.inputErrorClass),n.textContent=t,n.classList.add(this._settingsObject.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._formElement.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._settingsObject.inputErrorClass),t.classList.remove(this._settingsObject.errorClass),t.textContent=""}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?(this._buttonElement.classList.add(this._settingsObject.inactiveButtonClass),this._buttonElement.setAttribute("disabled",!0)):(this._buttonElement.classList.remove(this._settingsObject.inactiveButtonClass),this._buttonElement.removeAttribute("disabled"))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}}])&&b(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function g(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var k=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._popupSelector=t,this._popup=document.querySelector(this._popupSelector),this._buttonSave=this._popup.querySelector(".popup__button-save"),this._handleEscClose=this._handleEscClose.bind(this)}var t,n;return t=e,(n=[{key:"open",value:function(){this._popup.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(){"Escape"===event.key&&this.close()}},{key:"_handleClickClose",value:function(){(event.target.classList.contains("popup")||event.target.classList.contains("popup__button-close"))&&this.close()}},{key:"setEventListeners",value:function(){this._popup.addEventListener("mousedown",this._handleClickClose.bind(this))}},{key:"renderLoading",value:function(e){this._buttonSave.textContent=e?"Сохраняем...":"Сохранить"}}])&&g(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function w(e){return w="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(e)}function S(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=O(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},j.apply(this,arguments)}function O(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}function C(e,t){return C=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},C(e,t)}function L(e,t){if(t&&("object"===w(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function E(e){return E=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},E(e)}var P=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&C(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=E(r);if(o){var n=E(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return L(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitCallback=t,n._popup=document.querySelector(n._popupSelector),n._form=n._popup.querySelector(".popup__form"),n}return t=a,(n=[{key:"_getInputValues",value:function(){var e=this;return this._inputList=this._form.querySelectorAll(".popup__input"),this._formValues={},this._inputList.forEach((function(t){e._formValues[t.name]=t.value})),this._formValues}},{key:"setEventListeners",value:function(){var e=this;j(E(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(){return e._submitCallback(e._getInputValues())}))}},{key:"close",value:function(){j(E(a.prototype),"close",this).call(this),this._form.reset()}},{key:"renderLoading",value:function(e){this._buttonSave.textContent=e?"Сохраняем...":"Создать"}}])&&S(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(k);function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function T(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function R(){return R="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=D(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},R.apply(this,arguments)}function D(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=x(e)););return e}function I(e,t){return I=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},I(e,t)}function B(e,t){if(t&&("object"===q(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function x(e){return x=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},x(e)}var A=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&I(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=x(r);if(o){var n=x(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return B(this,e)});function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=i.call(this,e))._popup=document.querySelector(e),t}return t=a,(n=[{key:"open",value:function(e){R(x(a.prototype),"open",this).call(this),this._image=this._popup.querySelector(".img-zoom__img"),this._image.src=e.link,this._image.alt=e.name,this._popup.querySelector(".img-zoom__caption").textContent=e.name}}])&&T(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(k);function U(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var V=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._nameSelector=t,this._jobSelector=n,this._avatarSelector=r,this._name=document.querySelector(this._nameSelector),this._job=document.querySelector(this._jobSelector),this._avatar=document.querySelector(this._avatarSelector)}var t,n;return t=e,(n=[{key:"getUserInfo",value:function(){return{name:this._name.textContent,job:this._job.textContent}}},{key:"setUserInfo",value:function(e){this._name.textContent=e.name,this._job.textContent=e.about}},{key:"setUserAvatar",value:function(e){this._avatar.src=e.avatar}}])&&U(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function N(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z=function(){function e(t){var n=t.link,r=t.cohort,o=t.token;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._url=n+r,this._headers={headers:{authorization:o}}}var t,n;return t=e,(n=[{key:"_getResponseData",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}},{key:"getUser",value:function(){var e=this;return fetch(this._url+"/users/me",this._headers).then((function(t){return e._getResponseData(t)}))}},{key:"getInitialCards",value:function(){var e=this;return fetch(this._url+"/cards",this._headers).then((function(t){return e._getResponseData(t)}))}},{key:"setUserName",value:function(e){var t=this,n=Object.assign({},this._headers);return n.headers["Content-Type"]="application/json",n.method="PATCH",n.body=JSON.stringify({name:e.name,about:e.about}),fetch(this._url+"/users/me",n).then((function(e){return t._getResponseData(e)}))}},{key:"addNewCard",value:function(e){var t=this,n=Object.assign({},this._headers);return n.headers["Content-Type"]="application/json",n.method="POST",n.body=JSON.stringify({name:e.name,link:e.link}),fetch(this._url+"/cards",n).then((function(e){return t._getResponseData(e)}))}},{key:"deleteCard",value:function(e){var t=this,n=Object.assign({},this._headers);return n.method="DELETE",fetch(this._url+"/cards/"+e,n).then((function(e){return t._getResponseData(e)}))}},{key:"like",value:function(e){var t=Object.assign({},this._headers);return t.method="PUT",fetch(this._url+"/cards/".concat(e,"/likes"),t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).then((function(e){return e}))}},{key:"dislike",value:function(e){var t=Object.assign({},this._headers);return t.method="DELETE",fetch(this._url+"/cards/".concat(e,"/likes"),t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(res.status))})).then((function(e){return e}))}},{key:"setAvatar",value:function(e){var t=this,n=Object.assign({},this._headers);return n.headers["Content-Type"]="application/json",n.method="PATCH",n.body=JSON.stringify({avatar:e.avatar}),fetch(this._url+"/users/me/avatar",n).then((function(e){return t._getResponseData(e)}))}}])&&N(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),e}();function J(e){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},J(e)}function H(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function Z(){return Z="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,n){var r=M(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(arguments.length<3?e:n):o.value}},Z.apply(this,arguments)}function M(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=K(e)););return e}function F(e,t){return F=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},F(e,t)}function G(e,t){if(t&&("object"===J(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function K(e){return K=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},K(e)}var Q=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&F(e,t)}(a,e);var t,n,r,o,i=(r=a,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=K(r);if(o){var n=K(this).constructor;e=Reflect.construct(t,arguments,n)}else e=t.apply(this,arguments);return G(this,e)});function a(e,t){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(n=i.call(this,e))._submitCallback=t,n._popup=document.querySelector(n._popupSelector),n._form=n._popup.querySelector(".popup__form"),n}return t=a,(n=[{key:"open",value:function(e,t){Z(K(a.prototype),"open",this).call(this),this._itemData=e,this._objectCard=t}},{key:"setEventListeners",value:function(){var e=this;Z(K(a.prototype),"setEventListeners",this).call(this),this._popup.addEventListener("submit",(function(){return e._submitCallback(e._itemData,e._objectCard)}))}},{key:"renderLoading",value:function(e){this._buttonSave.textContent=e?"Сохраняем...":"Да"}}])&&H(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),a}(k);function W(e,t){return{data:e,userID:t,template:"#card-template",handleCardClick:function(){ee.open(e)},handleCardDelete:function(e,t){re.open(e,t)},handleCardLike:function(t){t.likeState?X.dislike(e._id).then((function(e){t.removeLike(e.likes.length)})).catch((function(e){console.log(e)})):X.like(e._id).then((function(e){t.addLike(e.likes.length)})).catch((function(e){console.log(e)}))}}}var X=new z({link:"https://mesto.nomoreparties.co/v1/",cohort:"cohort-54",token:"05145e33-315e-4591-bbb6-f1880e215d8f"}),Y=[X.getUser(),X.getInitialCards()],$=new V(".profile__name",".profile__job",".profile__avatar-img");Promise.all(Y).then((function(e){var t=e[0];$.setUserInfo(t),$.setUserAvatar(t);var n=e[0]._id,r=e[1];te.renderItems(r,n)})).catch((function(e){console.log(e)}));var ee=new A(".img-zoom");ee.setEventListeners();var te=new _({renderer:function(e,t){var n=new v(W(e,t));te.addItem(n)}},".elements__grid"),ne=new P(".profile-popup",(function(e){event.preventDefault(),ne.renderLoading(!0),X.setUserName({name:e.name,about:e.job}).then((function(e){$.setUserInfo(e),ne.close()})).catch((function(e){console.log(e)})).finally((function(){return ne.renderLoading(!1)})),u.classList.add("popup__button-save_inactive"),u.setAttribute("disabled",!0)}));ne.setEventListeners(),t.addEventListener("click",(function(){i.value=$.getUserInfo().name,a.value=$.getUserInfo().job,ne.open()}));var re=new Q(".confirm-popup",(function(e,t){event.preventDefault(),re.renderLoading(!0),X.deleteCard(e._id).then((function(){t.deleteCard(),re.close()})).catch((function(e){console.log(e)})).finally((function(){return re.renderLoading(!1)}))}));re.setEventListeners();var oe=new P(".new-post-popup",(function(e){event.preventDefault(),oe.renderLoading(!0),X.addNewCard({name:e.place,link:e.picture}).then((function(e){var t=new v(W(e,e.owner._id));te.addNewCard(t),oe.close(),s.classList.add("popup__button-save_inactive"),s.setAttribute("disabled",!0)})).catch((function(e){console.log(e)})).finally((function(){return oe.renderLoading(!1)}))}));oe.setEventListeners(),n.addEventListener("click",(function(){return oe.open()}));var ie=new P(".avatar-edit-popup",(function(e){event.preventDefault(),ie.renderLoading(!0),X.setAvatar(e).then((function(e){$.setUserAvatar(e),c.classList.add("popup__button-save_inactive"),c.setAttribute("disabled",!0),ie.close()})).catch((function(e){console.log(e)})).finally((function(){return ie.renderLoading(!1)}))}));ie.setEventListeners(),r.addEventListener("click",(function(){return ie.open()})),new m(l,f).enableValidation(),new m(l,p).enableValidation(),new m(l,d).enableValidation()})();
//# sourceMappingURL=main.js.map