import { useState } from 'react';
import CountUp from 'react-countup';
import {
  FiUsers,
  FiClock,
  FiMapPin,
  FiTrendingUp,
  FiSearch,
  FiFilter,
  FiDownload,
  FiRefreshCw,
  FiTrash2,
  FiCalendar
} from 'react-icons/fi';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('All Departments');
  const [designation, setDesignation] = useState('All Designations');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [month, setMonth] = useState('June, 2026');
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);

  // Mock attendance data
  const attendanceData = [
    { id: 'EMP001', name: 'John Smith', department: 'Engineering', designation: 'Senior Developer', month: 'June, 2026', present: 20, late: 3, onsite: 15, remote: 5, halfDay: 1, fullDay: 19, overTime: '2h 30m', workingDays: 22 },
    { id: 'EMP002', name: 'Sarah Johnson', department: 'Marketing', designation: 'Marketing Manager', month: 'June, 2026', present: 21, late: 1, onsite: 18, remote: 3, halfDay: 0, fullDay: 21, overTime: '1h 15m', workingDays: 22 },
    { id: 'EMP003', name: 'Michael Brown', department: 'Engineering', designation: 'Junior Developer', month: 'June, 2026', present: 19, late: 5, onsite: 12, remote: 7, halfDay: 2, fullDay: 17, overTime: '0h 45m', workingDays: 22 },
    { id: 'EMP004', name: 'Emily Davis', department: 'HR', designation: 'HR Specialist', month: 'June, 2026', present: 22, late: 0, onsite: 20, remote: 2, halfDay: 0, fullDay: 22, overTime: '3h 00m', workingDays: 22 },
    { id: 'EMP005', name: 'David Wilson', department: 'Finance', designation: 'Financial Analyst', month: 'June, 2026', present: 20, late: 2, onsite: 16, remote: 4, halfDay: 1, fullDay: 19, overTime: '1h 30m', workingDays: 22 },
    { id: 'EMP006', name: 'Jessica Taylor', department: 'Engineering', designation: 'QA Engineer', month: 'June, 2026', present: 18, late: 4, onsite: 10, remote: 8, halfDay: 2, fullDay: 16, overTime: '0h 30m', workingDays: 22 },
    { id: 'EMP007', name: 'Robert Anderson', department: 'Operations', designation: 'Operations Lead', month: 'June, 2026', present: 21, late: 1, onsite: 19, remote: 2, halfDay: 0, fullDay: 21, overTime: '2h 45m', workingDays: 22 },
    { id: 'EMP008', name: 'Amanda Martinez', department: 'Marketing', designation: 'Content Writer', month: 'June, 2026', present: 20, late: 3, onsite: 14, remote: 6, halfDay: 1, fullDay: 19, overTime: '1h 00m', workingDays: 22 },
    { id: 'EMP009', name: 'Christopher Lee', department: 'Engineering', designation: 'DevOps Engineer', month: 'June, 2026', present: 22, late: 0, onsite: 20, remote: 2, halfDay: 0, fullDay: 22, overTime: '4h 15m', workingDays: 22 },
    { id: 'EMP010', name: 'Michelle White', department: 'HR', designation: 'Recruiter', month: 'June, 2026', present: 19, late: 3, onsite: 15, remote: 4, halfDay: 1, fullDay: 18, overTime: '1h 30m', workingDays: 22 },
    { id: 'EMP011', name: 'Daniel Harris', department: 'Finance', designation: 'Accountant', month: 'June, 2026', present: 21, late: 1, onsite: 18, remote: 3, halfDay: 0, fullDay: 21, overTime: '2h 00m', workingDays: 22 },
    { id: 'EMP012', name: 'Jennifer Clark', department: 'Operations', designation: 'Coordinator', month: 'June, 2026', present: 20, late: 2, onsite: 16, remote: 4, halfDay: 1, fullDay: 19, overTime: '1h 45m', workingDays: 22 },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setDepartment('All Departments');
    setDesignation('All Designations');
    setFromDate('');
    setToDate('');
    setMonth('June, 2026');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">Attendance Summary</h1>
          <p className="text-sm text-gray-500">Monitor employee attendance summaries, working days, overtime, and detailed logs.</p>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <FiCalendar className="w-4 h-4" />
          <span className="text-sm font-medium">{currentDate}</span>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-5">
        <MetricCard
          icon={FiUsers}
          label="TOTAL EMPLOYEES"
          value="12"
          subtext="active in view"
          color="blue"
        />
        <MetricCard
          icon={FiTrendingUp}
          label="AVG PRESENT DAYS"
          value="6.6"
          subtext="days per employee"
          color="green"
        />
        <MetricCard
          icon={FiClock}
          label="TOTAL LATE"
          value="58"
          subtext="instances this month"
          color="orange"
        />
        <MetricCard
          icon={FiMapPin}
          label="TOTAL ONSITE DAYS"
          value="76"
          subtext="onsite assignments"
          color="purple"
        />
        <MetricCard
          icon={FiTrendingUp}
          label="TOTAL OVERTIME"
          value="33h 44m"
          subtext="accumulated hours"
          color="indigo"
        />
      </div>

      {/* Filters & Actions Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
        >
          <div className="flex items-center gap-2">
            <FiFilter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters & Actions</h2>
          </div>
          <span className="text-xs text-gray-500">{isFiltersExpanded ? '▼' : '▶'}</span>
        </div>
        
        {isFiltersExpanded && (
          <div className="px-4 pb-4">
            <p className="text-xs text-gray-500 mb-4">Filter summaries by name, department, date range, or month</p>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-4">
              {/* Search Employee */}
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>

              {/* Department Dropdown */}
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="All Departments">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Operations">Operations</option>
              </select>

              {/* Designation Dropdown */}
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="All Designations">All Designations</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Marketing Manager">Marketing Manager</option>
                <option value="HR Specialist">HR Specialist</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="QA Engineer">QA Engineer</option>
                <option value="Operations Lead">Operations Lead</option>
                <option value="Content Writer">Content Writer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Recruiter">Recruiter</option>
                <option value="Accountant">Accountant</option>
                <option value="Coordinator">Coordinator</option>
              </select>

              {/* From Date */}
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              {/* To Date */}
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />

              {/* Month Dropdown */}
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="January, 2026">January, 2026</option>
                <option value="February, 2026">February, 2026</option>
                <option value="March, 2026">March, 2026</option>
                <option value="April, 2026">April, 2026</option>
                <option value="May, 2026">May, 2026</option>
                <option value="June, 2026">June, 2026</option>
                <option value="July, 2026">July, 2026</option>
                <option value="August, 2026">August, 2026</option>
                <option value="September, 2026">September, 2026</option>
                <option value="October, 2026">October, 2026</option>
                <option value="November, 2026">November, 2026</option>
                <option value="December, 2026">December, 2026</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors">
                <FiRefreshCw className="w-4 h-4" />
                Fix Month Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors">
                <FiDownload className="w-4 h-4" />
                Download Reports (ZIP)
              </button>
              <button 
                onClick={handleClearFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
                Clear Filters
              </button>
              <button className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                Apply Filters
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4">Showing 12 of 12 employees</p>
          </div>
        )}
      </div>

      {/* Employee Attendance Summaries Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Employee Attendance Summaries</h2>
          <p className="text-xs text-gray-500">Click on any row to view and update detailed log inputs</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase tracking-wider">Employee ID</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase tracking-wider">Designation</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-left uppercase tracking-wider">Month</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Present</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Late</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Onsite</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Remote</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Half Day</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Full Day</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Over Time</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Working Days</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-700 text-center uppercase tracking-wider">Download</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((employee, index) => (
                <tr 
                  key={employee.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{employee.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">{employee.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{employee.department}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{employee.designation}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{employee.month}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900 font-semibold">{employee.present}</td>
                  <td className="px-4 py-3 text-sm text-center text-orange-600 font-semibold">{employee.late}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{employee.onsite}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{employee.remote}</td>
                  <td className="px-4 py-3 text-sm text-center text-yellow-600 font-semibold">{employee.halfDay}</td>
                  <td className="px-4 py-3 text-sm text-center text-green-600 font-semibold">{employee.fullDay}</td>
                  <td className="px-4 py-3 text-sm text-center text-indigo-600 font-semibold">{employee.overTime}</td>
                  <td className="px-4 py-3 text-sm text-center text-gray-700">{employee.workingDays}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <FiDownload className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ icon: Icon, label, value, subtext, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    purple: 'bg-purple-50 border-purple-200',
    indigo: 'bg-indigo-50 border-indigo-200',
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    indigo: 'text-indigo-600',
  };

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm border ${colorClasses[color] || colorClasses.blue}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900">
            <CountUp end={parseFloat(value)} duration={1.5} decimals={value.includes('.') ? 1 : 0} />
            {value.includes('h') && <span className="text-2xl">{value.split('h')[1]}</span>}
          </p>
          <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
        <Icon className={`w-6 h-6 ${iconColors[color] || iconColors.blue}`} />
      </div>
    </div>
  );
};

export default Dashboard;
