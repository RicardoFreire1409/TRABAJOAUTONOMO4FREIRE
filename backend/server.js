// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgre',
  host: 'localhost',
  database: 'netflix_userbase',
  password: 'postgre',
  port: 5432,
});
// 1
app.get('/subscriptions-by-year', async (req, res) => {
    try {
        const query = `
        SELECT EXTRACT(YEAR FROM join_date) AS subscription_year, COUNT(*) AS num_subscribers
        FROM netflix_userbase
        GROUP BY subscription_year
        ORDER BY subscription_year;        
        `;
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// 3

app.get('/payments-in-us', async (req, res) => {
    try {
        const query = `

        SELECT u.Country, COUNT(i.User_ID) AS Number_of_Payments
        FROM Usuarios u
        INNER JOIN Informacion_Facturacion i ON u.User_ID = i.User_ID
        WHERE u.Country = 'United States'
        GROUP BY u.Country;
 
        

        `;
        const { rows } = await pool.query(query);
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/tablet-users-by-country', async (req, res) => {
    try {
        const query = `
        SELECT country, COUNT(*) AS tablet_users
        FROM netflix_userbase
        WHERE device = 'Tablet'
        GROUP BY country
        ORDER BY tablet_users DESC;
        
        `;
        const { rows } = await pool.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/users', async (req, res) => {
    try {
      const query = `
        SELECT u.User_ID, s.Subscription_Type, f.Monthly_Revenue
        FROM Usuarios u
        JOIN Suscripciones s ON u.User_ID = s.User_ID
        JOIN Informacion_Facturacion f ON u.User_ID = f.User_ID;
      `;
      const { rows } = await pool.query(query);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
