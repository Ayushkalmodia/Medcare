// src/pages/Appointments.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiCalendar, HiClock, HiLocationMarker, HiUser, HiFilter, HiSearch } from 'react-icons/hi';
import { FaStethoscope } from 'react-icons/fa';
import { appointmentAPI, doctorAPI } from '../utils/api';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import api from '../utils/api';

const Appointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentAPI.getMyAppointments();
        setAppointments(response.data.data);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to fetch appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading appointments...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Appointments</h1>
          <button
            onClick={() => navigate('/book-appointment')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Book New Appointment
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You don't have any appointments yet.</p>
            <button
              onClick={() => navigate('/book-appointment')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <HiUser className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Dr. {appointment.doctor?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {appointment.doctor?.specialization}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <HiCalendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">
                      {new Date(appointment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiClock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600">{appointment.time}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HiLocationMarker className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 capitalize">
                      {appointment.appointmentType}
                    </span>
                  </div>
                </div>

                {appointment.status === 'scheduled' && (
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={() => navigate(`/appointments/${appointment._id}/reschedule`)}
                      className="flex-1 px-3 py-2 text-sm border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this appointment?')) {
                          appointmentAPI.delete(appointment._id)
                            .then(() => {
                              toast.success('Appointment cancelled successfully');
                              setAppointments(appointments.filter(a => a._id !== appointment._id));
                            })
                            .catch(err => {
                              toast.error('Failed to cancel appointment');
                            });
                        }
                      }}
                      className="flex-1 px-3 py-2 text-sm border border-red-600 text-red-600 rounded hover:bg-red-50"
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
    </div>
  );
};

export default Appointments;