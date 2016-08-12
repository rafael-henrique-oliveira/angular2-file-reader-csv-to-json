import { Component } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "app/app.html",
  directives: []
})
export class AppComponent {
  filesToUpload: Array<File>;

  constructor() {
    this.filesToUpload = [];
  }

  upload() {
    this.readCSV(this.filesToUpload).then((result) => {
      var array = this.csvToArray(result);
      var arrayFormatado = this.formatarResultado(array);
      console.log(arrayFormatado);
      console.log(array);
    }, (error) => {
      console.error(error);
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  readCSV(files: Array<File>) {
    return new Promise((resolve, reject) => {
      var fileReader = new FileReader();

      fileReader.onload = function (e) {
        resolve(fileReader.result);
        return;
      };

      fileReader.readAsText(files[0]);
    });
  }

  csvToArray(csv: any) {
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
  }

  removeEmptyRows(array: any) {
    return array.filter(line => line !== "");
  }

  criarJsonPadrao(item: any) {
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
  }

  formatarResultado(array: any) {
    var result = [];
    for (var item of array) {
      var itemFormatado = this.criarJsonPadrao(item);
      result.push(itemFormatado);
    }

    return result;
  }
}
