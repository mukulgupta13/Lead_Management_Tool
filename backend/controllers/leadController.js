const Lead = require('../models/Leads');

// Create a new lead
const createLead = async (req, res) => {
  const { leadName, contactNumber, email, address, status, assignedTo, nextFollowUpDate, nextFollowUpTime, leadSource, conversionDate, leadNotes, customerType, purchaseHistory, medicalNeeds } = req.body;

  try {
    const lead = new Lead({
      leadName,
      contactNumber,
      email,
      address,
      status,
      assignedTo,
      nextFollowUpDate,
      nextFollowUpTime,
      leadSource,
      conversionDate,
      leadNotes,
      customerType,
      purchaseHistory,
      medicalNeeds
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leads (with pagination, filtering, sorting, and searching)
const getLeads = async (req, res) => {
  const { page = 1, limit = 10, search = '', sort = 'leadName', status } = req.query;

  try {
    const query = { leadName: new RegExp(search, 'i') };

    if (status) query.status = status;

    const leads = await Lead.find(query)
      .sort({ [sort]: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalLeads = await Lead.countDocuments(query);

    res.json({ leads, totalLeads });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findByIdAndUpdate(id, req.body, { new: true });
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a lead
const deleteLead = async (req, res) => {
  const { id } = req.params;

  try {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });

    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead, getLeads, updateLead, deleteLead };
