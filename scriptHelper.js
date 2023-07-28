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

        return "Not a number";
    }
    if(!isNaN(String(testInput))) {
        return "Is a number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
    
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

    document.getElementById('faultyItems').style.visibility = 'hidden';

    while (pilotValidated === "Empty" || pilotValidated === "Is a number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${pilot}** for the Pilot name.
        Please enter a different name that includes letters.`);

        document.getElementById('faultyItems').reset();
    }
   
    if (copilotValidated === "Empty" || copilotValidated === "Is a number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${copilot}** for the copilot name.
        Please enter a different name that includes letters.`);

        document.getElementById('faultyItems').reset();
    }

    if (fuelLevelValidated === "Empty" || fuelLevelValidated === "Not a number") {

        launchStatus.innerHTML = `Awaiting Information Before Launch`;
        launchStatus.style.color = 'black';
        document.getElementById('faultyItems').style.visibility = 'hidden';

        alert(`INVALID ENTRY
        You entered **${fuelLevel}** for the fuel level.
        Please enter a number.`);

        document.getElementById('faultyItems').reset();
    }

   if (cargoMassValidated === "Empty" || cargoMassValidated === "Not a number") {

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

            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = '#C7254E';
            pilotStatus.innerHTML = `${pilot} is ready for liftoff!`;
            copilotStatus.innerHTML = `${copilot} is ready for liftoff!`;
            fuelStatus.innerHTML = `Fuel level ${fuelLevelNum} is too low!`;

            if (cargoMassNum>9999) {
                cargoStatus.innerHTML = `Cargo mass ${cargoMassNum} is too high!`;
            }
            else {
                cargoStatus.innerHTML = `Cargo mass ${cargoMassNum} is ready for liftoff!`;
            }
        }

        else if (cargoMassNum>9999) {
            document.getElementById('faultyItems').style.visibility = 'visible';

            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = '#C7254E';
            pilotStatus.innerHTML = `${pilot} is ready for liftoff!`;
            copilotStatus.innerHTML = `${copilot} is ready for liftoff!`;
            cargoStatus.innerHTML = `Cargo mass ${cargoMassNum} is too high!`;

            if (fuelLevelNum<10000) {
                fuelStatus.innerHTML = `Fuel level ${fuelLevel} is too low!`;
            }
            else {
                fuelStatus.innerHTML = `Fuel level ${fuelLevel} is ready for liftoff!`;
            }
        }

        if (cargoMassNum <= 10000 && fuelLevelNum >= 10000) {
            document.getElementById('faultyItems').style.visibility = 'visible';

            launchStatus.innerHTML = `Shuttle is ready for takeoff!`;
            launchStatus.style.color = '419F6A';
            pilotStatus.innerHTML = `${pilot} is ready for liftoff!`;
            copilotStatus.innerHTML = `${copilot} is ready for liftoff!`;
            cargoStatus.innerHTML = `Cargo mass ${cargoMassNum} is ready for liftoff!`;
            fuelStatus.innerHTML = `Fuel level ${fuelLevel} is ready for liftoff!`;
            
        }

    }
}

async function myFetch() {
    const url = new URL("https://handlers.education.launchcode.org/static/planets.json");
    let planetsReturned = await fetch(url).then( function(response) {
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
