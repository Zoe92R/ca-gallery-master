'use strict';

function getProjById(id) {
    return gProjs.find(function (proj) {
        return proj.id === id
    })
}