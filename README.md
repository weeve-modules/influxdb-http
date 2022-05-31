# InfluxDB HTTP

|                |                                                                                   |
| -------------- | --------------------------------------------------------------------------------- |
| Name           | InfluxDB HTTP                                                                     |
| Version        | v1.0.0                                                                            |
| Dockerhub Link | [weevenetwork/influxdb-http](https://hub.docker.com/r/weevenetwork/influxdb-http) |
| Authors        | Mesud Pasic                                                                       |

- [InfluxDB HTTP](#influxdb-http)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)

## Description

HTTP module for querying influxDB data. Query is passed in body of a POST request and for specified bucket it will query the data and return results for further usage/processing.

## Features

- Read data from specific bucket passing custom queries
- Sends data to next module service via REST API

## Environment Variables

| Environment Variables | type   | Description                        |
| --------------------- | ------ | ---------------------------------- |
| INFLUXDB_URL          | string | URL of InfluxDB endpoint           |
| INFLUXDB_API_KEY      | string | API key for accessing influxDB     |
| INFLUXDB_ORG          | string | Organization name                  |
| INFLUXDB_BUCKET       | string | Bucket name                        |
| RUN_AS_STANDALONE     | string | Run as standalone rest API service |

### Module Specific

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description               |
| --------------------- | ------ | ------------------------- |
| MODULE_NAME           | string | Name of the module        |
| INGRESS_HOST          | string | Host where app is running |
| INGRESS_PORT          | string | Port where app is running |

- "query" parameter that is passed in HTTP POST request can be any query for influxDB, example would be:

```js
{
	"query":"|> range(start: -1000h) |> filter(fn: (r) => r._measurement == \"http_listener_v2\") |> filter(fn: (r) => r._field == \"targetTemperature\")"
}
```

- Ouput looks like this

```js
{
	"status": true,
	"data": {
		"result": "_result",
		"table": 0,
		"_start": "2022-02-20T22:14:33.579385883Z",
		"_stop": "2022-04-03T14:14:33.579385883Z",
		"_time": "2022-03-22T10:31:29.527Z",
		"_value": 12,
		"_field": "targetTemperature",
		"_measurement": "http_listener_v2",
		"devEUI": "70b3d52dd3003e30",
		"deviceName": "70B3D52DD3003E30",
		"host": "wohnio"
	}
}
```

- in the case query is wrong or no data for query, "data" property is null, in the case of error status will be "false" with proper "message".

```js
{
	"status": false,
	"message": "Query not provided."
}
```

## Dependencies

```js
"dependencies": {
    "body-parser": "^1.19.2",
    "express": "^4.17.3",
    "express-winston": "^4.2.0",
    "node-fetch": "^2.6.1",
    "winston": "^3.6.0",
	"@influxdata/influxdb-client": "^1.24.0",
}
```
