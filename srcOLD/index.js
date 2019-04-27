import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginPage from './LoginPage';
import EmployeeMenuPage from './EmployeeMenuPage';
import Attendence from './Attendence';
import EmployeeMenuHeader from './EmployeeMenuHeader';
import Maintenance from './Maintenance';
import RemoveEmployee from './RemoveEmployee';
import AddEmployee from './AddEmployee';
import SearchEmployee from './SearchEmployee';
import UpdateEmployee from './UpdateEmployee';
import Charts from './Charts';
import CryptoJS from 'crypto-js' ;
import AttendanceDisplay from './AttendanceDisplay';
import {  BrowserRouter as Router,Route, NavLink} from 'react-router-dom';
import ReportMenuPage from './ReportMenuPage';
import LeaveManagement from './LeaveManagement';
import AttendanceRegularisationAuthorize from './AttendanceRegularisationAuthorize';
import EmployeeAttendanceRequest from './EmployeeAttendanceRequest';
import EmployeeLeaveRequest from './EmployeeLeaveRequest';
import SearchAudit from './SearchAudit';
import AuditReport from './AuditReport';
import DailyIndividualAttendanceReport from './DailyIndividualAttendanceReport';
import DailyOrganizationAttendanceReport from './DailyOrganizationAttendanceReport';
import MonthlyIndividualAttendanceReport from './MonthlyIndividualAttendanceReport';
import MonthlyOrganizationAttendanceReport from './MonthlyOrganizationAttendanceReport';
import PeriodIndividualAttendanceReport from './PeriodIndividualAttendanceReport';
import PeriodOrganizationAttendanceReport from './PeriodOrganizationAttendanceReport';







ReactDOM.render(<App / > , document.getElementById("root"));
registerServiceWorker();
