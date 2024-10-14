const Lead = require('../models/Leads');

// Create a new lead
const createLead = async (req, res) => {
  const newIsoDate = new Date(req.body.nextFollowUpDate);
  const isoStringDate = newIsoDate.toISOString();
  req.body.nextFollowUpDate = isoStringDate;
  // const { leadName, contactNumber, email, address, status, assignedTo, nextFollowUpDate, nextFollowUpTime, leadSource, conversionDate, leadNotes, customerType, purchaseHistory, medicalNeeds } = req.body;
  // console.log('sdfsdfsdfs',nextFollowUpDate);
  try {
    const lead = new Lead(
      req.body
    );

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all leads (with pagination, filtering, sorting, and searching)
// const getLeads = async (req, res) => {
//   const { page = 1, limit = 100, search = '', status } = req.query;

//   try {
//     const query = { leadName: new RegExp(search, 'i') };
//     const page = parseInt(req.query.page);
//     // Calculate the start and end indexes for the requested page

//     if (status) query.status = status;

//     const leads = await Lead.find(query)
//       // .sort({ [sort]: 1 })
//       .skip((page - 1) * limit)
//       .limit(Number(limit));

//     const totalLeads = await Lead.countDocuments(query);

//     res.json({ leads, totalLeads });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const getLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', status = '', nextFollowUpDate } = req.query;

    // Create a dynamic query object based on the search and filter parameters
    let query = {};

    // Add search conditions
    if (search) {
      query = {
        $or: [
          { leadName: { $regex: search, $options: 'i' } },  // Case-insensitive search on leadName
          { email: { $regex: search, $options: 'i' } },      // Case-insensitive search on email
          { contactNumber: { $regex: search, $options: 'i' } } // Search on contact number
        ]
      };
    }

    // Add filter conditions (e.g., based on lead status)
    if (status) {
      query.status = status;
    }
    if (nextFollowUpDate) {
      query.nextFollowUpDate = {
        $eq: new Date(nextFollowUpDate)  // Match exact follow-up date
      };
    }
    // Fetch filtered, searched, and paginated leads
    const leads = await Lead.find(query)
      // .sort({ [sort]: 1 })        // Sorting
      .skip((page - 1) * limit)   // Pagination
      .limit(Number(limit));      // Limit number of results

    // Fetch total count of leads that match the filter and search criteria
    const totalLeads = await Lead.countDocuments(query);

    // Return the leads and pagination info
    return res.status(200).json({
      leads,
      currentPage: Number(page),
      totalLeads,
      totalPages: Math.ceil(totalLeads / limit)
    });

  } catch (error) {
    return res.status(500).json({ message: "Error fetching leads", error });
  }
};

const getLeadById = async (req, res) => {

  try {

    const { id } = req.params;
    const lead = await Lead.find({ _id: id })

    res.json({ lead });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a lead
const updateLead = async (req, res) => {
  const { id } = req.params;
  const newIsoDate = new Date(req.body.nextFollowUpDate);
  const isoStringDate = newIsoDate.toISOString();
  req.body.nextFollowUpDate = isoStringDate;
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

module.exports = { createLead, getLeads, updateLead, deleteLead, getLeadById };
