import Meta from "../components/Meta";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useEffect, useState } from "react";

import { theme } from "../components/ui/theme"
import { General } from "../context/context";
import { userAuthenticated } from "../services/auth";
import { getUser } from "../services/user";

const MainLayout = ({ children }) => {
    const [user, setUser] = useState([])
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        getUser((data, err) => {
            if (!err) {
                let userCart = []
                data.data.user.cart.map(c => userCart.push(c._id))
                localStorage.setItem("cart", userCart)
                setUser(data.data.user)

            }
        })

    }, [refresh])

    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <General.Provider value={{
            user,
            setRefresh,
            refresh,
        }}>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme()} >
                    <div dir='rtl'>
                        {children}
                    </div>

                </ThemeProvider>
            </CacheProvider>
        </General.Provider>
    )
}

export default MainLayout;