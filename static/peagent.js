var sideNav = document.getElementById('sideNav');
var registerForm = document.getElementById('tab-register-form');
var LoginForm = document.getElementById('tab-login-form');
var forgetForm = document.getElementById('tab-forgot');
var verifyForm = document.getElementById('tab-verify');
var content = document.getElementById('content');
var btMenu = document.getElementById('btMenu');
var toggleHeading = document.getElementById('toggle-heading');
var boxSearch = document.getElementById('box-search');
var headerTop = document.querySelector('.header-top');
var dropDownItem = document.querySelector('.option-active');
var dropDown = document.querySelector('.box-dropdown');
var shareLinks = document.querySelector('.openShareLinks');
var modalBox = document.querySelector('.box-lightbox');
var selectLang = document.querySelector('.select');
var body = document.body;

var sticky = headerTop.offsetTop;

openSideNav = () => {
  body.classList.add('nav-sidebar-open');
};

closeSideNav = () => {
  body.classList.remove('nav-sidebar-open');
};

closeSearch = () => {
  boxSearch.classList.remove('show');
};

openSearch = () => {
  boxSearch.classList.add('show');
};

openDropDown = (e) => {
  let dropDown = e.target.parentNode;

  dropDown.classList.add('open');
};

toggleInfo = (e) => {
  toggleHeading.classList.toggle('show');
};

openShareLink = () => {
  shareLinks.classList.toggle('active');
};

closeDropDown = () => {
  if (!dropDown) return;
  dropDown.classList.remove('open');
};

openLogin = () => {
  body.classList.add('hidden-y');
  modalBox.classList.add('open');
};

toggleForms = (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('js-register')) {
    LoginForm.style.display = 'none';
    forgetForm.style.display = 'none ';
    verifyForm.style.display = 'none ';
    registerForm.style.display = 'block';
  } else if (evt.target.classList.contains('js-tab-login')) {
    registerForm.style.display = 'none';
    forgetForm.style.display = 'none';
    verifyForm.style.display = 'none ';
    LoginForm.style.display = 'block';
  } else if (evt.target.classList.contains('js-forgot-password')) {
    LoginForm.style.display = 'none';
    registerForm.style.display = 'none';
    verifyForm.style.display = 'none ';
    forgetForm.style.display = 'block';
  } else if (evt.target.classList.contains('js-verify-account')) {
    LoginForm.style.display = 'none';
    registerForm.style.display = 'none';
    verifyForm.style.display = 'block ';
    forgetForm.style.display = 'none';
  }
};

//js-register
//js-tab-login
//js-forgot-password

closeLogin = () => {
  body.classList.remove('hidden-y');
  modalBox.classList.remove('open');
};

closeSelectLang = () => {
  selectLang.parentNode.classList.remove('open');
};

window.onscroll = () => myFunction();

myFunction = () => {
  if (window.pageYOffset > sticky) {
    body.classList.add('header-fixed');
    content.classList.add('pt-70');
  }
};

document.addEventListener('click', (evt) => {
  let targetElement = evt.target; // clicked element

  do {
    if (targetElement == dropDownItem) {
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  {
    closeDropDown();
  }
});

document.addEventListener('click', (evt) => {
  let targetElement = evt.target; // clicked element

  do {
    if (targetElement == selectLang) {
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  {
    closeSelectLang();
  }
});

document.addEventListener('click', (evt) => {
  let targetElement = evt.target; // clicked element

  do {
    if (targetElement == sideNav || targetElement == btMenu) {
      return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
  } while (targetElement);
  {
    closeSideNav();
  }
});
