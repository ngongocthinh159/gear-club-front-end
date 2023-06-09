import { request } from '/assets/js/commons/fetch.js';
import { API } from '/assets/js/commons/restful-api.js';
import { getAdminToken } from '/assets/js/commons/utils.js';

const getProductID = () => {
  var str = window.location.search;
  return str.slice(str.indexOf('=') + 1);
};

const image2str = (arr) => {
  let str = '';

  for (let i = 0; i < arr.length; i++) {
    let temp = arr[i].trim();
    str += temp + '\n';
  }

  return str.trim();
};

const str2image = (str) => {
  let temp = str.trim();
  return temp.split('\n');
};

const map2str = (map) => {
  let str = '';

  for (let key in map) {
    str += key + ': ' + map[key] + '\n';
  }

  return str.trim();
};

const str2map = (str) => {
  let lines = str.split('\n');
  let map = {};

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(':') === false) continue;
    let [keys, ...value] = lines[i].split(':');
    let content = value.join(':');
    if (keys.trim() === '' || content.trim() === '') continue;
    map[keys.trim()] = content.trim();
  }

  return map;
};

const id = getProductID();

function initializeEdit() {
  const options = {
    method: 'GET',
    headers: {
      Authorization: getAdminToken(),
    },
  };

  request(API.getProductByIdAPI(id), options, (result) => {
    document.querySelector('#id').value = result.id;
    document.querySelector('#name').value = result.name;
    document.querySelector('#title').value = result.title;
    document.querySelector('#vendorName').value = result.vendorName;
    document.querySelector('#price').value = result.price;
    document.querySelector('#designLocation').value = result.designLocation;
    document.querySelector('#category').value = result.category;
    document.querySelector('#quantity').value = result.quantity;
    document.querySelector('#warranty').value = result.warranty;
    document.querySelector('#images').value = image2str(result.images);
    document.querySelector('#intro').value = result.intro;
    document.querySelector('#description').value = result.description;
    document.querySelector('#features').value = map2str(result.features);
    document.querySelector('#highlights').value = map2str(result.highlights);
  });

  document.getElementById('save').addEventListener('click', () => {
    saveProduct('PUT');
  });
  document
    .getElementById('delete')
    .addEventListener('click', /*deleteProduct*/ () => {});
}

const checkHighlightCount = () => {
  let highlights = str2map(document.querySelector('#highlights').value);
  let count = Object.keys(highlights).length;
  return count <= 3;
};

const editModal = (title, message, url = '') => {
  var modal = document.getElementById('modal');
  document.querySelector('.modal-title').textContent = title;
  document.querySelector('.modal-message').textContent = message;
  var closeButton = document.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    modal.close();
    if (url !== '') {
      window.location.href = url;
    }
  });
  return modal;
};

const checkProduct = (product) => {
  for (let property in product) {
    if (product[property] === '') {
      return property + ' cannot be empty.';
    } else if (product[property] === 0) {
      return property + ' cannot be 0 or empty.';
    } else if (Array.isArray(product[property])) {
      if (product[property].length === 0) {
        return property + ' cannot be empty.';
      }
    } else if (typeof product[property] === 'object') {
      if (Object.keys(product[property]).length === 0) {
        return (
          property +
          ' cannot be empty. Remember to separate features and their descriptions using :'
        );
      }
    }
  }

  return true;
};

function saveProduct(method) {
  if (checkHighlightCount()) {
    let product = Object();
    if (method === 'PUT')
      product.id = Number(document.querySelector('#id').value);
    product.name = document.querySelector('#name').value;
    product.vendorName = document.querySelector('#vendorName').value;
    product.title = document.querySelector('#title').value;
    product.price = Number(document.querySelector('#price').value);
    product.designLocation = document.querySelector('#designLocation').value;
    product.quantity = Number(document.querySelector('#quantity').value);
    product.warranty = Number(document.querySelector('#warranty').value);
    product.intro = document.querySelector('#intro').value;
    product.description = document.querySelector('#description').value;
    product.category = document.querySelector('#category').value;
    product.images = str2image(document.querySelector('#images').value);
    product.highlights = str2map(document.querySelector('#highlights').value);
    product.features = str2map(document.querySelector('#features').value);

    if (checkProduct(product) === true) {
      const options = {
        method: method,
        body: JSON.stringify(product),
        headers: {
          Authorization: getAdminToken(),
          'Content-type': 'application/json; charset=UTF-8',
        },
      };

      request(API.updateProduct(), options, (result) => {
        if (options.method === 'PUT') {
          var modal = editModal(
            'Save Product',
            'Product ID #' + id + ' has been updated successfully.'
          );
          modal.showModal();
        } else if (options.method === 'POST') {
          var modal = editModal(
            'Save Product',
            'Product ID #' + result.id + ' has been updated successfully.',
            '/admin/editProduct.html?id=' + result.id
          );
          modal.showModal();
        }
      });
    } else {
      alert(checkProduct(product));
    }
  } else {
    alert('Maximum 3 highlights per product.');
  }
}

$('.confirm').modaal({
  type: 'confirm',
  confirm_button_text: 'Delete',
  confirm_cancel_button_text: 'Cancel',
  confirm_title: 'Xác nhận hành động',
  confirm_content:
    'Đây là hành động xoá mềm. Bạn có đồng ý xoá?',
  confirm_callback: function () {
    deleteProduct();
  },
  confirm_cancel_callback: function () {},
});

function deleteProduct() {
  var modal = editModal(
    'Delete Product',
    'Product ID #' + id + ' has been deleted successfully.',
    '/admin/product.html'
  );

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: getAdminToken(),
    },
  };

  fetch(API.getSoftDeleteProductByIdAPI(id), options)
    .then(() => {
      modal.showModal();
    })
    .catch((e) => console.log(e));
}

function initializeCreate() {
  document.getElementById('delete').style.visibility = 'hidden';
  document.getElementById('save').addEventListener('click', () => {
    saveProduct('POST');
  });
}

if (id !== '') {
  initializeEdit();
} else {
  initializeCreate();
}
