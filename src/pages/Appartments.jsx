import React, { useState } from 'react'
import AppartmentTable from "../components/AppartmentTable"
import AppartmentModal from "../components/AppartmentModal"
import DeleteModal from '../components/DeleteModal'
function Appartments() {
    const [openModal, setopenModal] = useState(false)
    const [appartmentToUpdate, setAppartmentToUpdate] = useState(null)
    const [appartmentToDelete, setAppartmentToDelete] = useState(null)
    const [openDeleteModal, setDeleteModal] = useState(false)
    return (
        <>
            {
                openModal && <AppartmentModal setModal={setopenModal} modal={openModal} setAppartmentToUpdate={setAppartmentToUpdate} appartmentToUpdate={appartmentToUpdate} />
            }
            {
                openDeleteModal && <DeleteModal setModal={setDeleteModal} itemToDelete={appartmentToDelete} setItemToDelete={setAppartmentToDelete} itemType={"apartment"} />
            }
            
   
        <div className='w-full bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10'>
            <div className='flex justify-between mx-auto px-6'>
                <div></div>
                <button type='button' onClick={() => setopenModal(true)} className="focus:ring-2  focus:ring-offset-2 focus:ring-indigo-600 mt-4  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded ">
                    <p className="text-sm font-medium leading-none text-white">Add Appartments</p>
                </button>

            </div>
                <AppartmentTable setDeleteModal={setDeleteModal} setModal={setopenModal} setAppartmentToUpdate={setAppartmentToUpdate} setAppartmentToDelete={setAppartmentToDelete} />
        </div>
        </>
    )
}

export default Appartments