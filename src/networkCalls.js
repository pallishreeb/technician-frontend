import axios from "axios";
import { url } from "./config";
const Axios = axios.create({
    headers: {
        Authorization: JSON.parse(localStorage.getItem("token"))
    }
})
// Jobs apis

export const getAllJobs = () => {
    return Axios.get(`${url}/job`)
}
export const addJob = (job) => {
    return Axios.post(`${url}/job`, job);
}
export const updateJob = (job, id) => {
    return Axios.put(`${url}/job?id=${id}`, job)
}
export const deleteJob = (id) => {
    return Axios.delete(`${url}/job?id=${id}`)
}
export const deleteBulkJobs = (ids) => {
    return Axios.delete(`${url}/job/bulk-delete`, ids)
}


//technicians apis

export const getAllTechnicians = () => {
    return Axios.get(`${url}/technician`)
}
export const addTechnician = (technician) => {
    return Axios.post(`${url}/technician`, technician);
}
export const updateTechnician = (technician, id) => {
    return Axios.put(`${url}/technician/?id=${id}`, technician)
}
export const deleteTechnician = (id) => {
    return Axios.delete(`${url}/technician?id=${id}`)
}
export const deleteBulkTechnicians = (ids) => {
    return Axios.delete(`${url}/technician/bulk-delete`, ids)
}


//apartments apis

export const getAllApartments = () => {
    return Axios.get(`${url}/apartment`)
}
export const addApartment = (apartment) => {
    return Axios.post(`${url}/apartment`, apartment);
}
export const updateApartment = (apartment, id) => {
    return Axios.put(`${url}/apartment/?id=${id}`, apartment)
}
export const deleteApartment = (id) => {
    return Axios.delete(`${url}/apartment?id=${id}`)
}
export const deleteBulkApartments = (ids) => {
    return Axios.delete(`${url}/apartment/bulk-delete`, ids)
}

