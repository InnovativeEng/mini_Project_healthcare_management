import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const { isAuthenticated, admin } = useContext(Context);

  // ---------------- FETCH APPOINTMENTS ----------------
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          // 🔥 UPDATED URL
          "https://healthcare-management-backend-yept.onrender.com/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  // ---------------- FETCH DOCTORS ----------------
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          // 🔥 UPDATED URL
          "https://healthcare-management-backend-yept.onrender.com/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors || []);
      } catch (error) {
        setDoctors([]);
      }
    };

    fetchDoctors();
  }, []);

  // ---------------- UPDATE APPOINTMENT STATUS ----------------
  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        // 🔥 UPDATED URL
        `https://healthcare-management-backend-yept.onrender.com/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    }
  };

  // ---------------- DELETE APPOINTMENT ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      const { data } = await axios.delete(
        // 🔥 UPDATED URL
        `https://healthcare-management-backend-yept.onrender.com/api/v1/appointment/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setAppointments((prev) => prev.filter((app) => app._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <img src="/doc.png" alt="docImg" />
          <div className="content">
            <div>
              <p>Hello ,</p>
              <h5>{admin && `${admin.firstName} ${admin.lastName}`}</h5>
            </div>
            <p>
              Review your upcoming consultations, monitor patient updates, and stay organized throughout your medical schedule.
            </p>
          </div>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>

        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>{doctors.length}</h3>
        </div>
      </div>

      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
              <th>Visited</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0
              ? appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                    <td>{appointment.appointment_date.substring(0, 16)}</td>
                    <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                    <td>{appointment.department}</td>
                    <td>
                      <select
                        className={
                          appointment.status === "Pending"
                            ? "value-pending"
                            : appointment.status === "Accepted"
                            ? "value-accepted"
                            : "value-rejected"
                        }
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending" className="value-pending">
                          Pending
                        </option>
                        <option value="Accepted" className="value-accepted">
                          Accepted
                        </option>
                        <option value="Rejected" className="value-rejected">
                          Rejected
                        </option>
                      </select>
                    </td>
                    <td>
                      {appointment.hasVisited === true ? (
                        <GoCheckCircleFill className="green" />
                      ) : (
                        <AiFillCloseCircle className="red" />
                      )}
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(appointment._id)}
                        style={{
                          color: "red",
                          cursor: "pointer",
                          padding: "4px 8px",
                          borderRadius: "4px",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    No Appointments Found!
                  </td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Dashboard;


