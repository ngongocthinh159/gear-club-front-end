import { request } from '/assets/js/commons/fetch.js'
import { API } from '/assets/js/commons/restful-api.js'
import { getToken } from '/assets/js/commons/utils.js'

document.getElementById("search-text").onchange = () => { search() }
document.getElementById("search-button").addEventListener("click", () => search())

const options = {
    method: 'GET',
    headers: {
        Authorization: getToken(),
    }
}

init();

function init() {
    request(API.getAllUser(), options, (result) => {
        console.log(result)
        loadTable(result)
    })
}

function loadTable(tabledata) {
    var table = new Tabulator("#table", {
        autoResize: true,
        data: tabledata, //assign data to table
        layout: "fitDataTable",
        responsiveLayout: true, // enable responsive layouts
        pagination: true, //enable.
        paginationSize: 20, // this option can take any positive integer value
        columns: [ //Define Table Columns
            { title: "Id", field: "id", width: 50 },
            { title: "Email", field: "email", minWidth: 200 },
            { title: "Password", field: "password", minWidth: 150 },
            { title: "First Name", field: "firstName", minWidth: 100 },
            { title: "Last Name", field: "lastName", minWidth: 100 },
            { title: "Role", field: "role", minWidth: 100 },
            { title: "Created At", field: "createdAt", minWidth: 300 },
            { title: "Updated At", field: "updatedAt", minWidth: 300 }
        ]
    });
}

function search() {
    if (document.getElementById("search-text").value === "") {
        initialize()
    } 
    else {
        let object = { "search": document.getElementById("search-text").value }
        let searchOptions = {
            method: 'PUT',
            body: JSON.stringify(object),
            headers: {
                Authorization: getToken(),
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        request(API.searchUser(), searchOptions, (result) => {
            loadTable(result)
        })
    }
}