import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
class App extends Component{
  bio(){
    alert("fun");
$.ajax({
  type: 'POST',
  url:"http://localhost:8080/BioTesting/test/test",
  contetType:"application/json",
  dataType:'json',
  async:false,
  success:function(data){
    console.log("bio Data",data);
    alert("success");
  },
  error:function(data){
    alert("error");
  }
});


  }
  render() {
    return(
      <div className="layout">
        <button onClick={()=>this.bio()}>Click   Me </button>
        </div>  
    );
  }
}
export default App;
