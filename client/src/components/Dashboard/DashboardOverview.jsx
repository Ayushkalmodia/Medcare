import React from 'react';
import { HiCalendar, HiDocumentText, HiUserGroup, HiBell, HiRefresh } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const DashboardOverview = ({ stats, onRefresh }) => {
  const { upcomingAppointments, recentRecords, notifications } = stats;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <HiCalendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
              <p className="text-lg font-semibold text-gray-900">{upcomingAppointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <HiUserGroup className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recent Records</p>
              <p className="text-lg font-semibold text-gray-900">{recentRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <HiDocumentText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Records</p>
              <p className="text-lg font-semibold text-gray-900">{recentRecords.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <HiBell className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Notifications</p>
              <p className="text-lg font-semibold text-gray-900">{notifications.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
            <button
              onClick={onRefresh}
              className="text-gray-400 hover:text-gray-500"
              title="Refresh"
            >
              <HiRefresh className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <div key={appointment._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Dr. {appointment.doctor?.user?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(appointment.date), 'EEEE, MMMM d, yyyy')} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.appointmentType === 'video' ? 'Video Consultation' : 'In-Person Visit'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/appointments/${appointment._id}`}
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No upcoming appointments
            </div>
          )}
        </div>
        {upcomingAppointments.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link
              to="/appointments"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all appointments →
            </Link>
          </div>
        )}
      </div>

      {/* Recent Medical Records */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Medical Records</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {recentRecords.length > 0 ? (
            recentRecords.map((record) => (
              <div key={record._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{record.title}</p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(record.createdAt), 'MMMM d, yyyy')}
                    </p>
                    <p className="text-sm text-gray-500">{record.description}</p>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={record.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
                    >
                      View Record
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-4 text-center text-gray-500">
              No recent medical records
            </div>
          )}
        </div>
        {recentRecords.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <Link
              to="/medical-records"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View all records →
            </Link>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/book-appointment"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HiCalendar className="h-5 w-5 text-blue-600" />
            <span className="ml-3 text-gray-700">Book New Appointment</span>
          </Link>
          <Link
            to="/medical-records/upload"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HiDocumentText className="h-5 w-5 text-purple-600" />
            <span className="ml-3 text-gray-700">Upload Medical Record</span>
          </Link>
          <Link
            to="/doctors"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <HiUserGroup className="h-5 w-5 text-green-600" />
            <span className="ml-3 text-gray-700">Find a Doctor</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview; 