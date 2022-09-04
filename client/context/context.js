
import {createContext} from "react"

export const dashboardContext = createContext({
    styles : {},
})


export const AdminDashboardContext = createContext({
    styles : {},

    getSelectedCategories : [],
    addCategory : () => {},
    removeCategory : () => {},
    handleChangeSearch : () => {},
    
})

export const general = createContext({
})