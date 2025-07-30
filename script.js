let variableToCalculateFieldset = document.getElementById('variableToCalculate');
let knownVariablesFieldset = document.getElementById('knownVariables');
let result = document.getElementById('resultValue');
let unitSelectors = document.querySelectorAll(".unitSelector");
let divOfKnownInputs = document.querySelectorAll(".knownInput")

let clearBtn = document.getElementById("clearBtn")


clearBtn.addEventListener("click", ()=> {
    let variableSelectorInputs = variableToCalculateFieldset.querySelectorAll("input");
    variableSelectorInputs.forEach(input => {
        input.checked = false;
    })
    knownVariablesFieldset.style.display = 'none';
    result.style.display = "none";

})

function checkAndCalculateOnChange(elements){
    elements.forEach(element =>{
        element.addEventListener("change", () => 
            {
                result.textContent = displayResults();
            }
        )
    } )
}

checkAndCalculateOnChange(unitSelectors);
checkAndCalculateOnChange(divOfKnownInputs);

divOfKnownInputs.forEach(element =>{
        
        element.addEventListener("change", () =>
            {
                let inputElement = element.querySelector("input");
                let unitValue = element.querySelector("select").value;
                toggleClass(inputElement, inputElement.value > lowerValidLimit(inputElement.name,unitValue));
            }
        )
    }
)


function lowerValidLimit(variable, unit){
    if(variable==="temperature"&& unit==="celsius"){
        return -273.15;
    }
    return 0;
}


variableToCalculateFieldset.addEventListener("change", () => {  
    displayKnownVariables()
})
 

function displayKnownVariables(){
    // Fetch the selected unknown variable 
    let selectedOptions = variableToCalculateFieldset.querySelectorAll('input[type="radio"]:checked');
    
    // Display all the input fields in the known variables fieldset
    let divs = knownVariablesFieldset.querySelectorAll('div');
    knownVariablesFieldset.style.display = 'block';
    divs.forEach(div => {
        div.classList.add('visible');
        div.style.display = 'block';
    });

    // except the one corresponding to the selected variable
    let selectedInput = document.getElementById(`${selectedOptions[0].value}InputDiv`);
    selectedInput.style.display = 'none';
    selectedInput.classList.remove('visible');
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

// Check input validity

function toggleClass(element, isValid) {
    element.classList.toggle('valid', isValid);
    element.classList.toggle('invalid', !isValid);
}


document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});


// Todo

// check if all inputs contain accurate values before showing results - visible class was added to visible known variables
// Add units to the result
// 