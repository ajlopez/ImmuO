
var immuo = (function () {
    function Immutable() {
    };
    
    Immutable.prototype.set = function (name, value) {
        var newobj = clone(this, name);
        newobj[name] = value;
        
        return newobj;
    };
    
    function clone(obj, name) {
        var newobj = new Immutable();
        
        for (var n in obj)
            if (n !== name && typeof obj[n] !== 'function')
                newobj[n] = obj[n];
                
        return newobj;
    }
    
    return function () { return new Immutable(); };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = immuo;