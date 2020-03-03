var Journey = require('../models/appModel.js');


exports.filterByTracker_uid = (req, res) => {
  if ((req.query.date != null) && (req.query.date.search(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/) == -1)) {
    res.status(400).send({
          message: `Invalid date format.Should be yyyy-mm-dd`
        });
    return;
  }

  if(isNaN(req.params.tracker_uid)){
    res.status(400).send({
          message: `Invalid tracker_uid.`
        });
    return;
  }

  Journey.findByTracker_uid(req.params.tracker_uid, req.query.date, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {

        var errorstring = `No Journey found for tracker_uid '${req.params.tracker_uid}'`
        if (req.query.date != null){
          errorstring += ` and date ${req.query.date}.`
        }

        res.status(404).send({
          message: errorstring
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Journey with tracker_uid " + req.params.tracker_uid
        });
      }
    } else res.send(data);
  });
};


exports.returnRanks = (req, res) => {
  var date = ""
  var order = ""
  
  if ((req.query.date != null) && (req.query.date.search(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/) != -1)){
    date = req.query.date;
  }
  else if ((req.query.date != null) && (req.query.date.search(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))$/) == -1)) {
    res.status(400).send({
          message: `Invalid date format.Should be yyyy-mm-dd`
        });
    return;
  }
  
  if (req.query.order != null && (req.query.order.toUpperCase() == "ASC" || req.query.order.toUpperCase() == "DESC")){
    order = req.query.order.toUpperCase();
  }
  else if (req.query.order != null && (req.query.order.toUpperCase() != "ASC" || req.query.order.toUpperCase() != "DESC")){
    res.status(400).send({
          message: `Invalid order specifed.Should be ASC or DESC`
        });
    return;
  }

  Journey.findRanks(date, order, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No Ranks found for date specifed`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving ranks with date specifed "
        });
      }
    } else res.send(data);
  });
};
