'use strict';
var express = require('express');

module.exports = {
    isLoginCheck : function (request, response, next) {
        if(!request.session.user && request.path != '/index'){
            response.redirect('/index');
        }else{
            next();
        }
    },
};