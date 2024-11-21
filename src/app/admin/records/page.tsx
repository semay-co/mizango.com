'use client'

import { api } from '@/api'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useQuery } from '@tanstack/react-query'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'
import { useCallback, useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import LicensePlate from '@/components/licensePlate'
import { getVehiclePrices, vehicleColors, vehicleTypes } from '@/lib/vehicle'

const RecordsTable = ({ data }: { data: any[] }) => {
  const getVehicle = useCallback((item: any) => item.dataCache.vehicle, [data])

  const sums = useMemo(() => {
    return data.reduce(
      (a, c) => {
        const price = getVehiclePrices(+c.createdAt)[getVehicle(c).type]

        a.unpaid += c.isMistake || !c.isUnpaid ? 0 : price
        a.subTotal += c.isMistake ? 0 : price
        a.total += c.isMistake || c.isUnpaid ? 0 : price

        return a
      },
      {
        unpaid: 0,
        subTotal: 0,
        total: 0,
      }
    )
  }, [data])

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Record</TableHead>
          <TableHead className='text-end'>Weights</TableHead>
          <TableHead className='text-end'>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.serial}
            className={`${
              item.isMistake
                ? 'bg-pink-600/30'
                : item.isUnpaid
                ? 'bg-yellow-200/20'
                : ''
            }`}
          >
            <TableCell className='font-medium'>
              <div className='pb-2 uppercase'>Serial: {item.serial}</div>

              <LicensePlate
                type='simple'
                licensePlate={getVehicle(item).licensePlate}
              />

              <div className='flex items-center gap-2 mt-2 px-2 text-slate-500 text-sm uppercase'>
                <span
                  className={`w-2 h-2 text-xs aspect-square rounded-sm border ${
                    [
                      'border-blue-500',
                      'border-green-500',
                      'border-yellow-300',
                      'border-fuchsia-500',
                      'border-rose-500',
                    ][getVehicle(item).type]
                  }`}
                />
                <span>{vehicleTypes[getVehicle(item).type]} </span>
              </div>
            </TableCell>
            <TableCell className='text-end'>
              <div className='text-slate-500 text-sm'>
                {moment(item.createdAt).format('hh:MM A')}
              </div>
              <div
                className={`${item.weights[0].manual ? 'text-yellow-400' : ''}`}
              >
                {item.weights[0].weight} KG
              </div>
              {item.weights.length > 1 && (
                <>
                  <div
                    className={`${
                      item.weights[1].manual ? 'text-yellow-400' : ''
                    }`}
                  >
                    {item.weights[1].weight} KG
                  </div>
                  <div>
                    {Math.abs(item.weights[0].weight - item.weights[1].weight)}{' '}
                    KG
                  </div>
                </>
              )}
            </TableCell>
            <TableCell className='text-right'>
              {getVehiclePrices(+item.createdAt)[getVehicle(item).type]}

              {item.isMistake ? (
                <div className='font-bold text-pink-500 text-sm'>MISTAKE</div>
              ) : item.isUnpaid ? (
                <div className='font-bold text-sm text-yellow-300'>UNPAID</div>
              ) : (
                <></>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Unpaid</TableCell>
          <TableCell className='text-right'>
            {sums.unpaid.toLocaleString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Sub Total</TableCell>
          <TableCell className='text-right'>
            {sums.subTotal.toLocaleString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className='text-right'>
            {sums.total.toLocaleString()}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

const Records = () => {
  const [start, setStart] = useState(moment().startOf('day').valueOf())
  const [limit, setLimit] = useState(500)
  const [skip, setSkip] = useState(0)

  const from = useMemo(() => moment(start).valueOf(), [start])
  const to = useMemo(() => moment(start).endOf('day').valueOf(), [start])

  const recordsQuery = useQuery({
    queryKey: ['chart-daily', from, to],
    queryFn: ({ queryKey }) => {
      const [, from, to] = queryKey
      return api.getRecords(
        from.toString(),
        to.toString(),
        limit.toString(),
        skip.toString()
      )
    },
    retry: 3,
    refetchInterval: 30000,
  })

  return (
    <>
      <h1 className='mt-3 mb-2 font-bold text-3xl'>Records</h1>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'default'}
              className={cn(
                'mt-2 p-4 text-left font-normal',
                !start && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='opacity-50 ml-auto w-4 h-4' />

              <span>Select Date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className='z-50 bg-black p-0 w-auto' align='start'>
            <Calendar
              mode='single'
              selected={start}
              onSelect={setStart}
              disabled={(date: any) =>
                date > new Date() || date < new Date('2020-01-01')
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <>
          {/* <code>{JSON.stringify(recordsQuery.data)}</code> */}
          <RecordsTable data={recordsQuery.data || []} />
        </>
      </div>
    </>
  )
}

export default Records
