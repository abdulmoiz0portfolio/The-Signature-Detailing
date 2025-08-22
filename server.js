const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/car-detailing', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

const appointmentSchema = new mongoose.Schema({
    name: String,
    service: String,
    date: Date
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

app.use(cors());
app.use(bodyParser.json());

app.post('/book-appointment', (req, res) => {
    const { name, service, date } = req.body;

    const newAppointment = new Appointment({
        name: name,
        service: service,
        date: new Date(date)
    });

    newAppointment.save()
        .then(() => res.json({ message: 'Appointment booked successfully!' }))
        .catch(err => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
