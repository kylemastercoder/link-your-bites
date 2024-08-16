import React from "react";
import AppointmentClient from "./components/client";
import { APPOINTMENTS } from "@/data";
import { format } from "date-fns";

const Appointment = () => {
  const formattedAppointments = APPOINTMENTS.map((item) => ({
    id: item.id,
    case: item.case,
    description: item.description,
    branch: item.branch,
    doctor: item.doctor,
    status: item.status,
    createdAt: format(item.createdAt, "MMMM dd, yyyy - hh:mm a"),
  }));
  return (
    <div className="flex-col px-11">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentClient data={formattedAppointments} />
      </div>
    </div>
  );
};

export default Appointment;
