import api from '@/state/api'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useFlexLayout, useTable } from 'react-table'
import Styled from './style'
import Datepicker from '@/components/datepicker'
import Loading from '../loading'

const Report = () => {
  const [startDate, setStartDate] = useState(
    moment().startOf('day').valueOf() as number
  )

  const {
    data: report,
    error,
    isLoading,
    refetch,
  } = api.useGetReportQuery(
    {
      from: startDate,
    },
    {
      pollingInterval: 10000,
    }
  )

  useEffect(() => {
    refetch()
  }, [startDate])

  const rawData = report?.docs || []

  const data = useMemo(() => {
    const newData = rawData.map((item: any) => {
      const prices =
        item.createdAt < 1680555600000
          ? [80, 100, 150, 200, 250]
          : item.createdAt < 1728864000000
          ? [100, 150, 200, 250, 350]
          : [100, 200, 250, 300, 500]

      const plate = item.dataCache.vehicle.licensePlate
      const w1 = item.weights[0]?.weight
      const w2 = item.weights[1]?.weight

      const w = w2 ? `| ${w2} KG === ${Math.abs(w1 - w2)} KG` : ''

      return {
        ...item,
        plate: `(${plate.code}) ${plate.plate} [${plate.region?.code}]`,
        price: prices[item.dataCache.vehicle.type],
        //weights: `${w1} KG ${w}`
        weights: item.weights,
      }
    })

    const sum = newData.reduce(
      (acc: any, cur: any) => {
        return {
          total: acc.total + +cur.price || 0,
          mistake: acc.mistake + (cur.isMistake ? +cur.price : 0),
          unpaid: acc.unpaid + (cur.isUnpaid ? +cur.price : 0),
        }
      },
      {
        total: 0,
        mistake: 0,
        unpaid: 0,
      }
    )

    return [
      ...newData,
      {
        summation: true,
        price: `MISTAKES: ${sum.mistake} ETB`,
      },
      {
        summation: true,
        price: `UNPAID: ${sum.unpaid} ETB`,
      },
      {
        summation: true,
        price: `SUB TOTAL: ${sum.total} ETB`,
      },
      {
        summation: true,
        price: `TOTAL: ${sum.total - sum.mistake - sum.unpaid} ETB`,
      },
    ]
  }, [rawData])

  const columns: any = useMemo(
    () => [
      {
        Header: '#',
        accessor: '',
        Cell: ({ row, value }: any) => {
          return +row.id + 1
        },
      },
      {
        Header: 'Plate Number',
        accessor: 'plate',
        Cell: ({ value }: any) => {
          return value
        },
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }: any) => {
          return value ? moment(value).format('YYYY.MM.DD HH:mm:ss') : ''
        },
      },
      {
        Header: 'Weights',
        accessor: 'weights',
        Cell: ({ value }: any) => {
          return (
            <ul className='weights-list'>
              <li className={`${value?.[0]?.manual ? 'manual-input' : ''}`}>
                {value?.[0]?.weight}
              </li>
              {value?.[1] ? (
                <>
                  <li className={`${value?.[1]?.manual ? 'manual-input' : ''}`}>
                    {value?.[1]?.weight}
                  </li>
                  <li>{Math.abs(value[0].weight - value[1].weight)}</li>
                </>
              ) : (
                <></>
              )}
            </ul>
          )
        },
      },
      {
        Header: 'Serial',
        accessor: 'serial',
        Cell: ({ value }: any) => {
          return <span className='serial'>{value}</span>
        },
      },
      {
        Header: 'Unpaid',
        accessor: 'isUnpaid',
        Cell: ({ value }: any) => {
          return value ? 'Unpaid' : ''
        },
      },
      {
        Header: 'Mistake',
        accessor: 'isMistake',
        Cell: ({ value }: any) => {
          return value ? 'Mistake' : ''
        },
      },
      {
        Header: 'Price (ETB)',
        accessor: 'price',
        Cell: ({ value }: any) => {
          return value
        },
      },
    ],
    []
  )

  const formatDate = (date: number) => {
    return moment(date).format('YYYY.MM.DD')
  }

  const tableInstance = useTable({ columns, data }, useFlexLayout)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance

  return (
    <Styled>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : error && (error as any).status !== 404 ? (
        <div>Error: {JSON.stringify(error)}</div>
      ) : (
        <>
          <div className='datepicker-wrap'>
            <h4>Select Date:</h4>
            <Datepicker
              onChange={(date: Date) => {
                setStartDate(moment(date).startOf('day').valueOf() as number)
              }}
            />
            <h3>{formatDate(startDate)}</h3>
          </div>
          {(error as any)?.status === 404 ? (
            <div
              style={{
                display: 'grid',
                justifyContent: 'center',
                fontStyle: 'italic',
                height: '100px',
                alignContent: 'center',
              }}
            >
              No Data
            </div>
          ) : (
            <div className='table' {...getTableProps()}>
              <div className='thead'>
                {headerGroups.map((headerGroup) => (
                  <div className='tr' {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <div className='th' {...column.getHeaderProps()}>
                        {column.render('Header')}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className='tbody' {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <div
                      className={`tr ${row.values.isMistake && 'mistake-row'} ${
                        row.values.isUnpaid && 'unpaid-row'
                      }`}
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <div className='td' {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </>
      )}
    </Styled>
  )
}

export default Report
