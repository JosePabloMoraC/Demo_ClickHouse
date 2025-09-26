import { createClient } from '@clickhouse/client';

// Configurar el cliente de ClickHouse
const clickhouse = createClient({
    host: 'http://clickhouse:8123/',
    username: 'user',
    password: '123',
});

// Función para listar comidas almacenados en la BD
export async function getComida(req, res) {
    try {
        const resultSet = await clickhouse.query({
            query:
                'SELECT id, nombre, tipo_id, precio_unitario, descripcion FROM comida_db.comida',
            format:
                'JSONEachRow',
        });

        const rows = await resultSet.json();

        // Extraer nombres de columnas desde la primera fila
        const columnas = rows.length > 0 ? Object.keys(rows[0]) : [];

        res.json({
            columnas,
            datos: rows,
        });
    } catch (error) {
        console.error('Error al consultar Comida:', error);
        res.status(500).send('Error al consultar Comida');
    }
}

// Función para obtener el resumen de precios por tipo de comida
export async function getComidaResumen(req, res) {
    try {
        const query = `
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
        `;


        const resultSet = await clickhouse.query({
            query: query,
            format: 'JSONEachRow',
        });

        const rows = await resultSet.json();

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener el resumen de comidas:', error);
        res.status(500).send('Error al obtener el resumen de comidas.');
    }
}

// Función para eliminar una comida por ID
export async function deleteComida(req, res) {
    const { id } = req.params; // obtener el ID del elemento a borrar
    try {
        // Ejecutar una consulta ALTER TABLE DELETE
        await clickhouse.command({
            query: `ALTER TABLE comida_db.comida DELETE WHERE id = ${id}`,
        });
        // TAMBIÉN lo devuelve cuando el ID no existe, si se quiere evitar este comportamiento,
        // se debe verificar la existencia del elemento antes del delete.
        res.status(200).send(`Comida con ID ${id} eliminada correctamente.`);
    } catch (error) {
        console.error('Error al eliminar Comida:', error);
        res.status(500).send('Error al eliminar Comida.');
    }
}

// Función para agregar una nueva comida
export async function addComida(req, res) {
    const { nombre, tipo_id, precio_unitario, descripcion } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !tipo_id || !precio_unitario) {
        return res.status(400).send('Faltan campos obligatorios: nombre, tipo_id, precio_unitario');
    }

    try {
        // Obtener el ID máximo actual de la tabla
        const maxIdResult = await clickhouse.query({
            query: 'SELECT max(id) FROM comida_db.comida',
            format: 'JSONEachRow',
        });

        const rows = await maxIdResult.json();
        const maxId = rows[0]['max(id)'] || 0; // Si no hay registros, el ID inicial es 1

        // Generar el nuevo ID
        const newId = maxId + 1;

        // Crear el objeto para la inserción con el nuevo ID
        const valuesToInsert = {
            id: newId, // ➡️ Usar el ID generado
            nombre: nombre.trim(),
            tipo_id: Number(tipo_id),
            precio_unitario: Number(precio_unitario)
        };

        // Si la descripción está presente y no está vacía, se agrega al objeto de inserción
        if (descripcion && descripcion.trim() !== '') {
            valuesToInsert.descripcion = descripcion;
        }

        // Ejecutar la consulta INSERT
        await clickhouse.insert({
            table: 'comida_db.comida',
            values: [valuesToInsert],
            format: 'JSONEachRow'
        });

        res.status(201).send(`Comida con ID ${newId} insertada correctamente.`);
    } catch (error) {
        console.error('Error al insertar en ClickHouse:', error);
        res.status(500).send('Error al insertar la comida en ClickHouse');
    }
}

// Función para actualizar una comida por ID
export async function updateComida(req, res) {
    const { id } = req.params;
    const { body } = req;

    // Definir los campos que son permitidos para la actualización
    const attributes = ['nombre', 'tipo_id', 'precio_unitario', 'descripcion'];

    // Crear un objeto 'filteredAttributes' que solo contenga los atributos que se van a actualizar
    const filteredAttributes = {};
    for (const key of attributes) {
        if (body[key] !== undefined) {
            let value = body[key];
            if (typeof value === 'string') {
                value = value.trim();
            }
            if (value !== '') {
                filteredAttributes[key] = value;
            }
        }
    }

    // Si el objeto 'filteredAttributes' está vacío, no actualizar
    if (Object.keys(filteredAttributes).length === 0) {
        return res.status(400).send('No se proporcionaron campos válidos para la actualización.');
    }
    console.log("Update")
    try {
        // Construir el SET de la consulta usando el objeto 'filteredAttributes'.
        const sets = Object.keys(filteredAttributes)
            .map(key => {
                const value = filteredAttributes[key];
                return `${key} = ${typeof value === 'string' ? `'${value}'` : value}`;
            })
            .join(', ');

        // Ejecutar ALTER TABLE
        await clickhouse.command({
            query: `ALTER TABLE comida_db.comida UPDATE ${sets} WHERE id = ${id}`,
        });

        res.status(200).send(`Comida con ID ${id} actualizada correctamente.`);
    } catch (error) {
        console.error('Error al actualizar en Comida:', error);
        res.status(500).send('Error al actualizar Comida.');
    }
}