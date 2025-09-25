-- Update
-- Notar que el update es diferente a SQL tradicional
ALTER TABLE comida_db.tipo_comida
UPDATE nombre = 'Emparedado' -- cambiar sandwich por emparedado
WHERE id = 13;

-- Clickhouse no permite actualizar la "sorting key"
ALTER TABLE comida_db.tipo_comida
UPDATE id = 100
WHERE id = 0;
