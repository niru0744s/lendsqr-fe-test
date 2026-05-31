import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUsers } from '../../context/UserContext';
import { 
  Users as UsersIcon, Coins, PiggyBank, 
  MoreVertical, Eye, UserX, CheckCircle, Filter, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import './Users.scss';

export const Users: React.FC = () => {
  const { users, stats, isLoading, activateUser, blacklistUser } = useUsers();
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Active kebab menu user ID
  const [activeKebabId, setActiveKebabId] = useState<string | null>(null);

  // Filter Panel States
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterOrg, setFilterOrg] = useState('');
  const [filterUsername, setFilterUsername] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterPhone, setFilterPhone] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Applied Filter values
  const [appliedFilters, setAppliedFilters] = useState({
    orgName: '',
    userName: '',
    email: '',
    date: '',
    phone: '',
    status: ''
  });

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters({
      orgName: filterOrg,
      userName: filterUsername,
      email: filterEmail,
      date: filterDate,
      phone: filterPhone,
      status: filterStatus
    });
    setCurrentPage(1);
    setShowFilterPanel(false);
  };

  const handleResetFilter = () => {
    setFilterOrg('');
    setFilterUsername('');
    setFilterEmail('');
    setFilterDate('');
    setFilterPhone('');
    setFilterStatus('');
    setAppliedFilters({
      orgName: '',
      userName: '',
      email: '',
      date: '',
      phone: '',
      status: ''
    });
    setCurrentPage(1);
    setShowFilterPanel(false);
  };

  // Filter logic
  const filteredUsers = users.filter(user => {
    if (appliedFilters.orgName && !user.orgName.toLowerCase().includes(appliedFilters.orgName.toLowerCase())) return false;
    if (appliedFilters.userName && !user.userName.toLowerCase().includes(appliedFilters.userName.toLowerCase())) return false;
    if (appliedFilters.email && !user.email.toLowerCase().includes(appliedFilters.email.toLowerCase())) return false;
    if (appliedFilters.phone && !user.phoneNumber.includes(appliedFilters.phone)) return false;
    if (appliedFilters.status && user.status !== appliedFilters.status) return false;
    if (appliedFilters.date && !user.createdAt.toLowerCase().includes(appliedFilters.date.toLowerCase())) return false;
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleKebabClick = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation();
    setActiveKebabId(activeKebabId === userId ? null : userId);
  };

  React.useEffect(() => {
    const closeKebab = () => setActiveKebabId(null);
    document.addEventListener('click', closeKebab);
    return () => document.removeEventListener('click', closeKebab);
  }, []);

  return (
    <div className="users-page">
      <h1 className="users-page__title">Users</h1>

      {/* Dynamic Stats Row */}
      <div className="users-page__stats">
        <div className="stat-card">
          <div className="stat-card__icon-wrapper stat-card__icon-wrapper--pink">
            <UsersIcon size={22} />
          </div>
          <span className="stat-card__label">USERS</span>
          <span className="stat-card__value">
            {isLoading ? '...' : stats.total.toLocaleString()}
          </span>
        </div>
        
        <div className="stat-card">
          <div className="stat-card__icon-wrapper stat-card__icon-wrapper--purple">
            <UsersIcon size={22} />
          </div>
          <span className="stat-card__label">ACTIVE USERS</span>
          <span className="stat-card__value">
            {isLoading ? '...' : stats.active.toLocaleString()}
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon-wrapper stat-card__icon-wrapper--orange">
            <Coins size={22} />
          </div>
          <span className="stat-card__label">USERS WITH LOANS</span>
          <span className="stat-card__value">
            {isLoading ? '...' : stats.withLoans.toLocaleString()}
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card__icon-wrapper stat-card__icon-wrapper--red">
            <PiggyBank size={22} />
          </div>
          <span className="stat-card__label">USERS WITH SAVINGS</span>
          <span className="stat-card__value">
            {isLoading ? '...' : stats.withSavings.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="users-page__table-container">
        {isLoading ? (
          <div className="table-loading">
            <div className="spinner" />
            <span>Fetching data records...</span>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>
                      <div className="th-content">
                        <span>ORGANIZATION</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <span>USERNAME</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <span>EMAIL</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <span>PHONE NUMBER</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <span>DATE JOINED</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th>
                      <div className="th-content">
                        <span>STATUS</span>
                        <Filter size={12} className="filter-icon" onClick={() => setShowFilterPanel(!showFilterPanel)} />
                      </div>
                    </th>
                    <th aria-label="Actions"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="no-data">No user records match the filters.</td>
                    </tr>
                  ) : (
                    currentItems.map(user => (
                      <tr key={user.id} onClick={() => navigate(`/dashboard/users/${user.id}`)}>
                        <td className="text-truncate">{user.orgName}</td>
                        <td className="text-truncate">{user.userName}</td>
                        <td className="text-truncate">{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.createdAt}</td>
                        <td>
                          <span className={`status-pill status-pill--${user.status.toLowerCase()}`}>
                            {user.status}
                          </span>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
                          <div className="kebab-wrapper">
                            <button 
                              className="kebab-btn" 
                              onClick={(e) => handleKebabClick(e, user.id)}
                            >
                              <MoreVertical size={16} />
                            </button>

                            {activeKebabId === user.id && (
                              <div className="kebab-menu">
                                <button 
                                  onClick={() => {
                                    navigate(`/dashboard/users/${user.id}`);
                                    setActiveKebabId(null);
                                  }}
                                >
                                  <Eye size={14} />
                                  <span>View Details</span>
                                </button>
                                <button 
                                  onClick={() => {
                                    blacklistUser(user.id);
                                    setActiveKebabId(null);
                                  }}
                                >
                                  <UserX size={14} />
                                  <span>Blacklist User</span>
                                </button>
                                <button 
                                  onClick={() => {
                                    activateUser(user.id);
                                    setActiveKebabId(null);
                                  }}
                                >
                                  <CheckCircle size={14} />
                                  <span>Activate User</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Absolute Filter Overlay Dropdown */}
              {showFilterPanel && (
                <div className="filter-panel">
                  <form onSubmit={handleApplyFilter}>
                    <div className="filter-panel__field">
                      <label>Organization</label>
                      <select value={filterOrg} onChange={(e) => setFilterOrg(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Lendsqr">Lendsqr</option>
                        <option value="Irap">Irap</option>
                        <option value="Lela">Lela</option>
                        <option value="Settle">Settle</option>
                        <option value="Carbon">Carbon</option>
                      </select>
                    </div>

                    <div className="filter-panel__field">
                      <label>Username</label>
                      <input 
                        type="text" 
                        placeholder="User" 
                        value={filterUsername} 
                        onChange={(e) => setFilterUsername(e.target.value)} 
                      />
                    </div>

                    <div className="filter-panel__field">
                      <label>Email</label>
                      <input 
                        type="text" 
                        placeholder="Email" 
                        value={filterEmail} 
                        onChange={(e) => setFilterEmail(e.target.value)} 
                      />
                    </div>

                    <div className="filter-panel__field">
                      <label>Phone Number</label>
                      <input 
                        type="text" 
                        placeholder="Phone Number" 
                        value={filterPhone} 
                        onChange={(e) => setFilterPhone(e.target.value)} 
                      />
                    </div>

                    <div className="filter-panel__field">
                      <label>Status</label>
                      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Blacklisted">Blacklisted</option>
                      </select>
                    </div>

                    <div className="filter-panel__actions">
                      <button type="button" className="btn-reset" onClick={handleResetFilter}>Reset</button>
                      <button type="submit" className="btn-filter">Filter</button>
                    </div>
                  </form>
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            <div className="users-page__pagination">
              <div className="pagination-info">
                <span>Showing</span>
                <select 
                  value={itemsPerPage} 
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>out of {filteredUsers.length}</span>
              </div>

              <div className="pagination-nav">
                <button 
                  className="page-nav-btn" 
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
                  let pageNum = index + 1;
                  if (currentPage > 3 && totalPages > 5) {
                    pageNum = currentPage - 3 + index;
                    if (pageNum + (4 - index) > totalPages) {
                      pageNum = totalPages - 4 + index;
                    }
                  }
                  return (
                    <button
                      key={pageNum}
                      className={`page-num-btn ${currentPage === pageNum ? 'page-num-btn--active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="pagination-ellipsis">...</span>
                    <button
                      className="page-num-btn"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                <button 
                  className="page-nav-btn" 
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
