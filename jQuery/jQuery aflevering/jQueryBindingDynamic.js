// Wait for the document to be fully loaded before executing jQuery code
$(document).ready(function () {
    // Initialize button counter and current button variables
    var ButtonAddedCounter = 0;
    var CurrentButton;

    // Cache jQuery objects for better performance
    var txtButtonContext = $("#JQtxtButtonContext");
    var ButtonAddedClass = $(".JQButtonsAdded");

    // Event handler for the "Add New Button" button
    $("#JQbtnAddNewButton").on('click', function () {
        // Create HTML string for the new button
        var WorkString = "<input id='btnDynamic" + ++ButtonAddedCounter + "' ";
        WorkString += "value='btnDynamic" + ButtonAddedCounter + "' ";
        WorkString += "type='button'";
        WorkString += " />";
        WorkString += "<br>";

        // Append the new button HTML to the container
        ButtonAddedClass.append(WorkString);

        // Create a new button using jQuery and append it to the container
        var Button = $("<input type='button' id='btnDynamic" + (++ButtonAddedCounter).toString() + "' value='btnDynamic" + ButtonAddedCounter + "' /> ");
        ButtonAddedClass.append(Button);

        // Add a line break after each button
        ButtonAddedClass.append("<br />");
    });

    // Event delegation for handling clicks on dynamically added buttons
    ButtonAddedClass.on("click", "input", function () {
        // Store the current button
        CurrentButton = $(this);

        // Get the text of the clicked button and update the text field
        var TextToTextField = $(this).val();
        txtButtonContext.val(TextToTextField);

        // Adjust the width of the text field
        txtButtonContext.width(CalculateWidthOnControl(txtButtonContext));
    });

    // Event handler for input changes in the text field
    txtButtonContext.on('input', function () {
        // Update the value of the current button based on the text field
        CurrentButton.val($(this).val());

        // Adjust the width of the text field
        txtButtonContext.width(CalculateWidthOnControl(txtButtonContext));
    });

    // Event handler for the "Delete Button" button
    $("#JQbtnDeleteButton").on("click", function () {
        if (CurrentButton) {
            // Find the <br> element that follows the current button and remove it
            CurrentButton.next('br').remove();

            // Remove the current button
            CurrentButton.remove();
            CurrentButton = null;
            ButtonAddedCounter--;
        }
    });

    // Function to calculate the width of a control based on its content
    function CalculateWidthOnControl(Control_Object) {
        ControlWidth = Control_Object.val().length;
        return (ControlWidth * 9 + 25);
    }

    // Call SetupPage or other functions as needed
    SetupPage(); // Make sure SetupPage is defined and does not contain errors
});
