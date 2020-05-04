const defaultRoutes = require('./home');
const userRoutes = require('./users');
const menuRoutes = require('./memu');
const contactRoutes = require('./contact');
const aboutRoutes = require('./about');


const express = require('express');

const constructorMethod = (app) => {
    app.use('/', defaultRoutes);
    app.use('/users', userRoutes);
    app.use('/menu', menuRoutes);
    app.use('/contact', contactRoutes);
    app.use('/about', aboutRoutes);

    app.use(express.static('public'));

    app.use('*', (req, res) => {
        res.redirect('/');
    });
};

module.exports = constructorMethod;