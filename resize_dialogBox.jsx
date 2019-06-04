#target photoshop
app.bringToFront();

var ScaleMethod = 2; //percent or pixels
var ScalePercent;
var ScaleDimension = new Array();
var OperatedHeight = 0;
var OperatedWidth = 0;
main();

function main()
{
    var win = new Window('dialog', 'Resize Files');
    win.alignChildren = ["center", "center"];
    win.orientation = 'column';

    var win2 = win.add("group");
    win2.orientation = 'row';
    win2.spacing = 15;

    var MainGroup = win2.add ('group');
    MainGroup.graphics.foregroundColor = MainGroup.graphics.newPen(MainGroup.graphics.PenType.SOLID_COLOR, [0.4, 0.4, 0.4], 1);
    MainGroup.spacing = 0;

    var KeepProportionBar = MainGroup.add ('group')
    KeepProportionBar.orientation = 'column';
    KeepProportionBar.spacing = 0;
    var Line1 = KeepProportionBar.add ("panel", [0,0,3,15]);
    var KeepProportion = KeepProportionBar.add ("checkbox", undefined);
    var Line2 = KeepProportionBar.add ("panel", [0,15,3,30]);
    KeepProportion.value = true;
    Line1.graphics.backgroundColor = Line1.graphics.newBrush (Line1.graphics.BrushType.SOLID_COLOR, [0.7, 0.7, 0.7]);
    Line2.graphics.backgroundColor = Line2.graphics.newBrush (Line2.graphics.BrushType.SOLID_COLOR, [0.7, 0.7, 0.7]);

    var InputDiscription = MainGroup.add ('group');
    InputDiscription.orientation = 'column';
    InputDiscription.alignChildren = ["right", "center"];
    var WidthTitle = InputDiscription.add ("statictext", undefined, "Width:");
    var HeightTitle = InputDiscription.add ("statictext", undefined, "Height:");

    var InputText = MainGroup.add ('group');
    InputText.orientation = 'column';
    var newWidth = InputText.add ("edittext", [0, 0, 50, 20], "200");
    var newHeight = InputText.add ("edittext", [0, 0, 50, 20], "200");
    newHeight.visible = false;

    var SwitchPixelPercent = win2.add ('dropdownList', [20, 0, 50, 20], ["px","%"]);
    SwitchPixelPercent.selection = 1;
    SwitchPixelPercent.size = [50, 25];

    var ButtonsGroups = win.add("group");
    ButtonsGroups.spacing = 10;
    ButtonsGroups.margins = 15;
    ButtonsGroups.alignChildren = ["fill", "center"];
    var Cancel = ButtonsGroups.add("button", undefined, "Cancel");
    Cancel.graphics.foregroundColor = Cancel.graphics.newPen(Cancel.graphics.PenType.SOLID_COLOR, [0.5, 0.5, 0.5], 1);
    var SelectButton = ButtonsGroups.add("button", undefined, "Select Folder...");
    
    KeepProportion.onClick = function () {
        if (!newHeight.visible){
            newHeight.visible = true;
            Line1.graphics.backgroundColor = Line1.graphics.newBrush (Line1.graphics.BrushType.SOLID_COLOR, [0.1, 0.1, 0.1]);
            Line2.graphics.backgroundColor = Line2.graphics.newBrush (Line2.graphics.BrushType.SOLID_COLOR, [0.1, 0.1, 0.1]);
        }else{
            newHeight.visible = false;
            //newHeight.text = 1; //подтираю высоту, чтобы при отжатой галки невидимое число не брать
            Line1.graphics.backgroundColor = Line1.graphics.newBrush (Line1.graphics.BrushType.SOLID_COLOR, [0.7, 0.7, 0.7]);
            Line2.graphics.backgroundColor = Line2.graphics.newBrush (Line2.graphics.BrushType.SOLID_COLOR, [0.7, 0.7, 0.7]);
        }
    }
    
    SwitchPixelPercent.onChange = function ()
    {
        if (SwitchPixelPercent.selection.text == "px"){
            ScaleMethod = 1;
        }else if (SwitchPixelPercent.selection.text == "%"){
            ScaleMethod = 2;
        }
    }

    SelectButton.onClick = function ()
    {
        OperatedWidth = parseFloat(newWidth.text);
        OperatedHeight = parseFloat(newHeight.text);
        var inputFolder = Folder.selectDialog("Select a folder to resize");
        if (!KeepProportion.value)
        {
            ScaleDimension.length = 0;
            ScaleDimension.push(OperatedWidth, OperatedHeight);
        }else{
            ScaleDimension.length = 0;
            ScaleDimension.push(OperatedWidth);
        }
        resize(inputFolder);
        win.close();
    }

    Cancel.onClick = function ()
    {
        return win.close();
    }
win.show();
}

function resize(samplesFolder)
{
    OperatedWidth = OperatedWidth/100;
    OperatedHeight = OperatedHeight/100;
    var fileList = samplesFolder.getFiles();
    if (!fileList.length){
        alert("No files in folder - " + samplesFolder)
    }else
        {
        for (var i = 0; i < fileList.length; i++) 
        {   
            var file = fileList[i];
            if (file instanceof Folder){
                resize(file);
            }
            if (file.name.charAt(0) != '.') 
            {            
                if(file instanceof File && file.hidden == false)
                {
                    if(file.name.match(/\.(psd|png|jpg|jpeg|gif)$/))
                    {
                        open(file);
                            if (ScaleMethod == 1){
                                ResizeFilePixel(file);
                            }else{
                                ResizeFilePercent(file);
                            }
                    }else
                    {
                        resize(file);
                    }    
                }
            }    
        }
    }
}

function ResizeFilePixel (inputFile){
    if(ScaleDimension.length > 1)
    {
        app.activeDocument.resizeImage(ScaleDimension[0], ScaleDimension[1]);
        //app.activeDocument.close(SaveOptions.SAVECHANGES);
    }else{
        app.activeDocument.resizeImage(ScaleDimension[0]);
        //app.activeDocument.close(SaveOptions.SAVECHANGES);
    }
}

function ResizeFilePercent (inputFile){
    var docWidth = app.activeDocument.width;
    var docHeight = app.activeDocument.height;
    if(ScaleDimension.length > 1)
    {
                alert ("rururru");
alert ('width = ' + docWidth + OperatedWidth + ', height = ' + docHeight + OperatedHeight);
        app.activeDocument.resizeImage(docWidth * OperatedWidth, docHeight * OperatedHeight);
        //app.activeDocument.close(SaveOptions.SAVECHANGES);
    }else{
        alert ('width = ' + docWidth + OperatedWidth);
        app.activeDocument.resizeImage(docWidth * OperatedWidth);
        alert ("tutut");
        //app.activeDocument.close(SaveOptions.SAVECHANGES);
    }
}

/*
function main()
{
    var win = new Window('dialog', 'Resize Files');
    win.alignChildren = ["fill", "left"];
    var UIcolumnWidth = [0, 0, 70, 20];
    var InputTextTitles = win.add("group");
    InputTextTitles.orientation = "row";
    InputTextTitles.add ("statictext", UIcolumnWidth, "width");
    InputTextTitles.add ("statictext", UIcolumnWidth, "height");
    var InputText = win.add("group");
    InputText.orientation = "row";
    InputText.spacing = 8;
    var KeepProportion = InputText.add ("checkbox", undefined, "keep proportions?");
    var newWidth = InputText.add ("edittext", [0, 0, 50, 20], "100");
    newWidth.active = true;
    var InputGap = InputText.add ("statictext",undefined, "x");
    var newHeight = InputText.add ("edittext", [0, 0, 50, 20], "99");
    var dropdownAlign = InputText.add("dropdownList", [20, 0, 50, 20], ["px","%"]);
    dropdownAlign.selection = 0;
    dropdownAlign.size = [50, 25];
    var ButtonsGroups = win.add("group");
    ButtonsGroups.spacing = 10;
    ButtonsGroups.margins = 15;
    ButtonsGroups.alignChildren = ["fill", "center"];
    var Cancel = ButtonsGroups.add("button", undefined, "Cancel");
    var SelectButton = ButtonsGroups.add("button", undefined, "Select Folder");

KeepProportion.onClick = function () {
    if (!newHeight.visible){
        newHeight.visible = true;
        InputGap.visible = true;
    }else{
        newHeight.visible = false;
        InputGap.visible = false;
    }
}

dropdownAlign.onChange = function ()
    {
        if (dropdownAlign.selection.text == "px"){
            ScaleMethod = 1;
        }else if (dropdownAlign.selection.text == "%"){
            ScaleMethod = 2;
        }
    }

SelectButton.onClick = function ()
    {
        var ScaleType = dropdownAlign.selection.text;
        var inputFolder = Folder.selectDialog("Select a folder to resize");
        win.close();
        resize(inputFolder);
   };

Cancel.onClick = function ()
    {
        return win.close();
    }
win.show();
}
*/


/*


function resizer(samplesFolder)
{
    var fileList = samplesFolder.getFiles();

    for (var i = 0; i < fileList.length; i++) 
    {
        var file = fileList[i];
        if (file.name.charAt(0) != '.') 
        {            
            if(file instanceof File && file.hidden == false)
            {
              if(file.name.match(/\.(psd|png|jpg|jpeg|gif)$/))
              {
                app.activeDocument = open(file);
                alert (ScaleType + "+ 3333");
                //var docWidth = app.activeDocument.width;
                    /* if(ScaleType == "px")
                    {
                    alert ('11111');
                    app.activeDocument.resizeImage(newWidth, newHeight);
                    app.activeDocument.close(SaveOptions.SAVECHANGES);
                    }
                    else
                    {
                    app.activeDocument.resizeImage(newWidth, newHeight);
                    app.activeDocument.close(SaveOptions.SAVECHANGES);
                    alert ('2222222');

                    // app.activeDocument.resizeImage(docWidth * ScalePercent);
                    // app.activeDocument.close(SaveOptions.SAVECHANGES);
                } 
              }				      
            }
            else
            {
                i++;
           	  resizer(file);
            }    
        }
    }
}
*/

