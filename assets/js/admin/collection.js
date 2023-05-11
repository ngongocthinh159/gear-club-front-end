import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getAdminToken } from '/assets/js/commons/utils.js';

const options = {
  method: 'GET',
  headers: {
    Authorization: getAdminToken(),
  },
};

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
      { title: 'ID', field: 'id', width: 100 },
      { title: 'Name', field: 'name', minWidth: 300 },
      { title: 'Created At', field: 'createdAt', minWidth: 300 },
      { title: 'Updated At', field: 'updatedAt', minWidth: 300 },
    ],
  });

  //trigger an alert message when the row is clicked
  table.on('rowClick', function (e, row) {
    var data = row.getData();
    window.location.href = '/admin/editCollection.html?name=' + data.name;
  });
}

function initialize() {
  request(API.getAllTrendingCollection(), options, (result) => {
    loadTable(result);
  });
}

initialize();
