import { getAdminToken } from '../commons/utils.js';
const token = getAdminToken();
if (!token) {
  // If token is not saved or expired => Redirect to login page
  window.location.replace('/admin/login.html');
}
