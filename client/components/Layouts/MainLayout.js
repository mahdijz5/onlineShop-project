import Meta from "../Meta";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

import { theme } from "../ui/theme"

const MainLayout = ({ children }) => {
    // Create rtl cache
    const cacheRtl = createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
    });

    return (
        <>
            <Meta title="Home" />
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme()} >
                    <div dir='rtl'>
                        {children}
                    </div>

                </ThemeProvider>
            </CacheProvider>
        </>
    )
}

export default MainLayout;