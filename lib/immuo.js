
var immuo = (function () {
    return function () { return {} };
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = immuo;