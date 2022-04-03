# InfluxDB Module

|                |                                 |
| -------------- | ------------------------------- |
| Name           | InfluxDB Module               |
| Version        | v1.0.0                          |
| Dockerhub Link | [weevenetwork/influxdb-http]() |
| Authors        | Mesud Pasic                     |



- [MQTT Ingress](#mcclimate-decoder)
  - [Description](#description)
  - [Features](#features)
  - [Environment Variables](#environment-variables)
    - [Module Specific](#module-specific)
    - [Set by the weeve Agent on the edge-node](#set-by-the-weeve-agent-on-the-edge-node)
  - [Dependencies](#dependencies)




## Description

HTTP module for accessing influxDB data

## Features

* Read data from specific bucket passing custom queries
* Sends data to next module service via REST API

## Environment Variables

* HOST_NAME
* HOST_PORT
* INFLUXDB_URL
* INFLUXDB_API_KEY
* INFLUXDB_ORG
* INFLUXDB_BUCKET

### Module Specific

### Set by the weeve Agent on the edge-node

| Environment Variables | type   | Description                            |
| --------------------- | ------ | -------------------------------------- |
| MODULE_NAME           | string | Name of the module                     |
| HOST_NAME           | string | Host where app is running              |
| HOST_PORT           | string | Port where app is running              |
| INFLUXDB_URL           | string | URL of InfluxDB endpoint|
| INFLUXDB_API_KEY           | string | API key for accessing influxDB|
| INFLUXDB_ORG           | string | Organization name|
| INFLUXDB_BUCKET           | string | Bucket name|



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