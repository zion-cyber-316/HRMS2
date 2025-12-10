import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { useAuth } from "../../Context/AuthContext";

const MonthlyReports = () => {
  const { serverLink } = useAuth();
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7) // default current month
  );
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);

  const fetchMonthlyReport = async () => {
    try {
      const res = await axios.get(
        `${serverLink}/api/workerAttendance/monthly-summary?month=${month}`
      );
      console.log(res)

      if (res.data.success) {
        let sno = 1;
        const updatedData = res.data.data.map((item) => ({
          sno: sno++, 
          name: item.name,
          empId: item.empId,
          fathername: item.fathername,
          designation: item.designation,
          present: item.totalPresent,
          absent: item.totalAbsent,
          overtime: item.totalOvertime,
        }));

        setRecords(updatedData);
        setFilteredRecords(updatedData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMonthlyReport();
  }, [month]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = records.filter((r) =>
      r.name.toLowerCase().includes(value)
    );
    setFilteredRecords(filtered);
  };

  const columns = [
    { name: "S.No", selector: (row) => row.sno, width: "70px" },
    { name: "Worker Name", selector: (row) => row.name, sortable: true },
    { name: "Emp ID", selector: (row) => row.empId },
    { name: "Fathername", selector: (row) => row.fathername },
    { name: "Designation", selector: (row) => row.designation },
    {
      name: "Present",
      selector: (row) => row.present,
      sortable: true,
      width: "100px",
    },
    {
      name: "Absent",
      selector: (row) => row.absent,
      sortable: true,
      width: "100px",
    },
    {
      name: "Overtime (Hrs)",
      selector: (row) => row.overtime,
      sortable: true,
      width: "130px",
    },
  ];

  return (
    <div className="p-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold underline">
          Monthly Attendance Report
        </h2>
      </div>

      <div className="flex justify-between items-center mt-4">
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border px-3 py-1"
        />

        <input
          type="text"
          placeholder="Search worker"
          className="border px-3 py-1"
          onChange={handleSearch}
        />
      </div>

      <div className="mt-3">
        <DataTable columns={columns} data={filteredRecords} pagination />
      </div>
    </div>
  );
};

export default MonthlyReports;