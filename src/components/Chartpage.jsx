import { useContext } from "react";
import { Inputformcontext } from '../contexts/Formcontext';
import {Bar} from "react-chartjs-2";
import{
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from 'chart.js';

  // register special components of chart.js
ChartJS.register(CategoryScale,LinearScale, BarElement, Title, Tooltip, Legend );

export default function Chartpage(){
 // extract data from context
  const {data,setpage}=useContext(Inputformcontext);
// determain current month and current year
  const now=new Date();
  const currentMonth=now.getMonth() ;
  const currentYear=now.getFullYear();
// data filtering 
  const currentmonthdate=data.filter(item=>{
    if(!item.date) return false;
    const d = new Date(item.date);
    return d.getFullYear()===currentYear && (d.getMonth() === currentMonth)
  });
 //calculate total for each type
  const totalsbytype={};
  currentmonthdate.forEach(item =>{
  if (totalsbytype[item.category] ){
      totalsbytype[item.category]+=Number(item.amount)
    }
    else{
      totalsbytype[item.category] =Number(item.amount)
    }
  });
 // preparing data for graphing
  const chartdata={
    labels: Object.keys(totalsbytype),
    datasets:[{
        label:"Total expenses",
      data:Object.values(totalsbytype),
      backgroundColor:'rgba(75,192,192,0.6)' ,
      borderColor:"rgba(75,192,192,1)",
      borderWidth:1,
    }
    
    ]

  };

  const options ={
    responsive:true,
    plugins:{
      legend:{position:"top"},
      title:{display:true,text:"expenses as type (this month)"}
    }
  }
  return(
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",marginLeft:"500px"}}>
            <button onClick={()=>setpage("table") } style={{backgroundColor:"black",color:"white"}}>back to table</button>
            <h3>ُExpense chart</h3>
            <Bar data={chartdata} options={options}/>
          </div>
  )
}