import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  Alert
} from '@mui/material';
import { format } from 'date-fns';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [notes, setNotes] = useState({
    diagnosis: '',
    prescription: '',
    notes: '',
    followUpDate: ''
  });

  useEffect(() => {
    fetchAppointments();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('/api/doctors/me/appointments');
      setAppointments(response.data.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch appointments');
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get('/api/doctors/me/patients');
      setPatients(response.data.data);
    } catch (err) {
      setError('Failed to fetch patients');
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    try {
      await axios.put(`/api/doctors/appointments/${appointmentId}/status`, { status });
      fetchAppointments();
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const handleAddNotes = async () => {
    try {
      await axios.put(`/api/doctors/appointments/${selectedAppointment._id}/notes`, notes);
      setOpenDialog(false);
      fetchAppointments();
      setNotes({
        diagnosis: '',
        prescription: '',
        notes: '',
        followUpDate: ''
      });
    } catch (err) {
      setError('Failed to add notes');
    }
  };

  const handleOpenDialog = (appointment) => {
    setSelectedAppointment(appointment);
    setNotes({
      diagnosis: appointment.diagnosis || '',
      prescription: appointment.prescription || '',
      notes: appointment.notes || '',
      followUpDate: appointment.followUpDate || ''
    });
    setOpenDialog(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        Doctor Dashboard
      </Typography>

      <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 3 }}>
        <Tab label="Appointments" />
        <Tab label="Patients" />
      </Tabs>

      {tabValue === 0 && (
        <Grid container spacing={3}>
          {appointments.map((appointment) => (
            <Grid item xs={12} md={6} key={appointment._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {appointment.patient.firstName} {appointment.patient.lastName}
                  </Typography>
                  <Typography color="textSecondary">
                    Date: {format(new Date(appointment.date), 'PPP')}
                  </Typography>
                  <Typography color="textSecondary">
                    Time: {appointment.time}
                  </Typography>
                  <Typography color="textSecondary">
                    Type: {appointment.appointmentType}
                  </Typography>
                  <Typography color="textSecondary">
                    Status: {appointment.status}
                  </Typography>
                  <Typography color="textSecondary">
                    Reason: {appointment.reason}
                  </Typography>
                  
                  <Box mt={2}>
                    {appointment.status === 'scheduled' && (
                      <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleStatusUpdate(appointment._id, 'confirmed')}
                          sx={{ mr: 1 }}
                        >
                          Confirm
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleStatusUpdate(appointment._id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={() => handleStatusUpdate(appointment._id, 'completed')}
                          sx={{ mr: 1 }}
                        >
                          Mark Complete
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => handleOpenDialog(appointment)}
                        >
                          Add Notes
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {tabValue === 1 && (
        <Grid container spacing={3}>
          {patients.map((patient) => (
            <Grid item xs={12} md={4} key={patient._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {patient.firstName} {patient.lastName}
                  </Typography>
                  <Typography color="textSecondary">
                    Email: {patient.email}
                  </Typography>
                  <Typography color="textSecondary">
                    Gender: {patient.gender}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Appointment Notes</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Diagnosis"
            multiline
            rows={3}
            value={notes.diagnosis}
            onChange={(e) => setNotes({ ...notes, diagnosis: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Prescription"
            multiline
            rows={3}
            value={notes.prescription}
            onChange={(e) => setNotes({ ...notes, prescription: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Notes"
            multiline
            rows={3}
            value={notes.notes}
            onChange={(e) => setNotes({ ...notes, notes: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Follow-up Date"
            type="date"
            value={notes.followUpDate}
            onChange={(e) => setNotes({ ...notes, followUpDate: e.target.value })}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNotes} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DoctorDashboard; 