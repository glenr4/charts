import '@toast-ui/chart/dist/toastui-chart.min.css';
import { LineChart } from '@toast-ui/react-chart';
import ImportFromFile from './ImportFromFile';
import React, { useState } from 'react';
import csv2ToastUIData from './csv2ToastUIData';

const options = {
    chart: {
        width: 1160,
        height: 650,
        title: 'Bitcoin (USD)',
    },
    yAxis: {
        title: 'Price',
    },
    xAxis: {
        title: 'Date',
    },
};

const Chart = () => {
    const [data, setData] = useState<{}>();

    const receiveCsvData = (csvData: string) => {
        const result = csv2ToastUIData(csvData);
        console.log(result);

        setData(result);
    }

    return !data
        ? <ImportFromFile callback={receiveCsvData} />
        : <LineChart data={data} options={options} />;
}


export default Chart;