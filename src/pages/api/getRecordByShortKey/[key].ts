// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {}

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const key = req.query.key as string

  const shortKey = key.split(/\D+/).join('-')

  const data = JSON.stringify({
    selector: {
      shortKey,
    },
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
      console.log({ response })

      if (response.data?.docs.length) {
        res.status(200).json(response.data.docs[0])
      } else {
        res.status(404).json({})
      }
    })
    .catch((error) => {
      res.status(400).json(error)
    })
}

export default handler
