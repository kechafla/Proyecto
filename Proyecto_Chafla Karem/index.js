import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("Bienvenidos a mi API de música");
});

// Configuración de la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'plataformamusica'
});

db.connect((error) => {
    if (error) {
        console.log("Error al conectar a la base de datos:", error);
        return;
    }
    console.log("Conexión exitosa a la base de datos");
});

// Endpoints para la tabla playlists
app.get('/playlists', (req, res) => {
    const query = "SELECT * FROM playlists";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las playlists');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/playlists', (req, res) => {
    const { Nombre, UsuarioCreador, FechaCreacion } = req.body;
    const query = 'INSERT INTO playlists (Nombre, UsuarioCreador, FechaCreacion) VALUES (?, ?, ?)';
    db.query(query, [Nombre, UsuarioCreador, FechaCreacion], (error, results) => {
        if (error) {
            res.status(500).send('Error al crear la playlist');
            return;
        }
        res.status(201).json('Playlist creada exitosamente');
    });
});


app.delete('/playlists/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM playlists WHERE idPlaylist = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar la playlist');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Playlist no encontrada');
            return;
        }
        res.status(200).json('Playlist eliminada exitosamente');
    });
});


app.put('/playlists/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, UsuarioCreador, FechaCreacion } = req.body;
    const query = 'UPDATE playlists SET Nombre = ?, UsuarioCreador = ?, FechaCreacion = ? WHERE idPlaylist = ?';
    db.query(query, [Nombre, UsuarioCreador, FechaCreacion, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar la playlist');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Playlist no encontrada');
            return;
        }
        res.status(200).json('Playlist actualizada exitosamente');
    });
});







// Endpoints para la tabla canciones
app.get('/canciones', (req, res) => {
    const query = "SELECT * FROM canciones";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las canciones');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/canciones', (req, res) => {
    const { Titulo, Artista, Duracion } = req.body;
    const query = 'INSERT INTO canciones (Titulo, Artista, Duracion) VALUES (?, ?, ?)';
    db.query(query, [Titulo, Artista, Duracion], (error, results) => {
        if (error) {
            res.status(500).send('Error al agregar la canción');
            return;
        }
        res.status(201).json('Canción agregada exitosamente');
    });
});

app.put('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const { Titulo, Artista, Duracion } = req.body;
    const query = 'UPDATE canciones SET Titulo = ?, Artista = ?, Duracion = ? WHERE idCancion = ?';
    db.query(query, [Titulo, Artista, Duracion, id], (error, results) => {
        if (error) {
            res.status(500).send('Error al actualizar la canción');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Canción no encontrada');
            return;
        }
        res.status(200).json('Canción actualizada exitosamente');
    });
});
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM canciones WHERE idCancion = ?';
    db.query(query, [id], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar la canción');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Canción no encontrada');
            return;
        }
        res.status(200).json('Canción eliminada exitosamente');
    });
});



// Endpoints para la relación canciones_has_playlists

app.get('/canciones_has_playlists', (req, res) => {
    const query = "SELECT * FROM canciones_has_playlists";
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).send('Error al obtener las relaciones');
            return;
        }
        res.status(200).json(results);
    });
});

app.post('/canciones_has_playlists', (req, res) => {
    const { idCancion, idPlaylist } = req.body;
    const query = 'INSERT INTO canciones_has_playlists (idCancion, idPlaylist) VALUES (?, ?)';
    db.query(query, [idCancion, idPlaylist], (error, results) => {
        if (error) {
            res.status(500).send('Error al agregar la relación');
            return;
        }
        res.status(201).json('Relación agregada exitosamente');
    });
});

app.delete('/canciones_has_playlists/:idCancion/:idPlaylist', (req, res) => {
    const { idCancion, idPlaylist } = req.params;
    const query = 'DELETE FROM canciones_has_playlists WHERE idCancion = ? AND idPlaylist = ?';
    db.query(query, [idCancion, idPlaylist], (error, results) => {
        if (error) {
            res.status(500).send('Error al eliminar la relación');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Relación no encontrada');
            return;
        }
        res.status(200).json('Relación eliminada exitosamente');
    });
});




