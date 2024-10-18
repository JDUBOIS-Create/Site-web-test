import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { motion } from 'framer-motion';
import { format, setHours, setMinutes } from 'date-fns';
import './CalendarStyles.css';

const AppointmentCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleDateClick = (arg) => {
    setSelectedDate(arg.date);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Veuillez sélectionner une date et une heure');
      return;
    }
    const [hours, minutes] = selectedTime.split(':');
    const dateTime = setMinutes(setHours(selectedDate, parseInt(hours)), parseInt(minutes));
    console.log('Form submitted:', { ...formData, dateTime });
    alert(`Rendez-vous pris pour le ${format(dateTime, 'dd/MM/yyyy à HH:mm')}. Nous vous contacterons bientôt.`);
    setFormData({ name: '', email: '', message: '' });
    setSelectedDate(null);
    setSelectedTime('');
  };

  return (
    <section id="rendez-vous" className="py-12 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-8 text-purple-300"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Prendre Rendez-vous
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="calendar-container"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek'
              }}
              height={400}
              dateClick={handleDateClick}
              selectable={true}
              selectMirror={true}
              weekends={true}
              nowIndicator={true}
            />
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-gray-700 p-4 rounded-lg shadow-lg">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-purple-300">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-purple-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-purple-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                ></textarea>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-purple-300">Date sélectionnée :</p>
                <p className="text-lg font-semibold text-white">
                  {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Aucune date sélectionnée'}
                </p>
              </div>
              <div className="mb-4">
                <label htmlFor="time" className="block text-sm font-medium mb-2 text-purple-300">Heure</label>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  required
                  className="w-full px-3 py-2 bg-gray-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300"
              >
                Confirmer le rendez-vous
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppointmentCalendar;