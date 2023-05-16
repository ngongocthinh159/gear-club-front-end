import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getAdminToken } from '/assets/js/commons/utils.js';

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
      { title: 'id', field: 'id', width: 100 },
      {
        title: 'Email',
        field: 'email',
        minWidth: 200,
        widthGrow: 1,
      },
      { title: 'Ngày đăng ký nhận tin', field: 'createdAt', width: 320 },
      {
        title: 'Gửi mail',
        formatter: () => {
          return `
            <div style="text-align: center;" class="admin-subscriber__email-btn">
              <i class="fa-solid fa-envelope" style="color: green;"></i>
            </div>
          `;
        },
        width: 100,
        align: 'center',
        cellClick: function (e, cell) {
          const subscriberId = cell.getRow().getData().id;
          const subscriberEmail = cell.getRow().getData().email;
          window.location.href =
            '/admin/emailsender.html?type=one&subscriberId=' +
            subscriberId +
            '&subscriberEmail=' +
            subscriberEmail;
        },
      },
      {
        title: 'Xoá',
        formatter: () => {
          return `
            <div style="text-align: center;" class="admin-subscriber__delete-btn">
              <i class="fa-solid fa-trash" style="color: red;"></i>
            </div>
          `;
        },
        width: 70,
        align: 'center',
        cellClick: function (e, cell) {
          // Confirm delete
          notie.confirm({
            text: 'Are you sure you want to delete this subscriber?',
            cancelCallback: function () {},
            submitCallback: function () {
              const deletedId = cell.getRow().getData().id;

              // Request delete subscriber
              const rOptions = {
                method: 'DELETE',
                headers: {
                  Authorization: getAdminToken(),
                },
              };
              request(
                API.getDeleteSubscribersByIdAPI(deletedId),
                rOptions,
                (result) => {
                  if (result.status !== 'delete_ok') {
                    notie.alert({ type: 3, text: 'Error!', time: 2 });
                  } else {
                    notie.alert({ type: 1, text: 'Deleted!', time: 2 });
                    cell.getRow().delete();
                  }
                }
              );
            },
          });
        },
      },
    ],
    initialSort: [
      { column: 'id', dir: 'asc' }, //sort by this first
    ],
    footerElement: `<button id="send-all-button" class="btn btn-primary">Gửi email đến tất cả người đăng ký</button>`,
  });

  table.on('renderComplete', function () {
    document.getElementById('send-all-button').addEventListener('click', () => {
      window.location.href = '/admin/emailsender.html?type=all';
    });
  });
}

function initialize() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: getAdminToken(),
    },
  };

  request(API.getAllSubscribersAPI(), options, (result) => {
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
