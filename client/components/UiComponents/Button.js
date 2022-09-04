import React, { useEffect, useState } from 'react'
import { Dark, LightSecondry, Primary, Secondary } from '../../helpers/color'
import styles from '../../styles/UiComponents/Button.module.css'

const Button =  ({children,style,className,theme,varient,...rest}) => {
    const [getStyle,setStyle] = useState({})

    useEffect(() => {
        switch (theme) {
            case "dark":
                setStyle({
                    backgroundColor : Dark,
                    color : LightSecondry,
                })
            break;
            case "light":
                setStyle({
                    backgroundColor : Secondary,
                    color : "black",
                })
            break;
            case "danger":
                setStyle({
                    backgroundColor : "tomato",
                    color : "white",
                })
            break;
            case "grey":
                setStyle({
                    backgroundColor : "#A9A9A9",
                    color : "white",
                })
            break;
            
        }
        switch (varient) {
            case "pill":
                setStyle((style) => {
                    return{...style,
                    borderRadius : "50%",
                    }
                })
            break;  
            case "square":
                setStyle((style) => {
                    return{...style,
                    borderRadius : "0",
                    }
                })
            break;  
        }
        setStyle((style) => {
            let newStyle = {
                borderRadius : "8px",
                ...style,
                width : "auto",
                display : "inline-block",
                padding : "12px 18px 15px 18px",
                height : "45px",
                fontWeight : "500"
            }
            return newStyle 
        })

    },[])

    return (
        <>
            <button  {...rest} className={`btn ${varient == undefined ? styles.buttonHvr : ""} ${className} `} style={{...getStyle,...style}} >{children}</button>
        </>
    )
}

export default Button