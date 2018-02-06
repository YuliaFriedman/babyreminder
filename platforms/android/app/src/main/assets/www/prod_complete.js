//
//
// function getFilesNames(callback){
//   var fs = require('fs');
//   var path = require('path');
//   var dirPath = "./dist";  //directory path
//   var files = [];
//   var result = {
//     main: "",
//     inline: "",
//     polyfills: "",
//     style: ""
//   }
//   return fs.readdir(dirPath, function(err,list){
//     if(err) throw err;
//     for(var i=0; i<list.length; i++)
//     {
//       console.log("file = " + list[i]);
//
//       if(list[i].startsWith("main")){
//         result.main = list[i];
//       }
//       else if(list[i].startsWith("inline")){
//         result.inline = list[i];
//       }
//       else if(list[i].startsWith("polyfills")){
//         result.polyfills = list[i];
//       }
//       else if(list[i].startsWith("style")){
//         result.style = list[i];
//       }
//     }
//     callback(result);
//   });
//
// }
//
// function replaceImports(files){
//
//   var fs = require('fs');
//   var path = require('path');
//
//   console.log(files);
//
//   fs.readFile("./www/index.html", 'utf8', function (err,data) {
//     if (err) {
//       return console.log(err);
//     }
//
//     // JS
//
//     console.log("start JS...");
//     var startIndex = data.indexOf("JS_FILES");
//     var endIndex = data.indexOf("JS_FILES_END");
//
//     console.log("startIndex: " + startIndex + ", endIndex: " + endIndex);
//
//   var inline = '<script type="text/javascript" src="dist/' + files.inline + '"></script>';
//    var main =  '<script type="text/javascript" src="dist/' + files.main + '"></script>';
//    var polyfills = '<script type="text/javascript" src="dist/' + files.polyfills + '"></script>';
//     var newString = "--> " + '\n' + inline + '\n' + main + '\n' + polyfills + '\n' + " <!--";
//
//     var result = data.substr(0, startIndex + 9) + newString + data.substr(endIndex);
//
//     //console.log(result);
//
//     // CSS
//     console.log("start CSS...");
//     var startIndex = data.indexOf("CSS_FILES");
//     var endIndex = data.indexOf("CSS_FILES_END");
//
//     console.log("startIndex: " + startIndex + ", endIndex: " + endIndex);
//
//     var style = '<link href="dist/' + files.style + '" rel="stylesheet"/>';
//     var newString = "--> " + '\n' + style + '\n' + " <!--";
//
//     result = result.substr(0, startIndex + 10) + newString + result.substr(endIndex);
//
//
//     //console.log(result);
//
//
//     fs.writeFile("./www/index.html", result, 'utf8', function (err) {
//       if (err) return console.log(err);
//     });
//   });
// }
//
//
// getFilesNames(function (result) {
//   replaceImports(result);
// });

var fs = require('fs');

  var fs = require('fs');
  var path = require('path');
  var dirPath = "./dist";  //directory path
  var files = [];
  var result = {
    main: "",
    inline: "",
    polyfills: "",
    style: ""
  }


  return fs.readdir(dirPath, function(err,list){
    console.log(__dirname);
    if(err) throw err;
    for(var i=0; i<list.length; i++)
    {
      console.log("file = " + list[i]);
      var fileName = null;
      if(list[i].startsWith("main")){
        fileName = list[i];
      }
      else if(list[i].startsWith("inline")){
        fileName = list[i];
      }
      else if(list[i].startsWith("polyfills")){
        fileName = list[i];
      }
      else if(list[i].startsWith("style")){
        fileName = list[i];
      }

      if(fileName != null){
        var orig = './dist/' + fileName;
        var res = './dist/' + fileName.split('.')[0] + ".bundle." + path.extname(fileName);

        console.log("orig = " + orig);
        console.log("res = " + res);

        fs.rename(orig, res, function(err) {
          if ( err ) console.log('ERROR: ' + err);
        });
      }
    }

    //callback(result);
  });



