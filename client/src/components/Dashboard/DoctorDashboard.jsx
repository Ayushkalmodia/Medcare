import React, { useState, useEffect } from 'react';
import { HiCalendar, HiUserGroup, HiDocumentText, HiClock, HiCheck, HiX } from 'react-icons/hi';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending'); // 'pending', 'confirmed', 'cancelled'
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/doctors/doctor-appointments');
      setAppointments(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      toast.error(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/doctors/my-patients');
      setPatients(response.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fetch patients');
    }
  };

  const handleAppointmentStatus = async (appointmentId, status) => {
    try {
      await api.patch(`/appointments/${appointmentId}`, { status });
      toast.success(`Appointment ${status} successfully`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${status} appointment`);
    }
  };

  const filteredAppointments = appointments.filter(appointment => 
    filter === 'all' ? true : appointment.status === filter
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <HiCalendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Appointments</p>
              <p className="text-lg font-semibold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <HiUserGroup className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-lg font-semibold text-gray-900">{patients.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <HiClock className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Appointments</p>
              <p className="text-lg font-semibold text-gray-900">
                {appointments.filter(a => a.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Appointments</h3>
            <div className="flex space-x-4">
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'pending'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Pending
              </button>
              <button
                onClick={() => setFilter('confirmed')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'confirmed'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => setFilter('cancelled')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'cancelled'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredAppointments.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No appointments found
            </div>
          ) : (
            filteredAppointments.map((appointment) => (
              <div key={appointment._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {appointment.patient?.user?.firstName} {appointment.patient?.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.appointmentType === 'video' ? 'Video Consultation' : 'In-Person Visit'}
                    </p>
                  </div>
                  {appointment.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAppointmentStatus(appointment._id, 'confirmed')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                      >
                        <HiCheck className="h-4 w-4 mr-1" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleAppointmentStatus(appointment._id, 'cancelled')}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                      >
                        <HiX className="h-4 w-4 mr-1" />
                        Deny
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recent Patients Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Patients</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {patients.length === 0 ? (
            <div className="px-6 py-4 text-center text-gray-500">
              No patients found
            </div>
          ) : (
            patients.slice(0, 5).map((patient) => (
              <div key={patient._id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {patient.user?.firstName} {patient.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{patient.user?.email}</p>
                  </div>
                  <button
                    onClick={() => window.location.href = `/patients/${patient._id}`}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                  >
                    View Records
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 