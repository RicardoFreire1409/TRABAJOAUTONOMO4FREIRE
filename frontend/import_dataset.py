import pandas as pd
import psycopg2

# Parámetros de conexión a la base de datos PostgreSQL
db_params = {
    'dbname': 'netflix_userbase',
    'user': 'rfreire',
    'password': 'postgre',
    'host': 'localhost',  # Cambia esto si tu base de datos está en otro host
    'port': '5432'  # Puerto predeterminado de PostgreSQL
}

# Carga el dataset CSV en un DataFrame de pandas
df = pd.read_csv('NetflixUserbase.csv')

# Conexión a la base de datos
conn = psycopg2.connect(**db_params)
cur = conn.cursor()

# Itera sobre las filas del DataFrame y realiza la inserción en las tablas de la base de datos
for index, row in df.iterrows():
    # Tabla Usuarios
    query_users = """
    INSERT INTO Usuarios (User_ID, Join_Date, Country, Age, Gender, Device)
    VALUES (%s, %s, %s, %s, %s, %s);
    """
    values_users = (
        row['User ID'], row['Join Date'], row['Country'], row['Age'], row['Gender'], row['Device']
    )
    cur.execute(query_users, values_users)
    
    # Tabla Suscripciones
    query_subscriptions = """
    INSERT INTO Suscripciones (User_ID, Subscription_Type, Plan_Duration)
    VALUES (%s, %s, %s);
    """
    values_subscriptions = (
        row['User ID'], row['Subscription Type'], row['Plan Duration']
    )
    cur.execute(query_subscriptions, values_subscriptions)
    
    # Tabla Informacion_Facturacion
    query_billing = """
    INSERT INTO Informacion_Facturacion (User_ID, Monthly_Revenue, Last_Payment_Date)
    VALUES (%s, %s, %s);
    """
    values_billing = (
        row['User ID'], row['Monthly Revenue'], row['Last Payment Date']
    )
    cur.execute(query_billing, values_billing)
    
    conn.commit()

# Cierra la conexión a la base de datos
cur.close()
conn.close()
