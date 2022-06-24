
const carbonFootPrintForm = document.getElementById('carbonFootPrint');
const resultsScreen = document.getElementById('results');
const yourEmissionProgerss = document.getElementById('yourEmissionProgress');
const yourEmission = document.getElementById('yourEmission');
var selectedState = '';
var activities = '';
var unit = '';
var powerUsage = '';
const request_url = 'https://www.carboninterface.com/api/v1/estimates';
const api_token = 'Eiv9kGXI9G1VxlTKFIzCQ';
const climatiq_url = 'https://beta3.api.climatiq.io/estimate';
const climatiq_token = 'E7TAM9S8DR48YCJXKWRWNY09TPXM';


resetForm();

function submitCarbonForm(event) {
    event.preventDefault();
    selectedState = carbonFootPrintForm.elements['stateDropdown'].value;
    activities = carbonFootPrintForm.elements['activities'].value;
    unit = carbonFootPrintForm.elements['unit'].value;
    powerUsage = carbonFootPrintForm.elements['powerUsage'].value;
    calculateCarbonFootPrint();
};

function resetForm() {
    carbonFootPrintForm.reset();
    resultsScreen.style.display = 'none';
}

function calculateCarbonFootPrint() {
    let request_body = {
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
        .then(data => displayResults(data));

};

function displayResults(results) {
    yourEmissionProgress.value = results.data.attributes.carbon_mt; 
    yourEmission.innerHTML = results.data.attributes.carbon_mt;
    resultsScreen.style.display = 'block';
    saveElectricityResult(results.data.attributes.carbon_mt);
}

function saveElectricityResult(carbon_mt){
    localStorage.setItem('electricityResults', carbon_mt);
} 
