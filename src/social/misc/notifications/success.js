import { toast } from 'react-toastify';

export default function sendSuccess(content) {
    toast.success(String(content), {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
}