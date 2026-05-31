import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Briefcase, Home, Users, UserCheck, PiggyBank, Handshake, 
  Coins, ArrowLeftRight, Server, Settings, Scroll, BarChart3, 
  Sliders, Percent, ClipboardList, ChevronDown, LogOut, X,
  UserX
} from 'lucide-react';
import './Sidebar.scss';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Overlay backdrop */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`dashboard-sidebar ${isOpen ? 'dashboard-sidebar--open' : ''}`}>
        {/* Mobile close button */}
        <button className="dashboard-sidebar__close-btn" onClick={onClose} aria-label="Close sidebar">
          <X size={24} />
        </button>

        {/* Switch Organization dropdown */}
        <div className="dashboard-sidebar__org-switcher">
          <Briefcase size={16} className="dashboard-sidebar__org-icon" />
          <span className="dashboard-sidebar__org-name">Switch Organization</span>
          <ChevronDown size={14} className="dashboard-sidebar__org-arrow" />
        </div>

        {/* Main Dashboard Navigation */}
        <div className="dashboard-sidebar__nav-section">
          <NavLink 
            to="/dashboard" 
            end
            className={({ isActive }) => `dashboard-sidebar__link ${isActive ? 'dashboard-sidebar__link--active' : ''}`}
            onClick={onClose}
          >
            <Home size={16} />
            <span>Dashboard</span>
          </NavLink>
        </div>

        {/* CUSTOMERS Group */}
        <div className="dashboard-sidebar__group">
          <h3 className="dashboard-sidebar__group-title">CUSTOMERS</h3>
          <div className="dashboard-sidebar__group-links">
            <NavLink 
              to="/dashboard/users" 
              className={({ isActive }) => `dashboard-sidebar__link ${isActive ? 'dashboard-sidebar__link--active' : ''}`}
              onClick={onClose}
            >
              <Users size={16} />
              <span>Users</span>
            </NavLink>
            <NavLink to="/dashboard/guarantors" className="dashboard-sidebar__link" onClick={onClose}>
              <Users size={16} />
              <span>Guarantors</span>
            </NavLink>
            <NavLink to="/dashboard/loans" className="dashboard-sidebar__link" onClick={onClose}>
              <Coins size={16} />
              <span>Loans</span>
            </NavLink>
            <NavLink to="/dashboard/decision-models" className="dashboard-sidebar__link" onClick={onClose}>
              <Handshake size={16} />
              <span>Decision Models</span>
            </NavLink>
            <NavLink to="/dashboard/savings" className="dashboard-sidebar__link" onClick={onClose}>
              <PiggyBank size={16} />
              <span>Savings</span>
            </NavLink>
            <NavLink to="/dashboard/loan-requests" className="dashboard-sidebar__link" onClick={onClose}>
              <Coins size={16} />
              <span>Loan Requests</span>
            </NavLink>
            <NavLink to="/dashboard/whitelist" className="dashboard-sidebar__link" onClick={onClose}>
              <UserCheck size={16} />
              <span>Whitelist</span>
            </NavLink>
            <NavLink to="/dashboard/karma" className="dashboard-sidebar__link" onClick={onClose}>
              <UserX size={16} />
              <span>Karma</span>
            </NavLink>
          </div>
        </div>

        {/* BUSINESSES Group */}
        <div className="dashboard-sidebar__group">
          <h3 className="dashboard-sidebar__group-title">BUSINESSES</h3>
          <div className="dashboard-sidebar__group-links">
            <NavLink to="/dashboard/organizations" className="dashboard-sidebar__link" onClick={onClose}>
              <Briefcase size={16} />
              <span>Organization</span>
            </NavLink>
            <NavLink to="/dashboard/loan-products" className="dashboard-sidebar__link" onClick={onClose}>
              <Coins size={16} />
              <span>Loan Products</span>
            </NavLink>
            <NavLink to="/dashboard/savings-products" className="dashboard-sidebar__link" onClick={onClose}>
              <PiggyBank size={16} />
              <span>Savings Products</span>
            </NavLink>
            <NavLink to="/dashboard/fees-charges" className="dashboard-sidebar__link" onClick={onClose}>
              <Coins size={16} />
              <span>Fees and Charges</span>
            </NavLink>
            <NavLink to="/dashboard/transactions" className="dashboard-sidebar__link" onClick={onClose}>
              <ArrowLeftRight size={16} />
              <span>Transactions</span>
            </NavLink>
            <NavLink to="/dashboard/services" className="dashboard-sidebar__link" onClick={onClose}>
              <Server size={16} />
              <span>Services</span>
            </NavLink>
            <NavLink to="/dashboard/service-account" className="dashboard-sidebar__link" onClick={onClose}>
              <Settings size={16} />
              <span>Service Account</span>
            </NavLink>
            <NavLink to="/dashboard/settlements" className="dashboard-sidebar__link" onClick={onClose}>
              <Scroll size={16} />
              <span>Settlements</span>
            </NavLink>
            <NavLink to="/dashboard/reports" className="dashboard-sidebar__link" onClick={onClose}>
              <BarChart3 size={16} />
              <span>Reports</span>
            </NavLink>
          </div>
        </div>

        {/* SETTINGS Group */}
        <div className="dashboard-sidebar__group">
          <h3 className="dashboard-sidebar__group-title">SETTINGS</h3>
          <div className="dashboard-sidebar__group-links">
            <NavLink to="/dashboard/preferences" className="dashboard-sidebar__link" onClick={onClose}>
              <Sliders size={16} />
              <span>Preferences</span>
            </NavLink>
            <NavLink to="/dashboard/fees-pricing" className="dashboard-sidebar__link" onClick={onClose}>
              <Percent size={16} />
              <span>Fees and Pricing</span>
            </NavLink>
            <NavLink to="/dashboard/audit-logs" className="dashboard-sidebar__link" onClick={onClose}>
              <ClipboardList size={16} />
              <span>Audit Logs</span>
            </NavLink>
          </div>
        </div>

        {/* Logout Link */}
        <div className="dashboard-sidebar__footer">
          <NavLink to="/login" className="dashboard-sidebar__link" onClick={onClose}>
            <LogOut size={16} />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
};
