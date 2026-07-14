CREATE TABLE IF NOT EXISTS statemententry (
    id          SERIAL PRIMARY KEY,
    bank        VARCHAR(255)   NOT NULL,
    amount      NUMERIC(12, 2) NOT NULL,
    description TEXT           NOT NULL,
    date_posted DATE           NOT NULL);
 
INSERT INTO statemententry (bank, amount, description, date_posted) VALUES
    ('Chase',     -42.50,  'Spotify subscription',       '2024-06-01'),
    ('Chase',   -1200.00,  'Rent payment',               '2024-06-01'),
    ('Bank of America',  2500.00, 'Payroll deposit',     '2024-06-03'),
    ('Chase',     -85.30,  'Whole Foods grocery run',    '2024-06-05'),
    ('Wells Fargo', -9.99, 'Netflix subscription',       '2024-06-07');