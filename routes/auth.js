const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Client = require('../models/Client');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route       GET api/auth
// @desc        Get logged in user
// @access      Private
router.get('/', auth, async (request, response) => {
	try {
		const client = await Client.findById(request.client.id).select('-password');
		response.json(client);
	} catch (err) {
		response.status(500).send('Server Error');
	}
});

// @route       POST api/auth/client
// @desc        Authenticate a client and get token
// @access      Public
router.post(
	'/',
	[
		check('email', 'Please include valid email').isEmail(),
		check('password', 'Please enter at least 8 characters').exists()
	],
	async (request, response) => {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			return response.status(400).json({ errors: errors.array() });
		} else {
			const { email, password } = request.body;
			try {
				let client = await Client.findOne({ email });
				if (!client) {
					return response.status(400).json({ message: 'Invalid Credentials' });
				}
				const isMatch = await bcrypt.compare(password, client.password);
				if (!isMatch) {
					return response.status(400).json({ message: 'Invalid Credentials' });
				} else {
					const payload = {
						client: {
							id: client.id
						}
					};
					jwt.sign(
						payload,
						config.get('jwtSecret'),
						{
							expiresIn: 240000
						},
						(err, token) => {
							if (err) {
								throw err;
							} else {
								console.log(token);
								response.json({ token });
							}
						}
					);
				}
			} catch (err) {
				response.status(500).send('Server Error');
			}
		}
	}
);

module.exports = router;
