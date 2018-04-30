'use strict';
var express = require('express');

module.exports = {
    isLoginCheck : function (request, response, next) {
        if(!request.session.user && request.path != '/index' && request.path != '/pages-forget'){
            response.redirect('/index');
        }else{
            next();
        }
    },
};