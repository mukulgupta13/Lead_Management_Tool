const express = require('express');
const { getLeads, createLead, updateLead, deleteLead, getLeadById} = require('../controllers/leadController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getLeads) // Pagination, filtering, etc. inside controller
  .post(protect, authorizeRoles(['admin']), createLead); 

router.route('/:id')
  .get(protect, authorizeRoles(['admin']), getLeadById)
  .put(protect, authorizeRoles(['admin']), updateLead)
  .delete(protect, authorizeRoles(['admin']), deleteLead);

module.exports = router;
