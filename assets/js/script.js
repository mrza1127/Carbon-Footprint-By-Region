
var carbonFootPrintForm = document.getElementById('carbonFootPrint');
var selectedState = '';
var activities = '';
var unit = '';
var powerUsage = '';
const request_url = 'https://www.carboninterface.com/api/v1/estimates';
const api_token = 'Eiv9kGXI9G1VxlTKFIzCQ';

function submitCarbonForm(event) {
    event.preventDefault();
    selectedState = carbonFootPrintForm.elements['stateDropdown'].value;
    activities = carbonFootPrintForm.elements['activities'].value;
    unit = carbonFootPrintForm.elements['unit'].value;
    powerUsage = carbonFootPrintForm.elements['powerUsage'].value;
    calculateCarbonFootPrint();
    
}

function calculateCarbonFootPrint() {
    var request_body = {
        "type": activities,
        "country": "us",
        "state": selectedState,
        "electricity_unit": unit,
        "electricity_value": parseInt(powerUsage)   
    }

    fetch(request_url, {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + api_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
    })
        .then((res) => res.json())
        .then(data => console.log(data));

}