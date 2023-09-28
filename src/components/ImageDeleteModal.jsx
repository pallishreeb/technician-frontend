/** @format */

import React from "react";
import { deleteImage } from "../networkCalls";
import { toast } from "react-toastify";
import { useAuthApi } from "../context/authContext/authProvider";
const DeleteImageModal = ({
  setModal,
  jobId,
  imageName,
  imageUrls,
  setSelectedImage,
  setImageUrls,
}) => {
  const { state: authState } = useAuthApi();
  const deleteImageFnc = () => {
    deleteImage(jobId, imageName, authState?.token)
      .then((response) => {
        const newImages = imageUrls.filter((img) => img !== imageName);
        setSelectedImage(newImages[0]);
        setImageUrls(newImages);
        console.log("response from delete", response);
        setModal(false);
        toast.success(response?.data?.message);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
      });
  };
  return (
    <div class="bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 flex justify-center items-center absolute top-10 right-0 bottom-0 left-0 lg:top-20">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-slate-500">
          Do You Want To Delete This Image
        </h1>
        <button
          onClick={() => setModal(false)}
          class="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={deleteImageFnc}
          class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default DeleteImageModal;
