var popover = require('popover'),
    tabGroup = Titanium.UI.createTabGroup(),
    pop
    osname = Ti.Platform.osname;


//
// create base UI tab and root window
//
var win = Titanium.UI.createWindow({  
    title:'Tab 1',
    backgroundColor:'#fff'
});
var tab1 = Titanium.UI.createTab({  
    icon:'KS_nav_views.png',
    title:'Tab 1',
    window:win
});

// Click this button to open the popover
var button = Ti.UI.createButton({
    title: 'pop'
});
if(osname=='android') {
	button.top = 5; 
	button.left = 5;
	win.add(button);
} else {
	win.setLeftNavButton(button);
}


// You need a view to go in your popover
var table = Ti.UI.createTableView({
    data: [
        Ti.UI.createTableViewRow({title: 'Row 1'}),
        Ti.UI.createTableViewRow({title: 'Row 2'}),
        Ti.UI.createTableViewRow({title: 'Row 3'})
    ]
});
table.addEventListener('click', function(e) {
    alert('Table clicked');
    pop.hide();
	if(osname!='ipad') win.remove(pop);
});
// now take care of showing/hiding the popover
var popovershowing = false;
button.addEventListener('click', function() {
	if(!popovershowing) {
		popovershowing = true;
	    pop = popover.createPopover({
			title: 'Foo',
			view: table,
			backshadeColor: '#aaa',
	    });
	    if(osname!='ipad') win.add(pop);
	    // if you run this on iPad, you must provide a view param
	    // in the show() method or it will fail
	    pop.show({view: button});
	} else {
		popovershowing = false;
		pop.hide();
		if(osname!='ipad') win.remove(pop);
	}
});

tabGroup.addTab(tab1);
tabGroup.open();
