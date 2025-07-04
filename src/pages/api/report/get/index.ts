import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import moment from 'moment'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { from, to, limit, skip } = req.query

  console.log('req.query', req.query)

  console.log({ from, to, limit, skip })

  const start = from ? +from : moment().startOf('day').valueOf()
  const end = to
    ? +to
    : from
    ? moment(start).add(1, 'day').valueOf()
    : moment().endOf('day').valueOf()

  console.log({ end })

  const range = {
    createdAt: {
      $gte: start,
      $lt: end,
    },
  }

  console.log({ range })

  const data = JSON.stringify({
    selector: {
      ...range,
    },
    limit: limit ? +limit : 1000,
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

  console.log({ url })

  const config = {
    method: 'post',
    url,
    headers,
    data,
  }

  axios(config)
    .then((response) => {
      if (response.data?.docs.length) {
        res.status(200).json(response.data)
      } else {
        res.status(404).json({})
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
      })
    })
}

export default handler
