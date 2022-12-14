const express = require('express');
const cors = require('cors');
const { authenticateJWT } = require('./middleware/auth');
const app = express();
const usersRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());
app.use(authenticateJWT)

app.use('/users', usersRoutes);

app.use(function (req, res, next) {
    return next(new NotFoundError());
});

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;