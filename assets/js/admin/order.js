import { request } from '../commons/fetch.js';
import { API } from '../commons/restful-api.js';
import {
  getAdminToken,
  timeConverter,
  timeConverterSortable,
} from '../commons/utils.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: getAdminToken(),
  },
};

function initialize() {
  request(API.getAllCartsAPI(), options, (result) => {
    result.forEach((cart) => {
      cart.cartPaymentTime = timeConverterSortable(
        Number(cart.cartPaymentTime)
      );

      if (cart.cartStatus === 2) {
        cart.cartStatus = 'Chờ xử lý';
      }

      if (cart.cartStatus === 3) {
        cart.cartStatus = 'Đã chấp nhận';
      }

      if (cart.cartStatus === 4) {
        cart.cartStatus = 'Đã huỷ đơn hàng';
      }
    });
    loadTable(result);
  });
}

let table = null;
function loadTable(tabledata) {
  table = new Tabulator('#table', {
    autoResize: true,
    data: tabledata, //assign data to table
    layout: 'fitColumns',
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
      {
        title: 'Địa chỉ email',
        field: 'customerEmail',
        minWidth: 400,
        widthGrow: 1,
      },
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
  const searchString = document.getElementById('search-text').value;

  if (searchString.trim() === '') {
    table.clearFilter(true);
  } else {
    table.setFilter(matchAny);
  }
}

document.getElementById('search-text').onchange = () => {
  search();
};
document
  .getElementById('search-button')
  .addEventListener('click', () => search());

function matchAny(data, filterParams) {
  //data - the data for the row being filtered
  //filterParams - params object passed to the filter

  filterParams.value = document
    .getElementById('search-text')
    .value.toLowerCase();

  var match = false;

  for (var key in data) {
    if (key === 'productList') {
      continue;
    }

    if (String(data[key]).toLowerCase().includes(filterParams.value)) {
      match = true;
      return match;
    }
  }

  return match;
}

initialize();
