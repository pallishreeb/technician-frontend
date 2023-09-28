/** @format */

import React, { useEffect, useRef, useState } from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaInfoCircle,
  FaArrowLeft,
  FaSpinner,
  FaUpload
} from "react-icons/fa";
import { BsFileText, BsBuilding } from "react-icons/bs";
import { AiOutlineTag } from "react-icons/ai";
import { AiOutlineMail } from "react-icons/ai";
import { useAuthApi } from "../context/authContext/authProvider";
import { useNavigate, useParams } from "react-router-dom";
import { imgUrl } from "../config";
import { getImages, getJob, uploadImages } from "../networkCalls";
import { toast } from "react-toastify";
import DeleteImageModal from "../components/ImageDeleteModal";
function JobDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state: authState } = useAuthApi();
  const [jobDetails, setJobDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const fileInputRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const getJobDetails = async () => {
    setLoading(true);
    getJob(id, authState?.token)
      .then((res) => {
        setJobDetails(res?.data);

        setLoading(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        setLoading(false);
        console.log(error);
      });
  };
  const getImagesFnc = async () => {
    getImages(id, authState?.token)
      .then((res) => {
        if (res.data.imageUrls.length > 0) {
          setImageUrls(res.data.imageUrls);
          setSelectedImage(res.data.imageUrls[0]);
          console.log(imageUrls);
        } else {
          setImageUrls([]);
          setSelectedImage(null);
        }
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
        console.error("Error fetching images:", error);
      });
  };
  useEffect(() => {
    getJobDetails();
    getImagesFnc();
  }, [id]);

  const getStatusColor = () => {
    switch (jobDetails?.status) {
      case "Assigned":
        return "bg-green-300 text-black";
      case "Inprogress":
        return "bg-orange-400 ";
      case "Rescheduled":
        return "bg-yellow-400 text-black";
      case "Completed":
        return "bg-green-700 text-white";
      case "Cancelled":
        return "bg-red-600 text-white";
      default:
        return "text-black bg-slate-200";
    }
  };
  if (loading === true)
    return (
      <div class=" relative flex justify-center items-center mt-4">
        <FaSpinner className="w-1/6 h-1/6 animate-spin text-purple-500" />
      </div>
    );
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    uploadImages(id, formData, authState?.token)
      .then((response) => {
        setImages([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        const newImageURls = response.data.newImageUrls;
        setImageUrls([...newImageURls]);
        setSelectedImage(newImageURls[newImageURls.length - 1]);
        setSubmitting(false);
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
      });
  };
  return (
    <div className="bg-gray-100 min-h-screen p-0 md:p-0">
      <div className="container mx-auto p-2 md:p-4">
     
        <button
          onClick={() => navigate(-1)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md flex items-center space-x-2"
        >
          <FaArrowLeft />
          <span>Go Back</span>
        </button>
        <div className="bg-white rounded-lg shadow-lg p-5 md:p-8 mt-8 lg:mt-0 lg:mx-auto lg:w-7/12 hover:shadow-xl transition duration-300 relative ">
          <h1 className="text-xl font-semibold">{jobDetails?.title}</h1>
          <p className="text-gray-500">{jobDetails?.description || "NA"}</p>
          <div className="flex items-center mt-4">
            <FaUser className="text-gray-400 mr-2" />
            <p className="text-gray-600">
              {jobDetails?.technician_name || "NA"}
            </p>
          </div>
          <div className="flex items-center mt-4">
            <AiOutlineMail className="text-gray-400 mr-2" />
            <p className="text-gray-600">
              {jobDetails?.technician_email || "NA"}
            </p>
          </div>
          <div className="flex items-center mt-2">
            <FaInfoCircle className="text-gray-400 inline-block mr-2" />

            <p className={`text-sm rounded-full py-1 px-3 ${getStatusColor()}`}>
              {jobDetails?.status}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <BsFileText className="text-gray-400 inline-block mr-2" />
            <p className="text-gray-600">Note: {jobDetails?.note || "NA"}</p>
          </div>
          <div className="mt-4 flex items-center">
            <FaCalendarAlt className="text-gray-400 mr-2" />
            <p className="text-gray-700">
              Due Date: {jobDetails?.timeline || "NA"}
            </p>
          </div>
          <div className="mt-4 flex items-center">
            <BsBuilding className="text-gray-400 inline-block mr-2" />
            <p className="text-gray-700">
              Apartment: {jobDetails?.apartment_name || "NA"},{" "}
              {jobDetails?.apartment_location || "NA"}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              <AiOutlineTag className="text-gray-400 inline-block mr-2" />
              Responsibilities:
            </p>
            {jobDetails?.responsibilities?.length > 0 ? (
              <ol className="list-decimal ml-6">
                {jobDetails?.responsibilities?.map((responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                ))}
              </ol>
            ) : (
              <b>NA</b>
            )}
          </div>

          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {imageUrls?.length > 1 &&
              imageUrls?.map((imageUrl, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(imageUrl)}
                  className={`w-10 h-10 rounded-full overflow-hidden focus:outline-none ${
                    selectedImage === imageUrl
                      ? "border-2 border-indigo-500"
                      : ""
                  }`}
                >
                  <img
                    src={imgUrl + imageUrl}
                    alt={`thumb ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
          </div>
          {/* Display selected image */}
          {deleteModalShow && (
          <DeleteImageModal
            setModal={setDeleteModalShow}
            jobId={id}
            imageName={selectedImage}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            setSelectedImage={setSelectedImage}
          />
        )}
          {selectedImage !== null && (
            <div className="mt-3 relative ">
              <div
                className="w-full h-64  sm:h-80 md:h-90  xl:h-120 bg-cover bg-center rounded"
                style={{ backgroundImage: `url(${imgUrl + selectedImage})` }}
              />
              {/* Delete button */}
              <button
                onClick={() => setDeleteModalShow(true)}
                className="absolute top-2 right-2 bg-red-500 text-white py-2 px-4 rounded-md focus:outline-none"
              >
                Delete
              </button>
            </div>
          )}

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="flex flex-col items-start">
            
              <label className="mb-2">Upload Images:</label>
              <div className="flex flex-col md:flex-row items-start">
                <input
                  type="file"
                  multiple
                  onChange={(e) => setImages(e.target.files)}
                  ref={fileInputRef}
                  className="mb-2 md:mr-2"
                />
                <button
                  type="submit"
                  className={` text-white py-2 px-4 rounded-md  ${
                    images?.length === 0 || submitting
                      ? "bg-indigo-500 cursor-not-allowed"
                      : "bg-indigo-700 cursor-pointer"
                  }`}
                  disabled={images?.length === 0 || submitting}
                >
                  <FaUpload className="text-white inline-block mr-2" />
                  Upload
                </button>
              </div>
            </form>
          </div>
          <button
            onClick={() => navigate(`/edit-job/${jobDetails?.id}`)}
            className="bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center mt-6"
          >
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
