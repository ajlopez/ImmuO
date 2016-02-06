
var immuo = (function () {
    function Immutable() {
    };
    
    Immutable.prototype.set = function (name, value) {
        var newobj = clone(this);
        newobj[name] = value;
        
        return newobj;
    };
    
    function clone(obj) {
        var newobj = new Immutable();
        
        for (var n in obj)
            if (typeof obj[n] !== 'function')
                newobj[n] = obj[n];
                
        return newobj;
    }
    
    return function () { return new Immutable(); };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = immuo;