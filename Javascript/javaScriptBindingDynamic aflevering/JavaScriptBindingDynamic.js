let ButtonCounter = 0;
let TextBoxElement;
let DocumentButton;
let lastClickedButton = null;

// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    SetupDOMElements();

    document.getElementById("btnAddNewButton").addEventListener("click", function () {
        AddNewButton();
    });

    document.getElementById("btnDeleteButton").addEventListener("click", function () {
        DeleteLastClickedButton();
    });

    TextBoxElement.addEventListener("input", function () {
        UpdateButtonText();
    });
});

function SetupDOMElements() {
    TextBoxElement = document.getElementById("txtButtonContext");
    DocumentButton = document.getElementById("btn" + ButtonCounter.toString());
}

function AddNewButton() {
    let pre = document.createElement("pre");

    let button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('ID', "btn" + ButtonCounter.toString());
    button.setAttribute('value', "btnShow" + ButtonCounter.toString());

    // Add an onclick event to mark the button as last clicked
    button.onclick = function () {
        MarkAsLastClickedButton(this);
    };

    button.style.backgroundColor = "Blue";
    button.style.color = "White";
    button.style.height = "40px";

    document.body.appendChild(pre);
    document.body.appendChild(button);

    ButtonCounter++;
}

function MarkAsLastClickedButton(button) {
    lastClickedButton = button;
    TextBoxElement.value = lastClickedButton.value;
}

function DeleteLastClickedButton() {
    if (lastClickedButton) {
        lastClickedButton.remove();
        lastClickedButton = null;
        ButtonCounter--;
    }
}

function UpdateButtonText() {
    if (lastClickedButton) {
        lastClickedButton.value = TextBoxElement.value;
    }
}

// Initial setup
SetupDOMElements();
