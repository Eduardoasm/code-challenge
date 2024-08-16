import React from 'react';
import { fetchSecretFiles } from '../redux/actions-files';
import { useDispatch, useSelector } from 'react-redux'

export function FilesTable() {
  const dispatch = useDispatch();

  const secretFiles = useSelector(state => state.secretFiles)
  const transformData = (data) => {
  return data.flatMap(fileData =>
    fileData.lines.map(line => ({
      file: fileData.file,
      text: line.text,
      number: line.number,
      hex: line.hex
    }))
  );
};
  const transformedData = secretFiles?.length ? transformData(secretFiles) : []

  React.useEffect(()=> {
    if (!secretFiles.length) {
      dispatch(fetchSecretFiles())
    }
  },[dispatch])

  const fileHeaders = ["File Name", "Text", "Number", "Hex"]

  return(
    <>
    {
      transformedData.length
      ? 
      <div class="p-5 d-flex align-items-center justify-content-center">
        <table class="table table-striped w-75 table-bordered">
          <thead style={{ borderBottomWidth: '3px', borderBottomColor: '#343a40', borderBottomStyle: 'solid' }}>
            <tr>
              {
                fileHeaders.map((header) => (
                  <th scope="col" style={{ padding: '15px 10px' }}>{header}</th>
                ))
              }
            </tr>
          </thead>
          <tbody> 
            {
              transformedData.map((file) =>  (
                <tr>
                  <td>{file.file}</td>
                  <td>{file.text}</td>
                  <td>{file.number}</td>
                  <td>{file.hex}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      :
        <div class="p-5 d-flex align-items-center justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      }
    </>
  )
}

export default FilesTable;