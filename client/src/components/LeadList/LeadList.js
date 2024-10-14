import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLeads } from '../../redux/actions/leadActions';
import { deleteLead, fetchLeads } from '../../services/api'
import './LeadList.css';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../common_comp/Pagination';
import DatePicker from 'react-datepicker';


let PageSize = 5;
const LeadList = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [nextFollowUpDate, setNextFollowUpDate] = useState(null);
    const dispatch = useDispatch();
    const leads = useSelector((state) => state.leads);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        LoadData();
    }, [currentPage, searchTerm, statusFilter,nextFollowUpDate]);
    const LoadData = () => {
        console.log("adadad",nextFollowUpDate);
        const query = {
            page: currentPage,
            limit: PageSize,
            search: searchTerm,
            status: statusFilter,
            nextFollowUpDate: nextFollowUpDate ? nextFollowUpDate : ''
        };
        fetchLeads(query).then((response) => {
            const leadsData = response.data.leads;
            console.log(leadsData); // Handle the response data
            dispatch(setLeads(leadsData));
            setErrorMessage("");
        }).catch((error) => {
            console.log(error.response.data.message);
            setErrorMessage(error.response.data.message);
        });
    }
    // const currentData = useMemo(() => {
    //     const firstPageIndex = (currentPage - 1) * PageSize;
    //     const lastPageIndex = firstPageIndex + PageSize;
    //     return leads.slice(firstPageIndex, lastPageIndex);
    // }, [currentPage, leads]);

    const DeleteLead = (id) => {
        deleteLead(id).then((res) => {
            LoadData();
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    const navigate = useNavigate();
    // Simulate fetching leads
    const goToForm = () => {
        navigate('/leadForm');
    }
    // Event handler for search input
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Event handler for status filter
    const handleStatusChange = (e) => {
        setStatusFilter(e.target.value);
        setCurrentPage(1); // Reset to first page when filtering
    };
    console.log({ currentPage })
    const handleDateChange = (e) => {
        console.log("dfzdff",e);
        setNextFollowUpDate(e.target.value); // Directly set the string value
        setCurrentPage(1);
    };
    return (
        <div style={{ textAlign: 'center' }}>
            <h1 style={{ textAlign: 'center' }}>Lead List</h1>
            {/* <button onClick={fetchAllLeads}>Load Leads</button> */}
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: '10px' }}
            />

            {/* Status Filter Dropdown */}
            <select value={statusFilter} onChange={handleStatusChange} style={{ margin: '10px' }}>
                <option value="">Select Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
            </select>
            <div style={{ display: 'inline-block', margin: '10px' }}>
                <input
                    value={nextFollowUpDate}
                    type="date"
                    name="nextFollowUpDate"
                    onChange={handleDateChange}
                />
                {/* <DatePicker
                    selected={nextFollowUpDate}
                    onChange={(date) => setNextFollowUpDate(date)}
                    placeholderText="Select Next Follow-Up Date"
                /> */}
            </div>
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
                            <button style={{ margin: '2px' }} onClick={() => navigate(`/leadForm/${lead._id}`)}>Edit Lead</button>
                            <button style={{ margin: '2px' }} onClick={() => DeleteLead(lead._id)}>Delete Lead</button>
                        </div>
                    </div>
                ))}
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={100}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>
        </div>

    );
};

export default LeadList;
