import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import nano from 'nano'

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbUrl = process.env.DB_URL
const db = `http://${username}:${password}@${dbUrl}`

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')

  const recordsDB = nano(db).use('records')
  const start = from ? +from : moment().startOf('day').valueOf()
  const end = to
    ? +to
    : from
    ? moment(start).endOf('day').valueOf()
    : moment().endOf('day').valueOf()

  const selector = {
    createdAt: {
      $gte: moment(start).valueOf(),
      $lt: moment(end).valueOf(),
    },
  }

  console.log({ from, to, selector })

  const res = await recordsDB
    .find({
      selector,
      limit: parseInt(limit || '0') || 5000,
      skip: page ? +page : 0,
    })
    .catch(console.error)

  if (!res) {
    return NextResponse.json({ error: true })
  }

  return NextResponse.json(res.docs)
}
