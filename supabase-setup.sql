-- Create the complaints table
CREATE TABLE complaints (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  order_amount DECIMAL(10, 2),
  order_date DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create an index on category for faster filtering
CREATE INDEX idx_complaints_category ON complaints(category);

-- Create an index on created_at for sorting
CREATE INDEX idx_complaints_created_at ON complaints(created_at DESC);

-- Enable Row Level Security (RLP)
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to insert complaints
CREATE POLICY "Allow public insert on complaints"
ON complaints
FOR INSERT
WITH CHECK (true);

-- Create a policy to allow anyone to read complaints
CREATE POLICY "Allow public read on complaints"
ON complaints
FOR SELECT
USING (true);

-- Disable updates and deletes (complaints cannot be edited or deleted)
CREATE POLICY "Disable updates on complaints"
ON complaints
FOR UPDATE
USING (false);

CREATE POLICY "Disable deletes on complaints"
ON complaints
FOR DELETE
USING (false);
