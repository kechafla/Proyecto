DROP TABLE IF EXISTS `canciones`;
CREATE TABLE IF NOT EXISTS `canciones` (
  `idCancion` int(11) NOT NULL AUTO_INCREMENT,
  `Titulo` varchar(255) NOT NULL,
  `Artista` varchar(255) NOT NULL,
  `Duracion` time NOT NULL,
  PRIMARY KEY (`idCancion`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canciones`
--

INSERT INTO `canciones` (`idCancion`, `Titulo`, `Artista`, `Duracion`) VALUES
(1, 'Bohemian Rhapsody', 'Queen', '00:05:55'),
(2, 'Shape of You', 'Ed Sheeran', '00:04:24'),
(3, 'Imagine', 'John Lennon', '00:03:15'),
(4, 'Hotel California', 'Eagles', '00:06:30'),
(5, 'Blinding Lights', 'The Weeknd', '00:03:20'),
(6, 'Stairway to Heaven', 'Led Zeppelin', '00:08:02'),
(7, 'Billie Jean', 'Michael Jackson', '00:04:54'),
(8, 'Smells Like Teen Spirit', 'Nirvana', '00:05:01'),
(9, 'Perfect', 'Ed Sheeran', '00:04:23'),
(10, 'No Time to Die', 'Billie Eilish', '00:04:02');



DROP TABLE IF EXISTS `playlists`;
CREATE TABLE IF NOT EXISTS `playlists` (
  `idPlaylist` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `UsuarioCreador` varchar(255) NOT NULL,
  `FechaCreacion` date NOT NULL,
  PRIMARY KEY (`idPlaylist`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `playlists`
--

INSERT INTO `playlists` (`idPlaylist`, `Nombre`, `UsuarioCreador`, `FechaCreacion`) VALUES
(1, 'Rock Clásico', 'usuario1', '2024-12-01'),
(2, 'Pop Hits', 'usuario2', '2024-12-02'),
(3, 'Relax Vibes', 'usuario3', '2024-12-03'),
(4, 'Workout Energy', 'usuario4', '2024-12-04'),
(5, 'Acústico', 'usuario5', '2024-12-05'),
(6, 'Indie Favorites', 'usuario6', '2024-12-06'),
(7, 'Fiesta', 'usuario7', '2024-12-07'),
(8, 'Jazz Nights', 'usuario8', '2024-12-08'),
(9, 'Lo-Fi Beats', 'usuario9', '2024-12-09'),
(10, 'Clásica', 'usuario10', '2024-12-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `canciones_has_playlists`
--

DROP TABLE IF EXISTS `canciones_has_playlists`;
CREATE TABLE IF NOT EXISTS `canciones_has_playlists` (
  `idCancion` int(11) NOT NULL,
  `idPlaylist` int(11) NOT NULL,
  PRIMARY KEY (`idCancion`,`idPlaylist`),
  KEY `idPlaylist` (`idPlaylist`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `canciones_has_playlists`
--

INSERT INTO `canciones_has_playlists` (`idCancion`, `idPlaylist`) VALUES
(1, 1),
(4, 1),
(6, 1),
(2, 2),
(9, 2),
(3, 3),
(5, 4),
(8, 5),
(7, 7),
(10, 8);


--
ALTER TABLE `canciones_has_playlists`
  ADD CONSTRAINT `canciones_has_playlists_ibfk_1` FOREIGN KEY (`idCancion`) REFERENCES `canciones` (`idCancion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `canciones_has_playlists_ibfk_2` FOREIGN KEY (`idPlaylist`) REFERENCES `playlists` (`idPlaylist`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;