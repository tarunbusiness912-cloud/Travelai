const express = require('express');
const router = express.Router();
const { getExpensesByTrip, createExpense } = require('../controllers/expenseController');

// This handles POST /api/expenses/
router.post('/', createExpense);

// This handles GET /api/expenses/:tripId
router.get('/:tripId', getExpensesByTrip);

module.exports = router;