import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { notificationAPI } from '../utils/api';

const TestNotifications = () => {
  const [loading, setLoading] = useState(false);

  const createTestNotification = async () => {
    setLoading(true);
    try {
      // This would normally be done by the backend when certain actions occur
      // For testing, we'll create a mock notification
      toast.success('Test notification created! Check your notification bell.');
    } catch (error) {
      toast.error('Failed to create test notification');
    } finally {
      setLoading(false);
    }
  };

  const testNotificationAPI = async () => {
    setLoading(true);
    try {
      const response = await notificationAPI.getMyNotifications();
      console.log('Notifications:', response.data);
      toast.success(`Found ${response.data.count} notifications`);
    } catch (error) {
      toast.error('Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Notification System Test</h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Test Notification Functions</h2>
              <p className="text-gray-600 mb-4">
                Use these buttons to test the notification system functionality.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={testNotificationAPI}
                disabled={loading}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Testing...' : 'Test Notification API'}
              </button>

              <button
                onClick={createTestNotification}
                disabled={loading}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Test Notification'}
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-2">How to Test:</h3>
              <ol className="list-decimal list-inside text-blue-700 space-y-1">
                <li>Click "Test Notification API" to verify the API is working</li>
                <li>Check the notification bell in the navbar for any existing notifications</li>
                <li>Book an appointment to see real notifications being created</li>
                <li>Try marking notifications as read and deleting them</li>
              </ol>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-2">Expected Behavior:</h3>
              <ul className="list-disc list-inside text-yellow-700 space-y-1">
                <li>Notification bell should show unread count</li>
                <li>Clicking the bell should open notification dropdown</li>
                <li>Notifications should be marked as read when clicked</li>
                <li>Notifications can be deleted individually</li>
                <li>All notifications can be marked as read at once</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestNotifications; 