﻿////  compare_layers.jsx// //  Created by Nikita Selivanov on 6.12.2014//  Copyright © 2010-2014 ZeptoLab. All Rights Reserved.//#target photoshopif (!app.documents.length){    var doc1= open (File.openDialog ("first file"));    }else{        var doc1 = app.activeDocument;}var CurrentPath = doc1.path;  inputFolder = Folder.selectDialog("what are you wanna to compare?");var doc2 = open(File (inputFolder.getFiles(doc1.name)));groupExi(doc1);groupExi(doc2);var wrongLayersNames = []var wrongLayersNumNames = ["Слои:"];var wrongLayersNum = []var trueSum1 = removeIgnoreall (doc1);var trueSum2 = removeIgnoreall (doc2);//_______________groupKiller__________function groupExi (inObj){app.activeDocument = inObj;     app.activeDocument.artLayers.add().name = "nikitka";while (inObj.layerSets.length> 0)   {    Ungroup(inObj) function Ungroup (){    var idselectAllLayers = stringIDToTypeID( "selectAllLayers" );    var desc1 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref1 = new ActionReference();        var idLyr = charIDToTypeID( "Lyr " );        var idOrdn = charIDToTypeID( "Ordn" );        var idTrgt = charIDToTypeID( "Trgt" );        ref1.putEnumerated( idLyr, idOrdn, idTrgt );    desc1.putReference( idnull, ref1 );executeAction( idselectAllLayers, desc1, DialogModes.NO );var idungroupLayersEvent = stringIDToTypeID( "ungroupLayersEvent" );    var desc2 = new ActionDescriptor();    var idnull = charIDToTypeID( "null" );        var ref2 = new ActionReference();        var idLyr = charIDToTypeID( "Lyr " );        var idOrdn = charIDToTypeID( "Ordn" );        var idTrgt = charIDToTypeID( "Trgt" );        ref2.putEnumerated( idLyr, idOrdn, idTrgt );    desc2.putReference( idnull, ref2 );executeAction( idungroupLayersEvent, desc2, DialogModes.NO );}  }}//_________ignoreallKiller__________________function removeIgnoreall (inObj){     LayerCo =+0    LayerCo += inObj.layers.length;    app.activeDocument = inObj;for (i=inObj.layers.length-1; i >=0; i--){    if (inObj.layers[i].name == "ignoreall" || inObj.layers[i].name == "_ignoreall"){        inObj.layers[i].allLocked = false;       inObj.layers[i].remove();    LayerCo --        }else if (inObj.layers[i].name == "nikitka") {            LayerCo --            }    }    return LayerCo;}//________________comparesLayers__________app.activeDocument = doc1;app.activeDocument.artLayers.getByName ("nikitka").remove();app.activeDocument = doc2;app.activeDocument.artLayers.getByName ("nikitka").remove();if (trueSum1 == trueSum2){ for (var i = 0; i < trueSum1; i++){ if(doc1.layers[i].name !== doc2.layers[i].name){ wrongLayersNames.push("\n" + doc1.layers[i].name + " != "+ doc2.layers[i].name);        }    }}else{    m =+doc1.layers.length;    for (j=doc1.layers.length-1; j >=0; j--) {    wrongLayersNumNames.push ("\n" + m + ".  "+ doc1.layers[j].name +" — " + doc2.layers[j].name);    m --;        }        wrongLayersNum.push("\n\nНеравное количество слоев.\n" + doc1.name + " (" + CurrentPath + ") = "+ trueSum1 + "\n" + doc2.name + " (" + doc2.path + ") = "+ trueSum2);}    //________________logvar shortName = doc1.name.replace(".psd", "");if (wrongLayersNum.length !== 0 && wrongLayersNames.length !== 0 ){     var allErrors = new File(CurrentPath + "/" + shortName + "_errors" +'.txt');allErrors.open('w');allErrors.write(wrongLayersNames + wrongLayersNum);allErrors.close();alert ("Check " + shortName + "_errors.txt");}else if (wrongLayersNum.length == 0 && wrongLayersNames.length !== 0){    var allErrors = new File(CurrentPath + "/" +shortName + "_errors" +'.txt');allErrors.open('w');allErrors.write(wrongLayersNames);allErrors.close();alert ("Check " + shortName + "_errors.txt");    }else if (wrongLayersNum.length !== 0 && wrongLayersNames.length == 0){        var  allErrors = new File(CurrentPath +"/" +shortName + "_errors" +'.txt');allErrors.open('w');allErrors.write(wrongLayersNumNames + wrongLayersNum);allErrors.close();alert ("Check " + shortName + "_errors.txt");}else if(wrongLayersNum.length == 0 && wrongLayersNames.length == 0){    alert ("All cool");  }//________________revert_________________doc2.close (SaveOptions.DONOTSAVECHANGES);