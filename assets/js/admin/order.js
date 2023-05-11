import { request } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import { getAdminToken, timeConverter, timeConverterSortable } from '../commons/utils.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: getAdminToken(),
  },
};

function initialize() {
  request(API.getAllCartsAPI(), options, (result) => {
    result.forEach(cart => {
      cart.cartPaymentTime = timeConverterSortable(Number(cart.cartPaymentTime));

      if (cart.cartStatus === 2) {
        cart.cartStatus = 'Chờ xử lý';
      }

      if (cart.cartStatus === 3) {
        cart.cartStatus = 'Đã chấp nhận';
      }

      if (cart.cartStatus === 4) {
        cart.cartStatus = 'Đã huỷ đơn hàng';
      }
    })
    loadTable(result);
  });
}

function loadTable(tabledata) {
  var table = new Tabulator('#table', {
    autoResize: true,
    data: tabledata, //assign data to table
    layout: 'fitDataTable',
    responsiveLayout: true, // enable responsive layouts
    pagination: true, //enable.
    paginationSize: 20, // this option can take any positive integer value
    columns: [
      //Define Table Columns
      {
        title: 'Ngày tạo',
        field: 'cartPaymentTime',
        width: 280,
      },
      { title: 'Trạng thái', field: 'cartStatus', width: 200 },
      { title: 'Tổng (VND)', field: 'cartTotalPrice', minWidth: 200 },
      { title: 'ID khách hàng', field: 'customerId', width: 150 },
      {
        title: 'Tên khách hàng',
        field: 'customerFirstName',
        minWidth: 150,
      },
      { title: 'Địa chỉ email', field: 'customerEmail', minWidth: 200 },
    ],
    initialSort: [
      { column: 'cartPaymentTime', dir: 'desc' }, //sort by this first
    ],
  });

  // trigger an alert message when the row is clicked
  table.on('rowClick', function (e, row) {
    var data = row.getData();
    window.location.href = `/admin/editOrder.html?customerId=${data.customerId}&cartPosition=${data.cartPosition}`;
  });
}

initialize();
