"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var AppComponent = (function () {
    function AppComponent() {
        this.filesToUpload = [];
    }
    AppComponent.prototype.upload = function () {
        var _this = this;
        this.readCSV(this.filesToUpload).then(function (result) {
            var array = _this.csvToArray(result);
            var arrayFormatado = _this.formatarResultado(array);
            console.log(arrayFormatado);
            console.log(array);
        }, function (error) {
            console.error(error);
        });
    };
    AppComponent.prototype.fileChangeEvent = function (fileInput) {
        this.filesToUpload = fileInput.target.files;
    };
    AppComponent.prototype.readCSV = function (files) {
        return new Promise(function (resolve, reject) {
            var fileReader = new FileReader();
            fileReader.onload = function (e) {
                resolve(fileReader.result);
                return;
            };
            fileReader.readAsText(files[0]);
        });
    };
    AppComponent.prototype.csvToArray = function (csv) {
        var array = csv.split("\n");
        var lines = this.removeEmptyRows(array);
        var result = [];
        var headers = lines[0].split(";");
        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(";");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    };
    AppComponent.prototype.removeEmptyRows = function (array) {
        return array.filter(function (line) { return line !== ""; });
    };
    AppComponent.prototype.criarJsonPadrao = function (item) {
        return {
            grupo: {
                id: item.IDGrupo
            },
            produto: {
                id: item.IDProduto
            },
            embalagem: {
                id: 0
            },
            dataInicio: item.DataInicio,
            precos: {
                normal: item.PrecoNormal,
                proposto: item.PrecoProposto,
                limite: item.PrecoLimite
            },
            usuario: "USR_PRICING"
        };
    };
    AppComponent.prototype.formatarResultado = function (array) {
        var result = [];
        for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
            var item = array_1[_i];
            var itemFormatado = this.criarJsonPadrao(item);
            result.push(itemFormatado);
        }
        return result;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            templateUrl: "app/app.html",
            directives: []
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map