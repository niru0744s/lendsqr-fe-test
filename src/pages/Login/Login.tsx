import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';
import './Login.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      {/* Left panel: Illustration & Branding */}
      <div className="login-container__left">
        <div className="login-container__logo-wrapper">
          <img src="/logo/Group.svg" alt="Lendsqr Logo" className="login-container__logo-img" />
        </div>
        
        <div className="login-container__illustration-wrapper">
          <img 
            src="/mockups/login-page-mockup.png" 
            alt="Lendsqr Dashboard Preview" 
            className="login-container__illustration-img" 
          />
        </div>
      </div>

      {/* Right panel: Login form */}
      <div className="login-container__right">
        {/* Mobile Header (Visible only on mobile layouts) */}
        <div className="login-container__mobile-logo">
          <img src="/logo/Group.svg" alt="Lendsqr Logo" />
        </div>

        <div className="login-container__form-wrapper">
          <div className="login-container__header">
            <h1 className="login-container__title">Welcome!</h1>
            <p className="login-container__subtitle">Enter details to login.</p>
          </div>

          <form className="login-container__form" onSubmit={handleSubmit}>
            <Input 
              type="email" 
              placeholder="Email" 
              className="login-container__input" 
              required
            />
            
            <div className="login-container__password-wrapper">
              <Input 
                type="password" 
                placeholder="Password" 
                className="login-container__input" 
                required
              />
              <a href="#forgot-password" className="login-container__forgot-link">
                FORGOT PASSWORD?
              </a>
            </div>

            <Button type="submit" variant="primary" fullWidth className="login-container__submit-btn">
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
