let variableToCalculateFieldset = document.getElementById('variableToCalculate');
let knownVariablesFieldset = document.getElementById('knownVariables');
let result = document.getElementById('resultValue');
let unitSelectors = document.querySelectorAll(".unitSelector");
let knownInputs = document.querySelectorAll(".knownInput")


function addListenerToCalculateResults(elements, change) {
    elements.forEach(element => {
        element.addEventListener(change, () => {  
            displayKnownVariables()
            result.textContent = displayResults();
    })}
)
}

addListenerToCalculateResults(unitSelectors,"change");
addListenerToCalculateResults(knownInputs,"input");

variableToCalculateFieldset.addEventListener("change", () => {  
            displayKnownVariables()
            result.textContent = displayResults();
})


function displayKnownVariables(){
    // Fetch the selected unknown variable 
    let selectedOptions = variableToCalculateFieldset.querySelectorAll('input[type="radio"]:checked');
    
    // Display all the input fields in the known variables fieldset
    let divs = knownVariablesFieldset.querySelectorAll('div');
    knownVariablesFieldset.style.display = 'block';
    divs.forEach(div => {
        div.style.display = 'block';
    });

    // except the one corresponding to the selected variable
    let selectedInput = document.getElementById(`${selectedOptions[0].value}InputDiv`);
    selectedInput.style.display = 'none';
    return selectedOptions;
}

function displayResults(){
    return `The ${displayKnownVariables()[0].value} is ${Math.floor(calculateProperty(displayKnownVariables())*100)/100}.`;
}


function calculateProperty(selectedInput) {
    // fetch the values from the input fields and parse them to float
    let pressure = parseFloat(document.getElementById('pressureInput').value);
    let volume = parseFloat(document.getElementById('volumeInput').value);
    let temperature = parseFloat(document.getElementById('temperatureInput').value);
    let moles = parseFloat(document.getElementById('molesInput').value);

    pressure = pressureUnitConvesion(pressure, document.getElementById("pressureUnit").value);
    volume = volumeUnitConversion(volume, document.getElementById('volumeUnit').value);
    temperature = temperatureUntiConversion(temperature,document.getElementById("temperatureUnit").value); 

    switch (selectedInput[0].value) {
        case 'pressure':
            return (moles * 0.0821 * temperature) / volume;
        case 'volume':
            return (moles * 0.0821 * temperature) / pressure;
        case 'temperature':
            return (pressure * volume) / (moles * 0.0821);
        case 'moles':
            return (pressure * volume) / (0.0821 * temperature);
    }
}

function pressureUnitConvesion(pressure,unit){
    if (unit === 'bar') {
        return pressure * 1.01325; 
    } else if (unit === 'psi'){
        return pressure * 14.6959; 
    }
    return pressure; // Assume it's already in atm
}

function volumeUnitConversion(volume, unit) {
    if (unit === 'm3') {
        return volume * 1000; 
    }
    return volume; // Assume it's already in liters
}

function temperatureUntiConversion(temperature, unit){
    if (unit === 'celsius') {
        return temperature + 273.15; 
    }
    return temperature; // Assume it's already in Kelvin
}

// let errorPressure = document.getElementById('errorPressure');
// let errorVolume = document.getElementById('errorVolume');
// let errorTemperature = document.getElementById('errorTemperature');
// let errorMoles = document.getElementById('errorMoles');
// let resultUnit = document.getElementById('resultUnits')

// function validatePressure() {
//     let pressureInput = document.getElementById('pressureInput');
//     if (isNaN(pressureInput.value) || pressureInput.value <= 0) {
//         errorPressure.textContent = 'Please enter a valid pressure value greater than 0.';
//         return false;
//     }
//     errorPressure.textContent = '';
//     return true;
// }

// function validateVolume() {
//     let volumeInput = document.getElementById('volumeInput');
//     if (isNaN(volumeInput.value) || volumeInput.value <= 0) {
//         errorVolume.textContent = 'Please enter a valid volume value greater than 0.';
//         return false;
//     }
//     errorVolume.textContent = '';
//     return true;
// }

// function validateTemperature() {
//     let temperatureInput = document.getElementById('temperatureInput');
//     if (isNaN(temperatureInput.value) || temperatureInput.value <= 0) {
//         errorTemperature.textContent = 'Please enter a valid temperature value greater than 0.';
//         return false;
//     }
//     errorTemperature.textContent = '';
//     return true;
// }

// function validateMoles() {
//     let molesInput = document.getElementById('molesInput');
//     if (isNaN(molesInput.value) || molesInput.value <= 0) {
//         errorMoles.textContent = 'Please enter a valid moles value greater than 0.';
//         return false;
//     }
//     errorMoles.textContent = ''
//     return true;
// }

// function clearErrors() {
//     errorPressure.textContent = '';
//     errorVolume.textContent = '';
//     errorTemperature.textContent = '';
//     errorMoles.textContent = '';
// }

// function validateInputs() {
//     if (!validatePressure() || !validateVolume() || !validateTemperature() || !validateMoles()) {
//         return false;
//     }
//     return true;
// }



//

// let inputs = knownVariablesFieldset.querySelectorAll('input');

// inputs.forEach(input => {

//     input.addEventListener('input', () => {
//         let selectedOptions = variableToCalculateFieldset.querySelectorAll('input[type="radio"]:checked');
//         result.textContent = `The ${selectedOptions[0].value} is ${Math.floor(calculateProperty(selectedOptions)*100)/100} ${resultUnit}.`;
//     });
// });



// knownVariablesFieldset.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//     }
// });