import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getAdminToken } from '/assets/js/commons/utils.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: getAdminToken(),
  },
};

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
      { title: 'ID', field: 'id', width: 100 },
      { title: 'Tên bộ sưu tập', field: 'name', minWidth: 300, widthGrow: 1 },
      { title: 'Ngày tạo', field: 'createdAt', minWidth: 300 },
      { title: 'Lần cuối cập nhật', field: 'updatedAt', minWidth: 300 },
    ],
    initialSort: [
      { column: 'id', dir: 'asc' }, //sort by this first
    ],
  });

  //trigger an alert message when the row is clicked
  table.on('rowClick', function (e, row) {
    var data = row.getData();
    window.location.href = '/admin/editCollection.html?name=' + data.name;
  });
}

let data = null;
function initialize() {
  request(API.getAllTrendingCollection(), options, (result) => {
    data = result;
    loadTable(result);
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

  filterParams.value = document.getElementById('search-text').value.toLowerCase();

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
