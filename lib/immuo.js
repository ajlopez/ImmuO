
var immuo = (function () {
    function isObject(obj) {
        if (obj == null)
            return false;
            
        if (typeof obj !== 'object')
            return false;
            
        if (obj instanceof Date)
            return false;
        
        if (obj instanceof String)
            return false;
            
        return true;
    }
    
    function isImmutable(obj) {
       return obj instanceof Immutable;
     }
    
    function Immutable(parent, name) {
        this.$$_clone = function () {
            if (parent && name)
                return parent.$$_clone()[name];
            
            var newobj = deepClone(this);
            
            return newobj;
        };
        
        this.$$_root = function () {
            if (parent)
                return parent.$$_root();
                
            return this;
        };
    };
    
    Immutable.prototype.set = function (name, value) {
        var newobj = this.$$_clone();
        
        if (isObject(value))
            value = deepClone(value, newobj, name);

        Object.defineProperty(newobj, name, {
            configurable: false,
            enumerable: true,
            get: function () { return value; },
            set: function () { throw new Error("Invalid operation"); }
        });

        return newobj.$$_root();
    };
    
    function deepClone(obj, parent, name) {
        if (obj == null)
            return null;
            
        if (typeof obj !== 'object')
            return obj;
            
        var newobj = new Immutable(parent, name);
        
        for (var n in obj)
            if (n !== '$$_parent' && n !== '$$_name' && typeof obj[n] !== 'function')
                newobj[n] = deepClone(obj[n], newobj, n);                
        
        return newobj;
    }
    
    return function () { return new Immutable(); };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = immuo;
    
