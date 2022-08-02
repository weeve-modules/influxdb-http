/*
Decoder documentation:
https://influxdb.wohnio.weeve.engineering/orgs/5bdfe361455ba0f6/load-data/client-libraries/javascript-node

*/
const fetch = require('node-fetch')
const { InfluxDB } = require('@influxdata/influxdb-client')
const { EGRESS_URLS, INFLUXDB_URL, INFLUXDB_API_KEY, INFLUXDB_ORG, INFLUXDB_BUCKET } = require('../config/config')
const client = new InfluxDB({ url: INFLUXDB_URL, token: INFLUXDB_API_KEY })
const queryApi = client.getQueryApi(INFLUXDB_ORG)

const queryDB = async q => {
  const query = `from(bucket: "${INFLUXDB_BUCKET}") ${q}`
  return new Promise((resolve, reject) => {
    let output = null
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        output = tableMeta.toObject(row)
        // console.log(`${output._time} ${output._measurement}: ${output._field}=${output._value}`)
      },
      error(error) {
        console.error(error)
        reject(error)
      },
      complete() {
        resolve(output)
      },
    })
  })
}

const send = async result => {
  if (EGRESS_URLS) {
    const urls = []
    const eUrls = EGRESS_URLS.replace(/ /g, '')
    urls.push(...eUrls.split(','))
    urls.forEach(async url => {
      if (url) {
        try {
          const callRes = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: result,
            }),
          })
          if (!callRes.ok) {
            console.error(`Error passing response data to ${url}, status: ${callRes.status}`)
          }
        } catch (e) {
          console.error(`Error making request to: ${url}, error: ${e.message}`)
        }
      }
    })
  }
}

module.exports = {
  queryDB,
  send,
}
