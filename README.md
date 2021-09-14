# exoplanet-catalog-information
Program that downloads a catalog of exoplanet data and displays required information 

## Why this program
Downloads a catalog of exoplanet data and displays the following information:

`The number of orphan planets (no star).`
`The name (planet identifier) of the planet orbiting the hottest star.`
`A timeline of the number of planets discovered per year grouped by size. Use the following groups: “small” is less than 1 Jupiter radii, “medium” is less than 2 Jupiter radii, and anything bigger is considered “large”. For example, in 2004 we discovered 2 small planets, 5 medium planets, and 0 large planets.`

The dataset can be found in JSON format here: https://gist.githubusercontent.com/joelbirchler/66cf8045fcbb6515557347c05d789b4a/raw/9a196385b44d4288431eef74896c0512bad3defe/exoplanets

And is documented here: https://www.kaggle.com/mrisdal/open-exoplanet-catalogue

## Procedure for execution of program
Language used : JavaScript
Runtime environment : NodeJS(Version 14)

Pre-requisites: 
1] Please ensure the latest stable Nodejs version is installed in the system before executing the program.
2] Please ensure the directory where the NodeJs & npm package is to be installed, has read and write access.

Navigate to the project root directory and execute the `start script` defined in `package.json` file by using below command

`npm run start`

Note : pre-start step has been included to install the required project dependencies before executing the program by using command `npm install`.
This will install the necessary packages under .node_modules directory.
Also, this step will run automatically, if we run the start script and we don't need to run it manually.

## Procedure for execution of tests
Navigate to the project root directory and execute the `test script` defined in `package.json` file by using below command

`npm run test`

Note : pre-test step has been included to install the required project dependencies before executing the program by using command `npm install`
This will install the necessary packages under .node_modules directory.
Also, this step will run automatically, if we run the start test script and we don't need to run it manually.

## Results

C:\Users\sankarasubramanian\Downloads\exercise-exoplanet-catalogue-master\exoplanet-catalogue-information>npm run start

JSON formatted exoplanet dataset received successfully
The number of orphan planets (no star):  2
The name (planet identifier) of the planet orbiting the hottest star:  V391 Peg b

****************************TimeLine Information grouped by planet size****************************

In 1781 we discovered 1 small planets, 0 medium planets and 0 large planets

In 1846 we discovered 1 small planets, 0 medium planets and 0 large planets

In 1930 we discovered 1 small planets, 0 medium planets and 0 large planets 

In 1992 we discovered 0 small planets, 0 medium planets and 0 large planets

In 1994 we discovered 0 small planets, 0 medium planets and 0 large planets

In 1995 we discovered 0 small planets, 0 medium planets and 0 large planets 

In 1996 we discovered 0 small planets, 0 medium planets and 0 large planets

In 1997 we discovered 0 small planets, 0 medium planets and 0 large planets

In 1998 we discovered 0 small planets, 0 medium planets and 0 large planets 

In 1999 we discovered 0 small planets, 1 medium planets and 0 large planets

In 2000 we discovered 0 small planets, 0 medium planets and 0 large planets

In 2001 we discovered 1 small planets, 0 medium planets and 0 large planets 

In 2002 we discovered 0 small planets, 1 medium planets and 0 large planets

In 2003 we discovered 0 small planets, 0 medium planets and 0 large planets

In 2004 we discovered 2 small planets, 5 medium planets and 0 large planets

In 2005 we discovered 1 small planets, 3 medium planets and 0 large planets

In 2006 we discovered 1 small planets, 6 medium planets and 0 large planets 

In 2007 we discovered 4 small planets, 16 medium planets and 0 large planets

In 2008 we discovered 1 small planets, 21 medium planets and 1 large planets

In 2009 we discovered 4 small planets, 6 medium planets and 0 large planets

In 2010 we discovered 15 small planets, 39 medium planets and 0 large planets

In 2011 we discovered 32 small planets, 48 medium planets and 1 large planets 

In 2012 we discovered 52 small planets, 21 medium planets and 0 large planets

In 2013 we discovered 58 small planets, 30 medium planets and 2 large planets

In 2014 we discovered 830 small planets, 30 medium planets and 0 large planets

In 2015 we discovered 104 small planets, 30 medium planets and 0 large planets

In 2016 we discovered 1267 small planets, 26 medium planets and 0 large planets


********************************************************

# docker build command
docker build . -t  exoplanet-catalog-information

# Project file content
[1] package.json - contains the project information and it is the starting point for meta data.
[2] test > helper.js - contains the relevant helper packages and setup required for executing Mocha unit tests.
[3] .mocharc.js and test > mocha.opts - contains Mocha configuration file and the arguments required for mocha setup.