import axios from 'axios';

export const FETCH_SECRET_FILES = 'FETCH_SECRET_FILES';
export const FETCH_SECRET_FILE_BY_QUERY = 'FETCH_SECRET_FILE_BY_QUERY';

export function fetchSecretFiles(){
  return async function(dispatch){
    try{
      let { data } = await axios.get('http://localhost:3000/files/data')
      dispatch(
        {
          type: FETCH_SECRET_FILES,
          payload: data
        })
    }catch(error){
      console.log({error})
      throw new Error("error", error)        
}}}

export function fetchSecretFileByQuery(fileName){
  return async function(dispatch){
    try{
      let { data } = await axios.get(`http://localhost:3000/files/data?fileName=${fileName}`)
      dispatch(
        {
          type: FETCH_SECRET_FILES,
          payload: data
        })
    }catch(error){
      console.log({error})
      throw new Error("error", error)
}}}