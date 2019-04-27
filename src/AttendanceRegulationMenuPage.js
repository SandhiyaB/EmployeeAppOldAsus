
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import EmployeeMenuHeader from './EmployeeMenuHeader';

import AttendanceRegulation from './AttendanceRegulation';
import AttendanceDisplay from './AttendanceDisplay';
import EmployeeMenuPage from './EmployeeMenuPage';
import AttendanceRegulationSupervisor from './AttendanceRegulationSupervisor';


import './Maintenance.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import LeaveManagement from './LeaveManagement';
import CryptoJS from 'crypto-js';

class AttendanceRegulationMenuPage extends Component {

  constructor() {
    super()
    this.state = {

    }
  }




  AttendanceFunc() {
    /*alert("ATTENDANCE");
  */
    var today = new Date();
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.date = today;
    this.setState({

      date: today,

    });
    /*alert(this.state.date);
    */
    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });

    $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        companyId: this.state.companyId,

      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/employee/attendance",
      contentType: "application/json",
      dataType: 'json',
      async: false,

      success: function (data, textStatus, jqXHR) {
        /*console.log(data);
        alert(data);
*/
        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={EmployeeMenuHeader} />

              <Route path="/" component={AttendanceRegulationMenuPage} />

              <Route exact path="/" component={() => <AttendanceDisplay data={data} />} />

            </div>
          </Router>, document.getElementById('root'));
      },
      error: function (data) {
       /* console.log('#####################error:################################' + data);
       */confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm


        });

      },

    });
  }

  AttendanceRegulationFunc() {


    var permission = JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('Permissions'), "shinchanbaby").toString(CryptoJS.enc.Utf8));

    var flag = 1;//false
    var i = permission.length;
	/*console.log(i);
	*/$.each(permission, function (i, item) {
      /*console.log(item.permission);
    */
      if (item.permission == "supervisorAuthority") {
        flag = 0;//true
		/*console.log(flag);
	*/}
    });

    if (flag == 0) {


      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });


      $.ajax({
        type: 'POST',
        data: JSON.stringify({

          companyId: this.state.companyId,

        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/EmployeeList",
        contentType: "application/json",
        dataType: 'json',
        async: false,
        crossDomain: true,

        success: function (data, textStatus, jqXHR) {

          ReactDOM.render(
            <Router>
              <div>
                <Route path="/" component={EmployeeMenuHeader} />
                <Route path="/" component={AttendanceRegulationMenuPage} />

                <Route path="/" component={AttendanceRegulationSupervisor} />
              </div>
            </Router>,
            document.getElementById('root'));
          registerServiceWorker();

        },
      });

    }
    else {

      ReactDOM.render(
        <Router>
          <div>
            <Route path="/" component={EmployeeMenuHeader} />
            <Route path="/" component={AttendanceRegulationMenuPage} />

            <Route path="/" component={AttendanceRegulation} />
          </div>
        </Router>,
        document.getElementById('root'));
      registerServiceWorker();
    }
  }
  componentDidMount() {
    var self = this;
    self.AttendanceFunc();
  }
  

  LeaveRequest() {



    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={AttendanceRegulationMenuPage} />

          <Route path="/" component={LeaveManagement} />
        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();


  }

  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={EmployeeMenuPage} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }





  render() {
    return (



      <div className="container">
        <ul class="previous disabled"
          style={{
            float: "none",
            display: "inline-block",
            marginLeft: "5px",
            borderRadius: "5px",
            padding: "3px 7px 3px 7px"
          }}>
          <a href="#" onClick={() => this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>


        <div id='horMenu'>
          <ul>
            <li><a className="active" onClick={() => this.AttendanceFunc()}><span class="glyphicon glyphicon-ok">Attendance</span></a></li>
            <li><a onClick={() => this.AttendanceRegulationFunc()}><span class="glyphicon glyphicon-time">Attendance Regularization</span></a></li>
            <li><a onClick={() => this.LeaveRequest()}><span class="glyphicon glyphicon-time">Leave Request</span></a></li>

          </ul>

        </div>


      </div>




    );
  }

}


export default AttendanceRegulationMenuPage;

/* /*style={{fontSize: "larger",paddingTop:"12px"}}

 <div  className="col-xs-5" style={{paddingBottom:"10px"}}>
 	  <div class="input-group add-on">
      <input class="form-control" placeholder="Search" name="srch-term" id="srch-term" type="text"/>
      <div class="input-group-btn">

 	  <button class="btn btn-default" type="submit"onClick={()=>this.SearchFunc()}><i class="glyphicon glyphicon-search"></i></button>
  		</div>
  		</div>

			</div> */
