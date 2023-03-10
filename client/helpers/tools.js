import { toast  } from "react-toastify";
import moment from "jalali-moment"
import textTruncate  from "truncate"

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
    const num = number || 0
    return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

}

export const convertDate = (date) => {
    return moment(date, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')
}

export const truncate = (string,max) => {
    return textTruncate(string, max)
}

export const isEmpty = (value) => {
   if (value === null) {
        return true;
    } else if (typeof value !== 'number' && value === '') {
        return true;
    } else if (typeof value === 'undefined' || value === undefined) {
        return true;
    } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }else if ( typeof value === 'object' && value.length <=0)  {
        return true;
    }  else {
        return false;
    }
}