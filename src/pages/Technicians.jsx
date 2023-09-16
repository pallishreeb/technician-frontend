import React, { useState, useEffect } from 'react'
import TechnicianTable from "../components/TechnicianTable"
import TechnicianModal from "../components/TechnicianModal"
import DeleteModal from '../components/DeleteModal'
function Technicians() {
  const [openModal, setopenModal] = useState(false)
  const [technicianToUpdate, setTechnicianToUpdate] = useState(null)
  const [technicianToDelete, setTechnicianToDelete] = useState(null)
  const [openDeleteModal, setDeleteModal] = useState(false)
  return (
    <>
      {
        openModal && <TechnicianModal setModal={setopenModal} modal={openModal} setTechnicianToUpdate={setTechnicianToUpdate} technicianToUpdate={technicianToUpdate} />
      }
      {
        openDeleteModal && <DeleteModal setModal={setDeleteModal} itemToDelete={technicianToDelete} setItemToDelete={setTechnicianToDelete} itemType={"technician"} />
      }

    <div className=' w-full bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10'>
      <div className='flex justify-between mx-auto px-6'>
       <div></div>
        <button type='button' onClick={() => setopenModal(true)} className="focus:ring-2  focus:ring-offset-2 focus:ring-indigo-600 mt-4  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded ">
          <p className="text-sm font-medium leading-none text-white">Add Technician</p>
        </button>
        
    </div>
        <TechnicianTable setDeleteModal={setDeleteModal} setModal={setopenModal} setTechnicianToUpdate={setTechnicianToUpdate} setTechnicianToDelete={setTechnicianToDelete} />
    </div>
    </>
  )
}

export default Technicians