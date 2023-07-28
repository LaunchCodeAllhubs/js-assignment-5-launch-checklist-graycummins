// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   let missionTarget = document.getElementById('missionTarget');
   missionTarget.innerHTML = `
                <h2>Mission Destination </h2><ol>
           <li>Name: ${name}</li>
           <li>Diameter: ${diameter}</li>
           <li>Star: ${star}</li>
           <li>Distance from Earth: ${distance}</li>
           <li>Number of Moons: ${moons}</li>
       </ol>
       <img src = '${imageUrl}'/> `
}

function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    }
    if (isNaN(String(testInput))) {

        return "Not a Number";
    }
    if(!isNaN(String(testInput))) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    
    document.getElementById('faultyItems').style.visibility = 'hidden';
    let cargoMassNum = Number(cargoMass);
    let fuelLevelNum = Number(fuelLevel);
    let launchStatus = document.getElementById('launchStatus');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    let pilotValidated = validateInput(pilot);
    let copilotValidated = validateInput(copilot);
    let fuelLevelValidated = validateInput(fuelLevel);
    let cargoMassValidated = validateInput(cargoMass);

    while (pilotValidated === "Empty" || pilotValidated === "Is a Number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'rgb(65, 159, 106)';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${pilot}** for the Pilot name.
        Please enter a different name that includes letters.`);

        document.getElementById('faultyItems').reset();
    }
   
    if (copilotValidated === "Empty" || copilotValidated === "Is a Number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${copilot}** for the copilot name.
        Please enter a different name that includes letters.`);

        document.getElementById('faultyItems').reset();
    }

    if (fuelLevelValidated === "Empty" || fuelLevelValidated === "Not a Number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${fuelLevel}** for the fuel level.
        Please enter a number.`);

    }

   if (cargoMassValidated === "Empty" || cargoMassValidated === "Not a Number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${cargoMass}** for the cargo mass.
        Please enter a number.`);

        document.getElementById('faultyItems').reset();
    }

    else {
        
        if(fuelLevelNum<10000) {
            document.getElementById('faultyItems').style.visibility = 'visible';

            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = '#C7254E';
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            fuelStatus.innerHTML = `Fuel level too low for launch`;

            if (cargoMassNum>9999) {
                cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
            }
            else {
                cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            }
        }

        else if (cargoMassNum>9999) {
            document.getElementById('faultyItems').style.visibility = 'visible';

            launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
            launchStatus.style.color = '#C7254E';
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            cargoStatus.innerHTML = `Cargo mass too heavy for launch`;

            if (fuelLevelNum<10000) {
                fuelStatus.innerHTML = `Fuel level too low for launch`;
            }
            else {
                fuelStatus.innerHTML = `Fuel level high enough for launch`;
            }
        }

        if (cargoMassNum <= 10000 && fuelLevelNum >= 10000) {
            document.getElementById('faultyItems').style.visibility = 'visible';


            launchStatus.innerHTML = `Shuttle is Ready for Launch`;
            launchStatus.style.color = 'rgb(65,159,106)';
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            cargoStatus.innerHTML = `Cargo mass low enough for launch`;
            fuelStatus.innerHTML = `Fuel level high enough for launch`;
            
        }

    }
}

async function myFetch() {
    //const fetchURL = new URL("https://handlers.education.launchcode.org/static/planets.json");
    let planetsReturned;
    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
    return response.json();    
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
