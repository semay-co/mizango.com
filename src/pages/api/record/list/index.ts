import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { from, to, limit, skip } = req.body

  console.log('req.query', req.query)

  console.log({ from, to, limit, skip })

  const start = from ? +from : moment().startOf('day').valueOf()
  const end = to ? +to : moment().valueOf()

  const range = {
    createdAt: {
      $gte: start,
      $lt: end,
    },
  }

  const data = JSON.stringify({
    selector: {
      ...range,
    },
    limit: limit ? +limit : 100,
    skip: skip ? +skip : 0,
  })

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: 'Basic bWl6YW46dGVtcHBhc3M=',
  }

  const username = process.env.DB_USERNAME
  const password = process.env.DB_PASSWORD
  const dbUrl = process.env.DB_URL

  const url = `http://${username}:${password}@${dbUrl}/records/_find`
  const count = `http://${username}:${password}@1${dbUrl}/records/_count`

  console.log({ url })

  const config = {
    method: 'post',
    url,
    headers,
    data,
  }

  const countConfig = {
    method: 'post',
    url: count,
    headers,
    data,
  }

  const countResponse = await axios(countConfig)

  axios(config)
    .then((response) => {
      if (response.data?.docs.length) {
        const data = {
          count: countResponse.data,
          ...response.data,
        }
        res.status(200).json(data)
      } else {
        res.status(404).json({})
      }
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

export default handler
