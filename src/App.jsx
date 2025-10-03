
import './App.css'
import Personalexpense from './components/Personalexpense'
import { useState,useEffect } from 'react'
import { Inputformcontext } from './contexts/Formcontext'
import Tableofexpense from './components/Tableofexpense';
import Chartpage from './components/Chartpage';

function App() {
  // state to store expense data 
  const [data,setdata]=useState([]);
  // state to select page 
  const [page,setpage]=useState("form");

  // Recover data on first download from localstorage 
  useEffect(()=>{
   const storeddata=JSON.parse(localStorage.getItem("mydata")) || [];
   setdata(storeddata)
  },[]);


  // saving data in localstorage
  useEffect(()=>{
 localStorage.setItem("mydata",JSON.stringify(data))
  },[data]);

  return (
    <>
    <div>
      {/* we use usecontext to share data between pages */}
      <Inputformcontext.Provider value={{data,setdata,setpage}}>

     {page==="form" &&  <Personalexpense/>} 
      {page ==="table" &&  <Tableofexpense/>}
      {page==="chart" && <Chartpage/>}
      </Inputformcontext.Provider>
      
    </div>

  
  
    </>
  )
}

export default App
