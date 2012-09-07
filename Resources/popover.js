/*  
 Arguments:
		{
			view: Ti.View, // REQUIRED view shown in popover
			title: 'Popover', // popover title
			height: dimension, // optional
			width: dimension,  // optional
			top: dimension,  // optional
			left: position, // optional, arrow left coordinate (w/default dimensions 140 should center it on iPhone)
			right: position // optional, use instead of left, arrow right coordinate
		}
  		
 */
// animation objects to control opening and closing
var duration = 300,
	a1 = Titanium.UI.createAnimation(),
	a2 = Titanium.UI.createAnimation();
a1.opacity = 1;a1.duration = duration;
a2.opacity = 0;a2.duration = duration/2; // closes quicker than opens

exports.popover = function(_args) {
    if(_args === undefined) _args = {};
    if(_args.title === undefined) _args.title = 'Popover';

    var win = Ti.UI.createWindow({
        width: Ti.UI.FILL,
        height: Ti.UI.FILL,
        opacity: 0,
        backgroundColor:'transparent'
    });
    
    // calculate top measurements
    var arrowTop = (_args.top) ? _args.top : 50,
    	chromeTop = arrowTop+17, // height of arrow PNG
    	labelTop = chromeTop + 5,
    	viewTop = labelTop + 25;

    var chrome = Ti.UI.createView({
        width: (_args.width) ? _args.width : 300,
        height: (_args.height) ? _args.height : 340,
        top: chromeTop,
        backgroundImage: 'images/popover/PopoverPortrait.png'
    });
    win.add(chrome);
    
    win.add(Ti.UI.createLabel({
        text: _args.title,
        color:"#fff",
        textAlign:"center",
        height: Ti.UI.SIZE,
        top: labelTop,
        font:{fontSize:18,fontWeight:"bold"}
    }));

    var arrow = Ti.UI.createImageView({
        width: 40,
        height: 20,
        top: arrowTop,
        image:'/images/popover/PopoverPortraitArrow.png'
    });
    win.add(arrow);

    if(_args.left !== undefined && arrow.right === undefined) {
        arrow.left = _args.left;
    }

    if(_args.right !== undefined && arrow.left === undefined) {
        arrow.right = _args.right;
    }

    if(arrow.right === undefined && arrow.left === undefined) {
        arrow.left = 15;
    }

	// calculate view dimensions
	var viewWidth = (_args.width) ? _args.width-18 : 230,
		viewHeight = (_args.height) ? _args.height-38 : 300;

    var view = Ti.UI.createView({
        width: viewWidth,
        height: viewHeight,
        top: viewTop,
        backgroundColor: 'white',
        borderRadius: 8
    });
    win.add(view);

    if(_args.view !== undefined) {
        _args.view.top = 0;
        _args.view.left = 0;
        _args.view.borderRadius = 8;
        _args.view.width = viewWidth;
        _args.view.height = viewHeight;
        view.add(_args.view);
    }

    _args.view.open = function() {
        win.open();
        win.animate(a1);
    };

    _args.view.close = function() {
        win.animate(a2);
        setTimeout(function() {win.close();}, duration)
    };


    win.addEventListener('close', function() {
        win = null;
    });

    win.addEventListener('click', function(e) {
        if(e.source === win) {
        	win.animate(a2);
	        setTimeout(function() {win.close();}, duration)
        }
    });

    return _args.view;
};