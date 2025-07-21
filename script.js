let variableToCalculateFieldset = document.getElementById('variableToCalculate');
let result = document.getElementById('resultValue');
let knownVariablesFieldset = document.getElementById('knownVariables');



function calculateProperty(selectedInput) {
    let pressure = parseFloat(document.getElementById('pressureInput').value);
    let volume = parseFloat(document.getElementById('volumeInput').value);
    let temperature = parseFloat(document.getElementById('temperatureInput').value);
    let moles = parseFloat(document.getElementById('molesInput').value);

    switch (selectedInput[0].value) {
        case 'pressure':
            return (moles * 0.0821 * temperature) / volume;
        case 'volume':
            return (moles * 0.0821 * temperature) / pressure;
        case 'temperature':
            return (pressure * volume) / (moles * 0.0821);
        case 'moles':
            return (pressure * volume) / (0.0821 * temperature);
        default:
            return 'Invalid selection';
    }
}


variableToCalculateFieldset.addEventListener('change', () => {
    let selectedOptions = variableToCalculateFieldset.querySelectorAll('input[type="radio"]:checked');
    let selectedInput = document.getElementById(`${selectedOptions[0].value}InputDiv`);
    
    knownVariablesFieldset.style.display = 'block';
    let divs = knownVariablesFieldset.querySelectorAll('div');

    divs.forEach(div => {
        div.style.display = 'block';
    });

    selectedInput.style.display = 'none';

    result.textContent = `The ${selectedOptions[0].value} is ${calculateProperty(selectedOptions)}.`;
})
