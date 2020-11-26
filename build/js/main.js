'use strict';
(function () {
  // Modal
  var link = document.querySelector('.page-header__button');
  var modal = document.querySelector('.modal');
  var close = modal.querySelector('.modal__close');
  var form = document.querySelector('.form');
  var modalForm = document.querySelector('.modal__form');
  var userName = form.querySelector('[name=username]');
  var phone = form.querySelector('[name=phone]');
  var modalPhone =  modalForm.querySelector('[name=phone]');
  var message = form.querySelector('[name=question]');
  var isStorageSupport = true;
  var storage = {};

  var openModal = function () {
    modal.classList.add('modal--show');
    document.body.classList.add('disable-scroll');
  };

  var closeModal = function () {
    modal.classList.remove('modal--show');
    document.body.classList.remove('disable-scroll');
  };

  try {
    storage.name = localStorage.getItem('name');
    storage.phone = localStorage.getItem('phone');
    storage.message = localStorage.getItem('message');
  } catch (err) {
    isStorageSupport = false;
  }

  link.addEventListener('click', function (evt) {
    evt.preventDefault();
    openModal();

    if (storage.name) {
      userName.value = storage.name;
      phone.value = storage.phone;
      message.value = storage.message;
      message.focus();
    } else {
      userName.focus();
    }
  });

  close.addEventListener('click', function (evt) {
    evt.preventDefault();
    closeModal();
  });

  form.addEventListener('submit', function () {
    if (isStorageSupport) {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('phone', phone.value);
      localStorage.setItem('message', message.value);
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      if (modal.classList.contains('modal--show')) {
        closeModal();
      }
    }
  });

  modal.addEventListener('click', function (evt) {
    if (evt.target === modal) {
      closeModal();
    }
  });

  // Phone mask
  // eslint-disable-next-line no-undef
  var inputMask = new Inputmask('+7 (999) 999-99-99', {
    oncomplete: function () {
      phone.setCustomValidity('');
    }
  });

  phone.addEventListener('input', function () {
    phone.setCustomValidity('Введите корректный номер телефона');
  });
  inputMask.mask(phone);

  // eslint-disable-next-line no-undef
  var inputMask = new Inputmask('+7 (999) 999-99-99', {
    oncomplete: function () {
      modalPhone.setCustomValidity('');
    }
  });

  modalPhone.addEventListener('input', function () {
    modalPhone.setCustomValidity('Введите корректный номер телефона');
  });
  inputMask.mask(modalPhone);

  // Аccordion
  var accordionItems = document.querySelectorAll('.accordion');
  var accordionPanes = document.querySelectorAll('.accordion__pane');

  var hidePane = function (button, pane) {
    button.classList.add('accordion__toggle--inactive');
    pane.classList.add('accordion__pane--hidden');
  };

  var showPane = function (button, pane) {
    button.classList.remove('accordion__toggle--inactive');
    pane.classList.remove('accordion__pane--hidden');
  };

  var toggleAccordion = function (evt) {
    Array.prototype.forEach.call(accordionPanes, function (accordionPane) {
      var button = accordionPane.closest('.accordion').querySelector('.accordion__toggle');
      if (button === evt.target && !button.classList.contains('accordion__toggle--inactive') || button !== evt.target) {
        hidePane(button, accordionPane);
      } else if (button === evt.target) {
        showPane(button, accordionPane);
      }
    });
  };

  Array.prototype.forEach.call(accordionItems, function (accordion) {
    var accordionToggleButton = accordion.querySelector('.accordion__toggle');
    var accordionPane = accordion.querySelector('.accordion__pane');
    hidePane(accordionToggleButton, accordionPane);
    accordionToggleButton.addEventListener('click', toggleAccordion);
  });

  // Scrolling
  var linkNav = document.querySelectorAll('[href^="#"]');
  var v = 0.5;
  for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function (evt) {
      evt.preventDefault();
      var w = window.pageYOffset;
      var hash = evt.currentTarget.href.replace(/[^#]*(.*)/, '$1');
      var t = document.querySelector(hash).getBoundingClientRect().top;
      var start = null;
      requestAnimationFrame(step);
      function step(time) {
        if (start === null) {
          start = time;
        }
        var progress = time - start;
        var r = (t < 0 ? Math.max(w - progress / v, w + t) : Math.min(w + progress / v, w + t));
        window.scrollTo(0, r);
        if (r !== w + t) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      }
    }, false);
  }
})();
