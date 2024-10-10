import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLeads } from '../../redux/actions/leadActions';
import { deleteLead, fetchLeads } from '../../services/api'
import './LeadList.css';
import { useNavigate } from 'react-router-dom';

const LeadList = () => {
    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        LoadData();
    }, [])
const LoadData = () =>{
    fetchLeads().then((response) => {
        const leadsData = response.data.leads;
        console.log(leadsData); // Handle the response data
        dispatch(setLeads(leadsData));
        setErrorMessage("");
    }).catch((error) => {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
    });
}
const DeleteLead = (id) =>{
    deleteLead(id).then((res)=>{
        LoadData();
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
}
    const navigate = useNavigate();
    // Simulate fetching leads
    const goToForm = () => {
        navigate('/leadForm');
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Lead List</h1>
            {/* <button onClick={fetchAllLeads}>Load Leads</button> */}
            <button onClick={goToForm}>Create Leads</button>
            {/* <ul>
                {leads.map((lead) => (
                    <li key={lead.id}>
                        {lead.leadName} - {lead.status}
                    </li>
                ))}
            </ul> */}
            <div style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '20px', color: 'red' }}>{errorMessage.length > 0 ? errorMessage : ""}</div>
            <div className="lead-container">
                {leads.map((lead) => (
                    <div key={lead._id} className="lead-item">
                        <div>{lead.leadName}</div>
                        <div>{lead.contactNumber}</div>
                        <div>{lead.email}</div>
                        <div>{lead.address}</div>
                        <div>{lead.status}</div>
                        <div>
                            <button style={{margin: '2px'}} onClick={() => navigate(`/leadForm/${lead._id}`)}>Edit Lead</button>
                            <button style={{margin: '2px'}} onClick={() => DeleteLead(lead._id)}>Delete Lead</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadList;
