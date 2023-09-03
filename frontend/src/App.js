import React, { useState, useEffect } from 'react';
import './App.css';
import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts'; // Importar las bibliotecas necesarias

// Asegúrate de importar las bibliotecas necesarias para las gráficas (si las usas)
// import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from 'recharts';

function App() {
    const [data, setData] = useState([]);
    const [subscriptionsByYearData, setSubscriptionsByYearData] = useState([]);
    const [paymentsInUSData, setPaymentsInUSData] = useState({});
    const [tabletUsersByCountry, setTabletUsersByCountry] = useState([]); // Agregar el estado para los datos de la gráfica

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));

            fetch('http://localhost:5000/subscriptions-by-year')
            .then(response => response.json())
            .then(data => setSubscriptionsByYearData(data))
            .catch(error => console.error('Error fetching data:', error));
    

            
        // Fetch tablet users by country data
        fetch('http://localhost:5000/tablet-users-by-country')
        .then(response => response.json())
        .then(data => setTabletUsersByCountry(data))
        .catch(error => console.error('Error fetching data:', error));


            fetch('http://localhost:5000/payments-in-us')
            .then(response => response.json())
            .then(data => setPaymentsInUSData(data))
            .catch(error => console.error('Error fetching data:', error));
                
    }, []);

    return (
        <div className="App">

            {/* Mostrar la tabla de suscripciones por año */}
<div className="SubscriptionsByYear">
    <h2>Suscripciones por Años</h2>
    <table>
        <thead>
            <tr>
                <th>Year</th>
                <th>Number of Subscribers</th>
            </tr>
        </thead>
        <tbody>
            {subscriptionsByYearData.map(entry => (
                <tr key={entry.subscription_year}>
                    <td>{entry.subscription_year}</td>
                    <td>{entry.num_subscribers}</td>
                </tr>
            ))}
        </tbody>
    </table>
</div>

            {/* Gráfica de usuarios por países que utilizan Tablet */}
            <div className="TabletUsersByCountryChart">
                <h2>Tabla de Usuarios por País</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={tabletUsersByCountry}>
                        <XAxis dataKey="country" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="tablet_users" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>


            {/* Mostrar el número de pagos en US */}
            <div className="PaymentsInUS">
                <h2>Pagos en Estados Unidos</h2>
                <p>Total payments: {paymentsInUSData.number_of_payments}</p>
            </div>
            <h1>Base de usuarios de Netflix</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Subscription Type</th>
                        <th>Monthly Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(entry => (
                        <tr key={entry.user_id}>
                            <td>{entry.user_id}</td>
                            <td>{entry.subscription_type}</td>
                            <td>{entry.monthly_revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
        
    );
}

export default App;
