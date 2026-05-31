import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { UserProfile } from '../../utils/mockData';
import { ArrowLeft, Star, User } from 'lucide-react';
import './UserDetails.scss';

export const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, activateUser, blacklistUser, isLoading } = useUsers();
  
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState('General Details');

  useEffect(() => {
    if (users.length > 0 && id) {
      const found = users.find(u => u.id === id);
      if (found) {
        setUser(found);
      }
    }
  }, [users, id]);

  if (isLoading || !user) {
    return (
      <div className="details-loading">
        <div className="spinner" />
        <span>Loading user details...</span>
      </div>
    );
  }

  const handleActivate = () => {
    activateUser(user.id);
    // Update local state for immediate feedback
    setUser({ ...user, status: 'Active' });
  };

  const handleBlacklist = () => {
    blacklistUser(user.id);
    // Update local state for immediate feedback
    setUser({ ...user, status: 'Blacklisted' });
  };

  return (
    <div className="user-details-page">
      {/* Back button */}
      <button className="back-btn" onClick={() => navigate('/dashboard/users')}>
        <ArrowLeft size={16} />
        <span>Back to Users</span>
      </button>

      {/* Header action row */}
      <div className="user-details-page__header">
        <h1 className="user-details-page__title">User Details</h1>
        
        <div className="user-details-page__actions">
          <button className="btn-action btn-action--blacklist" onClick={handleBlacklist}>
            BLACKLIST USER
          </button>
          <button className="btn-action btn-action--activate" onClick={handleActivate}>
            ACTIVATE USER
          </button>
        </div>
      </div>

      {/* Top Card: Summary */}
      <div className="summary-card">
        <div className="summary-card__top">
          {/* Section 1: Basic Profile */}
          <div className="summary-card__profile">
            <div className="summary-card__avatar">
              <User size={40} color="#213F7D" />
            </div>
            <div className="summary-card__name-wrapper">
              <h2>{user.personalInfo.fullName}</h2>
              <p>{user.id}</p>
            </div>
          </div>

          <div className="divider-vertical" />

          {/* Section 2: User Tier */}
          <div className="summary-card__tier">
            <span>User's Tier</span>
            <div className="stars-wrapper">
              <Star size={16} fill="#E9B200" color="#E9B200" />
              <Star size={16} fill="none" color="#E9B200" />
              <Star size={16} fill="none" color="#E9B200" />
            </div>
          </div>

          <div className="divider-vertical" />

          {/* Section 3: Financials */}
          <div className="summary-card__balance">
            <h2>{user.accountBalance}</h2>
            <p>{user.accountNumber}/{user.bankName}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="summary-card__tabs">
          {[
            'General Details', 
            'Documents', 
            'Bank Details', 
            'Loans', 
            'Savings', 
            'App and System'
          ].map(tab => (
            <button 
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Card: Content Panel */}
      <div className="content-card">
        {activeTab === 'General Details' ? (
          <div className="general-details">
            {/* Section 1: Personal Information */}
            <div className="details-section">
              <h3 className="details-section__title">Personal Information</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-item__label">FULL NAME</span>
                  <span className="detail-item__value">{user.personalInfo.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">PHONE NUMBER</span>
                  <span className="detail-item__value">{user.personalInfo.phoneNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">EMAIL ADDRESS</span>
                  <span className="detail-item__value">{user.personalInfo.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">BVN</span>
                  <span className="detail-item__value">{user.personalInfo.bvn}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">GENDER</span>
                  <span className="detail-item__value">{user.personalInfo.gender}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">MARITAL STATUS</span>
                  <span className="detail-item__value">{user.personalInfo.maritalStatus}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">CHILDREN</span>
                  <span className="detail-item__value">{user.personalInfo.children}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">TYPE OF RESIDENCE</span>
                  <span className="detail-item__value">{user.personalInfo.typeOfResidence}</span>
                </div>
              </div>
            </div>

            <hr className="details-divider" />

            {/* Section 2: Education and Employment */}
            <div className="details-section">
              <h3 className="details-section__title">Education and Employment</h3>
              <div className="details-grid details-grid--education">
                <div className="detail-item">
                  <span className="detail-item__label">LEVEL OF EDUCATION</span>
                  <span className="detail-item__value">{user.educationAndEmployment.level}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">EMPLOYMENT STATUS</span>
                  <span className="detail-item__value">{user.educationAndEmployment.employmentStatus}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">SECTOR OF EMPLOYMENT</span>
                  <span className="detail-item__value">{user.educationAndEmployment.sector}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">DURATION OF EMPLOYMENT</span>
                  <span className="detail-item__value">{user.educationAndEmployment.duration}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">OFFICE EMAIL</span>
                  <span className="detail-item__value">{user.educationAndEmployment.officeEmail}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">MONTHLY INCOME</span>
                  <span className="detail-item__value">{user.educationAndEmployment.monthlyIncome}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">LOAN REPAYMENT</span>
                  <span className="detail-item__value">{user.educationAndEmployment.loanRepayment}</span>
                </div>
              </div>
            </div>

            <hr className="details-divider" />

            {/* Section 3: Socials */}
            <div className="details-section">
              <h3 className="details-section__title">Socials</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-item__label">TWITTER</span>
                  <span className="detail-item__value">{user.socials.twitter}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">FACEBOOK</span>
                  <span className="detail-item__value">{user.socials.facebook}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">INSTAGRAM</span>
                  <span className="detail-item__value">{user.socials.instagram}</span>
                </div>
              </div>
            </div>

            <hr className="details-divider" />

            {/* Section 4: Guarantor */}
            <div className="details-section">
              <h3 className="details-section__title">Guarantor</h3>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-item__label">FULL NAME</span>
                  <span className="detail-item__value">{user.guarantor.fullName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">PHONE NUMBER</span>
                  <span className="detail-item__value">{user.guarantor.phoneNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">EMAIL ADDRESS</span>
                  <span className="detail-item__value">{user.guarantor.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-item__label">RELATIONSHIP</span>
                  <span className="detail-item__value">{user.guarantor.relationship}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="tab-placeholder">
            <h3>{activeTab} Content</h3>
            <p>Mock section details for {user.personalInfo.fullName}'s {activeTab.toLowerCase()}.</p>
          </div>
        )}
      </div>
    </div>
  );
};
