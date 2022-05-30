/*
Decoder documentation:
https://influxdb.wohnio.weeve.engineering/orgs/5bdfe361455ba0f6/load-data/client-libraries/javascript-node

*/
const { InfluxDB } = require('@influxdata/influxdb-client')
const { INFLUXDB_URL, INFLUXDB_API_KEY, INFLUXDB_ORG, INFLUXDB_BUCKET } = require('../config/config')
const client = new InfluxDB({ url: INFLUXDB_URL, token: INFLUXDB_API_KEY })
const queryApi = client.getQueryApi(INFLUXDB_ORG)

const queryDB = async q => {
  const query = `from(bucket: "${INFLUXDB_BUCKET}") ${q}`
  return new Promise((resolve, reject) => {
    let output = null
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        output = tableMeta.toObject(row)
        //console.log(`${output._time} ${output._measurement}: ${output._field}=${output._value}`)
      },
      error(error) {
        console.error(error)
        reject(false)
      },
      complete() {        
        resolve(output)
      },
    })
  })
}

module.exports = {
  queryDB,
}
