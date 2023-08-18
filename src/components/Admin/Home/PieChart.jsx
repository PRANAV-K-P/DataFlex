import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = () => {
  const { userData } = useSelector((state) => state.admin);
  const labSet = new Set(userData.map((data) => data.gender));
  const lab = Array.from(labSet);

  const genderCounts = lab.map(
    (gender) => userData.filter((data) => data.gender === gender).length
  );
  const [allData, setAllData] = useState({
    labels: lab,
    datasets: [
      {
        label: "Users genders",
        data: genderCounts,
        backgroundColor: ["green", "blue", "red"],
      },
    ],
  });

  return <Pie data={allData} />;
};

export default PieChart;
