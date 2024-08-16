import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/navBar';
import FilesTable from './components/filesTable';
import React from 'react';


function App() {
  const [search, setSearch] = React.useState("")
  return (
    <div className="App">
      <NavBar setSearch={setSearch} search={search}/>
      <FilesTable />
    </div>
  );
}

export default App;
