let variableToCalculateFieldset = document.getElementById('variableToCalculate');
let result = document.getElementById('result');

variableToCalculateFieldset.addEventListener('change', () => {
    let variableToCalculate = variableToCalculateFieldset.value;
    if (variableToCalculate === 'none') {
        result.textContent = 'Please select a variable to calculate.';
    } else {
        result.textContent = `You have selected: ${variableToCalculate}`;
    }
})
