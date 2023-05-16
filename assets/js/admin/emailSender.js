import { API } from '../commons/restful-api.js';
import { request } from '../commons/fetch.js';
import { getAdminToken } from '../commons/utils.js';

const URLInfo = getURLInformation();
const type = URLInfo.type;
const subscriberId = URLInfo.subscriberId;
const subscriberEmail = URLInfo.subscriberEmail;
const form = document.querySelector('.form');

form.innerHTML = `
  <div class="input_field">
    <label for="email">Người gửi</label>
    <input id="email" type="text" class="input" value="gearclubvn@gmail.com" readonly disabled/>
  </div>
  <div class="input_field">
    <label for="email">Người nhận</label>
    <input id="email" type="text" class="input" readonly disabled  
      value="${type === 'one' ? subscriberEmail : 'Tất cả người đăng ký'}"
    />
  </div>

  <div>
    <div class="input_field">
      <label for="subject">Subject</label>
      <input id="subject" type="text" class="input" placeholder="Subject.." required/>
    </div>
    <p class="email-sender__subject-error d-none" style="color: red; font-size: 1.2rem; margin-bottom: 16px; margin-top: -8px;">*Subject không thể để trống</p>
  </div>
  
  <div>
    <div class="input_field">
      <label for="content">Content</label>
      <textarea id="content" type="text" class="input" rows="8" placeholder="Content.." required></textarea>
    </div>
    <p class="email-sender__content-error d-none" style="color: red; font-size: 1.2rem; margin-bottom: 16px; margin-top: -8px;">*Content không thể để trống</p>
  </div>

  
  <button class="btn btn-primary" id="send-btn" style="float: right; min-width: 240px;">Gửi</button>
`;

// Send btn handler
const subjectInput = document.querySelector('#subject');
const contentTextarea = document.querySelector('#content');
const subjectError = document.querySelector('.email-sender__subject-error');
const contentError = document.querySelector('.email-sender__content-error');
const sendBtn = document.querySelector('#send-btn');
sendBtn.addEventListener('click', () => {
  sendBtn.classList.add('btn-loading');
  subjectError.classList.add('d-none');
  contentError.classList.add('d-none');

  // Check valid subject, content
  const subject = subjectInput.value.trim();
  const content = contentTextarea.value.trim();
  let isValid = true;
  if (subject === '') {
    subjectError.classList.remove('d-none');
    isValid = false;
  }
  if (content === '') {
    contentError.classList.remove('d-none');
    isValid = false;
  }
  if (!isValid) {
    sendBtn.classList.remove('btn-loading');
    return;
  }

  // Request send email API
  let urlAPI = '';
  if (type === 'one') {
    urlAPI = API.getSendEmailToOneSubscriberAPI(subscriberId);
  }
  if (type === 'all') {
    urlAPI = API.getSendEmailToAllSubscribersAPI();
  }
  const rOptions = {
    method: 'POST',
    body: JSON.stringify({
      subject: subject,
      content: content,
    }),
    headers: {
      Authorization: getAdminToken(),
      'Content-type': 'application/json',
    },
  };
  request(urlAPI, rOptions, (result) => {
    if (result.status !== 'mail_send_ok') {
      notie.alert({ type: 3, text: 'Gửi email không thành công!', time: 2 });
    } else {
      notie.alert({ type: 1, text: 'Gửi email thành công!', time: 2 });
    }

    sendBtn.classList.remove('btn-loading');
  });
});

// Enter key press
subjectInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});
contentTextarea.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendBtn.click();
  }
});

function getURLInformation() {
  let params = new URL(document.location).searchParams;

  let type = params.get('type');
  let subscriberId = params.get('subscriberId');
  let subscriberEmail = params.get('subscriberEmail');

  return {
    type,
    subscriberId,
    subscriberEmail,
  };
}
