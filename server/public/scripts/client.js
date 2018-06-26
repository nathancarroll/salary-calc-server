$(document).ready(readyGo);


// Employee class with 5 properties corresponding to the 5 input fields.
// Also has a method for calculating monthly salary from the annual one.
class Employee {
    constructor(firstName, lastName, idNumber, jobTitle, annualSalary){
        this.firstName = firstName;
        this.lastName = lastName;
        this.idNumber = idNumber;
        this.jobTitle = jobTitle;
        this.annualSalary = annualSalary;
    }

    monthlySalary(){
        return parseFloat(this.annualSalary)/12;
    }
}

// A test array of employee objects to display on the DOM on page load.
let allEmployees = [
    new Employee('Jen', 'Barber', '4521', 'Team Lead', '80000'),
    new Employee('Maurice', 'Moss', '8724', 'Support Team', '58000'),
    new Employee('Roy', 'Smith', '9623', 'Quality Assurance', '48000')
];

// Budget is a global variable that can be changed below if the project budget changes.
let remainingBudget = 20000;

// Set up the button handlers and write the table with the test employees to the DOM.
function readyGo(){
    addClickHandlers();
    drawTable();
}

// Ties the appropriate functions to the submit and delete buttons.
function addClickHandlers(){
    $('#submit').on('click', handleSubmit);
    $('#employeeTable').on('click', '.deleteButton', deleteEmployee);
}

function newRow(employee){
    // The first part of this function appends a new row to the employee table with the data from the passed employee object.
    // The delete button is given a custom attribute corresponding to the employee's monthly salary.
    $('tbody').append(
        '<tr><td class="align-middle">' + employee.firstName +
        '</td><td class="align-middle">' + employee.lastName + 
        '</td><td class="align-middle">' + employee.idNumber + 
        '</td><td class="align-middle">' + employee.jobTitle +
        '</td><td class="align-middle">' + parseFloat(employee.annualSalary).toLocaleString('en-US', {style: 'currency', currency: 'USD'}) +
        '</td><td><button class="btn btn-secondary deleteButton" sal="' + employee.monthlySalary() +
        '">Delete</button></td></tr>'
    );

    // The second part recalculates the remaining budget and writes the new figure to the DOM.
    remainingBudget -= employee.monthlySalary();

    let remainingBudgetString = remainingBudget.toLocaleString('en-US', {style: 'currency', currency: 'USD'});

    $('#remainingBudget').text('Remaining Monthly Budget: ' + remainingBudgetString);
    if (remainingBudget < 0){
        $('#remainingBudget').addClass('overBudget');
    }

}

// Creates a new employee object with the form data and passes it to the newRow function.
function handleSubmit(){

    if (validateInputs()){
        return;
    }

    $('.error').css('visibility', 'hidden');

    let newEmployee = new Employee(
        $('#firstNameInput').val(),
        $('#lastNameInput').val(),
        $('#idNumberInput').val(),
        $('#jobTitleInput').val(),
        $('#annualSalaryInput').val()
    );

    newRow(newEmployee);

    $('#firstNameInput, #lastNameInput, #idNumberInput, #jobTitleInput, #annualSalaryInput').val('');
    $('#firstNameInput').focus();
}

// Get the deleted salary from the button attribute, then recalc and rewrite the budget on the DOM.
function deleteEmployee(){
    let deletedSalary = parseFloat($(this).attr('sal'));
    remainingBudget += deletedSalary;
    if (remainingBudget > 0){
        $('#remainingBudget').removeClass('overBudget');
    }

    let remainingBudgetString = remainingBudget.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
    $('#remainingBudget').text('Remaining Monthly Budget: ' + remainingBudgetString);
    $(this).closest('tr').remove();
}

// Loop through our initial employee list and append them to the table on the DOM.
function drawTable(){
    for (employee of allEmployees){
        newRow(employee);
    }
}

// Displays the error message if not all fields are filled in.
function validateInputs(){
    if ($('#firstNameInput').val() === '' || $('#lastNameInput').val() === '' || $('#idNumberInput').val() === '' || $('#jobTitleInput').val() === '' || $('#annualSalaryInput').val() === ''){
        $('.error').css('visibility', 'visible');
        $('#firstNameInput').focus();
        return true;
    } else {
        return false;
    }
}