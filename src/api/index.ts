import { useMutation, useQuery } from '@tanstack/react-query'
import moment from 'moment'

type Event = {}

const base = process.env.NEXT_PUBLIC_API_BASE_URL

if (!base) {
  throw new Error('could not find base url')
}

export const api = {
  getAnalytics: async (start: string, end: string) => {
    const url = new URL(`${base}/analytics`)
    url.searchParams.set('from', start)
    url.searchParams.set('to', end)

    const response = await fetch(url.toString())
    return await response.json()
  },
}
