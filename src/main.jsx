import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from "@/state/api"
import './index.scss'

export const store = configureStore({
    // sets up the reducer from the api file
    reducer: { [api.reducerPath] : api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware)
})
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
