import { PayloadAction, current } from '@reduxjs/toolkit'
import { AppState } from './app.slice'

const appReducers = {
  setUi: (draft: any, action: PayloadAction<AppState>) => {
    draft.form = {
      ...draft.ui,
      ...action.payload.ui,
    }

    console.log('after', current(draft))
  },
}

export default appReducers
