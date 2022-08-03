const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');

app.use(express.json());

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