// Entry point to Ducky backend
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/clients/activities', require('./routes/activities'));
app.use('/api/clients', require('./routes/clients'));

if (process.env.NODE_ENV === 'production') {
	// Set static folder
	app.use(express.static('client/build'));
	app.get('*', (request, response) => response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}
app.listen(PORT, () => console.log(`Ducky server started on port ${PORT}`));
