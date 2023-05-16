import { removeAdminToken } from '../commons/utils.js';

function renderNavbar(navbarDOMnode) {
    navbarDOMnode.innerHTML = `
        <div class="navbar__overlay"></div>

        <ul>
            <li>
                <a class="logo">
                    <img src="/assets/imgs/admin-avatar.png" alt="Admin avatar">
                    <span class="nav-item">Admin</span>
                </a>
            </li>
            <li>
                <a href="/admin/product.html" style="margin-top: 24px">
                    <i class="fas fa-gamepad" aria-hidden="true"></i>
                    <span class="nav-item">Sản phẩm</span>
                </a>
            </li>
            <li>
                <a href="/admin/user.html">
                    <i class="fas fa-user" aria-hidden="true"></i>
                    <span class="nav-item">Khách hàng</span>
                </a>
            </li>
            <li>
                <a href="/admin/order.html">
                    <i class="fas fa-cart-shopping"></i>
                    <span class="nav-item">Đơn hàng</span>
                </a>
            </li>
            <li>
                <a href="/admin/collection.html">
                    <i class="fas fa-th-large" aria-hidden="true"></i>
                    <span class="nav-item">Bộ sưu tập</span>
                </a>
            </li>
            <li>
                <a href="/admin/subscriber.html">
                    <i class="fas fa-envelope"></i>
                    <span class="nav-item">Gửi tin</span>
                </a>
            </li>

            <li>
                <a class="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="nav-item">Log out</span>
                </a>
            </li>
        </ul>
    `;

  // Logout event handler
  const logoutBtn = navbarDOMnode.querySelector('.logout');
  logoutBtn.addEventListener('click', () => {
    removeAdminToken();
    window.location.replace('../../../admin/login.html');
  });
}

function renderSearchbar(searchbarDOMnode) {
  searchbarDOMnode.innerHTML = `
        <i class="fa fa-search"></i>
        <input type="text" id="search-text" placeholder="Search here...">
        <button class="search-button" id="search-button">Search</button> 
    `;
}

export { renderNavbar, renderSearchbar };
