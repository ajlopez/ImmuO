
var immuo = require('..');

exports['create object'] = function (test) {
    var obj = immuo();
    
    test.ok(obj);
    test.equal(typeof obj, 'object');
};

