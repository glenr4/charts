// Converts CSV data into this format for Toast UI library
// https://github.com/nhn/tui.chart
//  {
// categories: ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov'],
// series: [
//     {
//         name: 'Budget',
//         data: [5000, 3000, 5000, 7000, 6000, 4000],
//     },
//     {
//         name: 'Income',
//         data: [8000, 1000, 7000, 2000, 5000, 3000],
//     },
// ],
// };
// Note: assumed format of CSV columns is: xSeries, ySeries0, ySeries1...
interface series {
    name: string, data: number[]
}

interface ToastUIData {
    categories: string[],
    series: series[]
}

const csv2ToastUIData = (csv: string): ToastUIData => {
    var lines = csv.split("\n");

    var seriesHeaders: string[] = lines[0].split(",");

    var xSeries = [];
    var ySeries: [number[]] = [[]];
    // Append arrays into ySeries on top of the initial array
    // and skipping over the first column
    for (var k = 0; k < seriesHeaders.length - 2; k++) {
        ySeries.push([]);
    }

    for (var i = 1; i < lines.length; i++) {
        var line = lines[i].split(",");
        xSeries.push(line[0]);

        for (var j = 0; j < seriesHeaders.length - 1; j++) {
            ySeries[j].push(parseFloat(line[j + 1]));
        }
    }

    var series: series[] = [];
    for (var m = 1; m < seriesHeaders.length; m++) {
        series.push({ name: seriesHeaders[m], data: ySeries[m - 1] });
    }

    return { categories: xSeries, series };
}
export default csv2ToastUIData;
