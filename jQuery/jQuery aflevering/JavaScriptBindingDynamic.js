// Initialize variables
let ButtonCounter = 0; // Counter for buttons
let TextBoxElement; // Textbox element
let DocumentButton;
let lastClickedButton = null; // Store the last clicked button

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Perform initial setup
    SetupDOMElements();

    // Add a click event listener to the "Add New Button" button
    document.getElementById("JSbtnAddNewButton").addEventListener("click", function () {
        AddNewButton();
    });

    // Add a click event listener to the "Delete Last Clicked Button" button
    document.getElementById("JSbtnDeleteButton").addEventListener("click", function () {
        DeleteLastClickedButton();
    });

    // Add an input event listener to the textbox for updating button text
    TextBoxElement.addEventListener("input", function () {
        UpdateButtonText();
    });
});

// Function to set up DOM elements
function SetupDOMElements() {
    TextBoxElement = document.getElementById("JStxtButtonContext");
    DocumentButton = document.getElementById("JSbtn" + ButtonCounter.toString());
}

// Function to add a new button
function AddNewButton() {
    let pre = document.createElement("pre");

    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('ID', "JSbtn" + ButtonCounter.toString());
    button.setAttribute('value', "btnShow" + ButtonCounter.toString());

    // Add an onclick event to mark the button as last clicked
    button.onclick = function () {
        MarkAsLastClickedButton(this);
    };

    // Style the button
    button.style.backgroundColor = "Blue";
    button.style.color = "White";
    button.style.height = "40px";

    // Find the "JSButtonsAdded" div and append the button to it
    let ButtonAddedClass = document.querySelector('.JSButtonsAdded');
    ButtonAddedClass.appendChild(pre);
    ButtonAddedClass.appendChild(button);

    ButtonCounter++;
}

// Function to mark a button as the last clicked button
function MarkAsLastClickedButton(button) {
    lastClickedButton = button;
    TextBoxElement.value = lastClickedButton.value;
}

// Function to delete the last clicked button
function DeleteLastClickedButton() {
    if (lastClickedButton) {
        lastClickedButton.remove();
        lastClickedButton = null;
        ButtonCounter--;
    }
}

// Function to update the text of the last clicked button
function UpdateButtonText() {
    if (lastClickedButton) {
        lastClickedButton.value = TextBoxElement.value;
    }
}

// Initial setup
SetupDOMElements();
