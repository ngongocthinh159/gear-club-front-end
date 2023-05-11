import { request } from '/assets/js/commons/fetch.js'
import { API } from '/assets/js/commons/restful-api.js'
import { getAdminToken } from '/assets/js/commons/utils.js'


const getCollectionName = () => {
    var str = window.location.search
    return str.slice(str.indexOf('=') + 1)
}

const image2str = (arr) => {
    let str = ''

    for (let i = 0; i < arr.length; i++) {
        let temp = arr[i].trim()
        str += temp + '\n'
    }

    return str.trim()
}

const str2image = (str) => {
    let temp = str.trim()
    return temp.split('\n')
}

const map2str = (map) => {
    let str = ''

    for (let key in map) {
        str += key + ": " + map[key] + '\n'
    }

    return str.trim()
}

const str2map = (str) => {
    let lines = str.split('\n')
    let map = {}

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(":") === false) continue
        let [keys, ...value] = lines[i].split(":")
        let content = value.join(':')
        if (keys.trim() === "" || content.trim() === "") continue
        map[keys.trim()] = content.trim()
    }

    return map
}

const name = getCollectionName()

const checkProductListCount = (limit) => {
    let productList = str2map(document.querySelector("#productList").value)
    let count = Object.keys(productList).length
    return count >= limit
}

function saveCollection() {
    let limit = 0;
    switch (Number(document.querySelector("#id").value)) {
        case 1:
            limit = 7;
            break;
        case 2, 3:
            limit = 5;
            break;
        default:
            limit = 7;
    }

    if (checkProductListCount(limit)) {
        let collection = Object()
        collection.id = Number(document.querySelector("#id").value)
        collection.name = document.querySelector("#name").value
        // collection.createdAt = document.querySelector("#createdAt").value
        // collection.updatedAt = document.querySelector("#updatedAt").value
        collection.productList = str2map(document.querySelector("#productList").value)

        const options = {
            method: 'PUT',
            body: JSON.stringify(collection),
            headers: {
                Authorization: getAdminToken(),
                'Content-type': 'application/json; charset=UTF-8',
            }
        }

        request(API.updateCollection(), options, (result) => {
            var modal = editModal("Save Collection", "Collection " + name + " has been updated successfully.");
            modal.showModal();
        })
    } else {
        alert("Must have at least " + limit + " products in the collection.")
    }
}

function initializeEdit() {
    const options = {
        method: 'GET',
        headers: {
            Authorization: getAdminToken(),
        }
    }

    request(API.getTrendingCollectionByNameAPI(name), options, (result) => {
        document.querySelector("#id").value = result.id
        document.querySelector("#name").value = result.name
        document.querySelector("#createdAt").value = result.createdAt
        document.querySelector("#updatedAt").value = result.updatedAt
        document.querySelector("#productList").value = map2str(result.productList)
    })

    document.getElementById("save").addEventListener("click", () => { saveCollection() });
}

const editModal = (title, message, url = "") => {
    var modal = document.getElementById("modal");
    document.querySelector(".modal-title").textContent = title;
    document.querySelector(".modal-message").textContent = message;
    var closeButton = document.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        modal.close();
        if (url !== "") {
            window.location.href = url;
        }
    });
    return modal;
}

initializeEdit()