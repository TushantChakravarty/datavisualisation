import './App.css';
import React,{useRef,useEffect,useState} from 'react'
import * as d3 from 'd3'
import { scaleLinear } from 'd3';
import Data from './Data'
import Select from 'react-select'
import axios from 'axios';


const App = () => {
  const [Data3,setdat]=useState([])
useEffect(() => {
axios.get('http://127.0.0.1:5000/data')
.then(response => {

  const resp=response.data
setdat(resp)
console.log(Data3)


});
console.log(Data3)
  
}, [])
  var svg;
  const options = [
    { value: 'United States of America', label: 'United States of America' },
    { value: 'China', label: 'China' },
    { value: 'Russia', label: 'Russia' }
  ]
  const[data]=useState([Data[0].intensity,Data[0].relevance,Data[0].likelihood]);
  const [data2,setdata2]=useState()
  const [result,setresult]=useState([10,Data[0].relevance,Data[0].likelihood])
  const [result2,setresult2]=useState([Data[10]])
  const svgRef=useRef();
  const key='country';
  const [value,setvalue]=useState('');
const datahandle=(e)=>{
  setdata2(e.value)
   setvalue(`${data2}`);
   
   setresult(Data3.filter(d=>d[key]==value));
  
   
   
  }
  function click(){
    setresult2([result[10].intensity,result[10].relevance,result[10].likelihood])
  
    
  }
  try {
    useEffect((error) => {
   
      console.log(result)
      console.log(result2)
      console.log(Data3)
      const w=800;
      const h=500;
      const g=100;
       svg=d3.select(svgRef.current)
      .attr('width',w)
      .attr('height',h)
      .style('background','grey')
      .style('margin-top',50)
      .style('overflow','visible')
  
      const xScale=d3.scaleLinear()
       .domain([0,data.length-1])
       .range([0,w])
      
      const yScale=d3.scaleLinear()
      .domain([0,20])
      .range([h,0])
  
      const generateScaledLine=d3.line()
       .x((d,i)=>xScale(i))
       .y(yScale)
       .curve(d3.curveCardinal)
  
      
     svg.selectAll('.line')
      .data([result2])
      .join('path')
       .attr('d',d=>generateScaledLine(d))
       .attr('fill','none')
       .attr('stroke','black')
  
    const xAxis=d3.axisBottom(xScale) 
     .ticks(data.length)
     .tickFormat(i => i+1)
    const yAxis=d3.axisLeft(yScale)
     .ticks(5)
  
    svg.append('g')
     .call(xAxis)
     .attr('transform',`translate(0,${h})`)
  
    svg.append('g')
     .call(yAxis)
     function update2(data){
     
     }
    
     function update(data) {
  
      // Create the X axis:
      xScale.domain([0, d3.max(data, function(d) { return d }) ]);
      svg.selectAll(".myXaxis").transition()
        .duration(300)
        .call(xAxis);
    
      // create the Y axis
      yScale.domain([0, d3.max(data, function(d) { return d  }) ]);
      svg.selectAll(".myYaxis")
        .transition()
        .duration(300)
        .call(yAxis);
    
      // Create a update selection: bind to the new data
      var u = svg.selectAll(".lineTest")
        .data([data], function(d){ return d });
    
      // Updata the line
      u
        .enter()
        .append("path")
        .attr("class","lineTest")
        .merge(u)
        .transition()
        .duration(300)
        .attr("d", d3.line()
        .x((d,i)=>xScale(i))
        .y(yScale))
          .attr("fill", "none")
          .attr("stroke", "steelblue")
          .attr("stroke-width", 2.5)
          
    }
    
    }, [data,data2,result2,result])
    
  } catch (error) {
    console.log(error)
  }
  

  
  return (
    <div className='App' style={{display:'flex', flexDirection:'column', margin:'50px 50px 50px 50px'}}>
    Region<Select options={options} onChange={datahandle} />
    
    <svg ref={svgRef}></svg>
    <button onClick={click}> check</button>
    
    
    
    </div>
  )
}

export default App
