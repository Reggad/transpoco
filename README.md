Transpoco API Assignment
Prerequisites:
You will need to have node.js and npm installed on the machine you’re planning on running the application. Installation instructions can be found here:
Ubuntu: https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/
Windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows

N.B. This application has only been tested on Ubuntu and may not work correctly on Windows.

Usage:
By default the app is set to listen on port 8080. This can be changed in the server.js file.
This API has two methods:
/api/ranks
/api/journeys/<tracker_uid>

Both of these methods are HTTP GET only, other HTTP methods will not work.

/ranks will return a list of tracker_uids, ranked by their max speed in JSON format.
Example:
curl http://127.0.0.1:8080/api/ranks returns
[
    {
        "tracker_uid": 43994,
        "max_speed": 227,
        "rank": 1
    },
    {
        "tracker_uid": 45339,
        "max_speed": 214,
        "rank": 2
    },
    {
        "tracker_uid": 43949,
        "max_speed": 202,
        "rank": 3
    }
]
 
Optional parameters:
date=yyyy-mm-dd will filter to the date specified.
E.g: /ranks?date=2020-02-01
order=ASC|DESC will order the results by rank in ascending or descending order.
E.g: /ranks?order=DESC
These can be used at the same time
E.g: /ranks?date=2020-02-01&order=DESC
 
/journeys/<tracker_uid> will return events filtered by tracker_uid in JSON format.
Example:
curl http://127.0.0.1:8080/api/journeys/44011 returns
[
    {
        "uid": 6266,
        "tracker_uid": 44011,
        "angle": 154,
        "speed": 0,
        "aquisition_time": 1580515206,
        "visible_satellites": 12,
        "engine": "on",
        "event_id": 7,
        "event_info": 0,
        "insert_time": "2020-02-01T00:00:08.000Z",
        "mileage": 10181.919,
        "voltage": 26.1,
        "driver_ibutton": "7300002787cb6201",
        "hdop": 0.9
    }
]
Optional parameters:
date=yyyy-mm-dd will filter to the date specified.
E.g: /journeys?date=2020-02-01


Test commands:
Journeys:
Return events with tracker_uid 44011:
curl http://127.0.0.1:8080/api/journeys/44011

Return events with tracker_uid 44011 on date 2020-02-02:
curl http://127.0.0.1:8080/api/journeys/44011?date=2020-02-02

Ranks:
Return ranks:
curl http://127.0.0.1:8080/api/ranks

Return ranks for date 2020-02-02:
curl http://127.0.0.1:8080/api/ranks?date=2020-02-02

Return ranks for date 2020-02-02 in descending order:
curl http://127.0.0.1:8080/api/ranks?date=2020-02-02&order=DESC

All test commands assume you are running the commands on the same machine that the application is running on. If the application is running on a different machine please change 127.0.0.1 to the ip address of the target machine.
Also you will need to have curl installed in order to run the above commands. If you don’t have curl installed you can just run them from your browser and omit the “curl” command.
E.g. http://127.0.0.1:8080/api/ranks?date=2020-02-02&order=DESC
