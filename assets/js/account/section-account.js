import { renderSectionOrderHistory } from './section-order-history.js';
import { renderSectionPersonalInformation } from './section-personal-information.js';
import { getToken, removeToken } from '../commons/utils.js';

function renderSectionAccount(secAccountDOMNode) {
  const token = getToken();
  if (!token) {
    window.location.replace('/login.html');
    return;
  }

  secAccountDOMNode.innerHTML = `
    <div class="sec-account__header">
      <div class="grid wide">
        <div class="sec-account__header-wrapper">
          <div class="sec-account__header-nav">
            <div class="sec-account__header-nav-item 
                        sec-account__header-nav-item--active 
                        sec-account__order-history-btn"
            >Đơn hàng</div>
            <div class="sec-account__header-nav-item 
                        sec-account__account-btn"
            >Tài khoản</div>
          </div>

          <div class="sec-account__logout-btn">Đăng xuất</div>
        </div>
      </div>
    </div>

    <div class="grid wide">
      <div class="sec-account__main"></div>
    </div>
  `;
  // Event handlers
  // Handle logout btn click
  const logoutBtn = secAccountDOMNode.querySelector('.sec-account__logout-btn');
  logoutBtn.addEventListener('click', () => {
    removeToken();
    window.location.replace('/');
  });

  // Handle nav item click
  const orderBtn = secAccountDOMNode.querySelector(
    '.sec-account__order-history-btn'
  );
  const accountBtn = secAccountDOMNode.querySelector(
    '.sec-account__account-btn'
  );
  const stateChangeNode = secAccountDOMNode.querySelector(
    '.sec-account__header'
  );
  orderBtn.addEventListener('click', () => {
    if (orderBtn.classList.contains('sec-account__header-nav-item--active')) {
      return;
    }

    orderBtn.classList.add('sec-account__header-nav-item--active');
    accountBtn.classList.remove('sec-account__header-nav-item--active');

    renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode);
  });
  accountBtn.addEventListener('click', () => {
    if (accountBtn.classList.contains('sec-account__header-nav-item--active')) {
      return;
    }

    accountBtn.classList.add('sec-account__header-nav-item--active');
    orderBtn.classList.remove('sec-account__header-nav-item--active');

    renderSectionPersonalInformation(secAccountMainDOMNode, stateChangeNode);
  });

  // Render order history/personal information
  const secAccountMainDOMNode =
    secAccountDOMNode.querySelector('.sec-account__main');
  if (window.location.search.includes('showPersonalInformation=true')) {
    accountBtn.click();
  } else {
    renderSectionOrderHistory(secAccountMainDOMNode, stateChangeNode);
  }
}

export { renderSectionAccount };
