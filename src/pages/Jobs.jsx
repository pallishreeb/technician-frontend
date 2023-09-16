import React, { useState, useEffect } from 'react'
import { FaBriefcase, FaUsers, FaTasks, FaCheckCircle } from 'react-icons/fa'; // Importing SVG icons
import Dropdown from '../components/Dropdown'
import JobTable from '../components/JobTable';
import JobModal from "../components/JobModal"
import DeleteModal from '../components/DeleteModal';
import AnalyticsCard from '../components/AnalyticsCard';
function Jobs() {
  const [openModal, setopenModal] = useState(false)
  const [jobToUpdate, setJobToUpdate] = useState({})
   const [jobToDelete, setJobToDelete] = useState(null)
  const [openDeleteModal, setDeleteModal] = useState(false)
  // State to store data
  const [data, setData] = useState({
    totalJobs: 2,
    totalTechnicians: 10,
    totalAssignments: 2,
    totalCompleted:2
  });

  // // Fetch data (you can replace this with your API call)
  // useEffect(() => {
  //   // Simulate data fetching
 
  // }, []);
  const [filter, setFilter] = useState('all')
  return (
    <>
      {openModal && (
        <JobModal
          setModal={setopenModal}
          modal={openModal}
          setJobToUpdate={setJobToUpdate}
          jobToUpdate={jobToUpdate}
        />
      )}
      {openDeleteModal && (
        <DeleteModal
          setModal={setDeleteModal}
          itemToDelete={jobToDelete}
          setItemToDelete={setJobToDelete}
        />
      )}
      <div className="sm:px-6 py-4 w-full">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-6">
          {/* Card for Total Jobs */}
          <AnalyticsCard
            data={data.totalJobs}
            title={"Total Jobs"}
            color="text-blue-500"
          />
          {/* Card for Total Technicians */}
          <AnalyticsCard
            data={data.totalTechnicians}
            title={"Total Technicians"}
            color="text-indigo-500"
          />
          {/* Card for Total Job Assignments */}
          <AnalyticsCard
            data={data.totalAssignments}
            title={"Total Assignments"}
            color="text-purple-500"
          />

          {/* Card for Total Job Completed */}
          <AnalyticsCard
            data={data.totalCompleted}
            title={"Total Completed"}
            color="text-green-500"
          />
        
        </div>
        <div className="flex justify-between  mt-5  py-3 px-3 md:px-6 ">
          <Dropdown setFilter={setFilter} />
          <button
            type="button"
            onClick={() => setopenModal(true)}
            className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4  sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none outline-none rounded "
          >
            <p className="text-sm font-medium leading-none text-white">
              Add Job
            </p>
          </button>
        </div>

        <JobTable setDeleteModal={setDeleteModal} setModal={setopenModal} />
      </div>
    </>
  );
}

export default Jobs