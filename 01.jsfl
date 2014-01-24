//---------nikitka-symbolizator-------

//if (¡doc) {
//	alert('- nothin -')
//}

fl.outputPanel.clear()
//var folderURI = fl.browseForFolderURL// gto folder, where pictures are .PNG
var doc = fl.findDocumentDOM;

fl.getDocumentDOM().library.newFolder("rename_me");

myLibrary = fl.getDocumentDOM().library;
itemArray = myLibrary.items;
totalCount = itemArray.length;

if (doc) {
	//fl.outputPanel.trace("Start");

	for (var i = 0; i < totalCount; ++i) {
		item = itemArray[i]
		if (item.itemType == "bitmap") {
			//myLibrary.selectItem(item.name, true);
			//var item = itemArray[i];
			//item.selectItem(item.name.true);
			fl.getDocumentDOM().library.selectItem('item')
			path = fl.getDocumentDOM().selection[i].libraryItem.name;
			new_name = path.substr(path.lastIndexOf("/") + 1);
			new_name = new_name.split(".png").join("");
			fl.getDocumentDOM().convertToSymbol('graphic', new_name, 'top left');
			//fl.getDocumentDOM().distributeToLayers();
		}
	}

	for (var i = 0; i < totalCount; i++) {
		myItem = itemArray[i];
		myItemType = myItem.itemType;
		myItemName = myItem.name;
		//fl.outpathPanel.trace(myItemType +">>"+myItem);
		if (myItemType == "bitmap") {
			myLibrary.moveToFolder("rename_me", myItemName, true);
		} else {}
	}
}
//fl.outpathPanel.trace(myItemType +">>"+myItem);