'use client'

import { Calendar } from '@/components/ui/calendar'
import { useMemo, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import AnalyticsContent from '@/components/analytics-content'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { Select } from '@/components/ui/select'
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@radix-ui/react-select'
import { Label } from '@/components/ui/label'

const Admin = () => {
  const [customDate, setCustomDate] = useState({
    from: new Date(moment().subtract(2, 'weeks').startOf('day').toDate()),
    to: new Date(moment().endOf('day').toDate()),
  })
  const [customTick, setCustomTick] = useState(
    'day-month-year' as 'day-month-year' | 'month'
  )
  const [dailyDate, setDailyDate] = useState(
    new Date(moment().startOf('day').toDate())
  )

  const [weekType, setWeekType] = useState(
    'week-start' as 'week-start' | 'week-to-date'
  )

  const [monthType, setMonthType] = useState(
    'month-start' as 'month-start' | 'month-to-date'
  )

  const [yearType, setYearType] = useState(
    'year-start' as 'year-start' | 'year-to-date'
  )

  const [weekStart, setWeekStart] = useState(moment().startOf('week').valueOf())
  const [monthStart, setMonthStart] = useState(
    moment().startOf('month').valueOf()
  )
  const [yearStart, setYearStart] = useState(moment().startOf('year').valueOf())

  const yearEnd = useMemo(
    () =>
      moment().isAfter(moment(yearStart).add(1, 'year'))
        ? moment(yearStart).add(1, 'year')
        : moment().endOf('day'),
    [yearStart]
  )

  return (
    <>
      <h1 className='mt-3 mb-2 font-bold text-3xl'>Dashboard</h1>

      <Tabs defaultValue='daily' className='mt-3 w-full'>
        <TabsList className='justify-start grid grid-cols-[repeat(5,auto)] w-full overflow-x-auto'>
          <TabsTrigger value='daily'>Daily</TabsTrigger>
          <TabsTrigger value='weekly'>Weekly</TabsTrigger>
          <TabsTrigger value='monthly'>Monthly</TabsTrigger>
          <TabsTrigger value='yearly'>Yearly</TabsTrigger>
          <TabsTrigger value='custom'>Custom</TabsTrigger>
        </TabsList>
        <TabsContent value='daily' className='border-none'>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'default'}
                className={cn(
                  'mt-2 p-4 text-left font-normal',
                  !dailyDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className='opacity-50 ml-auto w-4 h-4' />

                <span>Select Date</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className='z-50 bg-black p-0 w-auto' align='start'>
              <Calendar
                mode='single'
                selected={dailyDate}
                onSelect={setDailyDate}
                disabled={(date: any) =>
                  date > new Date() || date < new Date('1900-01-01')
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className='mt-2 mb-2 text-2xl'>
            {moment(dailyDate).format('MMM DD, YYYY')}
          </div>
          <AnalyticsContent
            start={moment(dailyDate).startOf('day').valueOf().toString()}
            end={moment(dailyDate).endOf('day').valueOf().toString()}
          />
        </TabsContent>
        <TabsContent value='weekly'>
          <div className='flex gap-2 py-2'>
            <Button
              onClick={() => {
                setWeekStart(moment(weekStart).subtract(1, 'week').valueOf())
              }}
            >
              <FaChevronLeft /> Previous Week
            </Button>
            <Button
              onClick={() => {
                setWeekStart(moment(weekStart).add(1, 'week').valueOf())
              }}
              disabled={moment(weekStart).add(1, 'week').isAfter(moment())}
            >
              Next Week <FaChevronRight />
            </Button>
          </div>
          <div className='flex gap-2 py-2'>
            <Button
              variant={weekType === 'week-start' ? 'default' : 'outline'}
              onClick={() => {
                setWeekType('week-start')
                setWeekStart(moment().startOf('week').valueOf())
              }}
            >
              Week Start
            </Button>
            <Button
              variant={weekType === 'week-to-date' ? 'default' : 'outline'}
              onClick={() => {
                setWeekType('week-to-date')
                setWeekStart(moment().subtract(1, 'week').valueOf())
              }}
            >
              Full Week
            </Button>
          </div>
          <div className='mt-2 mb-2 text-2xl'>
            From {moment(weekStart).format('MMM DD, YYYY')} —&nbsp;
            {moment(weekStart).add(1, 'week').format('MMM DD, YYYY')}
          </div>
          <AnalyticsContent
            start={moment(weekStart).valueOf().toString()}
            end={moment(weekStart).add(1, 'week').valueOf().toString()}
            tickType='day'
          />
        </TabsContent>
        <TabsContent value='monthly'>
          <div className='flex gap-2 py-2'>
            <Button
              onClick={() => {
                setMonthStart(moment(monthStart).subtract(1, 'month').valueOf())
              }}
            >
              <FaChevronLeft /> Previous Month
            </Button>
            <Button
              onClick={() => {
                setMonthStart(moment(monthStart).add(1, 'month').valueOf())
              }}
              disabled={moment(monthStart).add(1, 'month').isAfter(moment())}
            >
              Next Month <FaChevronRight />
            </Button>
          </div>
          <div className='flex gap-2 py-2'>
            <Button
              variant={monthType === 'month-start' ? 'default' : 'outline'}
              onClick={() => {
                setMonthType('month-start')
                setMonthStart(moment().startOf('month').valueOf())
              }}
            >
              Month Start
            </Button>
            <Button
              variant={monthType === 'month-to-date' ? 'default' : 'outline'}
              onClick={() => {
                setMonthType('month-to-date')
                setMonthStart(moment().subtract(1, 'month').valueOf())
              }}
            >
              Full Month
            </Button>
          </div>
          <div className='mt-2 mb-2 text-2xl'>
            From {moment(monthStart).format('MMM DD, YYYY')} —&nbsp;
            {moment(monthStart).add(1, 'month').format('MMM DD, YYYY')}
          </div>

          <AnalyticsContent
            start={moment(monthStart).valueOf().toString()}
            end={moment(monthStart).add(1, 'month').valueOf().toString()}
            tickType='day-month'
          />
        </TabsContent>
        <TabsContent value='yearly'>
          <div className='flex gap-2 py-2'>
            <Button
              onClick={() => {
                setYearStart(moment(yearStart).subtract(1, 'year').valueOf())
              }}
            >
              <FaChevronLeft /> Previous Year
            </Button>
            <Button
              onClick={() => {
                setYearStart(moment(yearStart).add(1, 'year').valueOf())
              }}
              disabled={moment(yearStart).add(1, 'year').isAfter(moment())}
            >
              Next year <FaChevronRight />
            </Button>
          </div>
          <div className='flex gap-2 py-2'>
            <Button
              variant={yearType === 'year-start' ? 'default' : 'outline'}
              onClick={() => {
                setYearType('year-start')
                setYearStart(moment().startOf('year').valueOf())
              }}
            >
              Start of Year
            </Button>
            <Button
              variant={yearType === 'year-to-date' ? 'default' : 'outline'}
              onClick={() => {
                setYearType('year-to-date')
                setYearStart(moment().subtract(1, 'year').valueOf())
              }}
            >
              Full Year
            </Button>
          </div>
          <div className='mt-2 mb-2 text-2xl'>
            From {moment(yearStart).format('MMM DD, YYYY')} —&nbsp;
            {moment(yearEnd).format('MMM DD, YYYY')}
          </div>
          <AnalyticsContent
            start={moment(yearStart).valueOf().toString()}
            end={moment(yearEnd).valueOf().toString()}
            tickType='month'
          />
        </TabsContent>
        <TabsContent value='custom'>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'default'}
                  className={cn(
                    'mt-2 p-4 text-left font-normal',
                    !dailyDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className='opacity-50 ml-auto w-4 h-4' />

                  <span>Select Date Range</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className='z-50 bg-black p-0 w-auto'
                align='start'
              >
                <Calendar
                  numberOfMonths={2}
                  mode='range'
                  selected={customDate}
                  onSelect={(v: any) => setCustomDate(v)}
                  disabled={(date: any) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className='mt-2 mb-2 text-2xl'>
            From {moment(customDate.from).format('MMM DD, YYYY')} —&nbsp;
            {moment(customDate.to).format('MMM DD, YYYY')}
          </div>

          <AnalyticsContent
            start={moment(customDate?.from || moment())
              .startOf('day')
              .valueOf()
              .toString()}
            end={moment(customDate?.to || moment())
              .endOf('day')
              .valueOf()
              .toString()}
            tickType={customTick}
          />
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Admin
