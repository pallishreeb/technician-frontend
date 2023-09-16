/** @format */

import React from "react";
import { DELETE_TECHNICIAN, DELETE_APARTMENT } from "../context/constansts";
import { deleteTechnician, deleteApartment } from "../networkCalls";
import { useTaskApi } from "../context/taskContext/taskProvider";
import { toast } from "react-toastify";
const DeleteModal = ({
  setModal,
  modal,
  itemType,
  itemToDelete,
  setItemToDelete,
}) => {
  const { dispatch } = useTaskApi();

  const handleDelete = async () => {
    try {
      if (!itemType || !itemToDelete) {
        setModal(false);
        return;
      }
      if (itemType === "technician") {
        deleteTechnician(itemToDelete.id).then(() => {
          dispatch({ type: DELETE_TECHNICIAN, payload: itemToDelete.id });
        });
      } else if (itemType === "apartment") {
        deleteApartment(itemToDelete.id).then(() => {
       dispatch({ type: DELETE_APARTMENT, payload: itemToDelete.id });
        });
      }

      toast.success("Item Deleted");
      setItemToDelete(null);
      setModal(false);
    } catch (error) {
        toast.error(
          error?.response?.data?.message ||
            "Something Went Wrong, Please Try Later"
        );
      console.log(error);
    }
  };
  return (
    <div class="bg-slate-800 bg-opacity-50 transition duration-150 ease-in-out z-10 flex justify-center items-center absolute top-10 right-0 bottom-0 left-0 lg:top-0">
      <div class="bg-white px-16 py-14 rounded-md text-center">
        <h1 class="text-xl mb-4 font-bold text-slate-500">
          Do You Want To Delete This Item
        </h1>
        <button
          onClick={() => setModal(false)}
          class="bg-red-500 px-4 py-2 rounded-md text-md text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={handleDelete}
          class="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
