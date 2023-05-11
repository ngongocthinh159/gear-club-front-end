import { request } from '/assets/js/commons/fetch.js'
import { API } from '/assets/js/commons/restful-api.js'
import { getToken } from '/assets/js/commons/utils.js'

function loadTable(tabledata) {
    var table = new Tabulator("#table", {
        autoResize: true,
        data: tabledata, //assign data to table
        layout: "fitDataTable",
        responsiveLayout: true, // enable responsive layouts
        pagination: true, //enable.
        paginationSize: 20, // this option can take any positive integer value
        columns: [ //Define Table Columns
            { title: "id", field: "id", width: 100 },
            { title: "Name", field: "name", minWidth: 500 },
            { title: "Vendor Name", field: "vendorName", minWidth: 150 },
            { title: "Price", field: "price", minWidth: 150 },
            { title: "Category", field: "category", minWidth: 200 }
        ],
        footerElement: `<button id="add-button">Add Product</button>`,
        // groupBy: "category",
    });

    //trigger an alert message when the row is clicked
    table.on("rowClick", function (e, row) {
        var data = row.getData()
        window.location.href = '/admin/editProduct.html?id=' + data.id
    });

    table.on("renderComplete", function () {
        document.getElementById("add-button").addEventListener("click", () => {
            window.location.href = '/admin/editProduct.html'
        })
    });
}

function initialize() {
    const options = {
        method: 'GET',
        headers: {
        Authorization: getToken(),
        },
    };

    request(API.getAllProductAPI(), options, (result) => {
        loadTable(result);
    });
}

function search() {
    if (document.getElementById("search-text").value === "") {
        initialize()
    } else {
        let object = { "search": document.getElementById("search-text").value }
        let searchOptions = {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                Authorization: getToken(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        request(API.getProductByName(), searchOptions, (result) => {
            loadTable(result)
        })
    }
}

initialize()

document.getElementById("search-text").onchange = () => { search() }
document.getElementById("search-button").addEventListener("click", () => search())