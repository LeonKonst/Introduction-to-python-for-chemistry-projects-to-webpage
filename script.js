//     let variableToCalculateFieldset = document.getElementById('variableToCalculate');
// let result = document.getElementById('resultValue');
// let knownVariablesFieldset = document.getElementById('knownVariables');
// let errorPressure = document.getElementById('errorPressure');
// let errorVolume = document.getElementById('errorVolume');
// let errorTemperature = document.getElementById('errorTemperature');
// let errorMoles = document.getElementById('errorMoles');
// let resultUnit = document.getElementById('resultUnits')

// function calculateProperty(selectedInput) {

//     let pressure = parseFloat(document.getElementById('pressureInput').value);
//     let volume = parseFloat(document.getElementById('volumeInput').value);
//     let temperature = parseFloat(document.getElementById('temperatureInput').value);
//     let moles = parseFloat(document.getElementById('molesInput').value);

//     switch (selectedInput[0].value) {
//         case 'pressure':
//             validateVolume();
//             validateTemperature();
//             validateMoles();
//             return (moles * 0.0821 * temperature) / volume;
//         case 'volume':
//             validatePressure();
//             validateTemperature();
//             validateMoles();
//             return (moles * 0.0821 * temperature) / pressure;
//         case 'temperature':
//             validatePressure();
//             validateVolume();
//             validateMoles();
//             return (pressure * volume) / (moles * 0.0821);
//         case 'moles':
//             validatePressure();
//             validateVolume();
//             validateTemperature();
//             return (pressure * volume) / (0.0821 * temperature);
//     }
// }

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



// variableToCalculateFieldset.addEventListener('change', () => {
//     clearErrors()
//     let selectedOptions = variableToCalculateFieldset.querySelectorAll('input[type="radio"]:checked');
//     let selectedInput = document.getElementById(`${selectedOptions[0].value}InputDiv`);
    
//     knownVariablesFieldset.style.display = 'block';
//     let divs = knownVariablesFieldset.querySelectorAll('div');

//     divs.forEach(div => {
//         div.style.display = 'block';
//     });

//     selectedInput.style.display = 'none';
//     if (validateInputs()) {
//         result.textContent = `The ${selectedOptions[0].value} is ${Math.floor(calculateProperty(selectedOptions)*100)/100} ${resultUnit}.`;
//     }
//     else {
//         result.textContent = 'Please fix the errors.';
//     }
// })

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