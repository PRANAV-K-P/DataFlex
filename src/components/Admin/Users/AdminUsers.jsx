import React, { useEffect, useState } from "react";
import { bearer } from "../../../utils/constants";
import axiosInstance from "../../../api/axiosInstance";

const AdminUsers = () => {
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState("");
  const [totalPage, setTotalPage] = useState("");
  const [userData, setUserData] = useState([]);

  const getData = async () => {
    try {
      let response = await axiosInstance.get("/admin/users", {
        headers: {
          Authorization: `${bearer} ${JSON.parse(
            localStorage.getItem("adminToken")
          )}`,
        },
        params: {
          page,
          sortBy,
          filterBy,
        },
      });
      if (response.data) {
        const res = response.data;
        const totalP = Math.ceil(res.total / 5);
        setTotalPage(totalP);
        setUserData(res.users)
      }
    } catch (err) {}
  };

  useEffect(() => {
    getData();
  }, [page, sortBy, filterBy]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="px-2 lg:px-28 pt-24">
      <div className="w-full h-[345px] ">
        <div className="w-full flex flex-row mb-5 shadow-xl border border-gray-200 px-4">
          <div className="radio-div w-2/5">
            <h2 className="text-2xl font-medium">Filter by Gender</h2>
            <div className="d-flex justify-around ">
              <label className="inline-flex items-center mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  // checked={gender === "male"}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="text-primary-600 form-radio focus:ring-primary-600"
                />
                <span className="ml-2 text-lg font-medium">Male</span>
              </label>
              <label className="inline-flex items-center mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  // checked={gender === "female"}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="text-primary-600 form-radio focus:ring-primary-600"
                />
                <span className="ml-2 text-lg font-medium ">Female</span>
              </label>
              <label className="inline-flex items-center mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  // checked={gender === "other"}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="text-primary-600 form-radio focus:ring-primary-600"
                />
                <span className="ml-2 text-lg font-medium ">Other</span>
              </label>
            </div>
          </div>

          <div className="drop-div w-1/2 flex items-center">
            <h2 className="text-2xl font-medium">Sort by: </h2>
            <div className="relative w-full lg:max-w-sm">
              <select
                className="w-full p-2.5 text-black font-medium bg-gray-200 border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">Name</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* ... */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-xl text-center">
            <th>S.No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((Data, index) =>  <tr
            key={Data._id}
             className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center">
            <td className="text-lg font-medium p-4">{index + 1}</td>
            <td className="text-lg font-medium p-4">{Data.name}</td>
            <td className="text-lg font-medium p-4">{Data.email}</td>
            <td className="text-lg font-medium p-4">{Data.gender}</td>
          </tr>
          )}
          
        
        </tbody>
      </table>

      <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {/* ... */}
        </span>
        <ul className="inline-flex -space-x-px text-sm h-8">
        {page > 1 && (
              <li>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
            )}
          {Array.from({ length: totalPage }).map((_, i) => (
              <li key={i}>
                <button
                  onClick={() => handlePageChange(i + 1)}
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    page === i + 1
                      ? 'text-blue-700 bg-blue-50 hover:bg-blue-100'
                      : 'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                  } `}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            {page < totalPage && (
              <li>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </li>
            )}
        </ul>
      </nav>
    </div>



      </div>
    </div>
  );
};

export default AdminUsers;
