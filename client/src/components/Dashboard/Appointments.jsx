import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaVideo, FaMapMarkerAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('upcoming'); // 'upcoming' or 'past'
  const { user } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get('/appointments/my-appointments');
      setAppointments(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch appointments');
      toast.error(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await api.delete(`/appointments/${appointmentId}`);
      toast.success('Appointment cancelled successfully');
      fetchAppointments(); // Refresh the list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel appointment');
    }
  };

  const rescheduleAppointment = async (appointmentId) => {
    // Navigate to appointment booking page with pre-filled data
    window.location.href = `/appointments?reschedule=${appointmentId}`;
  };

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    return filter === 'upcoming' ? appointmentDate >= today : appointmentDate < today;
  });

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
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">My Appointments</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-md ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-md ${
              filter === 'past'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No {filter} appointments found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUserMd className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {appointment.doctor?.user ? (
                        `Dr. ${appointment.doctor.user.firstName} ${appointment.doctor.user.lastName}`
                      ) : (
                        'Doctor information not available'
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {appointment.doctor?.specialization || 'Specialization not available'}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-400" />
                  <span className="text-gray-600">
                    {new Date(appointment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaClock className="text-gray-400" />
                  <span className="text-gray-600">{appointment.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {appointment.appointmentType === 'video' ? (
                    <FaVideo className="text-gray-400" />
                  ) : (
                    <FaMapMarkerAlt className="text-gray-400" />
                  )}
                  <span className="text-gray-600">
                    {appointment.appointmentType === 'video'
                      ? 'Video Consultation'
                      : 'In-Person Visit'}
                  </span>
                </div>
              </div>

              {filter === 'upcoming' && appointment.status === 'confirmed' && (
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => rescheduleAppointment(appointment._id)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Reschedule
                  </button>
                  <button
                    onClick={() => cancelAppointment(appointment._id)}
                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments; 