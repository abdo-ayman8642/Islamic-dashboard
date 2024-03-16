import React from 'react';
import MuiButton from '../MuiButton';
import { log } from 'console';

interface Props {
    fileUrl: string;
    fileName?: string;
}

const DownloadFile: React.FC<Props> = ({ fileUrl, fileName }) => {
    const handleDownload = () => {
        try {
 
            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', fileName!);
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err: any) {
            console.log(err);

        }
    };


    return (
        <MuiButton onClick={handleDownload} variant="outlined" color="primary">
            Download Task
        </MuiButton>
    );
};

export default DownloadFile;