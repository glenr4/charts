import { FunctionComponent } from "react";

interface ImportProps {
    callback: (text: string) => void
}

// https://dev.to/ilonacodes/frontend-shorts-how-to-read-content-from-the-file-input-in-react-1kfb
const ImportFromFile: FunctionComponent<ImportProps> = ({ callback }) => {
    let fileReader: FileReader;

    const handleFileRead = () => {
        if (fileReader.result) callback(fileReader.result as string);
    };

    const handleFileChosen = (file: Blob) => {
        fileReader = new FileReader();
        fileReader.onloadend = handleFileRead;
        fileReader.readAsText(file);
    };

    return <div className='read-file'>
        <input
            type='file'
            id='file'
            className='input-file'
            accept='.csv'
            onChange={e => {
                if (!e.target.files) return;

                handleFileChosen(e.target.files[0])
            }}
        />
    </div>;
};
export default ImportFromFile;