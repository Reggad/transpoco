const sql = require("./db.js");

const fieldlist = `uid, tracker_uid, angle, speed, aquisition_time, visible_satellites, engine, event_id, event_info, 
insert_time, mileage, voltage, driver_ibutton, hdop `;

const Journey = function(journey) {
};

Journey.findByTracker_uid = (tracker_uid, date, result) => {
  var querystring = "SELECT " + fieldlist + " FROM data WHERE tracker_uid = " + sql.escape(tracker_uid);
  
  if (date != null){
    querystring += " AND insert_time LIKE '" + date + "%'";
  }
  sql.query(querystring, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found journeys: ", res);
      result(null, res);
      return;
    }

    // not found Journey with the id
    result({ kind: "not_found" }, null);
  });
};

Journey.findRanks = (date, order, result) => {
  var querystring = `SELECT tracker_uid, max_speed, rank FROM ( 
                        SELECT s.*, @rank := @rank + 1 rank FROM ( 
                          SELECT tracker_uid, MAX(speed) max_speed FROM data `;
  if (date != ""){
    querystring += " WHERE insert_time LIKE '" + date + "%'";
  }

  querystring += ` GROUP BY tracker_uid 
                    ) s, (SELECT @rank := 0) init
                    ORDER BY max_speed DESC
                  ) r ORDER BY r.rank `;

  if(order != "" && order == "DESC"){
    querystring += " DESC";
  }
  else{
    querystring += " ASC";
  }

  sql.query(querystring, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found ranks ", res);
      result(null, res);
      return;
    }

    // not found ranks with the specified params
    result({ kind: "not_found" }, null);
  });
};

module.exports = Journey;