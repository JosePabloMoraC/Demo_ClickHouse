-- Tabla para tipos de comida (Catalogo)
CREATE TABLE comida_db.tipo_comida -- usando el schema creado
(
    id UInt32,
    nombre String
) ENGINE = MergeTree() -- motor de tablas por defecto de Clickhouse
ORDER BY id;  -- equivalente de PK, pero no es PK real, más bien es una 'sorting key' (clave de ordenamiento)

-- Tabla para comidas (platos y/o bebidas)
CREATE TABLE comida_db.comida
(
    id UInt32,
    nombre String,
    tipo_id UInt32 COMMENT 'FK a tipo_comida.id',  -- no es FK real
    precio_unitario Float32,
    descripcion String DEFAULT ''  -- opcional || También se puede usar Nullable(String)
) ENGINE = MergeTree()
ORDER BY id;

-- Tabla para órdenes de compra
CREATE TABLE comida_db.orden_compra
(
    id UInt32,                   
    fecha DateTime,              -- Fecha y hora de la orden
    cliente String              -- Nombre del cliente
) ENGINE = MergeTree()
ORDER BY id;

-- Tabla para detalles de órdenes de compra
CREATE TABLE comida_db.detalle_orden
(
    id UInt32,                  
    orden_id UInt32 COMMENT 'FK a orden_compra.id',  -- no es FK real
    comida_id UInt32 COMMENT 'FK a comida.id',   -- no es FK real    
    cantidad UInt32,             -- Cantidad del producto
) ENGINE = MergeTree()
ORDER BY id;