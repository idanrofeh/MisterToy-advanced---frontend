export const storageService = {
    load: loadFromStorage,
    save: saveToStorage,
    removeToy,
    updateToy,
    addToy
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    return Promise.resolve();
}

function loadFromStorage(key, filterBy) {
    const val = localStorage.getItem(key);
    let toys = JSON.parse(val);
    if (filterBy) { toys = _getFilteredToys(toys, filterBy) }
    return Promise.resolve(toys)
}

function _getFilteredToys(toys, filterBy) {
    const filteredToys = toys.filter(toy => { return ((toy.name.toLowerCase().includes(filterBy.name.toLowerCase())) && ((filterBy.inStock === "all") || (toy.inStock === filterBy.inStock)) && (_isLabelsMatch(toy, filterBy.labels))) })
    return filteredToys;
}

function _isLabelsMatch(toy, labels) {
    if ((labels.length === 1) && (labels[0] === "")) return true;
    return labels.every(label => toy.labels.includes(label));
}

function addToy(toy) {
    const val = localStorage.getItem("toyDB");
    let toys = JSON.parse(val);
    toys.push(toy);
    return saveToStorage("toyDB", toys);
}

function updateToy(updatedToy) {
    const val = localStorage.getItem("toyDB");
    const toys = JSON.parse(val);
    const toyIdx = toys.findIndex((toy) => toy._id === updatedToy._id);
    toys[toyIdx] = updatedToy;
    return saveToStorage("toyDB", toys);
}

function removeToy(toyId) {
    const val = localStorage.getItem("toyDB");
    const toys = JSON.parse(val);
    const toyIdx = toys.findIndex((toy) => toy._id === toyId);
    toys.splice(toyIdx, 1)
    return saveToStorage("toyDB", toys);
}