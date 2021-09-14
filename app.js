/*
 *  Main program file to download the catalog of exoplanet data.
 *
 */
'use strict';
// declaration of the required third party libraries
const request = require('request');
const assert = require('assert');

// get the JSON formatted exoplanet dataset from given url 
const dataSet = 'https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets';
/*
 * Method that get the data from the dataSet url.
 * Here we use `request` library which make a request call from Nodejs environment that returns response object and body.
 * {Arguments}
 * dataurl : the dataSet url used to get the data in JSON format.
 * returns the response object and body.
 */
async function getDataSet(dataurl) {
	if (dataurl) {
		return new Promise((resolve, reject) => {
			request({ dataurl, json: true }, (err, response, body) => { // pass the dataurl and set json flag as true, and get the required data
				if (err) return reject(err); // reject the promise, if error found

				return resolve({ response, body }); // resolve the promise, if response and body were found
			})
		});
	}
	return null;
}
/*
 * Method that displays the number of orphan planets(no star).
 * Here we use `forEach method` to iterate the array of exoPlanetDataSet objects and displays the number of orphan planets(no star) based on the TypeFlag value. 
 * As per the shared document, for orphan planets(no star) the TypeFlag value is 3.
 * {Arguments}
 * exoPlanetDataSet : array of exoPlanet objects.
 * displays and returns the number of orphan planets(no star).
 */
async function displayOrphanPlanets(exoPlanetDataSet) {
	let orphan_planet_count = 0; // Initialize the variable to store the orphan planet count
	if (exoPlanetDataSet && exoPlanetDataSet.length > 0) {
		Object.keys(exoPlanetDataSet).forEach(key => { //Iterate the array of exoPlanetDataSet objects
			if (exoPlanetDataSet[key].TypeFlag && exoPlanetDataSet[key].TypeFlag === 3) { // check TypeFlag for undefined or null values and it equals 3
				orphan_planet_count++; // increment the orphan planet count variable
			}
		});

		console.log('The number of orphan planets (no star): ', orphan_planet_count); // Display the number of orphan planets(no star)
	}
	return orphan_planet_count;// return the number of orphan planets(no star)
}
/*
 * Method that displays the name(planet identifier) of the planet orbiting the hottest star.
 * Here we use `map and filter methods` to iterate the array of exoPlanetDataSet objects and get the name of Planet Identifier using maximum HostStarTempK.
 * {Arguments}
 * exoPlanetDataSet : array of exoPlanet objects.
 * displays and returns the name(planet identifier) of the planet orbiting the hottest star.
 */
async function displayHottestStar(exoPlanetDataSet) {
	if (exoPlanetDataSet && exoPlanetDataSet.length > 0) {
		// Iterate the array of exoPlanetDataSet objects to get the maximum value of HostStarTempK
		var maximumTempK = Math.max.apply(null, Object.keys(exoPlanetDataSet).map(function (x) { return exoPlanetDataSet[x].HostStarTempK }));
		// filter the exoPlanetDataSet object to get the index of the object which have the maximum HostStarTempK
		const exoPlanetDataSetIndex = (Object.keys(exoPlanetDataSet).filter(function (x) { return exoPlanetDataSet[x].HostStarTempK == maximumTempK; })[0]);

		console.log('The name (planet identifier) of the planet orbiting the hottest star: ', exoPlanetDataSet[exoPlanetDataSetIndex].PlanetIdentifier);
		return exoPlanetDataSet[exoPlanetDataSetIndex].PlanetIdentifier; //return the name(planet identifier) of the planet orbiting the hottest star
	}
	return "";
}
/*
 * Method that displays the timeline with the count of small, medium and large planets discovered.
 * Here we use Set, map, sort and filter methods to get the unique values of DiscoveryYear and count of small, medium and large planets discovered in the respective years by matching with jupiter radii
 * {Arguments}
 * exoPlanetDataSet : array of exoPlanet objects.
 * displays and returns the timeline with the count of small, medium and large planets discovered.
 */
async function displayPlanetDiscoveryTimeline(exoPlanetDataSet) {
	let timeline = []; //Array to store the timeline object 

	if (exoPlanetDataSet && exoPlanetDataSet.length > 0) {
		let unique = [...new Set(exoPlanetDataSet.filter(function (response) {// Identify unique objects based on DiscoveryYear
			if (response.DiscoveryYear === "") {
				return false;
			}
			return true;
		}).map(val => val.DiscoveryYear))];

		unique.sort();// sort discovery year based on the timeline

		console.log('\n****************************TimeLine Information grouped by planet size****************************\n');
		unique.forEach(obj => {//Itterate the unique objects
			var small_planet_count = exoPlanetDataSet.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt !== "" && object.RadiusJpt < 1)).length;//calculate small_planet_count
			var medium_planet_count = exoPlanetDataSet.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt >= 1 && object.RadiusJpt < 2)).length;//calculate medium_planet_count
			var large_planet_count = exoPlanetDataSet.filter((object) => (object.DiscoveryYear === obj && object.RadiusJpt >= 2)).length;//calculate large_planet_count
			console.log(`In ${(obj)} we discovered ${(small_planet_count)} small planets, ${(medium_planet_count)} medium planets and ${(large_planet_count)} large planets \n`);//displays the timeline with the count of small, medium and large planets discovered.
			timeline.push(obj, small_planet_count, medium_planet_count, large_planet_count);//push calculated timeline data to an array
		});
		console.log('\n********************************************************\n');
	}
	return timeline;//returns the timeline with the count of small, medium and large planets discovered.
}

// Initialize function
async function Initialize() {
	try {
		let { res, data } = await getDataSet(dataSet);
		if (res && res.statusCode !== 200) { // check response is not received from  or status code does not match - log error
			console.error('Error occurred while getting JSON formatted exoplanet dataset from given url');
		} else {
			assert.equal(res.statusCode, 200);
			console.log('JSON formatted exoplanet dataset received successfully');
			displayOrphanPlanets(data);
			displayHottestStar(data);
			displayPlanetDiscoveryTimeline(data);
		}
	} catch (err) {
		console.error('Error occurred while getting JSON formatted exoplanet dataset from given url');
	}
}

// call Initialize function to execute the program
Initialize();

// export the created functions
module.exports = {
	app: main,
	getDataSet: getDataSet,
	displayOrphanPlanets: displayOrphanPlanets,
	displayHottestStar: displayHottestStar,
	displayPlanetDiscoveryTimeline: displayPlanetDiscoveryTimeline
}