function renderFooter(footerDOMNode) {
  // Update DOM
  footerDOMNode.innerHTML = `
    <div class="grid wide">
      <div class="row">
        <div class="col l-6 m-12 c-12">
          <div class="row">
            <div class="col l-6 m-6 c-12">
              <div class="footer__col-wrapper">
                <h3 class="footer__heading">Công ty TNHH Gearclub</h3>
                <p class="footer__paragraph">
                  Giấy phép ĐKKD: 02327496381 do Sở KH-ĐT TP.HCM cấp ngày
                  05/01/2023
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
                  702 Nguyễn Văn Linh, Quận 7, TP.HCM
                </p>
                <p class="footer__paragraph">
                  Giờ làm việc: 8:30 sáng - 8:00 tối
                </p>
                <a href="tel:+02862836481" class="footer__paragraph-link"
                  >(028)6.283.6481</a
                >
                <a href="tel:+0986233643" class="footer__paragraph-link"
                  >0986.233.643</a
                >
                <a href="tel:+0899351972" class="footer__paragraph-link"
                  >0899.351.972</a
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
                  <div class="custom-input-wrapper">
                    <input
                      placeholder=" "
                      value=""
                      type="email"
                      class="footer__input-text custom-input__input-text"
                    />
                    <span class="footer__input-label custom-input__input-label">Email</span>
                  </div>
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
