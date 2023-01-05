import Meta from "../components/Meta";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { useLayoutEffect, useState } from "react";

import { theme } from "../components/ui/theme"
import { General } from "../context/context";
import { getUser } from "../services/user";
import { Router } from "next/router";

const MainLayout = ({ children }) => {
    const [user, setUser] = useState([])
    const [myCart, setMyCart] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(false)


    Router.events.on("routeChangeStart", (url) => {
        NProgress.start();
        setLoading(true)
    })
    Router.events.on("routeChangeComplete", (url) => {
        NProgress.done();
        setLoading(false)
    })


    useLayoutEffect(() => {
        getUser((data, err) => {
            if (!err) {
                let userCart = []
                data.data.user.cart.map(c => userCart.push(c._id))
                localStorage.setItem("cart", userCart)
                setMyCart(userCart)
                setUser(data.data.user)
            }else {
                setUser([])
                setMyCart(localStorage.getItem('cart')?.split(',') || [])
                console.log('22')
            }
        })

    }, [refresh,loading])

    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <General.Provider value={{
            user,
            setRefresh,
            setMyCart,
            refresh,
            myCart,
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