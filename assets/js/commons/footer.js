function renderFooter(footerDOMNode) {
  // Update DOM
  footerDOMNode.innerHTML = `
    <div class="grid wide">
      <div class="row">
        <div class="col l-6 m-12 c-12">
          <div class="row">
            <div class="col l-6 m-6 c-12">
              <div class="footer__col-wrapper">
                <h3 class="footer__heading">Công ty TNHH Phong Cách Xanh</h3>
                <p class="footer__paragraph">
                  Giấy phép ĐKKD: 0307185382 do Sở KH-ĐT TP.HCM cấp ngày
                  04/02/2009
                </p>
                <p class="footer__paragraph">
                  Nhà phân phối độc quyền các thương hiệu Filco - Glorious -
                  Pulsar - Lamzu - SkyPAD - Corepad - Lethal Gaming Gear -
                  Finalmouse - Ninjutso - Spyder
                </p>
              </div>
            </div>
            <div class="col l-6 m-6 c-12">
              <div class="footer__col-wrapper">
                <h3 class="footer__heading">Thông tin liên hệ</h3>
                <p class="footer__paragraph">
                  89 Hồ Văn Huê, P9, Q.Phú Nhuận, TP.HCM
                </p>
                <p class="footer__paragraph">
                  Giờ làm việc: 8:30 sáng - 8:00 tối
                </p>
                <a href="tel:+02862921182" class="footer__paragraph-link"
                  >(028)6.292.1182</a
                >
                <a href="tel:+0904135321" class="footer__paragraph-link"
                  >0904.135.321</a
                >
                <a href="tel:+0899454393" class="footer__paragraph-link"
                  >0899.454.393</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col l-6 m-12 c-12">
          <div class="row">
            <div class="col l-7 m-6 c-12">
              <div class="footer__col-wrapper">
                <h3 class="footer__heading-large">Nhận tin khuyến mãi</h3>
                <div class="footer__input-wrapper">
                  <input
                    required
                    placeholder=" "
                    value=""
                    type="email"
                    class="footer__input-text"
                  />
                  <span class="footer__input-label">Email</span>
                  <button class="footer__email-btn">
                    <i class="bi bi-chevron-right"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col l-5 m-6 c-12">
              <div class="footer__col-wrapper">
                <h3 class="footer__heading">Các chính sách</h3>
                <ul class="footer__list">
                  <li class="footer__item">
                    <a href="./shipping.html" class="footer__item-link"
                      >Chính sách vận chuyển</a
                    >
                  </li>
                  <li class="footer__item">
                    <a href="./refund.html" class="footer__item-link"
                      >Chính sách hoàn tiền</a
                    >
                  </li>
                  <li class="footer__item">
                    <a href="./terms-of-service.html" class="footer__item-link"
                      >Điều khoản dịch vụ</a
                    >
                  </li>
                  <li class="footer__item">
                    <a href="./privacy.html" class="footer__item-link"
                      >Chính sách bảo mật</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="sub-footer">
        &copy; 2023, Gear Club.
      </div>
    </div>
  `;

  // Handle events
  handleFooterEvents(footerDOMNode);
}

function handleFooterEvents(footerDOMNode) {}

export { renderFooter };
