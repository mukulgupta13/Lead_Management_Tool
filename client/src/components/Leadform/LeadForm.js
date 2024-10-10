import React, { useEffect, useState } from 'react';
import './LeadForm.css';
import { createLead, fetchLeadById, updateLead } from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const LeadForm = () => {
    const [formData, setFormData] = useState({
        leadName: '',
        contactNumber: '',
        email: '',
        address: '',
        status: '',
        assignedTo: '',
        nextFollowUpDate: '',
        nextFollowUpTime: '',
        leadSource: '',
        conversionDate: '',
        leadNotes: '',
        customerType: '',
        purchaseHistory: '',
        medicalNeeds: '',
    });
    const [error, setError] = useState("");
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            fetchLeadById(id).then((res) => {
                const data = res.data.lead;
                setFormData(data[0]);
                // console.log('ggggggg',data);
            })
        }
    }, [id]);
    const handleChange = (e) => {
        setError("");
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateLead(id, formData).then((res) => {
                navigate('/lead-list');
            }).catch((err) => {
                setError(err.response.data.message);
            })
        }
        else {
            createLead(formData).then((res) => {
                navigate('/lead-list');
            }).catch((err) => {
                setError(err.response.data.message);
            })
        }
        // console.log('Lead Data:', formData);
    };

    return (
        <div className="lead-form-container">
            <h2>Lead Information</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="input-group">
                        <label>Lead Name</label>
                        <input
                            type="text"
                            name="leadName"
                            value={formData.leadName}
                            onChange={handleChange}
                            placeholder="Enter lead name"
                        />
                    </div>

                    <div className="input-group">
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            placeholder="Enter contact number"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Enter address"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            {/* <option value="">Select Status</option> */}
                            <option value="new" default>New</option>
                            <option value="in-progress">In Progress</option>
                            <option value="converted">Converted</option>
                            <option value="lost">Lost</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Assigned To</label>
                        <input
                            type="text"
                            name="assignedTo"
                            value={formData.assignedTo}
                            onChange={handleChange}
                            placeholder="Enter assigned person's name"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Next Follow-up Date</label>
                        <input
                            type="date"
                            name="nextFollowUpDate"
                            value={formData.nextFollowUpDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label>Next Follow-up Time</label>
                        <input
                            type="time"
                            name="nextFollowUpTime"
                            value={formData.nextFollowUpTime}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Lead Source</label>
                        <input
                            type="text"
                            name="leadSource"
                            value={formData.leadSource}
                            onChange={handleChange}
                            placeholder="Enter lead source"
                        />
                    </div>

                    <div className="input-group">
                        <label>Conversion Date</label>
                        <input
                            type="date"
                            name="conversionDate"
                            value={formData.conversionDate}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Lead Notes</label>
                        <textarea
                            name="leadNotes"
                            value={formData.leadNotes}
                            onChange={handleChange}
                            placeholder="Enter any additional notes"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Customer Type</label>
                        <input
                            type="text"
                            name="customerType"
                            value={formData.customerType}
                            onChange={handleChange}
                            placeholder="Enter customer type"
                        />
                    </div>

                    <div className="input-group">
                        <label>Purchase History</label>
                        <textarea
                            name="purchaseHistory"
                            value={formData.purchaseHistory}
                            onChange={handleChange}
                            placeholder="Enter purchase history"
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="input-group">
                        <label>Medical Needs</label>
                        <textarea
                            name="medicalNeeds"
                            value={formData.medicalNeeds}
                            onChange={handleChange}
                            placeholder="Enter medical needs"
                        />
                    </div>
                </div>

                <button type="submit">{id ? "Update Lead" : "Submit Lead"}</button>
                <button onClick={() => navigate('/lead-list')}>Go Back</button>
            </form>
        </div>
    );
};

export default LeadForm;
