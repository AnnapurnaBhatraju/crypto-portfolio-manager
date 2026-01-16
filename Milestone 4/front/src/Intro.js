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
          <li><a href="#milestones">Features</a></li>
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
        <h2 className="section-title">Features</h2>
        <div className="timeline-grid">
          <div className="milestone-card">
            <span className="milestone-badge">FEATURES</span>
            <h3>🧮💡 System Initialization</h3>
            <p>nvironment setup, parallel task orchestration, and data pipeline preparation.</p>
          </div>
          <div className="milestone-card">
            <span className="milestone-badge">FEATURES</span>
            <h3>🔄📊 Dynamic Rule Management</h3>
            <p>Configures stress-test rules and auto-rebalancing logic for volatile markets.</p>
          </div>
          <div className="milestone-card">
            <span className="milestone-badge">FEATURES</span>
            <h3>📜🔍 Historical Trend Analysis</h3>
            <p>Analyzes historical price data to detect trends, cycles, and patterns that inform smarter investments.</p>
          </div>
          {/* Active Card */}
          <div className="milestone-card">
            <span className="milestone-badge">FEATURES</span>
            <h3>💰🌎 Multi-Currency Support</h3>
            <p>Manage assets across multiple cryptocurrencies and stablecoins seamlessly.</p>
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
              <div>📧 <br></br>annapurnabhatraju2005@gmail.com</div><br></br>
              <div>🐱 github.com/AnnapurnaBhatraju</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">C</div>
            <h3 className="team-name">Chetana</h3>
            <p className="team-role">QA & Testing</p>
            <div className="team-links">
              <div>📧 <br></br>chetana.kovi05@gmail.com</div><br></br>
              <div>🐱 github.com/Chetana-05</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">M</div>
            <h3 className="team-name">Mayank</h3>
            <p className="team-role">Frontend Automation Lead</p>
            <div className="team-links">
              <div>📧 <br></br>123razz321@gmail.com</div> <br></br>
              <div>🐱 github.com/PoisonMunna</div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-avatar">S</div>
            <h3 className="team-name">Shivani</h3>
            <p className="team-role">Database Architect</p>
            <div className="team-links">
              <div>📧 <br></br>shivanibaravkar2@gmail.com</div><br></br>
              <div>🐱 github.com/shivanibaravkar</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Python Crypto Investment Manager</p>
        <p>Copyright &copy; 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Intro;