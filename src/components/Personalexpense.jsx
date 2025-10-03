import './style.css'
import { useState } from 'react'
import { useContext, } from 'react';
import { Inputformcontext } from '../contexts/Formcontext';

export default function Personalexpense(){
  // extract data from context
  const {setdata,setpage}=useContext(Inputformcontext)
  // state to enter data to form
  const [inputform,setinputform]=useState({name:"",amount:"",category:"",date:""})
 
// update field values on typing
const handlechange=(e)=>{
setinputform({...inputform,[e.target.name]:e.target.value})
};

// function to send form
  function handlesubmit(event){
    event.preventDefault();
    setdata((prev)=>[...prev,inputform]);// add new data to array
    setinputform({name:"",amount:"",category:"",date:""}) ;//reset fields to empty
    setpage("table");// go to page "table"
   
   

  }



// variable to check form is not any input empty
  const btnisdisabled=
  inputform.name=="" || inputform.amount==""||inputform.category==""||inputform.date==""
 
  //variable 
  let btnclasses="";
  if(btnisdisabled){
      btnclasses="disabled"
  }

  return (

       <div style={{display:"flex",justifyContent:"center",alignItems:"center" ,flexDirection:"column"}}>
        
          <form  id='form1' style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}
            onSubmit={handlesubmit}>

            <h1 id='h11'>personal Expense Tracker</h1>
            
            <label  id="l1">Name of expense</label>
            <input type='text' name='name' value={inputform.name} onChange={handlechange}/>

            <label  id="l2">ِAmount</label>
            <input type='number' name='amount' value={inputform.amount} onChange={handlechange}/>

            <label  id="l3">Category</label>
            <select name='category' value={inputform.category} onChange={handlechange}>
              <option value="food">Food</option>
              <option value="trans">Transportation</option>
              <option value="invoices">invoices</option>
            </select>

            <label  id="l4" style={{marginTop:"20px"}}>Date</label>
            <input type="date" name='date'  value={inputform.date} onChange={handlechange}/>

            <button className={btnclasses}
            
             disabled={btnisdisabled}>submit</button>
          </form>
        
        
       </div>
  )
}