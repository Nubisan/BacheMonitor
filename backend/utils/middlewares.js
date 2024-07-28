const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {

    if(!req.headers['authorization']) {
        return res.status(401).send('Token no proporcionado');
    }

    const token = req.headers['authorization'];
    
    let payload;

    try {
        payload = jwt.verify(token, 'secret');
    } catch (error) {
        return res.status(401).send('El token no es correcto');
    }

    next();
}

function verifyRole(role) {
    return (req, res, next) => {
      if (!req.user || req.user.role !== role) {
        return res.status(403).json({ access: false, message: 'Acceso denegado. No tienes permisos suficientes.' });
      }
  
      next();
    };
}

module.exports = { checkToken, verifyRole };