import React,{useState, useEffect} from 'react';


const Payment = ({setData, data}) => {
    const [checked, setChecked] = useState({name:"bank_transfer", value: false});
    const [checkedFlag, setCheckedFlag] = useState(false);
    
    useEffect(() => {
        if(checkedFlag){
            setData({...data, payment_type: checked});
        }
    }, [checked, checkedFlag]);

    const handleCheck = () => {
        setCheckedFlag(true);
        setChecked({ name:"bank_transfer", value: !checked.value});
    }
    return (
        <form className="mx-auto" style={{width:"160px"}}>
            <div className="form-check d-flex justify-content-between">
                <input className="form-check-input text-left" type="checkbox"
                 name={checked.name} defaultChecked={checked.value} onChange={handleCheck} />
                <label className="form-check-label" >Bank Transfer</label>
            </div>                     
        </form>
    )
}


const CreditInput = ({setData, data}) => {
    const [amt, setAmt] = useState(0);
    const [amtFlag, setAmtFlag] = useState(false);

    useEffect(() => {
        if(amtFlag){
            setData({...data,creditAmount: amt});
        }
    }, [amt, amtFlag])

    const handlechange = (e) => {
        setAmt(e.target.value);
        setAmtFlag(true);
    }
    return (
        <div className="d-flex justify-content-center flex-column">
            <h4>Add the credit</h4>
            <div className="input-group mb-3 w-25 my-4 mx-auto">
                {/* <input type="number" min="0" 
                    className="form-control focusl" 
                    value={amt} onChange={handlechange} 
                /> */}
                <input type="text" pattern="[0-9]*"
                    className="form-control focusl" 
                    value={amt} onChange={handlechange} 
                />
                <div className="input-group-append">
                   <span className="input-group-text">€</span>
                </div>
            </div>
        </div>
    )
}


const CreditSupportFile = ({setData, data}) => {
    const [file, setFile] = useState(null);
    const [fileflag, setFileflag] = useState(false);

    useEffect(() => {
        if(fileflag){
            setData({...data, supportFiles: file});
        }
        
    }, [fileflag, file])

    const handleChange = (e) => {
        setFileflag(true);
        setFile(e.target.files[0]);
    }
    return (
        <label className="btn btn-outline-secondary">
           <input type="file" name="file" defaultValue={file} onChange={handleChange} />
        </label>
    )
}


export const Modal = ({setOpen, setData, data, handleSubmit}) => {
    const [next, setNext] = useState(true);
    const [prev, setPrev] = useState(false);
    const [submit, setSubmit] = useState(false);

    const handleClose = () =>{
        setOpen(false)
    }

    const handleSubmitt = () => {
        console.log("inside modal...");
        handleSubmit();
    }
    return (
    <div className="popup border border-primary w-50 mx-auto">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="border border-primary" style={{margin:"0 auto"}}>Modal title</h5>
                <button type="button" className="close" onClick={handleClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                {
                    next && !prev && !submit && (
                        <CreditInput setData={setData} data={data} />
                    )
                }

                {
                    next && prev && !submit && (
                        <Payment setData={setData} data={data} />
                     )
                }

                {
                    !next && !prev && submit && (
                        <CreditSupportFile setData={setData} data={data} />
                     )
                }
            </div>
            <div className="modal-footer">
                {
                    next && !prev && !submit && (
                    <button type="button" className="btn btn-secondary" 
                        onClick={() => {
                            setNext(true);
                            setPrev(true);
                            setSubmit(false);
                        } }>
                        Next
                    </button>
                    )
                }
                {
                  next && prev && !submit  && (
                    <div>
                        <button type="button" className="btn btn-primary mr-3" 
                            onClick={() => {
                                setPrev(false);
                                setNext(true);
                                setSubmit(false)
                                } }>
                              Previous
                        </button>
                        <button type="button" className="btn btn-secondary" 
                            onClick={() => {
                                setPrev(false);
                                setNext(false);
                                setSubmit(true);
                            } }>
                            Next
                        </button>
                    </div>
                  )
                }

                {
                    !next && !prev && submit && (
                     <div>
                          <button type="button" className="btn btn-primary mr-3" 
                            onClick={() => {
                                setPrev(true);
                                setNext(true);
                                setSubmit(false)
                                } }>
                              Previous
                        </button>
                        <button type="button" className="btn btn-success" onClick={() => handleSubmitt() }>
                            Submit
                        </button>
                    </div>
                    )
                }
            </div>
        </div>
    </div>   
    )
}
