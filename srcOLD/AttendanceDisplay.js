import React, { Component } from 'react';

import $ from 'jquery';
import ReactDOM from 'react-dom';
import './EmployeeMenuPage.css';
import CryptoJS from 'crypto-js';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';

import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import registerServiceWorker from './registerServiceWorker';


class AttendanceDisplay extends Component {


  constructor(data) {
    super(data)

    var today = new Date();
    var displayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state = {
      displayDate: displayDate,
      date: date,
      companyId: '',


    };
  }
  componentDidMount() {
    /*alert('componentDidMount');
    */
    var tab = '<thead><tr class="headcolor"><th>EMPID</th><th>EMP NAME</th><th>CHECK IN</th><th>CHECK OUT </th><th>STATUS </th><th>MOBIILE NO</th></tr></thead>';


    $.each(this.props.data, function (i, item) {
               /* alert(item);
               */ tab += '<tr class="success" ><td>' + item.employeeId + '</td><td>' + item.employeeName + '</td><td>' + item.checkIn + '</td><td>' + item.checkOut + '</td><td>' + item.status + '</td><td>' + item.mobileNo + '</td></tr>';
    });
    $("#tableHeadings").append(tab);

  }
  AuthorizeFunc() {

    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    this.state.employeeId = employeeId;
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
      employeeId: employeeId,
    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        companyId: this.state.companyId,
        employeeId: this.state.employeeId,
      }
      ),
      url: "http://localhost:8080/EmployeeAttendenceAPI/employee/supervisorAuthorization",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
                                  /*  console.log(data);

                                    alert(data);
                                   */ if (data == 0) {
          confirmAlert({
            title: 'SuperVisor Authorization',                        // Title dialog
            message: 'You have Successfully Authorized Attendence',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })
        } else {

          confirmAlert({
            title: 'SuperVisor Authorization',                        // Title dialog
            message: 'You have not Authorized Attendence',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm


          })
        }


        ReactDOM.render(
          <Router>
            <div>
              <Route path="/" component={EmployeeMenuHeader} />
              <Route path="/" component={AttendanceRegulationMenuPage} />
            
            </div>
          </Router>,
          document.getElementById('root'));
        registerServiceWorker();


      },
      error: function (data) {
                               /*  console.log('#####################error:################################'+data);
                               */  confirmAlert({
                        title: 'Server Error',                        // Title dialog
                        message: 'Server Error Try Again Later',               // Message dialog
                        confirmLabel: 'Ok',                           // Text button confirm
                                                  
                        
                         });                
                            

      },
    });


  }



  render() {

    return (

      <div className="container" >

        <h3 className="centerAlign" style={{ textAlign: "center" }}>ATTENDANCE</h3>
        <h4 className="centerAlign" style={{ textAlign: "center" }}>{this.state.displayDate}</h4>

        <div id="tableOverflow">
          <table class="table" id="tableHeadings">


          </table>

        </div>
        <div class="input-group-btn">

          <button type="button" class="btn btn-danger" onClick={() => this.AuthorizeFunc()} style={{ marginLeft: "20px", marginBottom: "70px", marginLeft: "auto", marginRight: "auto", marginTop: "20px", display: "table-row" }}>Authorize </button>

        </div>


      </div>
    );
  }

}

export default AttendanceDisplay;
