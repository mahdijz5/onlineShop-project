import { addProductToCart,removeProductFromCart } from "../services/user"
import _ from "lodash"

export const addToCart = (id,user,callback) => {  
    let cartStr = localStorage.getItem("cart") || ","
    let cart = cartStr === "," ? [] : cartStr.split(",")
    cart.push(id)

        if(user.name != undefined) {
            localStorage.setItem("cart", cart);
            addProductToCart(id,(data,err) => {
                if(err) {
                    if(err.status != 401 || err.status == 403) {
                        callback({"message" : err.response.data.message,status : err.status})
                    }
                }else{
                    callback({"message" : data.data.message,status : data.status})
                }
            })

        }else {
            localStorage.setItem("cart", cart);

            callback({"message" : "محصول با موفقیت به سبد خرید اضافه شد",status : 200})
        }


}


export const removeFromCart = (id,user,callback) => {  
    let cartStr = localStorage.getItem("cart") || ","
    let cart = cartStr === "," ? [] : cartStr.split(",")
    let index = cart.indexOf(id)
    if(index > -1) {
        cart.splice(index,1)
    }

        if(user.name != undefined) {
            localStorage.setItem("cart", cart);
            removeProductFromCart(id,(data,err) => {
                if(err) {
                    if(err.status != 401 || err.status == 403) {
                        callback({"message" : err.response.data.message,status : err.status})
                    }
                }else{
                    callback({"message" : data.data.message,status : data.status})
                }
            })

        }else {
            localStorage.setItem("cart", cart);

            callback({"message" : "محصول با موفقیت از سبد خرید حذف شد",status : 200})
        }


}
