'use strict';
var isIE = (function() {
  var ua = window.navigator.userAgent;
  /* MSIE used to detect old browsers and Trident used to newer ones*/
  return ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
})();

var EVENT = {
  CLICK: 'click',
  FOCUS: 'focus',
  BLUR: 'blur',
  SUBMIT: 'submit',
  KEYDOWN: 'keydown',

};

var overlay = document.querySelector('.modal-overlay');
var popups = document.querySelectorAll('.modal');

var openMap = document.querySelector('.js-open-map');
var popupMap = document.querySelector('.modal--map');
var closeMap = document.querySelector('.js-close-map');

var openFeedback = document.querySelector('.js-open-feedback');
var popupFeedback = document.querySelector('.modal--feedback');
var closeFeedback = document.querySelector('.js-close-feedback');
var feedbackForm = document.querySelector('.feedback-form');
var feedbackName = popupFeedback && popupFeedback.querySelector('#feedback-name');
var feedbackMail = popupFeedback && popupFeedback.querySelector('#feedback-mail');
var feedbackMessage = popupFeedback && popupFeedback.querySelector('#feedback-message');

var buyButtons = document.querySelectorAll('.js-buy');
var popupBuyModal = document.querySelector('.modal--cart');
var closeBuyModal = document.querySelector('.js-close-cart');

var addBookmarkButtons = document.querySelectorAll('.js-add-bookmark');

var storageName = localStorage.getItem('name');
var storageMail = localStorage.getItem('mail');

var slideControls = document.querySelectorAll('.carousel__slide-indicator');
var slides = document.querySelectorAll('.slide');
var nextSlideBtn = document.querySelector('.carousel__scroll--next');
var prevSlideBtn = document.querySelector('.carousel__scroll--prev');
var activeSlide = 1;

var tabsControls = document.querySelectorAll('.tabs__control');
var tabsContents = document.querySelectorAll('.tabs__item');
var activeServiceTab = 0;

function closePopup(popup){
  popup.classList.remove('modal--show');
  overlay.classList.remove('modal-overlay--show');
}

function openPopup(popup) {
  popup.classList.add('modal--show');
  overlay.classList.add('modal-overlay--show');
}

overlay.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  Array.prototype.forEach.call(popups, function(p) {
    if(p.classList.contains('modal--show'))
      closePopup(p);
    if(p.classList.contains('modal--error'))
      p.classList.remove('modal--error');
  });
});

openMap && openMap.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  openPopup(popupMap);
});

closeMap && closeMap.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  closePopup(popupMap);
});

openFeedback && openFeedback.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  openPopup(popupFeedback);
  if (storageName)
    feedbackName.value = storageName;
  if (storageMail)
    feedbackMail.value = storageMail;

  if (storageName && storageMail)
    feedbackMessage.focus();
  else if (storageName)
    feedbackMail.focus();
  else
    feedbackName.focus();
});

closeFeedback && closeFeedback.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  popupFeedback.classList.remove('modal--error');
  closePopup(popupFeedback);
});

feedbackForm && feedbackForm.addEventListener(EVENT.SUBMIT, function(event) {
  if (!feedbackName.value || !feedbackMail.value || !feedbackMessage.value) {
    event.preventDefault();
    popupFeedback.classList.add('modal--error');
  } else {
    feedbackName && localStorage.setItem('name', feedbackName.value);
    feedbackMail && localStorage.setItem('mail', feedbackMail.value);
  }
});

buyButtons && Array.prototype.forEach.call(buyButtons, function(b) {
  if (isIE) {
    b.addEventListener(EVENT.FOCUS, function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
  });

    b.addEventListener(EVENT.BLUR, function(event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
  });
  }
  b.addEventListener(EVENT.CLICK, function(event) {
    event.preventDefault();
    openPopup(popupBuyModal);
  });
});

closeBuyModal && closeBuyModal.addEventListener(EVENT.CLICK, function(event) {
  event.preventDefault();
  closePopup(popupBuyModal);
});

window.addEventListener(EVENT.KEYDOWN, function(event) {
  if (event.keyCode === 27) {
    Array.prototype.forEach.call(popups, function(p) {
      if(p.classList.contains('modal--show'))
        closePopup(p);
      if(p.classList.contains('modal--error'))
        p.classList.remove('modal--error');
    });
    overlay.classList.remove('modal-feedback--show');
  }
});

Array.prototype.forEach.call(addBookmarkButtons, function (b) {
  if (isIE) {
    b.addEventListener(EVENT.FOCUS, function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.add('card--current');
    });

    b.addEventListener(EVENT.BLUR, function (event) {
      event.preventDefault();
      b.parentElement.parentElement.parentElement.classList.remove('card--current');
    });
  }
});

// слайдер

function setActiveSlide() {
  Array.prototype.forEach.call(slideControls, function (c, i) {
    if (c.classList.contains('carousel__slide-indicator--current'))
      c.classList.remove('carousel__slide-indicator--current');
    if (i === activeSlide)
      c.classList.add('carousel__slide-indicator--current');
  });

  Array.prototype.forEach.call(slides, function (slide, contentIndex) {
    if (slide.classList.contains('carousel__slide--current'))
      slide.classList.remove('carousel__slide--current');
    if (contentIndex === activeSlide)
      slide.classList.add('carousel__slide--current')
  });
}

nextSlideBtn && nextSlideBtn.addEventListener(EVENT.CLICK, function (event) {
  event.preventDefault();
  if (activeSlide < slides.length - 1) {
    activeSlide++;
    setActiveSlide();
  }
});

prevSlideBtn && prevSlideBtn.addEventListener(EVENT.CLICK, function (event) {
  event.preventDefault();
  if (activeSlide > 0) {
    activeSlide--;
    setActiveSlide();
  }
});

slideControls && Array.prototype.forEach.call(slideControls, function (control, controlIndex) {
  control.addEventListener(EVENT.CLICK, function (event) {
    event.preventDefault();
    activeSlide = controlIndex;
    setActiveSlide();
  });
});

// блок "Сервисы"

function setActiveServiceTab() {
  Array.prototype.forEach.call(tabsControls, function (c, i) {
    if (c.classList.contains('tabs__control--current'))
      c.classList.remove('tabs__control--current');
    if (i === activeServiceTab)
      c.classList.add('tabs__control--current');
  });

  Array.prototype.forEach.call(tabsContents, function (content, contentIndex) {
    if (content.classList.contains('tabs__item--current'))
      content.classList.remove('tabs__item--current');
    if (contentIndex === activeServiceTab)
      content.classList.add('tabs__item--current')
  });
}

tabsControls && Array.prototype.forEach.call(tabsControls, function (control, controlIndex) {
  control.addEventListener(EVENT.CLICK, function (event) {
    event.preventDefault();
    if (activeServiceTab !== controlIndex) {
      activeServiceTab = controlIndex;
      setActiveServiceTab();
    }
  });
});
