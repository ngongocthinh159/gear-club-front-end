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
              <label for="name" class="acc-info__form-label">First name</label>
              <div class="custom-input-wrapper">
                <input
                  id="name"
                  placeholder=" "
                  name="name"
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
              <label for="name" class="acc-info__form-label">Last name</label>
              <div class="custom-input-wrapper">
                <input
                  id="name"
                  placeholder=" "
                  name="name"
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
              <label for="email" class="acc-info__form-label">Email</label>
              <div class="custom-input-wrapper">
                <input
                  id="email"
                  placeholder=" "
                  name="email"
                  type="email"
                  class="custom-input__input-text"
                  value="${user.email}"
                />
                <span class="custom-input__input-label">Ex: example@gmail.com</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="phone" class="acc-info__form-label">Phone</label>
              <div class="custom-input-wrapper">
                <input
                  id="phone"
                  placeholder=" "
                  name="phone"
                  type="tel"
                  class="custom-input__input-text"
                  value="${user.phone}"
                />
                <span class="custom-input__input-label">Ex: +84 123 456 789</span>
              </div>
            </div>
          </div>

          <div class="col l-6 m-6 c-12">
            <div class="acc-info__form-input-group">
              <label for="address" class="acc-info__form-label">Address</label>
              <div class="custom-input-wrapper">
                <input
                  id="address"
                  placeholder=" "
                  name="address"
                  type="text"
                  class="custom-input__input-text"
                  value="${user.shippingAddress}"
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
        if (updateBtn.classList.contains('btn-disabled')) {
          updateBtn.classList.remove('btn-disabled');
        }
      });
    });

    // Handle update btn click
    updateBtn.addEventListener('click', () => {
      updateBtn.classList.add('btn-disabled');

      fetchData(API.getupdateUserInformationAPI(), () => {
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
