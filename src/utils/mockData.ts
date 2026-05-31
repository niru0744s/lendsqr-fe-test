export interface UserProfile {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  personalInfo: {
    fullName: string;
    phoneNumber: string;
    email: string;
    bvn: string;
    gender: 'Male' | 'Female';
    maritalStatus: 'Single' | 'Married' | 'Divorced';
    children: 'None' | '1' | '2' | '3+';
    typeOfResidence: 'Own House' | 'Rented' | 'Parental';
  };
  educationAndEmployment: {
    level: 'B.Sc' | 'M.Sc' | 'HND' | 'OND' | 'Ph.D';
    employmentStatus: 'Employed' | 'Unemployed' | 'Self-Employed';
    sector: 'FinTech' | 'Banking' | 'Education' | 'Healthcare' | 'Telecom';
    duration: '1-3 years' | '3-5 years' | '5+ years';
    officeEmail: string;
    monthlyIncome: string; // e.g. "₦200,000 - ₦500,000"
    loanRepayment: string;
  };
  socials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  guarantor: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: 'Sister' | 'Brother' | 'Parent' | 'Friend' | 'Spouse';
  };
}

const ORGS = ['Lendsqr', 'Irap', 'Lela', 'Settle', 'Moni', 'Kuda', 'Carbon', 'FairMoney'];
const SECTORS = ['FinTech', 'Banking', 'Education', 'Healthcare', 'Telecom'];
const STATUSES: Array<'Active' | 'Inactive' | 'Pending' | 'Blacklisted'> = ['Active', 'Inactive', 'Pending', 'Blacklisted'];
const RESIDENCES = ['Own House', 'Rented', 'Parental'];
const EDUCATION_LEVELS = ['B.Sc', 'M.Sc', 'HND', 'OND', 'Ph.D'];
const EMPLOYMENT_STATUSES = ['Employed', 'Unemployed', 'Self-Employed'];
const RELATIONSHIPS = ['Sister', 'Brother', 'Parent', 'Friend', 'Spouse'];

export const generateMockUsers = (): UserProfile[] => {
  const users: UserProfile[] = [];
  const startYear = 2018;
  
  for (let i = 1; i <= 500; i++) {
    const id = `USR${String(i).padStart(4, '0')}`;
    const orgName = ORGS[Math.floor(Math.random() * ORGS.length)];
    const firstName = [
      'Nirupam', 'Damilola', 'Chidi', 'Grace', 'Tariq', 'Amina', 'Chinedu', 'Kemi', 
      'Tunde', 'Fatima', 'Yusuf', 'Efe', 'Chioma', 'Babatunde', 'Folake', 'Emeka'
    ][Math.floor(Math.random() * 16)];
    const lastName = [
      'Sharma', 'Adewale', 'Okonkwo', 'Obi', 'Mustapha', 'Abubakar', 'Eze', 'Alabi', 
      'Balogun', 'Bello', 'Nwachukwu', 'Oye', 'Okafor', 'Lawal', 'Salami', 'Igwe'
    ][Math.floor(Math.random() * 16)];
    
    const userName = `${firstName.toLowerCase()}.${lastName.toLowerCase()}`;
    const email = `${userName}@${orgName.toLowerCase()}.com`;
    const phoneNumber = `080${Math.floor(10000000 + Math.random() * 90000000)}`;
    const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
    
    // Generate realistic date between 2018 and current
    const date = new Date(
      startYear + Math.floor(Math.random() * 8),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    );
    const createdAt = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const balance = (50000 + Math.random() * 950000).toFixed(2);
    const formattedBalance = parseFloat(balance).toLocaleString('en-NG', {
      style: 'currency',
      currency: 'NGN'
    });
    
    const accountNumber = `309${Math.floor(1000000 + Math.random() * 9000000)}`;
    const bankName = ['Providus Bank', 'Access Bank', 'GTBank', 'Zenith Bank', 'Sterling Bank'][Math.floor(Math.random() * 5)];
    const level = EDUCATION_LEVELS[Math.floor(Math.random() * EDUCATION_LEVELS.length)] as any;
    const employmentStatus = EMPLOYMENT_STATUSES[Math.floor(Math.random() * EMPLOYMENT_STATUSES.length)] as any;
    const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)] as any;
    const residency = RESIDENCES[Math.floor(Math.random() * RESIDENCES.length)] as any;
    const relationship = RELATIONSHIPS[Math.floor(Math.random() * RELATIONSHIPS.length)] as any;

    users.push({
      id,
      orgName,
      userName,
      email,
      phoneNumber,
      createdAt,
      status,
      accountBalance: formattedBalance,
      accountNumber,
      bankName,
      personalInfo: {
        fullName: `${firstName} ${lastName}`,
        phoneNumber,
        email,
        bvn: `222${Math.floor(10000000 + Math.random() * 90000000)}`,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        maritalStatus: ['Single', 'Married', 'Divorced'][Math.floor(Math.random() * 3)] as any,
        children: ['None', '1', '2', '3+'][Math.floor(Math.random() * 4)] as any,
        typeOfResidence: residency
      },
      educationAndEmployment: {
        level,
        employmentStatus,
        sector,
        duration: ['1-3 years', '3-5 years', '5+ years'][Math.floor(Math.random() * 3)] as any,
        officeEmail: `${userName}@office.${orgName.toLowerCase()}.com`,
        monthlyIncome: ['₦50,000 - ₦100,000', '₦100,000 - ₦200,000', '₦200,000 - ₦500,000', '₦500,000+'][Math.floor(Math.random() * 4)],
        loanRepayment: `₦${(10000 + Math.random() * 90000).toFixed(2)}`
      },
      socials: {
        twitter: `@${userName}`,
        facebook: `${firstName} ${lastName}`,
        instagram: `@${userName}`
      },
      guarantor: {
        fullName: `Guarantor ${firstName} ${lastName}`,
        phoneNumber: `070${Math.floor(10000000 + Math.random() * 90000000)}`,
        email: `guarantor.${userName}@gmail.com`,
        relationship
      }
    });
  }
  
  return users;
};

// Initialize / retrieve from localStorage
export const getCachedUsers = (): UserProfile[] => {
  const cached = localStorage.getItem('lendsqr_users');
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      console.error("Error parsing cached users, regenerating...", e);
    }
  }
  
  const generated = generateMockUsers();
  localStorage.setItem('lendsqr_users', JSON.stringify(generated));
  return generated;
};

export const updateCachedUserStatus = (id: string, status: 'Active' | 'Blacklisted'): UserProfile[] => {
  const users = getCachedUsers();
  const updated = users.map(user => {
    if (user.id === id) {
      return { ...user, status };
    }
    return user;
  });
  localStorage.setItem('lendsqr_users', JSON.stringify(updated));
  return updated;
};
