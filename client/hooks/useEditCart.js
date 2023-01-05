import { useEffect, useState } from "react"
import { editCart } from "../services/user"
import _ from "lodash"

const useEditCart = (value,perviousValue, delay,id,user) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    let increment = value > perviousValue ? true : false
    console.log(value)
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
            if(user.name != undefined) {
                editCart({id,count : value},(data,err) => {
                    console.log(data)
                })
            }else {
                let  cart = localStorage.getItem('cart')?.split(',')

                let removed = _.remove(cart, function(product) {
                    return product == id;
                });

                for(let i = 0 ; i < value ; i++) {
                    cart.push(id)
                }

                localStorage.setItem('cart',cart)
            }
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

export default useEditCart