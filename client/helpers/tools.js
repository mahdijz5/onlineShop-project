import { confirmAlert } from "react-confirm-alert";
import Button from "../components/UiComponents/Button";
import { toast  } from "react-toastify";


export const confirmation = (title,body,process,anyParameterForProcess = 1) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div className="card p-5 text-center" style={{borderRadius : "20px"}}>
                    <h1 className="card-title">{title}</h1>
                    <p className="card-text">{body}</p>
                    <Button onClick={onClose} className="mb-2" theme="danger">
                        خیر
                    </Button>
                    <Button
                        onClick={() => {
                            process(anyParameterForProcess);
                            onClose();
                        }}
                        theme="light"
                    >
                        بله
                    </Button>
                </div>
            );
        },
    });
};

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