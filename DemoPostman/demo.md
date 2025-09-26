# Get
- **URL:** http://localhost:3001/comidas
- **URL:** http://localhost:3001/comidas/resumen

# Insert (Post)
- **URL:** http://localhost:3001/comidas
- **Body:** {
  "nombre": "Hamburguesa Clásica",
  "tipo_id": 9,
  "precio_unitario": 3000,
  "descripcion": "Hamburguesa de carne de res, lechuga, tomate, cebolla y queso."
}

# Update (Patch)
- **URL:** http://localhost:3001/comidas/21
- **Body:** {
    "nombre": "Ensalada César"
}

# Delete
- **URL:** http://localhost:3001/comidas/10000
- **URL:** http://localhost:3001/comidas/22


