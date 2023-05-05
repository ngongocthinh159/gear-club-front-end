import {
  validateEmail,
  validatePassword,
  displayError,
} from '../commons/validation.js';
import { API } from '../commons/restful-api.js';
import { request } from '../commons/fetch.js';
import { storeToken } from '../commons/utils.js';

function renderSectionRegister(mainDOMNode) {
  mainDOMNode.innerHTML = `
    <h1 class="text-center" style="line-height: 1.4; margin-top: 80px">
        Đăng ký
    </h1>

    <div class="paragraph" style="max-width: 450px">
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="lastName" type="text" class="custom-input__input-text" />
            <span class="custom-input__input-label">Họ</span>
        </div>
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="firstName" type="text" class="custom-input__input-text" />
            <span class="custom-input__input-label">Tên</span>
        </div>
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="email" type="email" class="custom-input__input-text" />
            <span class="custom-input__input-label">Email</span>
        </div>
        <div class="custom-input-wrapper input">
            <input placeholder=" " id="password" type="password" class="custom-input__input-text" />
            <span class="custom-input__input-label">Mật khẩu</span>
        </div>

        <a href="" title="Quên mật khẩu?">Quên mật khẩu?</a>

        <div class="text-center">
            <button class="btn btn-dark" id="signup" style="width: 100%; height: 60px">
                Đăng ký
            </button>
            <a href="./login.html" title="Đăng nhập">Đăng nhập</a>
        </div>
    </div>
  `;

  // Validation in FE before requestiong BE
  const signupButton = document.getElementById('signup');
  signupButton.addEventListener('click', function () {
    var lastName = document.getElementById('lastName').value;
    var firstName = document.getElementById('firstName').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (lastName === '') {
      displayError('Họ không được để trống.');
    } else if (firstName === '') {
      displayError('Tên không được để trống.');
    } else if (validateEmail(email) !== true) {
      displayError('Wrong email format.');
    } else if (validatePassword(password) !== true) {
      displayError(validatePassword(password));
    } else {
      var error = document.querySelector('.error');
      if (error !== null) error.remove();

      // Pass all test for all fields
      // Register new account
      const options = {
        method: 'POST',
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      request(API.getRegisterAPI(), options, (result) => {
        storeToken(result.token);
        window.location.replace('/'); // After register redirect back to home
      });
    }
  });
}

export { renderSectionRegister };
