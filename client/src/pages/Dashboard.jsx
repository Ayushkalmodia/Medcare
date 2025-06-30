import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiCalendar, HiDocumentText, HiUser, HiBell, HiExclamation } from 'react-icons/hi';
import { toast } from 'react-toastify';
import Appointments from '../components/Dashboard/Appointments';
import MedicalRecords from '../components/Dashboard/MedicalRecords';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import { appointmentAPI, medicalRecordAPI } from '../utils/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    upcomingAppointments: [],
    recentRecords: [],
    notifications: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [appointmentsRes, recordsRes] = await Promise.all([
        appointmentAPI.getMyAppointments(),
        medicalRecordAPI.getMyRecords()
      ]);

      // Get upcoming appointments (next 7 days)
      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);

      const upcomingAppointments = appointmentsRes.data.data
        .filter(apt => {
          const aptDate = new Date(apt.date);
          return aptDate >= today && aptDate <= nextWeek && apt.status === 'confirmed';
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      // Get recent medical records (last 5)
      const recentRecords = recordsRes.data.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setStats({
        upcomingAppointments,
        recentRecords,
        notifications: [] // To be implemented with notifications system
      });
    } catch (err) {
      setError('Failed to load dashboard data. Please try again later.');
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <HiExclamation className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <p className="mt-1 text-sm text-red-700">{error}</p>
              <button
                onClick={fetchDashboardData}
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <DashboardOverview stats={stats} onRefresh={fetchDashboardData} />;
      case 'appointments':
        return <Appointments />;
      case 'records':
        return <MedicalRecords />;
      default:
        return <DashboardOverview stats={stats} onRefresh={fetchDashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="mt-1 text-sm text-gray-600">
                Here's what's happening with your healthcare
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => navigate('/book-appointment')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <HiCalendar className="h-5 w-5 mr-2" />
                Book New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-4" aria-label="Tabs">
            {[
              { id: 'overview', label: 'Overview', icon: HiUser },
              { id: 'appointments', label: 'Appointments', icon: HiCalendar },
              { id: 'records', label: 'Medical Records', icon: HiDocumentText },
              { id: 'notifications', label: 'Notifications', icon: HiBell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
            <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`
                      -ml-0.5 mr-2 h-5 w-5
                      ${activeTab === tab.id
                        ? 'text-blue-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                      }
                    `}
                  />
                  {tab.label}
                  {tab.id === 'notifications' && stats.notifications.length > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {stats.notifications.length}
                    </span>
                  )}
            </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="mt-6 px-4 sm:px-0">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 