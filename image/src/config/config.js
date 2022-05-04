const env = require('../utils/env')

module.exports = {
  INGRESS_HOST: env('INGRESS_HOST', '127.0.0.1'),
  INGRESS_PORT: env('INGRESS_PORT', '8080'),
  MODULE_NAME: env('MODULE_NAME', 'influxdb-http'),
  EGRESS_URL: env('EGRESS_URL', ''),
  INFLUXDB_URL: env('INFLUXDB_URL', 'https://influxdb.wohnio.weeve.engineering'),
  INFLUXDB_API_KEY: env('INFLUXDB_API_KEY', 'test'),
  INFLUXDB_ORG: env('INFLUXDB_ORG', 'weeve'),
  INFLUXDB_BUCKET: env('INFLUXDB_BUCKET', 'testmp'),
}
