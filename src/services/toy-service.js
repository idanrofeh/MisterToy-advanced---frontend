import Axios from 'axios';

export const toyService = {
    query,
    saveToy,
    removeToy
}

const BASE_API = "http://localhost:3030/api/toy";

let axios = Axios.create({
    withCredentials: true
})

async function query(filterBy) {
    try {
        const { data } = await axios.get(BASE_API, {
            params: { filterBy }
        });
        return data;
    } catch (err) {
        console.log("error in query", err);
        return null;
    }
}

async function removeToy(toyId) {
    try { await axios.delete(BASE_API + "/" + toyId) } catch (err) {
        console.log("cannot remove toy", err);
    }
}

function saveToy(toy) {
    if (!toy._id) _addToy(toy)
    else _updateToy(toy);
}

async function _addToy(toy) {
    try { await axios.post(BASE_API, toy) } catch (err) {
        console.log("cannot save toy", err);
    }
}

async function _updateToy(toy) {
    try {
        await axios.put(BASE_API, toy);
    } catch (err) {
        console.log("cannot update toy", err);
    }
}