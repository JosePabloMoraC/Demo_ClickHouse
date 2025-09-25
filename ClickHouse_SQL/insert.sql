-- Insert iniciales para "poblar" las tablas
-- Tabla tipo_comida
INSERT INTO comida_db.tipo_comida
SELECT
    number + 1 AS id,
    ['Entrada', 'Plato Principal', 'Postre', 'Bebida', 'Snack', 'Ensalada', 'Sopa', 'Pizza', 'Hamburguesa', 'Pasta',
     'Taco', 'Sushi', 'Sandwich', 'Helado', 'Galleta', 'Batido', 'Smoothie', 'Café', 'Té', 'Jugo'][number + 1] AS nombre
FROM numbers(20);


-- Tabla comida
INSERT INTO comida_db.comida
SELECT
    number + 1 AS id,
    concat('Comida_', number + 1) AS nombre,
    number + 1 AS tipo_id,           -- asigna tipo de comida 
    toFloat32(rand() % 10000 + 1) AS precio_unitario,  -- precio entre 0 y 10000   
    concat('Descripción de la comida ', number + 1) AS descripcion
FROM numbers(20);


-- Tabla orden_compra
INSERT INTO comida_db.orden_compra
SELECT
    number + 1 AS id,
    now() AS fecha,   -- fecha actual
    concat('Cliente_', number + 1) AS cliente
FROM numbers(20);


-- Tabla detalle_orden
INSERT INTO comida_db.detalle_orden
SELECT
    number + 1 AS id,
    (rand() % 20) + 1 AS orden_id,    -- orden aleatoria entre 1 y 20
    (rand() % 20) + 1 AS comida_id,   -- comida aleatoria entre 1 y 20
    (rand() % 5) + 1 AS cantidad     -- cantidad entre 1 y 5
FROM numbers(40);  -- 40 detalles

-- Insert individuales
INSERT INTO comida_db.tipo_comida (id, nombre)
SELECT max(id) + 1, 'Acompañamiento'
FROM comida_db.tipo_comida;

-- Notar que no hay unicidad en los ID
INSERT INTO comida_db.tipo_comida (id, nombre)
VALUES(21, 'Guarnición');
FROM comida_db.tipo_comida;

