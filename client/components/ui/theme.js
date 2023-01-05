import { createTheme } from '@mui/material/styles';

export const theme = () => {
    return createTheme({
        direction: 'rtl',
        typography :{
            fontFamily : "Vazir , Roboto"
        },  
        palette: {
            primary: {
                main: "#7F77E0"
            },
            secondary: {
                main: "#3A354D"
            },
            success: {
                main: "#20D489"
            },
            disable : {
                main : "#757575"
            },
            danger : {
                main : "#e63946"
            },
            warning : {
                main : "#ffcc00"
            },
            text: {
                primary: "#3A354D"
            }
        },
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: 'circle' },
                        style: {
                            borderRadius: "50%",
                            padding : "11px",
                            minWidth: "unset",
                            border : "none"
                        },
                    },
                    {
                        props: { variant: 'circle',color:"primary" },
                        style: {
                            borderRadius: "50%",
                            padding : "11px",
                            minWidth: "unset",
                            border : "none",
                            backgroundColor : "#7F77E0"
                        },
                    },
                ],
            }, 
        },
    });
}