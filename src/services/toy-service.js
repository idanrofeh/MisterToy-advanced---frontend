import axios from 'axios';
import { utilService } from './util.service.js';
// import { storageService } from './async-storage-service.js';

export const toyService = {
    query,
    saveToy,
    removeToy
}

const BASE_API = "http://localhost:3030/api/toy";

async function query(filterBy) {
    let queryStr = ""
    if (filterBy) {
        const { inStock, name, labels } = filterBy;
        const inStockStr = `inStock=${inStock}`;
        if (labels?.length) {
            const labelsStr = "labels=" + labels.join("_");
            queryStr += "?" + labelsStr;
        } if (name) {
            const nameStr = `name=${name}`;
            queryStr += ((queryStr === "") ? `?${nameStr}` : `&${nameStr}`);
        } queryStr += ((queryStr === "") ? `?${inStockStr}` : `&${inStockStr}`);
    }
    const res = await axios.get(BASE_API + queryStr);
    return res.data;
}

async function removeToy(toyId) {
    await axios.delete(BASE_API + "/" + toyId);
}

function saveToy(toy) {
    if (!toy._id) _addToy(toy)
    else _updateToy(toy);
}

async function _addToy(toy) {
    toy._id = utilService.makeId();
    toy.createdAt = Date.now();
    await axios.post(BASE_API, toy)
}

async function _updateToy(toy) {
    await axios.put(BASE_API, toy);
}

//USING ASYNC LOCAL STORAGE
// function query(filterBy) {
//     return (storageService.load('toyDB', filterBy));
// }

// function saveToy(toy) {
//     if (!toy._id) _addToy(toy)
//     else _updateToy(toy);
// }

// function _addToy(toy) {
//     toy._id = utilService.makeId();
//     toy.createdAt = Date.now();
//     storageService.addToy(toy);
// }

// function _updateToy(toy) {
//     storageService.updateToy(toy);
// }

// function removeToy(id) {
//     if (id) storageService.removeToy(id);
//     else return Promise.resolve();
// }