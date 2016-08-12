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
      console.log(this.csvJSON(result));
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

  csvJSON(csv: any) {
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

    return JSON.stringify(result);
  }

  removeEmptyRows(array: any) {
    return array.filter(line => line !== "");
  }
}
