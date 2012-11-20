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


// now take care of showing/hiding the popover
var popovershowing = false;
button.addEventListener('click', function() {
	if(!popovershowing) {

		// You need a view to go in your popover
		var table = Ti.UI.createTableView({
			backgroundColor: 'white', /* for Android */
		    data: [
		        Ti.UI.createTableViewRow({title: 'Row 1'}),
		        Ti.UI.createTableViewRow({title: 'Row 2'}),
		        Ti.UI.createTableViewRow({title: 'Row 3'})
		    ]
		});
		table.addEventListener('click', function(e) {
			e.row.hasCheck = !e.row.hasCheck;
			var rows = table.sections[0].rows;
			for(var i=0,j=rows.length;i<j;i++) {
				if(e.row != rows[i]) {
					rows[i].hasCheck = false;
				}
			}
		});

		popovershowing = true;
	    pop = popover.createPopover({
			title: 'Foo',
			view: table,
			backshadeColor: '#888',
			ipadOverride: false,
			hideCallback: function() { 
				popovershowing = false;
				if(osname!='ipad') win.remove(pop);
			},
			leftNavButton: 'Done'
	    });
	    // if you set ipadOverride to true, then you will have to
	    // win.add(pop) on iPad, otherwise, don't add it to the win
	    // when running on iPad or you'll get strange view problems
	    if(osname!='ipad') win.add(pop);
	    // if you run this on iPad, you must provide a view param
	    // in the show() method or it will fail
	    if(osname == 'ipad') pop.show({view: button});  // android will die horribly if an obj is passed to show()
	    else pop.show();
	} else {
		popovershowing = false;
		pop.hide();
		if(osname!='ipad') win.remove(pop);
		pop = null;
	}
});

tabGroup.addTab(tab1);
tabGroup.open();
