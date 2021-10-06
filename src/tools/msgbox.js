import { toast } from "react-toastify";

export const Sorry = (text) => {
    toast.error(text, {
        // theme: "light",
        position: "top-right",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-times" aria-hidden="true"></i>,
    });
    
};

export const OK = (text) => {
    toast.success(text, {
        // theme: "light",
        position: "top-left",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-check" aria-hidden="true"></i>,
    });
    
};

export const Notify = (text) => {
    toast.info(text, {
        // theme: "light",
        position: "top-center",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-info" aria-hidden="true"></i>,
    });  
};

export const Attention = (text) => {
    /*toast.warn(text, {
        type: "colored",
        position: "top-center",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-gavel" aria-hidden="true"></i>,
    });*/
    toast.warn(text, {
        type: "dark",
        position: "top-center",
        closeOnClick: true,
        icon: <i style={{float:'right'}} className="fa fa-gavel" aria-hidden="true"></i>,
    });
    
};

export const NewMsg = ({name, text}) => {
    toast(`${name} : ${text}`, {
        type: "dark",
        position: "top-left",
        closeOnClick: true,
        icon: <i style={{float:'right', textAlign: 'right'}} className="fa fa-envelope-o" aria-hidden="true"></i>,
    });
}