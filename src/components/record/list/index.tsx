import api from '@/state/api'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useFlexLayout, usePagination, useTable } from 'react-table'
import Styled from './style'
import Datepicker from '@/components/datepicker'
import { Oval } from 'react-loader-spinner'
import Loading from '@/components/loading'

const Records = () => {
  const [startDate, setStartDate] = useState(
    moment().startOf('day').valueOf() as number
  )

  const {
    data: report,
    error,
    isLoading,
    refetch,
  } = api.useGetRecordListQuery(
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

  const data = report?.docs || []

  const columns = useMemo(
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
        Header: 'Weights',
        accessor: 'weights',
        Cell: ({ value }: any) => {
          return value ? (
            <div className='weights-wrap'>
              <div>
                <div>{`${value[0].weight} KG`}</div>
                <div className='weight-time'>{`${formatDateTime(
                  +value[0].createdAt
                )} `}</div>
              </div>
              <div>
                {value[1] && (
                  <>
                    <div>{`${value[1].weight} KG`}</div>
                    <div className='weight-time'>{`${formatDateTime(
                      +value[1].createdAt
                    )} `}</div>
                  </>
                )}
              </div>
              <div>
                {value[1] && (
                  <>
                    <div>{`${Math.abs(
                      value[1].weight - value[0].weight
                    )} KG`}</div>
                    {/* <div>{`${formatDateTime(value[1].createdAt)} `}</div> */}
                  </>
                )}
              </div>
            </div>
          ) : (
            ''
          )
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

  const formatDateTime = (date: number) => {
    return moment(date).format('YYYY.MM.DD HH:mm:ss')
  }

  const controlledPageCount = useMemo(
    () => Math.ceil(report?.totalDocs / 10),
    [report]
  )

  const tableInstance = useTable(
    {
      columns,
      data,
      // initialState: { pageIndex: 0 } as any,
      // manualPagination: true,
      // pageCount: controlledPageCount,
    },
    useFlexLayout
    // usePagination
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // page,
    // canPreviousPage,
    // canNextPage,
    // pageOptions,
    // pageCount,
    // gotoPage,
    // nextPage,
    // previousPage,
    // setPageSize,
    // Get the state from the instance
    // state: { pageIndex, pageSize },
  } = tableInstance

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
                      {row.cells.map((cell: any) => {
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

          {/* <div className='pagination'>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>
              | Go to page:{' '}
              <input
                type='number'
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  gotoPage(page)
                }}
                style={{ width: '100px' }}
              />
            </span>{' '}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div> */}
        </>
      )}
    </Styled>
  )
}

export default Records
