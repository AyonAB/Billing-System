'use strict';
var express = require('express');

module.exports = {
    isLoginCheck : function (request, response, next) {
        if(!request.session.user && request.path != '/index' && request.path != '/forgot-pass' && request.path != '/forgot' && !request.path.match(/\/reset\/[\w+]/) && request.path != '/reset-post'){
            response.redirect('/index');
        }else{
            next();
        }
    },
};