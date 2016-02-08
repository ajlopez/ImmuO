
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
    
    function isProperty(obj, name) {
        if (typeof obj[name] === 'function')
            return false;
            
        if (name.substring(0, 3) === '$$_')
            return false;
            
        return true;
    }
    
    function setProperty(obj, name, value) {
        var isImm = isImmutable(value);
        
        Object.defineProperty(obj, name, {
            configurable: false,
            enumerable: true,
            get: function () {
                if (isImm) {
                    value.$$_parent = obj;
                    value.$$_name = name;
                }
                    
                return value; 
            },
            set: function (newvalue) { throw new Error("Invalid operation"); }
        });
    }
    
    function isImmutable(obj) {
       return obj instanceof Immutable;
     }
    
    function Immutable() {
        Object.defineProperty(this, '$$_parent', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: null
        });
        Object.defineProperty(this, '$$_name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: null
        });
    };
    
    function cloneImmutable(obj, name, detached) {
        var newobj = new Immutable();
        
        for (var n in obj)
            if (n !== name && isProperty(obj, n))
                setProperty(newobj, n, obj[n]);
                
        if (obj.$$_parent && obj.$$_name && !detached) {
            newobj.$$_parent = cloneImmutable(obj.$$_parent, obj.$$_name);
            setProperty(newobj.$$_parent, obj.$$_name, newobj);
            newobj.$$_name = obj.$$_name;
        }
        
        return newobj;
    }
    
    Immutable.prototype.$$_root = function () {
        if (this.$$_parent)
            return this.$$_parent.$$_root();
            
        return this;
    };
    
    Immutable.prototype.set = function (name, value) {
        var newobj = cloneImmutable(this, name);
        
        value = deepClone(value);
            
        setProperty(newobj, name, value);

        return newobj.$$_root();
    };
    
    Immutable.prototype.get = function () {
        return cloneImmutable(this, null, true);
    };
    
    function deepClone(obj) {
        if (!isObject(obj))
            return obj;
            
        if (isImmutable(obj))
            return obj;
            
        var newobj = new Immutable();
        
        for (var n in obj)
            if (isProperty(obj, n))
                setProperty(newobj, n, obj[n]);                
        
        return newobj;
    }
    
    return function () { return new Immutable(); };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = immuo;
    
