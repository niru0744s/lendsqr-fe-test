import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { UserDetails } from './UserDetails';
import { useUsers } from '../../context/UserContext';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { UserProfile } from '../../utils/mockData';

// Mock the specific context/hooks
vi.mock('../../context/UserContext', () => ({
  useUsers: vi.fn(),
}));

const mockActivateUser = vi.fn();
const mockBlacklistUser = vi.fn();

// Generate a valid mock user satisfying the UserProfile interface
const mockUser: UserProfile = {
  id: '1',
  orgName: 'Lendsqr',
  userName: 'grace_effiom',
  email: 'grace@example.com',
  phoneNumber: '08078903721',
  createdAt: '2023-01-01T10:00:00Z',
  status: 'Active',
  accountBalance: '₦200,000.00',
  accountNumber: '9912345678',
  bankName: 'Providus Bank',
  personalInfo: {
    fullName: 'Grace Effiom',
    phoneNumber: '08078903721',
    email: 'grace@example.com',
    bvn: '12345678901',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Own House',
  },
  educationAndEmployment: {
    level: 'B.Sc',
    employmentStatus: 'Employed',
    sector: 'FinTech',
    duration: '1-3 years',
    officeEmail: 'grace@lendsqr.com',
    monthlyIncome: '₦200,000 - ₦400,000',
    loanRepayment: '₦40,000.00',
  },
  socials: {
    twitter: '@grace_effiom',
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',
  },
  guarantor: {
    fullName: 'John Doe',
    phoneNumber: '08012345678',
    email: 'john.doe@example.com',
    relationship: 'Brother',
  },
};

describe('UserDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const customRender = (route = '/dashboard/users/1') => {
    return render(
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/dashboard/users/:id" element={<UserDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  // --- POSITIVE SCENARIOS ---

  it('renders loading state successfully', () => {
    // Mock the hook to signify loading
    (useUsers as any).mockReturnValue({
      users: [],
      isLoading: true,
      activateUser: mockActivateUser,
      blacklistUser: mockBlacklistUser,
    });

    customRender();
    expect(screen.getByText(/Loading user details.../i)).toBeInTheDocument();
  });

  it('renders user details properly when an existing ID is provided', () => {
    (useUsers as any).mockReturnValue({
      users: [mockUser],
      isLoading: false,
      activateUser: mockActivateUser,
      blacklistUser: mockBlacklistUser,
    });

    customRender('/dashboard/users/1');
    expect(screen.getByText('User Details')).toBeInTheDocument();
    expect(screen.getAllByText('Grace Effiom').length).toBeGreaterThan(0);
  });

  it('calls blacklistUser when the Blacklist button is clicked', () => {
    (useUsers as any).mockReturnValue({
      users: [mockUser],
      isLoading: false,
      activateUser: mockActivateUser,
      blacklistUser: mockBlacklistUser,
    });

    customRender('/dashboard/users/1');
    
    const blacklistBtn = screen.getByText(/BLACKLIST USER/i);
    fireEvent.click(blacklistBtn);

    expect(mockBlacklistUser).toHaveBeenCalledWith('1');
  });

  it('calls activateUser when the Activate button is clicked', () => {
    (useUsers as any).mockReturnValue({
      users: [mockUser],
      isLoading: false,
      activateUser: mockActivateUser,
      blacklistUser: mockBlacklistUser,
    });

    customRender('/dashboard/users/1');
    
    const activateBtn = screen.getByText(/ACTIVATE USER/i);
    fireEvent.click(activateBtn);

    expect(mockActivateUser).toHaveBeenCalledWith('1');
  });

  // --- NEGATIVE SCENARIOS ---

  it('stays in a loading/empty state if a non-existent user ID is provided', () => {
    (useUsers as any).mockReturnValue({
      users: [mockUser], // Only ID '1' exists
      isLoading: false,
      activateUser: mockActivateUser,
      blacklistUser: mockBlacklistUser,
    });

    // Provide an invalid ID ('999')
    customRender('/dashboard/users/999');
    
    // User is missing, component should fallback to loading/null safe state
    expect(screen.getByText(/Loading user details.../i)).toBeInTheDocument();
  });
});
