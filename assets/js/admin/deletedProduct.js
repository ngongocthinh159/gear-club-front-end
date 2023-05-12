import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getAdminToken } from '/assets/js/commons/utils.js';

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
      { title: 'id', field: 'id', width: 100 },
      { title: 'Name', field: 'name', minWidth: 500 },
      { title: 'Vendor Name', field: 'vendorName', minWidth: 150 },
      { title: 'Price', field: 'price', minWidth: 150 },
      { title: 'Category', field: 'category', minWidth: 200 },
      { title: 'Deleted', field: 'deleted', minWidth: 100 },
    ],
  });

  //trigger an alert message when the row is clicked
  table.on('rowClick', function (e, row) {
    var data = row.getData();
    recoverProduct(data.id);
  });
}

function recoverProduct(productId) {
  // Show modal
  const modal = document.querySelector('.modal-container');
  modal.classList.remove('d-none');

  // Modal event handler
  const cancelBtn = document.querySelector('.modal-control-cancel-btn');
  cancelBtn.addEventListener('click', () => {
    modal.classList.add('d-none');
  });

  const okBtn = document.querySelector('.modal-control-ok-btn');
  okBtn.addEventListener('click', () => {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: getAdminToken(),
      },
    };

    // Call recover API
    request(
      API.getRecoverProductByIdAPI(productId),
      options,
      (updatedProduct) => {
        window.location.reload();
      }
    );
  });
}

function initialize() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: getAdminToken(),
    },
  };

  request(API.getAllSoftDeleteProductsAPI(), options, (result) => {
    loadTable(result);
  });
}

initialize();
