"use strict";
exports.__esModule = true;
exports.Suma = void 0;
var Suma = /** @class */ (function () {
    function Suma(a, b) {
        this.resultado = 0;
        this.resultado = a + b;
    }
    Suma.prototype.ver = function () {
        return this.resultado;
    };
    return Suma;
}());
exports.Suma = Suma;
