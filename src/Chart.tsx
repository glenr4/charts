import '@toast-ui/chart/dist/toastui-chart.min.css';
import { LineChart } from '@toast-ui/react-chart';
import ImportFromFile from './ImportFromFile';
import React, { useState } from 'react';
import csv2ToastUIData from './csv2ToastUIData';
import CalcEma from './CalcEMA';

const options = {
    chart: {
        width: 2000,
        height: 1000,
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

        const closeEma20 = CalcEma(result.series[3]['data'], 20);
        const closeEma50 = CalcEma(result.series[3]['data'], 50);
        const emaDiff = closeEma20.map(function (item, index) {
            return item - closeEma50[index];
        })
        // When emaDiff is increasing buy, when descreasing sell
        setData(
            {
                categories: result.categories,
                series: [
                    result.series[3],
                    { name: 'closeEma20', data: closeEma20 },
                    { name: 'closeEma50', data: closeEma50 },
                    { name: 'emaDiff', data: emaDiff },
                ]
            });
    }

    return !data
        ? <ImportFromFile callback={receiveCsvData} />
        : <LineChart data={data} options={options} />;
}


export default Chart;