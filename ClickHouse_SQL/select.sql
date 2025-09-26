-- Ejemplos de select
-- Select simple
SELECT * from comida_db.comida;


-- Select con filtro 
SELECT * from comida_db.comida where precio_unitario > 5000;


-- Select usando un Join
SELECT
    c.id,
    c.nombre AS comida,
    t.nombre AS tipo, 
    c.descripcion
FROM comida_db.comida AS c
INNER JOIN comida_db.tipo_comida AS t
ON c.tipo_id = t.id;

-- Select con agregación
SELECT
    t.nombre AS tipo_comida,
    min(c.precio_unitario) AS precio_minimo,
    max(c.precio_unitario) AS precio_maximo,
    sum(c.precio_unitario) AS suma_precios,
    avg(c.precio_unitario) AS precio_promedio
FROM comida_db.comida AS c
INNER JOIN comida_db.tipo_comida AS t ON c.tipo_id = t.id
GROUP BY t.nombre
ORDER BY t.nombre ASC;
