/*
 *  Unit Tests for app.js using Mocha 
 */
const app = require('../app.js');
const request = require('request');
// import the sample test data available in JSON format
let sampleTestData = require('./samples/sample_exoplanetdata.json');

describe('app unit tests:', function () {

  it('modules should be declared', function () {
    expect(app).to.be.an('object');
    expect(app.getDataSet).to.be.an('function');
    expect(app.displayOrphanPlanets).to.be.an('function');
    expect(app.displayHottestStar).to.be.an('function');
    expect(app.displayPlanetDiscoveryTimeline).to.be.an('function');
    expect(app.app).to.be.an('function');
  });

  describe('get data set condition', function () {
    var responseObject, responseBody;
    beforeEach(() => {
      responseObject = {
        statusCode: 200,
        headers: {
          'content-type': 'application/json'
        }
      };
      responseBody = {
        status: 'success',
        data: [
          {
            PlanetIdentifier: "KOI-1843.03",
            TypeFlag: 0,
            RadiusJpt: 0.054,
            DiscoveryYear: 2012,
            HostStarTempK: 3584,
          },
          {
            PlanetIdentifier: "KOI-1843.01",
            TypeFlag: 3,
            RadiusJpt: 0.114,
            DiscoveryYear: "",
            HostStarTempK: 3584,
          },
          {
            PlanetIdentifier: "KOI-1843.02",
            TypeFlag: 1,
            RadiusJpt: "",
            DiscoveryYear: 2018,
            HostStarTempK: 3584,
          }
        ]
      };
      this.get = sinon.stub(request, 'get'); //Stub the request GET method to get dummy data
    });

    afterEach(() => {
      request.get.restore(); // restore the stubbed method
    });

    it('for EMPTY url - should return response', async () => {
      const result = await app.getDataSet('');

      expect(result).to.deep.equal(null);
    });

    it('for valid url - should return response ', (done) => {
      this.get.yields(null, responseObject, JSON.stringify(responseBody));
      request.get(`http://localhost:3000/api/v1/exoplanets`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // the JSON response body should have objects and count should match
        body.data.length.should.eql(3);
        // the first object in the data array should have the right keys
        body.data[0].should.include.keys(
          'PlanetIdentifier', 'TypeFlag', 'RadiusJpt', 'DiscoveryYear', 'HostStarTempK'
        );
        // the first object should have the right value for name
        body.data[0].PlanetIdentifier.should.eql('KOI-1843.03');
        done();
      });
    });
  });

  describe('no star condition', function () {
    it('for empty data set - should return ZERO', () => {
      let emptyTestData = [];
      const result = app.displayOrphanPlanets(emptyTestData);

      expect(result).to.deep.equal(0);
    });

    it('for valid data set with TypeFlag - should return ZERO', () => {
      let newTestData = [{ PlanetIdentifier: 'Kepler-63 b', TypeFlag: 0 }, {
        PlanetIdentifier: 'HD 100546 b',
        TypeFlag: 1
      }, { PlanetIdentifier: 'HD 3651.02', TypeFlag: 2 }];
      const result = app.displayOrphanPlanets(newTestData);

      expect(result).to.deep.equal(0);
    });

    it('for valid data set - should return TWO', () => {
      const result = app.displayOrphanPlanets(sampleTestData);

      expect(result).to.deep.equal(2);
    });
  });

  describe('hottest star condition', function () {
    it('for empty data set - should return empty PlanetIdentifier name', () => {
      let emptyTestData = [];
      const result = app.displayHottestStar(emptyTestData);

      expect(result).to.deep.equal("");
    });

    it('for valid data set with mutiple stars having same value for HostStarTempK - should return FIRST matching PlanetIdentifier name', () => {
      let newTestData = [{ PlanetIdentifier: 'Kepler-63 b', HostStarTempK: 3584 }, {
        PlanetIdentifier: 'HD 100546 b', HostStarTempK: 3584
      }, { PlanetIdentifier: 'HD 3651.02', HostStarTempK: 3584 }];
      const result = app.displayHottestStar(newTestData);

      expect(result).to.deep.equal("Kepler-63 b");
    });

    it('for valid data set - should return matching PlanetIdentifier name', () => {
      const result = app.displayHottestStar(sampleTestData);

      expect(result).to.deep.equal("WASP-124 b");
    });
  });

  describe('timeline data condition', function () {
    it('for empty data set - should return empty response data', async () => {
      let emptyTestData = [];
      const result = await app.displayPlanetDiscoveryTimeline(emptyTestData);

      expect(result).to.deep.equal([]);
    });

    it('for EMPTY RadiusJpt or DiscoveryYear - should not increment planet count in response data - ', async () => {
      let expectedResponse = [
        2010, 3, 0, 0,
        2012, 1, 0, 0,
        2014, 0, 0, 0
      ];
      const result = await app.displayPlanetDiscoveryTimeline(sampleTestData);
      expect(result).to.not.contain(expectedResponse); // for 2014 the count is 0
    });

    it('for valid data set - should return TWO matching stars response', async () => {
      let expectedResponse = [
        2009, 0, 0, 0,
        2010, 3, 0, 0,
        2012, 1, 0, 0,
        2014, 0, 0, 0,
        2016, 1, 1, 0
      ];
      var result = [];
      result = await app.displayPlanetDiscoveryTimeline(sampleTestData);
      expect(result).to.deep.equal(expectedResponse);
    });
  });
});