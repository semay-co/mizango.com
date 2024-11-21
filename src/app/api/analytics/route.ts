import moment from 'moment'
import { NextRequest, NextResponse } from 'next/server'
import nano from 'nano'

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const dbUrl = process.env.DB_URL
const db = `http://${username}:${password}@${dbUrl}`

const getPrices = (time: number) => {
  return time < 1680555600000
    ? [80, 100, 150, 200, 250]
    : time < 1728864000000
    ? [100, 150, 200, 250, 350]
    : [100, 200, 250, 300, 500]
}

const reducer = (docs: any[]) => {
  const vehicleIds: string[] = []
  return docs.reduce(
    (a, c) => {
      const vehicle = c.dataCache?.vehicle

      const size = vehicle.type
      const prices = getPrices(c.createdAt)

      const rnr = a.recordsAndRevenue

      const rev = prices[size]

      const vehicles = a.vehicles

      const hour = +moment(c.createdAt).utc().format('H')

      const accHourTag = a.hourly[hour] || [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ]

      if (!c.isMistake) {
        rnr[size][0]++
        rnr[size][1] += rev

        accHourTag[size][0]++
        accHourTag[size][1] += rev

        if (!vehicleIds.includes(c.vehicleId)) {
          vehicleIds.push(c.vehicleId)
          vehicles[size]++
        }
      }

      // console.log({ rnr, vehicles })
      // console.log(a)
      /*
      const revenueBVT = a.revenue.byVehicleType
      const recordBVT = a.records.byVehicleType
      const mistakeBVT = a.mistakes.byVehicleType
      const unpaidBVT = a.unpaid.byVehicleType


      if (vehicleIds.includes(c.vehicleId)) {
      } else {
        vehicleIds.push(c.vehicleId)
        vehicleBVT[size]++
        vehicleT++
      }

      if (c.isMistake) {
        mistakeBVT[size]++
      } else {
        recordBVT[size]++
        revenueBVT[size] += prices[size]
      }

      const revenueT = c.isMistake
        ? a.revenue.total
        : a.revenue.total + prices[size]

      unpaidBVT[size] = c.isUnpaid ? unpaidBVT[size] + 1 : unpaidBVT[size]

      const recordT = c.isMistake ? a.records.total : a.records.total + 1
      const unpaidT = c.isUnpaid ? a.unpaid.total + 1 : a.unpaid.total
      const mistakeT = c.isMistake ? a.mistakes.total + 1 : a.mistakes.total


        
      */

      return {
        recordsAndRevenue: rnr,
        vehicles,
        hourly: {
          ...a.hourly,
          [hour]: accHourTag,
        },
      }
    },
    {
      recordsAndRevenue: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ],
      vehicles: [0, 0, 0, 0, 0],
      hourly: {},
    }
  )
}

const updateAnalytics = async () => {
  const analyticsDB = nano(db).use('analytics')

  const recordsDB = nano(db).use('records')

  const lastReduced = await analyticsDB
    .find({
      selector: {
        _id: {
          $gt: null,
        },
      },
      sort: [
        {
          _id: 'desc',
        },
      ],
      limit: 1,
    })
    .catch()

  const firstDay = moment(lastReduced?.docs?.[0]?._id || 1617978737238)
    .utc()
    .startOf('day')
  const today = moment().utc().endOf('day')

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  async function runReductions() {
    let currentDay = firstDay.clone()

    while (currentDay.isBefore(today.endOf('day'))) {
      const start = currentDay.startOf('day').valueOf()
      const end = currentDay.endOf('day').valueOf()

      const selector = {
        createdAt: {
          $gte: start,
          $lt: end,
        },
      }

      const res = await recordsDB.find({
        selector,
        limit: 2000,
      })

      const docs: any[] = res.docs

      const reduction = reducer(docs)

      const _id = currentDay.startOf('day').toISOString()

      console.log({ _id })

      const existing = await analyticsDB
        .get(_id)
        .catch((err) => console.error({ err }))

      console.log({ existing })

      const entry = {
        _id,
        _rev: existing?._rev || undefined,
        ...reduction,
      }

      analyticsDB.insert(entry)

      currentDay.add(1, 'day')
      await delay(50)
    }
  }

  await runReductions()
}

export const GET = async (req: NextRequest) => {
  await updateAnalytics()

  const searchParams = req.nextUrl.searchParams
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')

  const start = from ? +from : moment().utc().startOf('day').valueOf()
  const end = to
    ? +to
    : from
    ? moment(start).utc().add(1, 'day').valueOf()
    : moment().utc().endOf('day').valueOf()

  const selector = {
    _id: {
      $gte: new Date(start).toISOString(),
      $lt: new Date(end).toISOString(),
    },
  }

  console.log({ range: selector })

  const analyticsDB = nano(db).use('analytics')

  const res = await analyticsDB
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
