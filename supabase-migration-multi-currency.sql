-- Migration: Add multi-currency support

-- Add order_currency column
ALTER TABLE complaints ADD COLUMN order_currency VARCHAR(10) DEFAULT 'USD';

-- Add order_amount_usd column for USD equivalent
ALTER TABLE complaints ADD COLUMN order_amount_usd DECIMAL(10, 2);

-- Update existing records to have USD currency (they were all in USD before)
UPDATE complaints SET order_currency = 'USD' WHERE order_currency IS NULL;
