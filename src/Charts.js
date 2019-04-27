

import React, {
  Component
} from 'react';
import {Pie,Bar,HorizontalBar,Doughnut,Bubble} from 'react-chartjs-2';
import CryptoJS from 'crypto-js' ;
 import $ from 'jquery';
import './EmployeeMenuPage.css';
import EmployeeMenuPage from './EmployeeMenuPage';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import EmployeeMenuHeader from './EmployeeMenuHeader';

import registerServiceWorker from './registerServiceWorker';

class Charts extends Component{

constructor(props){
   super(props);
   this.state={
    
    chartData:{
      labels :[ '#Employee','#Present','#Absent'] ,
      datasets:[
      {
        label:'Employee Attendance graph',
        
        backgroundColor:[
          'rgba(0, 102, 255,0.8)',
          
           'rgba(62, 172, 6,0.8)',
           'rgba(255,0,0,0.8)',
           'rgba(255,0,0,0.8)',
          
          
           
         ],
         hoverBackgroundColor: [
         'rgba(0, 102, 255,0.8)',
       
           'rgba(62, 172, 6,0.8)',
           'rgba(255,0,0,0.8)',
          'rgba(255,0,0,0.8)',
          
          
          ],
      }
    ]
    },

   }

}
	
  componentDidMount() {

  /*  console.log("chart vlue",this.state.chartData); 
     console.log("chart vlue", this.state.chartData.datasets[0].data);
      console.log("chart vlue", this.state.chartData);
  */    this.state.chartData.datasets[0].data[0]= this.props.data[0].noOfPermanentEmployee +this.props.data[0].noOfContractEmployee+this.props.data[0].noOfTemporaryEmployee;
      var total= this.props.data[0].noOfPermanentEmployee +this.props.data[0].noOfContractEmployee+this.props.data[0].noOfTemporaryEmployee;
      
      this.state.chartData.datasets[0].data[1]= this.props.data[1].permanentCountPresent + this.props.data[1].temporaryCountPresent + this.props.data[1].contractCountPresent;
      var present= this.props.data[1].permanentCountPresent + this.props.data[1].temporaryCountPresent + this.props.data[1].contractCountPresent;
      
      this.state.chartData.datasets[0].data[2]= this.props.data[2].permanentCountAbsent + this.props.data[2].temporaryCountAbsent+ this.props.data[2].contractCountAbsent; ;
      var absent= this.props.data[2].permanentCountAbsent + this.props.data[2].temporaryCountAbsent+ this.props.data[2].contractCountAbsent; ;


/* 
      this.state.chartData.datasets[0].data[4]= this.props.data[0].noOfContractEmployee;
      this.state.chartData.datasets[0].data[5]= this.props.data[1].contractCountPresent;
      this.state.chartData.datasets[0].data[6]= this.props.data[2].contractCountAbsent;
      this.state.chartData.datasets[0].data[7]= this.props.data[0].noOfTemporaryEmployee;
      this.state.chartData.datasets[0].data[8]= this.props.data[1].temporaryCountPresent;
      this.state.chartData.datasets[0].data[8]= this.props.data[2].temporaryCountAbsent;
      this.state.chartData.datasets[0].data[2]= this.props.data[1].permanentCountPresent; */
      
      this.setState(
      {
        chartData:this.state.chartData,
      });
      var tab;
      tab+='<thead><tr class="headcolor"style={{margin:"auto"}}/><th style={{textAlign:"center"}}>Chart Info</th></thead>';
            
      tab +='<tr class="success" ><td> Total Employee</td><td>' + total+ '</td></tr>';
       tab +='<tr class="success" ><td> Present</td><td>' + present+ '</td></tr>';
      tab +='<tr class="success" ><td> Absent</td><td>' + absent+ '</td></tr>';
      
      $("#summary").append(tab);


}


BackbtnFunc(){
  ReactDOM.render(
          <Router>
            <div>           
                   <Route path="/" component={EmployeeMenuHeader}/>
                   <Route path="/" component={EmployeeMenuPage}/>
                   
                           </div>
                                </Router>,
                                          document.getElementById('root'));
                                          registerServiceWorker();
                                      }   



  render() {
    return (
      <div className="container" style={{backgroundColor:"white"}}>
    <ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>


        <div className="chart"> 
        <Pie data={this.state.chartData} width={50} height={200} options={{
        maintainAspectRatio: false
    }}/>
        
        </div>
        <div id="tableOverflow" style={{
    marginTop: "10%",
    marginLeft: "20%",
    marginRight: "20%",
    marginBottom: "25%",
    }}>
        
        <table className="table" id="summary">
        
      
         </table>
        </div>
      </div>
    );
  }
}
export default Charts;