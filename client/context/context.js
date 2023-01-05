
import {createContext} from "react"

export const dashboardContext = createContext({
    user : {},
})


export const AdminDashboardContext = createContext({
    styles : {},

    getSelectedCategories : [],
    addCategory : () => {},
    removeCategory : () => {},
    handleChangeSearch : () => {},
    
})


export const ViewProductsContext = createContext({
    setSelectedCategories : () => {},
    setThumbnail : () => {},
    onSubmit : () => {},
    onSubmitEdit : () => {},
    categories : [],
    brands : [],
    getSelectedCategories : [],
})

export const HomeLayoutContext = createContext({
    categories : [],
    brands : [],
})

export const General = createContext({
    setRefresh : () => {},
    setMyCart : () => {},
    refresh : false,
    user : {},
    myCart : [],
})