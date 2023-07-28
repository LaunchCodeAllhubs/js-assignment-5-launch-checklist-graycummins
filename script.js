// Write your JavaScript code here!
window.addEventListener("load", function() {
    let form = document.querySelector('form');
    let list = document.getElementById('faultyItems');
    list.style.visibility = 'hidden';

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let pilotNameEntered = document.querySelector('input[name=pilotName]');
        let copilotNameEntered = document.querySelector('input[name=copilotName');
        let fuelLevelEntered = document.querySelector('input[name=fuelLevel]');
        let cargoMassEntered = document.querySelector('input[name=cargoMass');


        if (pilotNameEntered.value === "" || copilotNameEntered.value === "" || fuelLevelEntered.value === "" || cargoMassEntered.value === "") {
            alert("ALL FIELDS ARE REQUIRED");
        }
        else {
            formSubmission(document, list, pilotNameEntered.value, copilotNameEntered.value, fuelLevelEntered.value, cargoMassEntered.value);
        }
    });

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()

   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   }).then(function () {
       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
       let planetPicked = pickPlanet(listedPlanets);
       let planetName = planetPicked.name;
       let planetDiameter = planetPicked.diameter;
       let planetStar = planetPicked.star;
       let planetDistane = planetPicked.distance;
       let planetMoons = planetPicked.moons;
       let planetImage = planetPicked.image;

       addDestinationInfo(document, planetName, planetDiameter, planetStar, planetDistane, planetMoons, planetImage);
   });
   
});