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
        </div>

        <a href="./recover.html" title="Quên mật khẩu?">Quên mật khẩu?</a>

        <div class="text-center">
            <button class="btn btn-dark" id="login" style="width: 100%; height: 60px">Đăng nhập</button>
            <a href="./signup.html" title="Đăng ký">Đăng ký</a>    
        </div>
    </div>
  `;

  // Validation in FE before requestiong BE
  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (validateEmail(email) !== true) {
      displayError('Wrong email format.');
    } else if (validatePassword(password) !== true) {
      displayError(validatePassword(password));
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
      request(API.getAuthenticateAPI(), options, (result) => {
        const token = result.token;
        if (token !== undefined) {
          storeToken(token);
          window.location.replace('/'); // Redirect back to home page
        } else {
          // TODO: Hiển thị trạng thái sai pass + mật khẩu
        }
      });
    }
  });
}

export { renderSectionLogin };
