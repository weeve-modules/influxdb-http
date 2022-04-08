const env = require('../utils/env')

module.exports = {
  HOST_NAME: env('HOST_NAME', '127.0.0.1'),
  HOST_PORT: env('HOST_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'InfluxDB Module'),
  EGRESS_URL: env('EGRESS_URL', ''),
  INFLUXDB_URL: env('INFLUXDB_URL', 'https://influxdb.wohnio.weeve.engineering'),
  INFLUXDB_API_KEY: env(
    'INFLUXDB_API_KEY',
    'test'
  ),
  INFLUXDB_ORG: env('INFLUXDB_ORG', 'weeve'),
  INFLUXDB_BUCKET: env('INFLUXDB_BUCKET', 'testmp'),
}
