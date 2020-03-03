module.exports = app => {
  const journeys = require("../controllers/appController.js");

  // Filter journeys by tracker_uid
  app.get("/api/journeys/:tracker_uid", journeys.filterByTracker_uid);

  //Return journey ranks
  app.get("/api/ranks/",journeys.returnRanks);

  app.use(function(req, res){
       res.status(404).send({
          message: "Resource not found."
        });
   });
};