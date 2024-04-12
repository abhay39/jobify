"use client"
import JobifyStore from "@/store"

import { Provider } from 'react-redux'

const MainPage = ({children}) => {

  return (
    <Provider store={JobifyStore}>
      {children}
    </Provider>
  )
}

export default MainPage