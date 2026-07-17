const express = require('express');
const router = express.Router();
const { getTripBudget, saveBudgetLimit } = require('../controllers/budgetController');

router.route('/')
  .post(saveBudgetLimit);

router.route('/:tripId')
  .get(getTripBudget);

module.exports = router;