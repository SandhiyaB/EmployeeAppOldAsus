import React, { Component } from 'react';
//import LoginPage from './LoginPage';
//import { FormErrors } from './FormErrors';
import $ from 'jquery';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import CryptoJS from 'crypto-js';
import './EmployeeMenuPage.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css
import EmployeeMenuHeader from './EmployeeMenuHeader';
import ConfigurationPage from './ConfigurationPage';
import registerServiceWorker from './registerServiceWorker';
class HolidayConfig extends Component {

  constructor() {
    super()
    this.state = {
      date: '',
      description: '',
      companyId: '',
    };
  }

  componentDidMount() {

    var self = this;
    var tab;

    $('#datepicker').datepicker({
      onSelect: function (date) {
        var dt = new Date(date);
        self.setState({
          date: date,
          // dateValid:true,
        });

      },

      dateFormat: 'yy-mm-dd',
      minDate: '-3M',
      maxDate: '+13M',
      numberOfMonths: 1
    });


    $("#tableHeadings").on('click', "#delete", function () {
      self.state.companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

      var currentRow = $(this).closest("tr");

      self.state.date = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      self.state.description = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      self.setState({
        date: self.state.date,
        //description:self.state.description,
        companyId: self.state.companyId,

      });
      confirmAlert({
        title: 'Delete',                        // Title dialog
        message: 'Do you want to Delete the Holiday ' + self.state.description + ' ? ',               // Message dialog
        confirmLabel: 'Delete',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => { self.Delete(currentRow) },    // Action after Confirm
        onCancel: () => { self.NoAction() },      // Action after Cancel

      })

    })

    $("#tableHeadings").on('click', "#update", function () {

      var currentRow = $(this).closest("tr");


      var updateDate = currentRow.find("td:eq(0)").html(); // get current row 1st table cell TD value
      var updateDescription = currentRow.find("td:eq(1)").html(); // get current row 2nd table cell TD value

      $("#datepicker").val(updateDate);
      $("#description").val(updateDescription);
      self.state.date = updateDate;
      self.state.description = updateDescription;
      self.setState({
        date: self.state.date,
        description: self.state.description,

      })

      $(this).closest('tr').remove();
      $('#addrow').hide();

      $('#updaterow').show();
      $('#CancelUpdate').show();

    })

    self.GetData();
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,

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



  GetData() {
    var tab;
    this.state.companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    alert(JSON.stringify(this.state));
    this.setState({
      companyId: this.state.companyId,
    });

    alert("Ajax call" + JSON.stringify(this.state));

    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/getholidayinfodata",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        alert("success");
        console.log(data);
        $.each(data.holidayDatalist, function (i, item) {

          tab += '<tbody><tr class="success"><td>' + item.date + '</td><td>' + item.description + '</td><td ><button id="delete">' + "Delete" + '</button></td><td><button id="update">' + "Update" + '</button></td></tr></tbody>';

        });
        $("#tableHeadings").append(tab);

      },

      error: function (data, textStatus, jqXHR) {
        alert("error");

      },

    });
    //})

  }

  AddRow() {
    alert("adding row");

    // $("#leavetabledata").append("<tr><td>"+$("#datepicker" ).val()+"</td><td>"+$("#description").val()+"</td><td><button id='delete'>Delete</button><button id='update'>Update</button></td></tr>")
    this.state.companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);
    alert(JSON.stringify(this.state));
    this.setState({
      date: this.state.date,
      description: this.state.description,
      companyId: this.state.companyId,
    });
    alert("Ajax call" + JSON.stringify(this.state));
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/addholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        alert("success");
        console.log(data);
        if (data.description == "New") {
          $("#tableHeadings").append("<tbody><tr class='success'><td>" + $("#datepicker").val() + "</td><td>" + $("#description").val() + "</td><td><button id='delete'>Delete</button></td><td><button id='update'>Update</button></td></tr></tbody>")

        } else {
          alert("Date Already Exist choose update option");
        }
        $("#datepicker").val("");
        $("#description").val("");
      },

      error: function (data, textStatus, jqXHR) {
        alert("error");


      },

    });

  }


  UpdateRow() {
    this.state.companyId = CryptoJS.AES.decrypt(localStorage.getItem('CompanyId'), "shinchanbaby").toString(CryptoJS.enc.Utf8);

    alert(JSON.stringify(this.state));
    this.setState({
      date: this.state.date,
      description: this.state.description,
      companyId: this.state.companyId,
    });
    alert("Ajax call" + JSON.stringify(this.state));
    var self = this;
    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/updateholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        alert("success");

        $("#tableHeadings").append("<tbody><tr><td>" + $("#datepicker").val() + "</td><td>" + $("#description").val() + "</td><td><button id='delete'>Delete</button></td><td><button id='update'>Update</button></td></tr></tbody>")


        $("#datepicker").val("");
        $("#description").val("");
        $('#addrow').show();
        $('#updaterow').hide();
      },

      error: function (data, textStatus, jqXHR) {
        confirmAlert({
          title: 'Server Error',                        // Title dialog
          message: 'Server Error Try Again Later',               // Message dialog
          confirmLabel: 'Ok',                           // Text button confirm


           })

      },

    });


  }

  CancelUpdate() {

    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={HolidayConfig} />

        </div>
      </Router>,
      document.getElementById('root'));



  }
  Delete(currentRow) {
    alert("Ajax call" + JSON.stringify(this.state));

    $.ajax({
      type: 'POST',
      data: JSON.stringify(this.state),
      url: "http://localhost:8080/EmployeeAttendenceAPI/EmployeeConfig/deleteholidayinfo",
      contentType: "application/json",
      dataType: 'json',
      success: function (data, textStatus, jqXHR) {
        alert("success");
        currentRow.remove();

        $("#datepicker").val("");
        $("#description").val("");
      },

      error: function (data, textStatus, jqXHR) {
        alert("error");
      },

    });
    //})

  }

  NoAction() {
    ReactDOM.render(
      <Router>
        <div>

          <Route path="/" component={EmployeeMenuHeader} />

          <Route path="/" component={HolidayConfig} />


        </div>
      </Router>, document.getElementById('root'));


  }
  BackbtnFunc() {
    ReactDOM.render(
      <Router>
        <div>
          <Route path="/" component={EmployeeMenuHeader} />
          <Route path="/" component={ConfigurationPage} />

        </div>
      </Router>,
      document.getElementById('root'));
    registerServiceWorker();
  }

  render() {

    return (
      <div className="container" style={{ marginBottom: '30%' }}>
      <ul class="previous disabled"
        style={{
          float: "none",
          display: "inline-block",
          marginLeft: "5px",
          borderRadius: "5px",
          padding: "3px 7px 3px 7px"
        }}>
        <a href="#" onClick={() => this.BackbtnFunc()}><span aria-hidden="true">&larr;</span> BACK</a></ul>
<div class="jumbotron">

          <form id="dateformat">

            <label
              htmlFor="datepicker"
              style={{ paddingRight: '30px' }}>Date:</label>

            <input
              style={{ width: '35%' }}
              type="text"
              value={this.state.date}
              id="datepicker"
              name="date"
              onChange={this.handleUserInputDate} />

          </form>

          <form id="Description">

            <label
              htmlFor="description"
              style={{ paddingRight: '30px' }}>Description:</label>

            <input
              style={{ width: '35%' }}
              type="text"
              value={this.state.description}
              id="description"
              name="description"
              onChange={this.handleUserInput} />



          </form>

          <button type="button" id="addrow" onClick={() => this.AddRow()} class="btn btn-info">Add</button>

          <button type="button" id="updaterow" onClick={() => this.UpdateRow()} style={{ display: "none" }} class="btn btn-info">Update</button>
          <button type="button" id="CancelUpdate" onClick={() => this.CancelUpdate()} style={{ display: "none" }} class="btn btn-info">Cancel</button>

          <div id="tableOverflow">
            <table style={{ margin: "auto" }} class="table" id="tableHeadings">
              <thead><tr class="headcolor" ><th>Date</th><th>Description</th><th colspan="2" style={{ textAlign: "center" }}>Action</th></tr></thead>
            </table>
          </div>

        </div>
      </div>
    );
  }

}
export default HolidayConfig;
