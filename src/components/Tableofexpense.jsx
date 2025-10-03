
import { Inputformcontext } from '../contexts/Formcontext';
import { useContext ,useState} from 'react';


export default function Tableofexpense(){
// extract data from context
  const {data,setpage,setdata}=useContext(Inputformcontext)
  // state to filter as type
   const [filtertype,setfiltertype]=useState("");
  
  
  // array to save filtered data
   const filtereddata=data.filter((item)=>{
    return(
      (filtertype === "" || item.category === filtertype)
    )
   })
  
   // calculate total sum  of all expense
   const totalamount=data.reduce((sum,item)=>sum + Number(item.amount),0)
   
   // function to reset all data
   const resetdata=()=>{
    if(window.confirm("are you sure fromdelete data"))
      setdata([]);// emptying array
    localStorage.removeItem("mydata");// delete from local storage
   }

   // function to delete expense :
   const deleteexpense =(index)=>{
    if(window.confirm("do you want to delete expense")){
      //create new copy of data without deleted item
      const updateddata=data.filter((item,i)=> i!==index);
      setdata(updateddata);//update state
      localStorage.setItem("mydata",JSON.stringify(updateddata));//update localstorage
    }
   }

  return(
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginLeft:"450px",border:"3px solid black",width:"60%",padding:"10px"}}>

          <button onClick={()=>setpage("form")} style={{marginBottom:"12px",backgroundColor:"pink"}}>back to form</button>{/* go to page form*/}

          <button onClick={()=>setpage("chart")} style={{marginBottom:"12px",backgroundColor:"pink"}}>showdraw</button> {/* go to page chart*/}

          <button onClick={resetdata} style={{marginBottom:"12px",backgroundColor:"pink"}}>reset data</button>{/*reset all data */}

          <h3>filter as category</h3>

          <input value={filtertype}  onChange={(e)=>setfiltertype(e.target.value)}  />

          <h2 >Table Of Expenses</h2>

          <table  style={{width:"80%",textAlign:"center",border:"1px solid black"}}>
             <thead>
              <tr style={{background:"pink"}}>
                <th >name of expense</th>
                <th >amount</th>
                <th >category</th>
                <th >date</th>
                <th>Delete</th>
              </tr>
             </thead>
             <tbody  >
                {filtereddata.map((item,i)=>(
                 <tr key={i} style={{background:"white"}}   >
                  <td style={{border:"1px solid black"}}>{item.name}</td>
                  <td style={{border:"1px solid black"}}>{item.amount}</td>
                  <td style={{border:"1px solid black"}}>{item.category}</td>
                  <td style={{border:"1px solid black"}}>{item.date}</td>
                  <td style={{border:"1px solid black"}}><button onClick={()=>deleteexpense(i)}
                    style={{backgroundColor:"pink",color:"black",border:"none",padding:"5px"}}>delete</button></td>

                </tr>
                ))}
                
              
             </tbody>

             
          </table>
          <h4>total amount is : {totalamount}</h4>
          <button onClick={()=>setpage("chart")} style={{marginBottom:"12px",backgroundColor:"pink"}}>show expense of this month</button>
        </div>  
  )
}