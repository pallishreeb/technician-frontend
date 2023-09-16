import React from 'react'

const Dropdown = ({setFilter}) => {
    
  return (
    <div className=" py-2 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
      <p>Filter By:</p>
      <select
        onChange={(e) => setFilter(e.target.value)}
        aria-label="select"
        className="focus:text-indigo-600 focus:outline-none bg-transparent ml-1"
      >
        <option className="text-sm text-indigo-800" value={"All Jobs"}>
          All Jobs
        </option>
        <option className="text-sm text-indigo-800" value={"Assigned Jobs"}>
          {" "}
          Assigned Jobs
        </option>
        <option className="text-sm text-indigo-800" value={"Pending Jobs"}>
          Pending Jobs
        </option>
        <option className="text-sm text-indigo-800" value={"Completed Jobs"}>
          Complted Jobs{" "}
        </option>
      </select>
    </div>
  );
}

export default Dropdown