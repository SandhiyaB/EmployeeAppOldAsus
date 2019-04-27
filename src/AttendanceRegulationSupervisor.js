
import datepicker from 'jquery-ui/ui/widgets/datepicker';
import './datepicker.css';
import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
//import './LoginPage.css';
import {
  FormErrors
} from './FormErrors';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import AttendanceRegulation from './AttendanceRegulation';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import AttendanceRegulationMenuPage from './AttendanceRegulationMenuPage';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import './LoginPage.css';
import './EmployeeMenuPage.css';
import timepicker from 'timepicker/jquery.timepicker';

class AttendanceRegulationSupervisor extends Component {


  constructor(props) {
    super(props)
    this.state = {
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      companyId: '',
      dateValid: false,
      checkInTimeValid: false,
      checkOutTimeValid: false,
      employeeIdValid: false,

    }
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      employeeIdValid: true
    });

  }


  handleUserInputDate = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      dateValid: true
    });

  }


  handleCheckIn = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkInTimeValid: true
    });
    $("#checkOutTime").timepicker('option', 'minTime', value);


  }
  handleCheckOut = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      checkOutTimeValid: true
    });

    //$("#checkInTime").timepicker('option', 'maxTime', value);


  }
  handleEmployeeId = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.state.employeeId=value;
    this.setState({
      [name]: value,
      employeeIdValid: true

    });
    var self = this;
		/*alert(this.state.employeeId);
		*/var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,

    });

   /*alert(JSON.stringify(this.state));
			 */$.ajax({
      type: 'POST',
      data: JSON.stringify({

        employeeId: this.state.employeeId,

        companyId: this.state.companyId,
      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeedetails",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        /*console.log(data);

        alert(data);

        */
       self.state.employeeName=data.employeeName;
       self.state.role=data.role;
       self.state.department=data.department;
        /*  if(data.employeeName!=null){
              confirmAlert({
                 title: 'Delete Employee',                        // Title dialog
                 message: 'Are you sure want to remove '+data.employeeId +" " + data.employeeName+"  "+data.role+"  from department " + data.department ,               // Message dialog
                 confirmLabel: 'Confirm',                           // Text button confirm
                 cancelLabel: 'Cancel',                             // Text button cancel
                 onConfirm: () => {self.RemoveEmployee()},    // Action after Confirm
                 onCancel: () => {self.NoAction()},      // Action after Cancel
               })
           }
           else{
             confirmAlert({
                         title: 'Invalid EmployeeId',                        // Title dialog
                         message: 'Enter Valid Employee Id',               // Message dialog
                         confirmLabel: 'Ok',                           // Text button confirm


                          })

           }	 */
      },
      error: function (data) {
        /*  console.log('#####################error:################################'+data);*/
        confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm


        });

      },
    });




  }
  Submit() {
  /*  alert(this.state.date);
   alert(this.state.checkOutTime);
  */  var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.setState({
      companyId: companyId,
    });
    var self = this;

            /* alert(JSON.stringify(this.state));
            */ $.ajax({
      type: 'POST',
      data: JSON.stringify({
        date: this.state.date,
        checkInTime: this.state.checkInTime,
        checkOutTime: this.state.checkOutTime,
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/mail/AttendanceRegularizationMail",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log(data);

                      /* console.log(data);
                      alert(data);
                      */ if (data.status == "NOT_ASSIGNED") {

          confirmAlert({
            title: 'Not Assigned',                        // Title dialog
            message: self.state.employeeId + ' Id has not Assigned Any Reporting Manger.Please Contact Admin',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          })

        }
        else {

          confirmAlert({
            title: 'Sucess',                        // Title dialog
            message: 'Request for Attendance Regularization Sent Successfully',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
          })

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

        }


      },
      error: function (data) {
                        /* console.log('#####################error:################################'+data);
                        */confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm


        });

      },
    });

    this.setState({
      date: '',
      checkInTime: '',
      checkOutTime: '',
      employeeId: '',
      companyId: '',
      dateValid: false,
      checkInTimeValid: false,
      checkOutTimeValid: false,
      employeeIdValid: false,

    });


  }

  componentDidMount() {
    var self = this;
    /*alert('componentDidMount');
    */
    $('#date').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          dateValid: true,
        });

      },

      dateFormat: 'yy/mm/dd',
      minDate: '-3M',
      maxDate: '-1D',
      numberOfMonths: 1
    });




    $('#checkInTime').timepicker({
      onSelect: function (time) {
        $("#checkOutTime").timepicker('option', 'minTime', time);

        self.state.checkInTime = time;
        self.setState({
          checkInTime: time,
        });

      },

      timeFormat: 'H:i:s',
    });

    $('#checkOutTime').timepicker({
      onSelect: function (time) {
        $("#checkInTime").timepicker('option', 'maxTime', time);

        self.state.checkOutTime = time;
        self.setState({
          checkOutTime: time,
        });

      },

      timeFormat: 'H:i:s',

    });


    /*  var emp=JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem('EmpList'),"shinchanbaby").toString(CryptoJS.enc.Utf8));
   /*  console.log(emp);
 var employeeId;
     employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
     $.each(emp, function (i, item) {

       employeeId += '<option value="' + item.employeeId + '">'+item.employeeId+ '</option>'

     });
     $("#employeeId").append(employeeId);
      */



    var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
    var employeeId = CryptoJS.AES.decrypt(localStorage.getItem('EmployeeId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)

    this.state.companyId = companyId;
    this.state.employeeId = employeeId;

    this.setState({
      companyId: companyId,
      employeeId: employeeId,
    });
    var self = this;

                /* alert(JSON.stringify(this.state));
                */ $.ajax({
      type: 'POST',
      data: JSON.stringify({
        employeeId: this.state.employeeId,
        companyId: this.state.companyId,
      }),
      url: "http://localhost:8080/EmployeeAttendenceAPI/employee/ReportingManagerEmpList",
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log(data);
        var employeeId;
        employeeId += '<option disabled selected hidden >Select a Employee Id</option>';
        employeeId += '<option value="' + self.state.employeeId + '">' + self.state.employeeId + '</option>'
        $.each(data, function (i, item) {

          employeeId += '<option value="' + item.employeeId + '">' + item.employeeId + '</option>'

        });
        $("#employeeId").append(employeeId);

      },
    });




  }

  render() {


    return (




      <div className="container" style={{ marginBottom: '30%' }}>
        <div class="jumbotron">
          <h3>Attendance Regularization </h3>

          <form style={{ paddingBottom: '20px', position: 'inline-block' }}>
            <div className="col-xs-12 col-sm-12 col-lg-12">
              <label htmlFor="fromDate"
                style={{ paddingRight: '20px', marginBottom: '14px' }}>
                Date:
            </label>
              <input
                style={{ width: '35%' }}
                type="text"

                value={this.state.date}
                id="date"
                name="date"
                onChange={this.handleUserInputDate} />
            </div>



            <div className="col-xs-12 col-sm-12 col-lg-12" style={{ marginTop: "20px", marginBottom: "20px" }} >
              <label>
                Employee Id*
   <select
                  id="employeeId"
                  className="form-control"
                  onChange={this.handleEmployeeId}

                  name="employeeId"
                  style={{ marginBottom: "15px" }}
                >
                </select>

              </label>
              </div>
              <div className="row">

           <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <input type="text"

                value={this.state.employeeName}
                id="employeeName"
                name="employeeName"
                maxlength="50"
                readOnly
                placeholder=" Employee Name.." required />
              </div>

               <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
              <input type="text"
              className="col-xs-4"
                value={this.state.role}
                id="role"
                name="role"
                maxlength="50"
                readOnly
                placeholder=" Employee Role.." required />
              </div>

            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">

              <input type="text"
              className="col-xs-4"
                value={this.state.department}
                id="department"
                name="department"
                maxlength="50"
                readOnly
                placeholder=" Employee Department.." required />
            </div>
            </div>
            <div style={{ marginTop: "20px" }}>
              <div class="form-group" >
                <div className="col-xs-8 col-sm-6 col-lg-6" >
                  <label style={{ marginBottom: '25px!important' }} >
                    Check-In Time*
      <input
                      // class="form-control"
                      type="text"
                      data-step="5"
                      value={this.state.checkInTime}
                      required
                      name="checkInTime"
                      onSelect={this.handleCheckIn}
                      className="form-control"
                      id="checkInTime"
                      placeholder="Enter Check In"

                    />
                  </label>

                </div>

                <div className="col-xs-8 col-sm-6 col-lg-6">
                  <label>
                    Check-Out Time*
      <input
                      //class="form-control"
                      type="text"
                      data-step="5"

                      value={this.state.checkOutTime}
                      required
                      name="checkOutTime"
                      onSelect={this.handleCheckOut}
                      className="form-control"
                      id="checkOutTime"
                      placeholder="Enter checkOut"
                    />
                  </label>
                </div>
              </div>
            </div>
            <button type="button" id="submitAttendanceReg" disabled={!(this.state.employeeIdValid && this.state.dateValid && this.state.checkInTimeValid && this.state.checkOutTimeValid)} style={{ marginBottom: "10px", marginLeft: "auto", marginRight: "auto", marginTop: "175px" }} onClick={() => this.Submit()} class="btn btn-info">Submit</button>

          </form>

        </div>




      </div>

    );



  }

}
export default AttendanceRegulationSupervisor;
