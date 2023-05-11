import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getToken, timeConverter } from '/assets/js/commons/utils.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: getToken(),
  },
};

function initialize() {
  request(API.getAllCartsAPI(), options, (result) => {
    result.forEach(cart => {
      cart.cartPaymentTime = timeConverter(Number(cart.cartPaymentTime));

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
        title: 'Date',
        field: 'cartPaymentTime',
        width: 280,
      },
      { title: 'Status', field: 'cartStatus', width: 200 },
      { title: 'Total (VND)', field: 'cartTotalPrice', minWidth: 200 },
      { title: 'Customer ID', field: 'customerId', width: 150 },
      {
        title: 'Customer first name',
        field: 'customerFirstName',
        minWidth: 150,
      },
      { title: 'Customer email', field: 'customerEmail', minWidth: 200 },
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

function search() {
  if (document.getElementById('search-text').value === '') {
    initialize();
  } else {
    let object = { search: document.getElementById('search-text').value };
    let searchOptions = {
      method: 'PUT',
      body: JSON.stringify(object),
      headers: {
        Authorization: getToken(),
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    request(API.getProductByName(), searchOptions, (result) => {
      loadTable(result);
    });
  }
}

initialize();

document.getElementById('search-text').onchange = () => {
  search();
};
document
  .getElementById('search-button')
  .addEventListener('click', () => search());
