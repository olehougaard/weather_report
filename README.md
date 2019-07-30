# weather_report
Weather Report Web Service serving fake (random) weather data for Horsens, Aarhus and Copenhagen.

You can run the service by typing the following in the root of the project:
```
	npm start
  ```
This will start a web service on `http://localhost:8080/` with the following services:

#### `GET /data`

This returns all historical data as a JSON array. The format is as follows:
```
[{"type": "temperature",
  "time": "2019/07/30 10:07",
  "place": "Aarhus",
  "value": 21,
  "unit": "C"},
 {"type": "precipitation",
  "time": "2019/07/30 10:07",
  "place": "Aarhus",
  "value": 0,
  "unit": "mm"},
 {"type": "wind speed",
  "time": "2019/07/30 10:07",
  "place": "Aarhus",
  "value": 2,
  "unit": "m/s"},
{"type": "cloud coverage",
  "time": "2019/07/30 10:07",
  "place": "Aarhus",
  "value": 100,
  "unit": "%"}]
  ```

#### `GET /data/<place>`
This returns the data only for the given place. I.e. GET /data/Horsens returns the data for Horsens in the same format as above.

#### `POST /data`
Adds historical weather data. The data should be the same format as returned by GET.

#### `GET /forecast`

This returns all predictions as a JSON array. The format is as follows:
```
[{"type": "temperature",
  "time": "2019/07/31 10:07",
  "place": "Aarhus",
  "from": 19,
  "to": 22,
  "unit": "C"},
 {"type": "precipitation",
  "time": "2019/07/31 10:07",
  "place": "Aarhus",
  "from": 0.0,
  "to": 0.5,
  "unit": "mm",
  "precipitation_types": ["rain"]},
 {"type": "wind speed",
  "time": "2019/07/31 10:07",
  "place": "Aarhus",
  "from": 4,
  "to":6,
  "unit": "m/s",
  "Directions": ["South", "Southwest"]},
{"type": "cloud coverage",
  "time": "2019/07/31 10:07",
  "place": "Aarhus",
  "from": 75,
  "to":100,
  "unit": "%"}]
  ```

#### `GET /forecast/<place>`
This returns the predictions only for the given place. I.e. GET /forecast/Horsens returns the predictions for Horsens in the same format as above.
