const express = require('express');
const { getLeads, createLead, updateLead, deleteLead} = require('../controllers/leadController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getLeads) // Pagination, filtering, etc. inside controller
  .post(protect, authorizeRoles(['admin']), createLead); 

router.route('/:id')
  .put(protect, authorizeRoles(['admin']), updateLead)
  .delete(protect, authorizeRoles(['admin']), deleteLead);

module.exports = router;
