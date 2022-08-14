
import {createContext} from "react"

export const dashboardContext = createContext({
    styles : {},
})


export const AdminDashboardContext = createContext({
    styles : {},
    toastNotif : () => {},
    setPoint : () => {},
})

export const general = createContext({
})