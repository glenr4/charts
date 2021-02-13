// http://techslides.com/convert-csv-to-json-in-javascript
const csv2Array = (csv: string): object => {

    var lines = csv.split("\n");

    var result = [];

    var headers: string[] = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

        var line: { [string: string]: string } = {};
        var currentline: string[] = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            line[headers[j]] = currentline[j];
        }

        result.push(line);

    }

    return result;
}
export default csv2Array;
