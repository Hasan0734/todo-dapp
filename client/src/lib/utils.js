import axios from "axios";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const baseAPI = import.meta.env.VITE_API_URL_V1;


export const addTransaction = async (data) => {
    const res =  await axios.post(baseAPI+'/transactions', data)
}