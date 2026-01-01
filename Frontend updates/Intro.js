import React from 'react';
import './Intro.css';

const Intro = ({ onNavigateToLogin }) => {
  return (
    <div className="intro-container">
      
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">CRYPTO MANAGER</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#modules">Modules</a></li>
          <li><a href="#milestones">Milestones</a></li>
          <li><a href="#contact">Team</a></li>
        </ul>
        <button className="btn-login" onClick={onNavigateToLogin}>
          Login Dashboard
        </button>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="hero-section">
        <h1 className="hero-title">Intelligent Investment Management</h1>
        <p className="hero-subtitle">
          A high-performance system leveraging Python's math libraries and parallel processing 
          to manage assets without external dependencies. Built for automated risk checks, 
          strategic spreading, and predictive reporting.
        </p>
        <button className="cta-button" onClick={onNavigateToLogin}>
          Launch System &rarr;
        </button>

        {/* HERO CARDS - Glassy Style */}
        <div className="hero-cards-container">
          <div className="hero-mini-card">
            <span className="hero-icon">🐍</span>
            <h4>Python Native</h4>
            <p>Pure math logic without heavy external libraries.</p>
          </div>
          <div className="hero-mini-card">
            <span className="hero-icon">⚡</span>
            <h4>Parallel Tasks</h4>
            <p>Risk checks & predictions run simultaneously.</p>
          </div>
          <div className="hero-mini-card">
            <span className="hero-icon">💾</span>
            <h4>Simple Data</h4>
            <p>Efficient time-series storage & CSV exports.</p>
          </div>
          <div className="hero-mini-card">
            <span className="hero-icon">🛡️</span>
            <h4>Smart Risk</h4>
            <p>Auto-rebalancing based on rule definitions.</p>
          </div>
        </div>
      </section>

      {/* MODULES SECTION - Tech/Circuit Style */}
      <section id="modules">
        <h2 className="section-title">Core Modules</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>🧮 Mix Calculator</h3>
            <p>Optimizes asset allocation using rule-based testing. Utilizes Python's native math tools for complex operations.</p>
          </div>
          <div className="feature-card">
            <h3>⚡ Risk Checker</h3>
            <p>Performs real-time risk assessment using parallel tasks. Checks trend changes and saves data simultaneously.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Spreading Rule Setter</h3>
            <p>Configures dynamic rules to rebalance portfolios. Includes stress-testing for market crashes.</p>
          </div>
          <div className="feature-card">
            <h3>📩 Reports & Alerts</h3>
            <p>Auto-generates CSV performance reports and sends email alerts when deviations exceed tolerance.</p>
          </div>
        </div>
      </section>

      {/* MILESTONES SECTION - Timeline Style */}
      <section id="milestones">
        <h2 className="section-title">Project Roadmap</h2>
        <div className="timeline-grid">
          <div className="milestone-card">
            <span className="milestone-badge">Weeks 1-2</span>
            <h3>Milestone 1: Start & Learn</h3>
            <p>Environment setup, parallel processing research, and database schema planning.</p>
          </div>
          <div className="milestone-card">
            <span className="milestone-badge">Weeks 3-4</span>
            <h3>Milestone 2: Mix Calculator</h3>
            <p>Implementation of core mixing logic and mathematical rule definitions.</p>
          </div>
          <div className="milestone-card">
            <span className="milestone-badge">Weeks 5-6</span>
            <h3>Milestone 3: Risk & Reports</h3>
            <p>Integration of the Risk Checker module and automatic CSV/Email reporting system.</p>
          </div>
          {/* Active Card */}
          <div className="milestone-card">
            <span className="milestone-badge">Weeks 7-8</span>
            <h3>Milestone 4: Rule Setter</h3>
            <p>Launch of the "Hard Situation" stress tester and dynamic rule configuration UI.</p>
          </div>
        </div>
      </section>

      {/* CONTACT / TEAM SECTION - Profile Style */}
      <section id="contact">
        <h2 className="section-title">Development Team</h2>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-avatar">A</div>
            <h3 className="team-name">Annapurna</h3>
            <p className="team-role">Python Backend Lead</p>
            <div className="team-links">
              <div>📧 mayank@crypto.dev</div>
              <div>🐱 github.com/mayank-ui</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">C</div>
            <h3 className="team-name">Chetana</h3>
            <p className="team-role">QA & Testing</p>
            <div className="team-links">
              <div>📧 sarah@crypto.dev</div>
              <div>🐱 github.com/sarah-py</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">M</div>
            <h3 className="team-name">Mayank</h3>
            <p className="team-role">Frontend Automation Lead</p>
            <div className="team-links">
              <div>📧 rahul@crypto.dev</div>
              <div>🐱 github.com/rahul-db</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">S</div>
            <h3 className="team-name">Shivani</h3>
            <p className="team-role">Database Architect</p>
            <div className="team-links">
              <div>📧 alex@crypto.dev</div>
              <div>🐱 github.com/alex-test</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Python Crypto Investment Manager Project &copy; 2025</p>
        <p>Built with Python (Multiprocessing) & React JS</p>
      </footer>
    </div>
  );
};

export default Intro;