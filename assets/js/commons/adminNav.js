function renderNavbar(navbarDOMnode) {
    navbarDOMnode.innerHTML = `
        <ul>
            <li>
                <a href="#" class="logo">
                    <img src="https://via.placeholder.com/400" alt="">
                    <span class="nav-item">Admin</span>
                </a>
            </li>
            <li>
                <a href="/admin/dashboard.html" style="margin-top: 24px">
                    <i class="fas fa-home" aria-hidden="true"></i>
                    <span class="nav-item">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/admin/product.html">
                    <i class="fas fa-gamepad" aria-hidden="true"></i>
                    <span class="nav-item">Product</span>
                </a>
            </li>
            <li>
                <a href="/admin/user.html">
                    <i class="fas fa-user" aria-hidden="true"></i>
                    <span class="nav-item">User</span>
                </a>
            </li>
            <li>
                <a href="/login.html" class="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class="nav-item">Log out</span>
                </a>
            </li>
        </ul>
    `;
}

function renderSearchbar(searchbarDOMnode) {
    searchbarDOMnode.innerHTML = `
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Search here...">
        <button class="search-button">Search</button> 
    `;
}

export { renderNavbar, renderSearchbar };