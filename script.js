// Ideal gas calculator
// -------------------------
let variableToCalculateFieldset = document.getElementById('variableToCalculate');
let knownVariablesFieldset = document.getElementById('knownVariables');
let calculatedProperty = document.getElementById("resultProperty");
let result = document.getElementById('resultValue');
let unitSelectors = document.querySelectorAll(".unitSelector");
let divOfKnownInputs = document.querySelectorAll(".knownInput");
let selectResultUnit = document.getElementById("resultUnit");

let clearBtn = document.getElementById("clearBtn")


clearBtn.addEventListener("click", ()=> {
    let variableSelectorInputs = variableToCalculateFieldset.querySelectorAll("input");
    variableSelectorInputs.forEach(input => {
        input.checked = false;
    })
    knownVariablesFieldset.style.display = 'none';
    result.style.display = "none";
    calculatedProperty.innerText = "";
    selectResultUnit.style.display="none";

})

function checkAndCalculateOnChange(elements){
    elements.forEach(element =>{
        element.addEventListener("change", () => 
            {
                displayResults();
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
                if(element.id==="molesInputDiv"){
                    toggleClass(inputElement, inputElement.value > 0);
                } else{
                    let unitValue = element.querySelector("select").value;
                    toggleClass(inputElement, inputElement.value > lowerValidLimit(inputElement.name,unitValue));
                }
                
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

selectResultUnit.addEventListener("change", () => {
    displayResults(); // Recalculate and update result
});

variableToCalculateFieldset.addEventListener("change", () => {  
    displayKnownVariables();
    selectResultUnit.style.display="block";
    selectResultUnit.innerHTML = unitSelector(displayKnownVariables()[0].value);
    displayResults();
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
    let resultValue = Math.floor(
  calculateProperty(displayKnownVariables(), selectResultUnit.value) * 100
) / 100;
    
    if(resultValue < 0.01){
        calculatedProperty.innerText = "";
        result.style.display = "block";
        result.innerText = `Result has a value lower than 0.01.`
        selectResultUnit.style.display="none";
    } else if(resultValue <= 0|| !isFinite(resultValue)){
        calculatedProperty.innerText = "";
        result.style.display = "block";
        result.innerText = `Insert valid values at all needed fields.`
        selectResultUnit.style.display="none";
    } else {
        selectResultUnit.style.display="block";
        calculatedProperty.innerText = `The ${displayKnownVariables()[0].value} is:`;
        result.style.display = "block";
        result.innerHTML =  `${resultValue}`;
    }
}


function unitSelector(property){
    switch (property) {
        case 'pressure':
            return  `<option value="atm" selected>atm</option>
                <option value="bar">bar</option>
                <option value="psi">psi</option>.`;
        case 'volume':
            return `<option value="liter" selected>l</option>
                            <option value="m3">m³</option>´.`;
        case 'temperature':
            return `<option value="kelvin" selected>K</option>
                            <option value="celsius">°C</option>.`;
        case 'moles':
            return ".";
    }
}

function calculateProperty(selectedInput, resultUnit) {
    // fetch the values from the input fields and parse them to float
    let pressure = parseFloat(document.getElementById('pressureInput').value);
    let volume = parseFloat(document.getElementById('volumeInput').value);
    let temperature = parseFloat(document.getElementById('temperatureInput').value);
    let moles = parseFloat(document.getElementById('molesInput').value);

    pressure = pressureUnitConvesion(pressure, document.getElementById("pressureUnit").value);
    volume = volumeUnitConversion(volume, document.getElementById('volumeUnit').value);
    temperature = temperatureUntiConversion(temperature,document.getElementById("temperatureUnit").value); 
    
    let result;
    

    switch (selectedInput[0].value) {
        case 'pressure':
            result = (moles * 0.0821 * temperature) / volume;
            return convertPressure(result, resultUnit);

        case 'volume':
            result = (moles * 0.0821 * temperature) / pressure;
            return convertVolume(result, resultUnit);

        case 'temperature':
            result = (pressure * volume) / (moles * 0.0821);
            return convertTemperature(result, resultUnit);

        case 'moles':
            result = (pressure * volume) / (0.0821 * temperature);
            return result; // moles typically don't need conversion
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



function convertPressure(pressure, unit) {
    switch (unit) {
        case 'bar': return pressure / 1.01325;
        case 'psi': return pressure / 14.6959;
        default: return pressure; // atm
    }
}

function convertVolume(volume, unit) {
    switch (unit) {
        case 'm3': return volume / 1000;
        default: return volume; // liters
    }
}

function convertTemperature(temperature, unit) {
    switch (unit) {
        case 'celsius': return temperature - 273.15;
        default: return temperature; // Kelvin
    }
}

// Reaction Element finder
// -----------------------
