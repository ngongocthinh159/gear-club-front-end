import {
  validateEmail,
  validatePassword,
  displayError,
} from '../commons/validation.js';
import { request } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { storeToken } from '../commons/utils.js';

function renderSectionLogin(mainDOMNode) {
  mainDOMNode.innerHTML = `
    <h1 class="text-center" style="line-height: 1.4; margin-top:80px;">Đăng nhập</h1>

    <div class="paragraph" style="max-width:450px;">
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="email" type="email" class="custom-input__input-text"/>
            <span class="custom-input__input-label">Email</span>
        </div>
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="password" type="password" class="custom-input__input-text"/>
            <span class="custom-input__input-label">Mật khẩu</span>
            <span class="custom-input__password-display-toggle"></span>
        </div>

        <a href="./recover.html" title="Quên mật khẩu?" class="d-none">Quên mật khẩu?</a>

        <div class="text-center">
            <button class="btn btn-dark" id="login" style="width: 100%; height: 60px">Đăng nhập</button>
            <a href="./signup.html" title="Đăng ký">Đăng ký</a>    
        </div>
    </div>
  `;

  // Validation in FE before requestiong BE
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', function () {
    loginButton.classList.add('btn-disabled');
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (validateEmail(email) !== true) {
      displayError('Wrong email format.');
      loginButton.classList.remove('btn-disabled');
    } else if (validatePassword(password) !== true) {
      displayError(validatePassword(password));
      loginButton.classList.remove('btn-disabled');
    } else {
      var error = document.querySelector('.error');
      if (error !== null) error.remove();

      // Pass all test cases
      // Request authentication
      const options = {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      fetch(API.getAuthenticateAPI(), options)
        .then((result) => result.json())
        .then((result) => {
          const token = result.token;
          if (token !== undefined) {
            storeToken(token);
            window.location.replace('/'); // Redirect back to home page
          }
        })
        .catch((err) => {
          displayError(
            'Địa chỉ email đăng nhập hoặc mật khẩu không chính xác.'
          );

          loginButton.classList.remove('btn-disabled');
        });
    }
  });

  // Listen to enter events
  const inputs = mainDOMNode.querySelectorAll('.custom-input-wrapper input');
  inputs.forEach((input) => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (!loginButton.classList.contains('btn-disabled'))
          loginButton.click();
      }
    });
  });

  // Handle password hide/show toggle]
  const passwordToggler = mainDOMNode.querySelector(
    '.custom-input__password-display-toggle'
  );
  passwordToggler.addEventListener('click', () => {
    const passwordInput = mainDOMNode.querySelector('#password');

    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  });
}

export { renderSectionLogin };
