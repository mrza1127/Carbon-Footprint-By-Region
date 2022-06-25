
const carbonFootPrintForm = document.getElementById('carbonFootPrint');
const clothingfootprintForm = document.getElementById('clothingfootprint');
const resultsScreen = document.getElementById('results');
const yourEmissionProgerss = document.getElementById('yourEmissionProgress');
const yourEmission = document.getElementById('yourEmission');
var selectedState = '';
var activities = '';
var unit = '';
var powerUsage = '';
var moneyUnit ='';
var moneyEntered ='';
const electricity_request_url = 'https://www.carboninterface.com/api/v1/estimates';
const electricity_api_token = 'Eiv9kGXI9G1VxlTKFIzCQ';
const clothing_footwear_request_url = 'https://beta3.api.climatiq.io/estimate';
const clothing_footwear_token = 'E7TAM9S8DR48YCJXKWRWNY09TPXM';


resetForm();

function resetForm() {
    carbonFootPrintForm.reset();
    resultsScreen.style.display = 'none';
    clothingfootprintForm.style.display = 'none';
}

function submitCarbonForm(event) {
    event.preventDefault();
    selectedState = carbonFootPrintForm.elements['stateDropdown'].value;
    activities = carbonFootPrintForm.elements['activities'].value;
    unit = carbonFootPrintForm.elements['unit'].value;
    powerUsage = carbonFootPrintForm.elements['powerUsage'].value;
    calculateCarbonFootPrint();
    displayClothingForm();
    
};


function calculateCarbonFootPrint() {
    let request_body = {
        "type": activities,
        "country": "us",
        "state": selectedState,
        "electricity_unit": unit,
        "electricity_value": parseInt(powerUsage)
    }

    fetch(electricity_request_url, {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + electricity_api_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
    })
        .then((res) => res.json())
        .then(data => saveElectricityResult(data.data.attributes.carbon_mt));

};



function saveElectricityResult(carbon_mt){
    localStorage.setItem('electricityResults', carbon_mt);
} 

function displayClothingForm() {
    clothingfootprintForm.style.display = 'block';
    carbonFootPrintForm.style.display = 'none';
}

function submitClothingForm(event) {
    event.preventDefault();
    moneyUnit = clothingfootprintForm.elements['moneyDropdown'].value;
    moneyEntered = clothingfootprintForm.elements['dollarAmount'].value;
    calculateClothingFootWearPrint();
    displayClothingForm();
};

function calculateClothingFootWearPrint() {
    let request_body = {
        "emission_factor": "consumer_goods-type_clothing",
        "parameters": {
			"money": parseInt(moneyEntered),
			"money_unit": moneyUnit
        }
    }

    fetch(clothing_footwear_request_url, {
        method: 'POST',
        headers: {
            "Authorization": 'Bearer ' + clothing_footwear_token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request_body)
    })
        .then((res) => res.json())
        .then(data => displayResults(data));

};

function displayResults(results) {

    var electricityEmmison = parseFloat(localStorage.getItem('electricityResults'));
    var clothingFootwearEmission = results.constituent_gases.co2e_total / 100;
    var totalEmission = electricityEmmison + clothingFootwearEmission;
    yourEmissionProgress.value =  totalEmission.toString();
    yourEmission.innerHTML = totalEmission.toString();;
    resultsScreen.style.display = 'block';
}