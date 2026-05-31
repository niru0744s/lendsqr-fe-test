import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import './Header.scss';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <header className="dashboard-header">
      {/* Left side: Hamburger (mobile only) & Logo */}
      <div className="dashboard-header__left">
        <button 
          className="dashboard-header__menu-btn" 
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        
        <div className="dashboard-header__logo-wrapper">
          <img src="/logo/Group.svg" alt="Lendsqr Logo" className="dashboard-header__logo-img" />
        </div>
      </div>

      {/* Center: Search Bar */}
      <div className="dashboard-header__center">
        <div className="dashboard-header__search-group">
          <input 
            type="text" 
            placeholder="Search for anything" 
            className="dashboard-header__search-input"
          />
          <button className="dashboard-header__search-btn" aria-label="Search">
            <Search size={16} color="#ffffff" />
          </button>
        </div>
      </div>

      {/* Right side: Profile & Navigation */}
      <div className="dashboard-header__right">
        <a href="#docs" className="dashboard-header__docs-link">Docs</a>
        
        <button className="dashboard-header__notif-btn" aria-label="Notifications">
          <Bell size={20} />
        </button>
        
        <div className="dashboard-header__profile">
          <img 
            src="/mockups/navImg.png" 
            alt="User Avatar" 
            className="dashboard-header__profile-avatar"
          />
          <span className="dashboard-header__profile-name">Adedeji</span>
          <ChevronDown size={14} className="dashboard-header__profile-arrow" />
        </div>
      </div>
    </header>
  );
};
