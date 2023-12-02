const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

let estateData = [];

// Validation middleware
const validateEstate = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  // Add more validation rules as needed
];

app.get('/api/estates', (req, res) => {
  res.json(estateData);
});

app.post('/api/estates', validateEstate, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newEstate = { ...req.body, id: estateData.length + 1 };
  estateData.push(newEstate);
  res.status(201).json(newEstate);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
