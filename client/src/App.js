import './App.css';
import LeadList from './components/LeadList/LeadList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/UserLogin/Login'
import LeadForm from './components/Leadform/LeadForm';
import UserForm from './components/UserForm/UserForm';


function App() {
  return (
    <>
    <div>
      <h1 style={{ textAlign: 'center' }}>Lead Management Tool</h1>
    </div>
    <Router>
      <Routes>
        <Route path="/lead-list" element ={<LeadList />}/>
        <Route path="/login" element ={<Login/>}/>
        <Route path="/leadForm" element ={<LeadForm/>}/>
        <Route path="/leadForm/:id" element ={<LeadForm/>}/>
        <Route path="/register" element ={<UserForm/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
