import { toast  } from "react-toastify";


export const toastNotif = (msg, status,delay) => {
    setTimeout(() => {
        if (status >= 200 && status < 300) {
            toast.success(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast.error(msg, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, delay);
};

//for prices
export const setPoint = (number) => {
    return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
}