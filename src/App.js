import React, { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';

import {toast} from 'react-toastify';
import Loader from 'react-loader-spinner';

// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 

function App() {

  const [data , setData] = useState({})
  const [getDetail , setgetDetail] = useState({})
  const [previous , setPrevious] = useState(0)
  const [current , setCurrent] = useState(0)
  const [EventCLick , setEventCLick] = useState(false)
  const [next , setNext] = useState(0)
  const [isLoading, setIsLoading] = useState(false);




  const fetchInfo = () => {
    setIsLoading(true)
    const url  = "https://pokeapi.co/api/v2/pokemon"
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        console.log(d)
        setIsLoading(false)
        setData(d)

      })
      .catch(error => {
        notify()
        setIsLoading(false)

    })
  }


  useEffect(() => {
    fetchInfo();
  }, []);

  const  nextEvent =()=>{
    if(next < 19)
    {
      console.log(next)
      setNext(current + 1)
      setCurrent(current + 1)
    }
    else{
      alert("End")
    }
}
const  previousEvent =()=>{
    if(current > 0){
      console.log(previous)
      setPrevious(current - 1)
      setCurrent(current - 1)
    }
    else{
      alert("No more Data")
    }
  }
const  getDetails =()=>{

  setIsLoading(true)
  const url  =  data.results[current].url
  return fetch(url)
    .then((res) => res.json())
    .then((d) => {
      console.log(d)

      setgetDetail(d)
      setEventCLick(true)
      setIsLoading(false)
      
    })
    .catch(error => {
      notify()
      setIsLoading(false)
  })


  }
  const notify = ()=>{
 
    toast('Error')
}

  return (
    <div className="App">

      {isLoading ?
<Loader type="Puff" color="#00BFFF" height={100} width={100} />
:  ""

      }

      <h1 style={{ color: "green" }}>  FETCH API For pokemon</h1>
      <center>
        
        <p>Name : 
          {data.results &&
          data.results[current].name
        } 

        <button onClick={()=>getDetails()} style={{marginLeft : "30px"}}>Get Detail</button>
       </p>
       { EventCLick &&  getDetail ?
       <>
           <b>Detail
          </b>
        <p>Name : 
         {
           getDetail.name
         }
         

       </p>
        <p>Height : 
         {
           getDetail.height
         }
         

       </p>
        <p>Type : <br />  
         {
           getDetail.types.map((res,i)=>{
            return(
              <>
              <span>{i+1} ) {res.type.name}</span><br />
              </>
            )
           })
         }
         

       </p>
       </>
    
  : ""
       }
       <br />
       <br />
        <div>
          <button onClick={()=>previousEvent()}>Previous</button>
          <button onClick={()=>nextEvent()} style={{marginLeft : "30px"}}>Next</button>
        </div>
        {/* {data.map((dataObj, index) => {
          return (
            <div
              style={{
                width: "15em",
                backgroundColor: "#35D841",
                padding: 2,
                borderRadius: 10,
                marginBlock: 10,
              }}
            >
              <p style={{ fontSize: 20, color: 'white' }}>{dataObj.name}</p>
            </div>
          );
        })} */}
      </center>
    </div>
  );
}
export default App;
