
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

exports['get detached object'] = function (test) {
    var obj = immuo();
    var obj2 = obj.set('person', {});
    
    var person = obj2.person.get();
    
    var newperson = person.set('name', 'Adam')
        .set('age', 800)
        .set('wife', 'Eve');
        
    var newobj = obj2.set('person', newperson);
    
    test.ok(newobj);
    test.strictEqual(obj.person, undefined);
    test.ok(newobj.person);
    test.equal(newobj.person.name, 'Adam');
    test.equal(newobj.person.age, 800);
    test.equal(newobj.person.wife, 'Eve');
};
