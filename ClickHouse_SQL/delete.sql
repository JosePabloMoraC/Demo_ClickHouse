-- DELETE
-- Notar que el delete es diferente a SQL tradicional
ALTER TABLE comida_db.tipo_comida DELETE WHERE id = 17; -- eliminar `Smoothie`
ALTER TABLE comida_db.tipo_comida DELETE WHERE id = 21 AND nombre = 'Guarnición';

