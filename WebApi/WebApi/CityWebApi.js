const apiBaseUrl = "https://cityinfo.buchwaldshave34.dk/api/";
let cities = [];
let countries = {};
let languages = [];
let cityLanguages = [];

const ThisUserName = "?UserName=UserMathiasH";
const apiEndpoints = {apiCity: "City", apiCountry: "Country", apiLaunguage: "Launguage", apiCityLauguage: "CityLauguage"  }

function fetchData(endpoint){
    return fetch(apiBaseUrl + endpoint + ThisUserName)
    .then(response => response.json())
}

function getData() {

    Promise.all([
        fetchData(apiEndpoints.apiCity),
        fetchData(apiEndpoints.apiCountry),
    ])
        .then(([citiesData, countryData])=>{
            cities = citiesData;

            countries = {};
            countryData.forEach(country => {
                countries[country.countryID] = country.countryName;
            });

            _displayItems(cities);
        })
        .catch(error => console.error('Unable to get items.', error));
}


function addItem() {
    const addNameTextbox = document.getElementById('add-name');
    const addDescTextbox = document.getElementById('add-desc');
    const addConIdTextbox = document.getElementById('add-conId');

    const item = {
        name: addNameTextbox.value.trim(),
        description: addDescTextbox.value.trim(),
        countryID: addConIdTextbox.value.trim()
    };

    fetch(apiBaseUrl + apiEndpoints.apiCity + ThisUserName, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    })
        .then(response => response.json())
        .then(() => {
            getData();
            addNameTextbox.value = '';
            addDescTextbox.value = '';
            addConIdTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${apiBaseUrl + apiEndpoints.apiCity}/${id}` + ThisUserName, {
        method: 'DELETE'
    })
        .then(() => getData())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = cities.find(item => item.cityId === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.cityId;
    document.getElementById('edit-desc').value = item.description;
    document.getElementById('edit-conId').value = item.countryID;
    
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        cityId: parseInt(itemId, 10),
        description: document.getElementById('edit-desc').value.trim(),
        countryID: document.getElementById('edit-conId').value.trim(),
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${apiBaseUrl + apiEndpoints.apiCity}/${itemId}` + ThisUserName, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getData())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'City' : 'Cities';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function addCell(row, text){
    let td = row.insertCell();
    td.appendChild(document.createTextNode(text));
}

function addButtonCell(row, text, funktion ){
    const button = document.createElement('button');
    let td = row.insertCell();
    button.innerText = text;
    button.onclick = funktion;
    td.appendChild(button);
}

function _displayItems(data) {
    const tBody = document.getElementById('Display');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let tr = tBody.insertRow();

        
        addCell(tr, CountryIdToName(item.countryID));
        addCell(tr, item.name);
        addCell(tr, item.description);

        addButtonCell(tr, "Edit", () => displayEditForm(item.cityId));
        addButtonCell(tr, "Delete", () => deleteItem(item.cityId));



    });

}

function CountryIdToName(id){
    return countries[id];
}

function CountryNameToId(name){
    return countries.find(country => country.countryName === name);
}
