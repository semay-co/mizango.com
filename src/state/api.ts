import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export default createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  tagTypes: ['report', 'record'],
  endpoints: (builder) => ({
    getReport: builder.query({
      query: (query) => {
        console.log({ query })

        const from = query?.from ? `from=${query.from}` : ''

        return {
          url: `/report/get?${from}`,
          method: 'GET',
        }
      },
      providesTags: ['report'],
    }),
    getRecordList: builder.query({
      query: (query) => {
        return {
          url: `/record/list`,
          method: 'GET',
          query,
        }
      },
      providesTags: ['record'],
    }),
  }),
})
