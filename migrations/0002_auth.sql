-- Migration number: 0002 	 2025-04-09T08:11:00.000Z
-- Authentication and User Management Tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'customer', 'staff')) DEFAULT 'customer',
  company TEXT,
  phone TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'pending',
  reset_token TEXT,
  reset_token_expires DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sessions table for authentication
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  expires DATETIME NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price REAL NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Customer services (many-to-many relationship)
CREATE TABLE IF NOT EXISTS customer_services (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  service_id INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'pending')) DEFAULT 'active',
  start_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  renewal_date DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'closed')) DEFAULT 'new',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
CREATE INDEX idx_sessions_expires ON sessions(expires);
CREATE INDEX idx_customer_services_user_id ON customer_services(user_id);
CREATE INDEX idx_customer_services_service_id ON customer_services(service_id);
CREATE INDEX idx_enquiries_email ON enquiries(email);
CREATE INDEX idx_enquiries_status ON enquiries(status);

-- Insert default admin user (password: admin123)
INSERT INTO users (name, email, password_hash, role, status) VALUES 
  ('Admin User', 'admin@cybershieldit.com', '$2a$10$JwYX5HKvF6iYCQMkJxgkG.GCCgk2QLxzJCbMQMVYGSJbVaEEIbXtK', 'admin', 'active');

-- Insert initial services
INSERT INTO services (name, description, category, price) VALUES 
  ('IT Support - Basic', 'Comprehensive IT support services for small businesses.', 'support', 299),
  ('IT Support - Professional', '24/7 IT support with advanced monitoring.', 'support', 599),
  ('IT Support - Enterprise', 'Priority IT support with dedicated account manager.', 'support', 1299),
  ('Cyber Security - Basic', 'Essential security monitoring and protection.', 'security', 399),
  ('Cyber Security - Professional', 'Advanced security solutions with threat detection.', 'security', 899),
  ('Cyber Security - Enterprise', 'Comprehensive security suite with incident response.', 'security', 1899),
  ('IT Consulting', 'Strategic IT consulting and planning.', 'consulting', 150);
