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
