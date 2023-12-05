import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

function PieChartOverallCorrect({ correct, used }) {
  const incorrect = used - correct;
  const correctPercentage = (correct / used) * 100;
  const incorrectPercentage = (incorrect / used) * 100;

  const labels = ['Correct', 'Incorrect'];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [correctPercentage, incorrectPercentage],
        backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)'],
        borderColor: ['rgba(0, 0, 255, 0.75)', 'rgba(255, 0, 0, 0.5)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
  };

  const chartStyle = {
    width: '30%',
    height: '30%',
    textAlign: 'center',
    margin: 'auto',
  };

  const h2Style = {
    fontSize: '20px',
    color: 'black',
  };

  return (
    <div className="pie-chart-container" style={chartStyle}>
      <h4 style={h2Style}>
        Cumulative Results: Correct Marks: {correct}
        <br /> Correct&nbsp; <span>{correctPercentage.toFixed(2)}%</span>
        <br /> Incorrect&nbsp;<span>{incorrectPercentage.toFixed(2)}%</span>
        <Pie data={data} options={options} />
      </h4>
    </div>
  );
}

export default PieChartOverallCorrect;

//import React from 'react';
//import { Pie } from 'react-chartjs-2';
//
//function PieChartOverallCorrect({ correct, used }) {
//  const incorrect = used - correct;
//
//  const labels = ['Correct', 'used'];
//
//  const data = {
//    labels: labels,
//    datasets: [
//      {
//        data: [correct, used],
//        backgroundColor: ['rgba(0, 0, 255, 1)', 'rgba(255, 0, 0, 1)'],
//        borderColor: ['rgba(0, 0, 255, 0.75)', 'rgba(255, 0, 0, 0.5)'],
//        borderWidth: 1,
//      },
//    ],
//  };
//
//  const options = {
//    plugins: {
//      legend: {
//        display: true,
//      },
//    },
//  };
//
//  const chartStyle = {
//    width: '30%',
//    height: '30%',
//    textAlign: 'center',
//    margin: 'auto',
//  };
//
//  const h2Style = {
//    fontSize: '20px',
//    color: 'black',
//  };
//
//  return (
//    <div className="pie-chart-container" style={chartStyle}>
//      <h4 style={h2Style}>
//        Piechart
//        <br /> Correct&nbsp; <span>{correct}</span>
//        <br /> used&nbsp;<span>{used}</span>
//        <Pie data={data} options={options} />
//      </h4>
//    </div>
//  );
//}
//
//export default PieChartOverallCorrect;
