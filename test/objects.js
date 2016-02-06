
var immuo = require('..');

exports['create object'] = function (test) {
    var obj = immuo();
    
    test.ok(obj);
    test.equal(typeof obj, 'object');
};

exports['set property'] = function (test) {
    var obj = immuo();
    
    var newobj = obj.set('name', 'Adam');
    
    test.ok(newobj);
    test.strictEqual(obj.name, undefined);
    test.equal(newobj.name, 'Adam');
};

exports['set nested property'] = function (test) {
    var obj = immuo();
    
    var newobj = obj.set('person', {}).person.set('name', 'Adam');
    
    test.ok(newobj);
    test.strictEqual(obj.person, undefined);
    test.ok(newobj.person);
    test.equal(newobj.person.name, 'Adam');
};

