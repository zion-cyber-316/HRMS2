
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext';

const Viewworkersalary = () => {
  const [salaries, setSalaries] = useState([]);
  const { id } = useParams();
  const {serverLink} = useAuth()
  let sno = 1;

  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`${serverLink}/api/workersalary/find/${id}`);
      console.log(response.data)
      if (response.data.success) {
        setSalaries(response.data.salary || []);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchSalaries();
  }, []);

  return (
    <div className="overflow-x-auto p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Salary History</h2>
      </div>

      {salaries && salaries.length > 0 ? (
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
            <tr>
              <th className="px-6 py-3">S no</th>
              <th className="px-6 py-3">Salary</th>
              <th className="px-6 py-3">Pf</th>
              <th className="px-6 py-3">Advance</th>
              <th className="px-6 py-3">Others</th>
              <th className="px-6 py-3">Over-Time</th>
               <th className="px-6 py-3">Insentive</th>
              <th className="px-6 py-3">netSalary</th>
              <th className="px-6 py-3">Pay Date</th>
            </tr>
          </thead>

          <tbody>
            {salaries.map((salary) => (
              <tr key={salary._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-3">{sno++}</td>
               
                <td className="px-6 py-3">{salary.basicSalary}</td>
                <td className="px-6 py-3">{salary.pf}</td>
                <td className="px-6 py-3">{salary.advance}</td>
                <td className="px-6 py-3">{salary.others}</td>
                <td className="px-6 py-3">{salary.overtime}</td>
                <td className="px-6 py-3">{salary.insentive}</td>
                <td className="px-6 py-3">{salary.netSalary}</td>
                <td className="px-6 py-3">
                  {salary.payDate ? new Date(salary.payDate).toLocaleDateString() : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No records</div>
      )}
    </div>
  );
};

export default Viewworkersalary;
