// Define the base URL for the City Web API
const apiBaseUrl = "https://cityinfo.buchwaldshave34.dk/api/";

// Initialize arrays and objects to store data
let cities = [];
let countries = {};
let languages = [];
let cityLanguages = [];

// User-specific query parameter
const ThisUserName = "?UserName=UserMathiasH";

// Define API endpoints for different operations
const apiEndpoints = {
    apiCity: "City",
    apiCountry: "Country", 
    apiLanguage: "Language", 
    apiCityLanguage: "CityLanguage"  
}

// Function to fetch data from the API for a given endpoint
function fetchData(endpoint){
    return fetch(apiBaseUrl + endpoint + ThisUserName)
    .then(response => response.json());
}

// Function to fetch data for cities, countries, languages, and city languages
function getData() {
    Promise.all([
        fetchData(apiEndpoints.apiCity),
        fetchData(apiEndpoints.apiCountry),
        fetchData(apiEndpoints.apiLanguage),
        fetchData(apiEndpoints.apiCityLanguage)
    ])
    .then(([citiesData, countryData, languageData, CityLauguageData])=>{
        // Store fetched data in respective variables
        cities = citiesData;
        cityLanguages = CityLauguageData
        countries = {};
        languages = {}
        countryData.forEach(country => {
            countries[country.countryID] = country.countryName;
        });
        languageData.forEach((language) => {
            // Fixed typo here, should be languages instead of language
            languages[language.languageId] = language.languageName;
        })
        // Display the city data
        _displayItems(cities);
    })
    .catch(error => console.error('Unable to get items.', error));
}

// Function to add a new city
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
        // Refresh displayed data and clear input fields
        getData();
        addNameTextbox.value = '';
        addDescTextbox.value = '';
        addConIdTextbox.value = '';
    })
    .catch(error => console.error('Unable to add item.', error));
}

// Function to delete a city item
function deleteItem(id) {
    fetch(`${apiBaseUrl + apiEndpoints.apiCity}/${id}` + ThisUserName, {
        method: 'DELETE'
    })
    .then(() => getData())
    .catch(error => console.error('Unable to delete item.', error));
}

// Function to display the edit form for a city
function displayEditForm(id) {
    const item = cities.find(item => item.cityId === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.cityId;
    document.getElementById('edit-desc').value = item.description;
    document.getElementById('edit-conId').value = item.countryID;
    
    document.getElementById('editForm').style.display = 'block';
}

// Function to update a city item
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

    // Close the edit form
    closeInput();

    return false;
}

// Function to close the edit form
function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

// Function to display the count of items
function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'City' : 'Cities';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

// Function to add a cell to a table row
function addCell(row, text){
    let td = row.insertCell();
    td.appendChild(document.createTextNode(text));
}

// Function to add a button cell to a table row
function addButtonCell(row, text, funktion ){
    const button = document.createElement('button');
    let td = row.insertCell();
    button.innerText = text;
    button.onclick = funktion;
    td.appendChild(button);
}

// Function to display city data in a table
function _displayItems(data) {
    const tBody = document.getElementById('Display');
    tBody.innerHTML = '';

    _displayCount(data.length);

    data.forEach(item => {
        let tr = tBody.insertRow();

        // Add cells for country name, city name, description, and languages
        addCell(tr, CountryIdToName(item.countryID));
        addCell(tr, item.name);
        addCell(tr, item.description);
        // Display languages for the city
        const clang = item.cityLanguages.map(langs => langs.languageName).join(', ');
        addCell(tr, clang)

        // Add buttons for editing and deleting
        addButtonCell(tr, "Edit", () => displayEditForm(item.cityId));
        addButtonCell(tr, "Delete", () => deleteItem(item.cityId));
    });
}

// Function to convert a country ID to a country name
function CountryIdToName(id){
    return countries[id];
}

// Function to convert a country name to a country ID (incomplete)
function CountryNameToId(name){
    return countries.find(country => country.countryName === name);
}
