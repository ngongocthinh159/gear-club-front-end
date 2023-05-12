import { getAdminToken } from '../commons/utils.js';

/**
 * Redirect to /admin/login.html if the admin token is missing or expired
 */
const token = getAdminToken();
if (!token) {
  // If token is not saved or expired => Redirect to login page
  window.location.replace('/admin/login.html');
}
