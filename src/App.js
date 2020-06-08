import React,{useState} from 'react';
import {Modal} from './components/Modal';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    creditAmount: 0,
    payment_type: {},
    supportFiles: null
  });

  const handleSubmit = () => {
    console.log("handleSUbmit in parent called");
    console.log(data);
  }
  return (
    <div className="App">
        <button type="button" className="btn btn-primary" onClick={()=>setOpen(true) }>
            Launch demo modal
        </button>
        {
          open && (
            <Modal setOpen={setOpen} setData={setData} data={data} handleSubmit={handleSubmit} />
          )
        }
      
    </div>
  );
}

export default App;
