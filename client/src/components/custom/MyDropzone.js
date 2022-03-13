import React from 'react'
import { useDropzone } from 'react-dropzone'

function MyDropzone(props) {

    const onDrop = (filesToUpload) => {
        console.log(filesToUpload);
        
        return props.input.onChange(filesToUpload);
    }

    const onChange = async (filesToUpload) => {
        return props.input.onChange(filesToUpload);
    }

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const { meta: { error, touched }} = props;

    return (
        <div>
            <div className='center' style={{ border: '1px dotted', marginBottom: '5px' }} {...getRootProps()}>
                <input {...getInputProps()} onChange={e => onChange(e.target.files)} />
                <p> Drop or select your file(s)</p>
            </div>
            <div className='red-text'>
                {error}
            </div>
        </div>
    )
}

export default MyDropzone;