import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import EmployeeMenuPage from './EmployeeMenuPage';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import AttendanceDisplay from './AttendanceDisplay';
import './EmployeeMenuPage.css';
import { FormErrors } from './FormErrors';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';
import CryptoJS from 'crypto-js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import idb from 'idb';



class Attendence extends Component {

  constructor() {
    super()
    this.state = {

      employeeId: '',
      checkInTime: '',
      date: '',
      checkOutTime: '',
      companyId: '',






    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
    );
  }



  checkIn() {

    /*alert("checkIn");
    */confirmAlert({
      title: 'Check In',                        // Title dialog
      message: 'Are you sure want to Check In ' + this.state.employeeId,               // Message dialog
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => { this.CheckInConfirm() },    // Action after Confirm
      onCancel: () => { this.NoAction() },      // Action after Cancel


    })
  }

  CheckInConfirm() {

    var today = new Date();

    var currenttime = today.toLocaleTimeString([],{hour12:false});
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.checkInTime = currenttime;
    this.state.date = today;
 


    this.setState({
      checkInTime: currenttime,
      employeeId: this.state.employeeId,
      date: today,

    });
    
   /* //alert("checkIn");
    //alert(this.state.date);
    //alert(this.state.checkInTime);
   */ var self = this;
    if (navigator.onLine) {

      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          checkInTime: this.state.checkInTime,
          employeeId: this.state.employeeId,
          date: this.state.date,
          companyId: this.state.companyId,
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckin",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {
          /*console.log(data);
          alert(data);
          */if (data.employeeName == "NOT_VAILD") {
            confirmAlert({
              title: 'Invalid EmployeeId',                        // Title dialog
              message: 'Enter Valid Employee Id',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "BLOCKED") {
            confirmAlert({
              title: 'BLOCKED',                        // Title dialog
              message: data.employeeId + '  has been BLOCKED',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "ALREADY_CHECKIN") {
            confirmAlert({
              title: 'Already Checked In',                        // Title dialog
              message: data.employeeId + ' is already Checked In today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else {

            confirmAlert({
              title: 'Checked In',                        // Title dialog
              message: 'Successfully Checked In  ' + data.employeeId,               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })

          }
          self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })

        },
        error: function (data) {
          /*console.log('#####################error:################################' + data);
          */confirmAlert({
            title: 'Server Error',                        // Title dialog
            message: 'Server Error Try Again Later',               // Message dialog
            confirmLabel: 'Ok',                           // Text button confirm
                                      
            
             });                
                
        },


      });
    } else {
     /* console.log('offline');
     */ var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      var message = JSON.stringify({
        checkInTime: this.state.checkInTime,
        employeeId: this.state.employeeId,
        date: this.state.date,
        companyId: this.state.companyId,
      });

      var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
        switch (upgradeDb.oldVersion) {
          case 0:
           
          case 1:
          upgradeDb.createObjectStore('checkOut', { autoIncrement: true });
            upgradeDb.createObjectStore('checkIn', { autoIncrement: true });
        }
      });
      dbPromise.then(function (db) {
        var tx = db.transaction('checkIn', 'readwrite');
        var keyValStore = tx.objectStore('checkIn');
        keyValStore.put(message);
        return tx.complete;

      }).then(function (val) {
        /*console.log('the value of offline added');
     */ });
     self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })

    }
  }


  attendance() {
    /* alert("ATTENDANCE");
 */
    var today = new Date();
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.date = today;
    this.setState({

      date: today,

    });
   /* alert(this.state.date);
   */ var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
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
        /* console.log(data);
         alert(data);
 */
        ReactDOM.render(
          <Router>
            <div>

              <Route path="/" component={EmployeeMenuHeader} />


              <Route exact path="/" component={() => <AttendanceDisplay data={data} />} />

            </div>
          </Router>, document.getElementById('root'));
      },
      error: function (data) {
        /*console.log('#####################error:################################' + data);
        */confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm
                                    
          
           });                
              
      },

    });
  }
  checkOut() {
    /*alert("checkOut");
*/
    confirmAlert({
      title: 'Check Out',                        // Title dialog
      message: 'Are you sure want to Check Out ' + this.state.employeeId,               // Message dialog
      confirmLabel: 'Confirm',                           // Text button confirm
      cancelLabel: 'Cancel',                             // Text button cancel
      onConfirm: () => { this.CheckOutConfirm() },    // Action after Confirm
      onCancel: () => { this.NoAction() },      // Action after Cancel

    })
  }


  componentDidMount() {
    this.interval = setInterval(() => this.offlineData(), 2000);
  }


  offlineData() {
  
    if (navigator.onLine) {

      
      var dbPromise = idb.open('Attendance-db');
      
      dbPromise.then(function (db) {
        if (db.objectStoreNames.contains('checkIn') || db.objectStoreNames.contains('checkOut')) {
          var tx = db.transaction('checkIn', 'readonly');
          var keyValStore = tx.objectStore('checkIn');
          var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
            if (!cursor) return;
            /* console.log('cursor value', cursor.key);
             console.log('online');
 */
          

            $.ajax({
              type: 'POST',
              data: cursor.value,
              url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckin",
              contentType: "application/json",
              dataType: 'json',
              async: false,

              success: function (data, textStatus, jqXHR) {
               /* console.log(data);
                alert(data);
               */ if (data.employeeName == "NOT_VAILD") {
                  confirmAlert({
                    title: 'Invalid EmployeeId',                        // Title dialog
                    message: 'Enter Valid Employee Id',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "ALREADY_CHECKIN") {
                  confirmAlert({
                    title: 'Already Checked In',                        // Title dialog
                    message: data.employeeId + ' is already checked in today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }

                else {

                  confirmAlert({
                    title: 'Checked In',                        // Title dialog
                    message: 'Successfully Checked In  ' + data.employeeId,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })

                }



              },
              error: function (data) {
               /* console.log('#####################error:################################' + data);
               */  confirmAlert({
                title: 'Server Error',                        // Title dialog
                message: 'Server Error Try Again Later',               // Message dialog
                confirmLabel: 'Ok',                           // Text button confirm
                                          
                
                 });                
                    

              },


            });

            dbPromise.then(function (db) {
              var tx = db.transaction('checkIn', 'readwrite');
              var keyValStore = tx.objectStore('checkIn');
             /* console.log('deleting', cursor.key);
             */ return keyValStore.delete(cursor.key);

            });
            return cursor.continue().then(cursorIterate);
          });


          var dbPromise = idb.open('Attendance-db', 2);

          var tx = db.transaction('checkOut', 'readonly');
          var keyValStore = tx.objectStore('checkOut');
          var count = keyValStore.openCursor().then(function cursorIterate(cursor) {
            if (!cursor) return;
          /*  console.log('cursor value', cursor.key);
            console.log('online');
          */  $.ajax({
              type: 'POST',
              data: cursor.value,
              url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckout",
              contentType: "application/json",
              dataType: 'json',
              async: false,

              success: function (data, textStatus, jqXHR) {
                /*console.log(data);
                alert(data);
                */if (data.employeeName == "NOT_VAILD") {
                  confirmAlert({
                    title: 'Invalid EmployeeId',                        // Title dialog
                    message: 'Enter Valid Employee Id',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "NOT_CHECKED_IN") {
                  confirmAlert({
                    title: 'Not Checked In',                        // Title dialog
                    message: data.employeeId + ' is not checked in today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else if (data.employeeName == "ALREADY_CHECKOUT") {
                  confirmAlert({
                    title: 'Already Checked In',                        // Title dialog
                    message: data.employeeId + ' is already checked out today',               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })
                }
                else {

                  confirmAlert({
                    title: 'Checked Out',                        // Title dialog
                    message: 'Successfully Checked Out  ' + data.employeeId,               // Message dialog
                    confirmLabel: 'Ok',                           // Text button confirm


                  })


                }




              },
              error: function (data) {
                /*console.log('#####################error:################################' + data);
                */confirmAlert({
                  title: 'Server Error',                        // Title dialog
                  message: 'Server Error Try Again Later',               // Message dialog
                  confirmLabel: 'Ok',                           // Text button confirm
                                            
                  
                   });                
                      

              },


            });





            dbPromise.then(function (db) {
              var tx = db.transaction('checkOut', 'readwrite');
              var keyValStore = tx.objectStore('checkOut');
             /* console.log('deleting', cursor.key);
             */ return keyValStore.delete(cursor.key);

            });
            return cursor.continue().then(cursorIterate);
          });





        }

      });
    }
  }





  CheckOutConfirm() {
    var today = new Date();

    var currenttime = today.toLocaleTimeString([],{hour12:false});
    today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    this.state.checkOutTime = currenttime;
    this.state.date = today;
    this.setState({
      checkOutTime: currenttime,
      employeeId: this.state.employeeId,
      date: today,

    });

    /*alert(this.state.date);
    alert(this.state.checkOutTime);
*/
    var self = this;
    if (navigator.onLine) {
      var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      $.ajax({
        type: 'POST',
        data: JSON.stringify({
          checkOutTime: this.state.checkOutTime,
          employeeId: this.state.employeeId,
          date: this.state.date,
          companyId: this.state.companyId,
        }),
        url: "http://localhost:8080/EmployeeAttendenceAPI/employee/employeecheckout",
        contentType: "application/json",
        dataType: 'json',
        async: false,

        success: function (data, textStatus, jqXHR) {
         /* console.log(data);
          /*alert(data);
          */if (data.employeeName == "NOT_VAILD") {
            confirmAlert({
              title: 'Invalid EmployeeId',                        // Title dialog
              message: 'Enter Valid Employee Id',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "NOT_CHECKED_IN") {
            confirmAlert({
              title: 'Not Checked In',                        // Title dialog
              message: data.employeeId + ' is not checked in today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          }
          else if (data.employeeName == "ALREADY_CHECKOUT") {
            confirmAlert({
              title: 'Already Checked Out',                        // Title dialog
              message: data.employeeId + ' is already checked out today',               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })
          } else {
            confirmAlert({
              title: 'Checked Out',                        // Title dialog
              message: ' Successfully Checked Out  ' + data.employeeId,               // Message dialog
              confirmLabel: 'Ok',                           // Text button confirm


            })


          }

          self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })


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

    } else {
      /*console.log('offline');
      */var companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8)
      this.state.companyId = companyId;
      this.setState({
        companyId: companyId,
      });

      var message = JSON.stringify({
        checkOutTime: this.state.checkOutTime,
        employeeId: this.state.employeeId,
        date: this.state.date,
        companyId: this.state.companyId,
      });
     

      
      var dbPromise = idb.open('Attendance-db', 2, function (upgradeDb) {
        switch (upgradeDb.oldVersion) {
          case 0:
           
          case 1:
          upgradeDb.createObjectStore('checkOut', { autoIncrement: true });
            upgradeDb.createObjectStore('checkIn', { autoIncrement: true });
        }
      }); 

      dbPromise.then(function (db) {
        var tx = db.transaction('checkOut', 'readwrite');
        var keyValStore = tx.objectStore('checkOut');
        keyValStore.put(message);
        return tx.complete;

      }).then(function (val) {
       /* console.log('the value of offline added');
      */});
      self.state.employeeId = '';
          self.setState({
            employeeId: '',
          })
    }
  }


  NoAction() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={Attendence} />


        </div>
      </Router>, document.getElementById('root'));
    this.state.employeeId = '';
    this.setState({
      employeeId: '',
    })


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

      <div className="container " style={{ 
        marginBottom: "20%",

        }}>
   <ul class="previous disabled" 
    style={{float:"none",
    display:"inline-block",
    marginLeft:"5px",
    borderRadius: "5px",
    padding: "3px 7px 3px 7px"
    }}>
        <a href="#" onClick={()=>this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>


        <div class="form-group"
          style={{
            textAlign: "center",
            display: "block"
          }}>
          <label htmlFor="employeeId"
          >Employee ID:</label>
          <input
            type="number"
            autoFocus
            value={this.state.employeeId}
            required
            name="employeeId"
            onChange={this.handleUserInput}
            className="form-control"
            id="employeeId"
            placeholder="Enter EmployeeId"
           
            style={{
              width: "50%",
              height: "50px",
              display: "inline-block",
              marginLeft: "10px"
            }}
          />
        </div>

        {/*   <div className="row" id="checkInOut" >
          <div className="col-sm-6 col-xs-6" >
            <label class="control-label"
              htmlFor="employeeId"
              id="employeeidlabel"
              style={{ paddingTop: "23px" }}
            >Employee ID:</label>
          </div>
          <div className="col-sm-6 col-xs-6"
            style={{ paddingLeft: " 0px" }}>
            <input
              type="number"
              autoFocus
              value={this.state.employeeId}
              required
              name="employeeId"
              onChange={this.handleUserInput}
              className="form-control"
              id="employeeId"
              placeholder="Enter EmployeeId"
              style={{
                float: "left",
                width: "77%",
                height: "50px"
              }}
            />

          </div>
        </div> */}
        {/* 
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon3">Employee ID:</span>
          <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3" />
        </div>

        <div className="row " id="checkInOut">
          <label htmlFor="employeeId" class="col-xs-6 col-sm-6 form-group"
            id="employeeidlabel"
            style={{


              paddingTop: " 27px",
              fontSize: "18px",
              fontSize: "18px",
              fontWeight: "600",
              paddingLeft: "9%",


              /*  height: "20px",
               width:" 120px",
               marginTop: "10px",
               marginLeft: "10px",
               textAlign:" right",
               marginRight: "15px",
               float:"left" 

            }}>Employee ID:</label>

          < input type="number"
            autoFocus
            value={this.state.employeeId}
            required name="employeeId"
            onChange={this.handleUserInput}
            className="form-control"
            id="employeeId"
            placeholder="Enter EmployeeId" class="col-xs-6 col-sm-6  form-group"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              height: "50px",
              width: "130px",
              border: "1px solid #000",
              marginTop: "10px"
            }} />
        </div>


        <div className="form-group">

          <label htmlFor="employeeId"
            id="employeeidlabel"
            style={{
              //fontFamily:" Georgia", "Times New Roman", Times, serif,
              fontSize: "18px",

              height: "20px",
              width: " 120px",
              marginTop: "10px",
              marginLeft: "10px",
              textAlign: " right",
              marginRight: "15px",
              float: "left"
            }}>Employee ID:</label>

          <input type="number"
            autoFocus
            value={this.state.employeeId}
            required name="employeeId"
            onChange={this.handleUserInput}
            className="form-control"
            id="employeeId"
            placeholder="Enter EmployeeId"
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              height: "50px",
              width: "130px",
              border: "1px solid #000",
              marginTop: "10px"
            }} />

        </div> 
        
          <div>
          <table class="table" id="tableHeadings">
          </table>
        </div>
        */}

        <div className="row" id="checkInOut" >
          <div className="col-sm-6 col-xs-6" id="colcheckIn">
            <a to="/" onClick={() => this.checkIn()} id="checkIn" className="" ></a>
          </div>
          <div className="col-sm-6 col-xs-6" id="colcheckIn">
            <a to="/" id="checkOut" onClick={() => this.checkOut()} ></a>
          </div>
        </div>







      </div>


    );
  }

}


export default Attendence;

{/*</div>
        <div className="row" id="checkInOut">
          <div className="col-sm-6 col-xs-6" id="checkIn">
            <a to="/" onClick={() => this.checkIn()} id="checkIn" className="" >&nbsp;</a>
          </div>
          <div className="col-sm-6 col-xs-6" id="checkOut">
            <a to="/" id="checkOutout" onClick={() => this.checkOut()}  >&nbsp;</a>
          </div>
        </div>

              <div class="btn-group  btn-group-justified" STYLE={{}}>

          <div class="btn-group">
            <button type="button" class="btn btn-success" onClick={() => this.checkIn()}>CHECK IN</button>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-info" onClick={() => this.checkOut()}>CHECK OUT</button>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-danger" onClick={() => this.attendance()}>ATTENDANCE</button>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-warning">RESUME</button>
          </div>


        </div>
 */}