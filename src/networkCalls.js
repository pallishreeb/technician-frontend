import axios from "axios";
import { url, imgUrl } from "./config";

const Axios = axios.create({
    headers: {
        Authorization: JSON.parse(localStorage.getItem("token"))
    }
})
// Jobs apis

export const getAllJobs = (authtoken) => {
    return axios.get(`${url}/job`, {
        headers: {
            Authorization: authtoken,
        },
    })
}
export const getJob = (id, authtoken) => {
    return axios.get(`${url}/job/job-detail?id=${id}`, {
        headers: {
            Authorization: authtoken,
        },
    })
}
export const getAnalytics = (authtoken) => {
    return axios.get(`${url}/job/analytics`, {
        headers: {
            Authorization: authtoken,
        },
    });
}
export const addJob = (job, authtoken) => {
    return axios.post(`${url}/job`, job, {
        headers: {
            Authorization: authtoken,
        },
    });
}
export const updateJob = (job, authtoken) => {
    return axios.put(`${url}/job?id=${job.id}`, job, {
        headers: {
            Authorization: authtoken,
        },
    })
}
export const deleteJob = (id, authtoken) => {
    return axios.delete(`${url}/job?id=${id}`, {
        headers: {
            Authorization: authtoken,
        },
    })
}
export const deleteBulkJobs = (ids, authtoken) => {
    return axios.delete(`${url}/job/bulk-delete`, ids, {
        headers: {
            Authorization: authtoken,
        },
    })
}

// get all dates with job

export const getTimelines = (authtoken) => {
    return axios.get(`${url}/job/timeline-dates`, {
        headers: {
            Authorization: authtoken,
        },
    })
}
export const filterBydates = (date, authtoken) => {
    return axios.get(`${url}/job/filter-by-date?date=${date}`, {
        headers: {
            Authorization: authtoken,
        },
    })
}
//technicians apis

export const getAllTechnicians = (authtoken) => {
    return axios.get(`${url}/technician`, {
        headers: {
            Authorization: authtoken,
        },
    })
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

export const getAllApartments = (authtoken) => {
    return axios.get(`${url}/apartment`, {
        headers: {
            Authorization: authtoken,
        },
    })
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

// image apis

export const getImages = (jobId, authtoken) => {
    return axios
        .get(`${url}/upload/get-images?jobId=${jobId}`, {
            headers: {
                Authorization: authtoken,
            },
        })
}

export const uploadImages = (jobId, imagesForm, authtoken) => {
    return axios
        .patch(`${url}/upload/update-images?jobId=${jobId}`, imagesForm, {
            headers: {
                "Authorization": authtoken,
                "Content-Type": "multipart/form-data",
            },
        })
}

export const deleteImage = (jobId, imageName, authtoken) => {
    return axios
        .delete(`${url}/upload/delete-image?jobId=${jobId}&imageName=${imageName}`, {
            headers: {
                Authorization: authtoken,
            },
        })
} 