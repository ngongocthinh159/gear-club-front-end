import { fetchData } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getToken } from '../commons/utils.js';
import { request } from '../commons/fetch.js';

function renderSectionPersonalInformation(
  secAccountMainDOMNode,
  stateChangeNode
) {
  const loadingClass = stateChangeNode.classList[0] + '--loading';
  stateChangeNode.classList.add(loadingClass);

  // Fetch data about user information, then update UI
  const options = {
    headers: {
      Authorization: getToken(),
    },
  };
  request(API.getUserInformationAPI(), options, (result) => {
    const user = result;
    secAccountMainDOMNode.innerHTML = `
      <form class="acc-info__form">
        <div class="acc-info__form-success-update">
          <i class="bi bi-check"></i> Cập nhật thành công
        </div>

        <div class="row">
          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="email" class="acc-info__form-label">Email</label>
              <div class="custom-input-wrapper">
                <input
                  id="email"
                  placeholder=" "
                  name="email"
                  type="email"
                  class="custom-input__input-text"
                  value="${user.email}"
                  readonly
                  style="background-color: var(--black-alpha-5); color: var(--black-alpha-30)"
                />
                <span class="custom-input__input-label">Ex: example@gmail.com</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="phone" class="acc-info__form-label">Số điện thoại</label>
              <div class="custom-input-wrapper">
                <input
                  id="phone"
                  placeholder=" "
                  name="phone"
                  type="number"
                  class="custom-input__input-text"
                  value="${user.phone === null ? '' : user.phone}"
                />
                <span class="custom-input__input-label">Ex: +84 123 456 789</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="firstName" class="acc-info__form-label">Tên</label>
              <div class="custom-input-wrapper">
                <input
                  id="firstName"
                  placeholder=" "
                  name="firstName"
                  type="text"
                  class="custom-input__input-text"
                  value="${user.firstName}"
                />
                <span class="custom-input__input-label">Ex: yourlastname</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="lastName" class="acc-info__form-label">Họ</label>
              <div class="custom-input-wrapper">
                <input
                  id="lastName"
                  placeholder=" "
                  name="lastName"
                  type="text"
                  class="custom-input__input-text"
                  value="${user.lastName}"
                />
                <span class="custom-input__input-label">Ex: yourfirstname</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="address" class="acc-info__form-label">Địa chỉ</label>
              <div class="custom-input-wrapper">
                <input
                  id="address"
                  placeholder=" "
                  name="address"
                  type="text"
                  class="custom-input__input-text"
                  value="${
                    user.shippingAddress === null ? '' : user.shippingAddress
                  }"
                />
                <span class="custom-input__input-label">Ex: RMIT University, Vietnam</span>
              </div>
            </div>
          </div>
        </div>

        <div class="acc-info__control">
          <button type="button" class="btn btn-primary btn-disabled acc-info__save-btn">Cập nhật</button>
        </div>
      </form>
    `;

    // Event handlers
    // Handle input change => Allow update
    const form = secAccountMainDOMNode.querySelector('.acc-info__form');
    const inputs = [
      ...secAccountMainDOMNode.querySelectorAll('.custom-input__input-text'),
    ];
    const updateBtn = secAccountMainDOMNode.querySelector(
      '.acc-info__save-btn'
    );
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        secAccountMainDOMNode
          .querySelector(`.custom-input-wrapper:has(#${input.id})`)
          .classList.remove('custom-input-wrapper--error');

        if (updateBtn.classList.contains('btn-disabled')) {
          updateBtn.classList.remove('btn-disabled');
        }
      });
    });

    // Handle update btn click
    updateBtn.addEventListener('click', () => {
      const token = getToken();
      if (!token) {
        window.location.replace('/');
        return;
      }

      updateBtn.classList.add('btn-disabled');

      // Get values from input
      const email = secAccountMainDOMNode.querySelector('#email').value.trim();
      const firstName = secAccountMainDOMNode.querySelector('#firstName').value.trim();
      const lastName = secAccountMainDOMNode.querySelector('#lastName').value.trim();
      const phone = secAccountMainDOMNode.querySelector('#phone').value.trim();
      const address = secAccountMainDOMNode.querySelector('#address').value.trim();

      // Validator in FE first
      let isValid = true;
      if (firstName.length === 0) {
        secAccountMainDOMNode
          .querySelector('.custom-input-wrapper:has(#firstName)')
          .classList.add('custom-input-wrapper--error');
          isValid = false;
      }
      if (lastName.length === 0) {
        secAccountMainDOMNode
          .querySelector('.custom-input-wrapper:has(#lastName)')
          .classList.add('custom-input-wrapper--error');
        isValid = false;
      }
      if (!(1 <= phone.length && phone.length <= 15)) {
        secAccountMainDOMNode
          .querySelector('.custom-input-wrapper:has(#phone)')
          .classList.add('custom-input-wrapper--error');
        isValid = false;
      }
      if (!(1 <= address.length && address.length <= 15)) {
        secAccountMainDOMNode
          .querySelector('.custom-input-wrapper:has(#address)')
          .classList.add('custom-input-wrapper--error');
        isValid = false;
      }
      if (!isValid) {
        return;
      }

      // If all field is valid
      const options = {
        method: 'PUT',
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          shippingAddress: address,
        }),
        headers: {
          Authorization: token,
          'Content-type': 'application/json; charset=UTF-8',
        },
      };
      request(API.getUpdateUserInformationAPI(), options, (result) => {
        form.classList.add('acc-info__form--success-update');
        window.scrollTo(0, 0);

        setTimeout(() => {
          form.classList.remove('acc-info__form--success-update');
        }, 3000);
      });
    });

    stateChangeNode.classList.remove(loadingClass);
  });
}

export { renderSectionPersonalInformation };
