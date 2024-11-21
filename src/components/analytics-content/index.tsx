'use client'

import * as React from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import { vehicleColors, vehicleTypes } from '@/lib/vehicle'

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))',
  },
  records: {
    label: 'Records',
    color: 'hsl(var(--chart-2))',
  },
  // sessions: {
  //   label: 'Sessions',
  //   color: 'hsl(var(--chart-2))',
  // },
} satisfies ChartConfig

const typePrice = [100, 200, 250, 300, 500]

const AnalyticsContent = ({
  start,
  end,
  tickType = 'hour',
}: {
  start: string
  end: string
  tickType?: 'hour' | 'day' | 'date' | 'month' | 'day-month' | 'day-month-year'
}) => {
  const [records, setRecords] = useState([])
  const [hourly, setHourly] = useState([] as any[])
  const [daily, setDaily] = useState([] as any[])
  const [monthly, setMonthly] = useState([] as any[])
  const [byVehicle, setByVehicle] = useState([] as any[])
  const [total, setTotal] = useState({
    revenue: 0,
    records: 0,
  })
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>('revenue')

  const getTick = (time: string) => {
    return tickType === 'hour'
      ? moment(time).format('hh A')
      : tickType === 'day'
      ? moment(time).format('ddd')
      : tickType === 'date'
      ? moment(time).format('DD')
      : tickType === 'month'
      ? moment(time).format('MMM')
      : tickType === 'day-month'
      ? moment(time).format('MMM DD')
      : tickType === 'day-month-year'
      ? moment(time).format('DD-MM-YYYY')
      : ''
  }

  const analyticsQuery = useQuery({
    queryKey: ['chart-daily', start, end],
    queryFn: ({ queryKey }) => {
      const [, start, end] = queryKey
      return api.getAnalytics(start, end)
    },
    retry: 3,
    refetchInterval: 150000,
  })

  useEffect(() => {
    const data = analyticsQuery.data
    if (!Array.isArray(data) || data.length === 0) return

    console.log({ data })

    const dataByDay = data.map((d) => {
      const init: any = {
        tick: d._id,
      }

      vehicleTypes.forEach((t, i) => {
        init[`records${i}`] = d.recordsAndRevenue?.[i]?.[0]
        init[`revenue${i}`] = d.recordsAndRevenue?.[i]?.[1]
      })

      init[`recordsTotal`] = d.recordsAndRevenue.reduce(
        (a: number, c: any) => a + c[0],
        0
      )
      init[`revenueTotal`] = d.recordsAndRevenue.reduce(
        (a: number, c: any) => a + c[1],
        0
      )

      return init
    })

    setDaily(dataByDay)

    const dataByMonth = Object.values(
      data.reduce((a, c) => {
        const tick = moment(c._id).startOf('month').toISOString()

        a[tick] = {
          ...a[tick],
          tick,
        }

        vehicleTypes.forEach((t, i) => {
          a[tick][`records${i}`] =
            (a[tick][`records${i}`] || 0) + c.recordsAndRevenue[i][0]
          a[tick][`revenue${i}`] =
            (a[tick][`revenue${i}`] || 0) + c.recordsAndRevenue[i][1]
        })

        a[tick]['recordsTotal'] =
          (a[tick]['recordsTotal'] || 0) +
          c.recordsAndRevenue.reduce((a: number, c: any) => a + c[0], 0)

        a[tick]['revenueTotal'] =
          (a[tick]['revenueTotal'] || 0) +
          c.recordsAndRevenue.reduce((a: number, c: any) => a + c[1], 0)

        return a
      }, {})
    )

    setMonthly(dataByMonth)

    const utcHours = new Array(24).fill(0).map((_, i) => i)
    const dataByHour = data.reduce((a, c) => {
      const hourly = c.hourly || {}

      return utcHours.map((h) => {
        const init: any = {
          tick: moment(c._id).utc().hour(h).toISOString(),
        }

        vehicleTypes.forEach((t, i) => {
          init[`records${i}`] = hourly[h]?.[i]?.[0]
          init[`revenue${i}`] = hourly[h]?.[i]?.[1]
        })

        init[`recordsTotal`] = (hourly[h] || []).reduce(
          (a: number, c: any) => a + c[0],
          0
        )
        init[`revenueTotal`] = (hourly[h] || []).reduce(
          (a: number, c: any) => a + c[1],
          0
        )

        return init
      })
    }, [])

    const pruned = () => {
      const fi = dataByHour.findIndex((i: any) => i.recordsTotal > 0)
      const li =
        dataByHour.length -
        1 -
        dataByHour
          .slice()
          .reverse()
          .findIndex((i: any) => i.recordsTotal > 0)

      if (fi === -1 || li === -1) return []
      return dataByHour.slice(fi, li + 1)
    }

    setHourly(pruned)

    const dataByVehicle = data.reduce((a, c) => {
      c.recordsAndRevenue.forEach((recRev: [number, number], i: number) => {
        a[i] = {
          type: i,
          fill: vehicleColors[i],
          name: vehicleTypes[i],
          records: (a[i]?.records || 0) + recRev[0],
          revenue: (a[i]?.revenue || 0) + recRev[1],
        }
      })
      return a
    }, [])

    setByVehicle(dataByVehicle)

    const total = data.reduce(
      (a, c) => {
        const bySize = c.recordsAndRevenue.reduce(
          (a: [number, number], c: [number, number]) => {
            return [a[0] + c[0], a[1] + c[1]]
          },
          [0, 0]
        )

        return {
          records: a.records + bySize[0],
          revenue: a.revenue + bySize[1],
        }
      },

      { revenue: 0, records: 0 }
    )

    setTotal(total)
  }, [analyticsQuery.data])

  const tickData =
    tickType === 'hour'
      ? hourly
      : ['day', 'date', 'day-month'].includes(tickType)
      ? daily
      : tickType === 'month'
      ? monthly
      : daily

  return (
    <Card>
      <CardHeader className='flex sm:flex-row flex-col items-stretch space-y-0 p-0 border-b'>
        <div className='flex'>
          {['revenue', 'records'].map((key) => {
            const chart = key as keyof typeof chartConfig

            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative z-30 flex flex-col flex-1 justify-center gap-1 bg-muted/50 data-[active=true]:bg-black px-6 sm:px-8 py-4 sm:py-6 border-t sm:border-t-0 sm:border-l even:border-l text-gray-500 text-left data-[active=true]:text-white'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-gray-500 text-xs'>
                  {chartConfig[chart].label}
                </span>
                <span className='font-bold text-lg sm:text-3xl leading-none'>
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='w-full h-[250px] aspect-auto'
        >
          <BarChart
            accessibilityLayer
            data={tickData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey='tick'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                return getTick(value)
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[200px]'
                  nameKey='view'
                  labelFormatter={(v) => {
                    const data = tickData.find((h) => h.tick === v)

                    return (
                      <>
                        <h1 className='mb-2 text-xl'>{getTick(v)}</h1>
                        <h2 className='flex justify-between'>
                          <span className='capitalize'>
                            Total {activeChart}:
                          </span>
                          <span>
                            {data?.[`${activeChart}Total`].toLocaleString()}
                          </span>
                        </h2>
                      </>
                    )
                  }}
                />
              }
            />
            {activeChart === 'records'
              ? typePrice.map((_, i) => (
                  <Bar
                    key={`records${i}`}
                    stackId={'records'}
                    dataKey={`records${i}`}
                    name={vehicleTypes[i]}
                    fill={vehicleColors[i]}
                  />
                ))
              : typePrice.map((_, i) => (
                  <Bar
                    key={`revenue${i}`}
                    stackId={'revenue'}
                    dataKey={`revenue${i}`}
                    name={vehicleTypes[i]}
                    fill={vehicleColors[i]}
                  />
                ))}
          </BarChart>
        </ChartContainer>

        <ChartContainer
          config={chartConfig}
          className='mx-auto max-h-[400px] aspect-square'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(val, name, x) => (
                    <span className='flex justify-between items-center gap-2 w-full'>
                      <span
                        className={`rounded-sm aspect-square w-3 h-3 bg-[${x.payload.fill}] `}
                        style={{
                          backgroundColor: x.payload.fill,
                        }}
                      />
                      <div className='font-bold'>{name}</div>
                      <span className='text-end'>
                        {val.toLocaleString() +
                          ' (' +
                          (
                            (+val /
                              byVehicle.reduce((a, c) => (a += c.revenue), 0)) *
                            100
                          ).toFixed(1) +
                          '%)'}
                      </span>
                    </span>
                  )}
                  className='max-w-[400px]'
                  hideLabel
                />
              }
            />
            <Pie
              data={byVehicle}
              dataKey={activeChart}
              nameKey='name'
              innerRadius={80}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='font-bold text-3xl fill-foreground'
                        >
                          {total[activeChart].toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground'
                        >
                          {activeChart}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default AnalyticsContent
