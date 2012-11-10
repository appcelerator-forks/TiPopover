/*
 	Custom Popover, that mimics Ti.UI.iPad.createPopover
 		- by @skypanther, originally a fork of https://github.com/mattapperson/TiPopover/
 		- published at https://github.com/skypanther/TiPopover
 	
 	Works on iPhone, iPod, and should work on iPad, Android but is having some issues at the moment

	Create like:
		var table = someViewLikeATable;
	    pop = popover.createPopover({
			title: 'Foo',
			view: table,
			backshadeColor: '#aaa', // optional background shading on custom popover
			ipadOverride: false // optional, to use custom rather than native popover on iPad
	    });
	    // if you set ipadOverride to true, then you will have to
	    // win.add(pop) on iPad, otherwise, don't add it to the win
	    // when running on iPad or you'll get strange view problems
	    if(osname!='ipad') win.add(pop);
	Open with:
	    if(Ti.Platform.osname != 'ipad') win.add(pop);
	    // if you run this on iPad, you must provide a view param
	    // in the show() method or it will fail
	    pop.show({view: button});

	See popover.js and the defaults{} object for a list of parameters that can be passed in
	
	@params:
		arguments = {
			view: Ti.UI.View to show within popover
			backshadeColor: color string, with custom popover, sets semi-transparent overlay color behind popover
			ipadOverride: boolean, if true, use custom rather than native popover
			width: number, width of popover (must be number not string)
			height: number, height of popover (must be number not string)
			top: number, position of popover (must be number not string)
			left: number, position of popover (must be number not string)
			noarrow: boolean, not currently implemented
			backgroundGradient: Ti.UI.Gradient definition,
			borderRadius: number, not suggested on Android
			backgroundColor: color string
			padding: size of border of custom popover around left/right/bottom edges
		}
	
	Returns:
		if on iPad and args.ipadOverride null/false, a Ti.UI.iPad.Popover
		otherwise a Ti.UI.View
* */

var osname = Ti.Platform.osname,
	is = {
		osname: osname,
		version: parseFloat(Ti.Platform.version),
		width: Ti.Platform.displayCaps.platformWidth,
		height: Ti.Platform.displayCaps.platformHeight,
		android: osname==='android',
		iphone: osname === 'iphone',
		ipad: osname === 'ipad',
		ipod: osname === 'ipod',
		ios: osname === 'iphone' || osname === 'ipad' || osname === 'ipod'		
	};
var maxDimension = (is.width > is.height) ? is.width : is.height;
var minDimension = (is.width < is.height) ? is.width : is.height;
is.iphone5 = (is.ios && maxDimension == 568);
if(is.iphone5) is.ios = true;

var defaults = {
	width: (is.ipad) ? 480 : minDimension - 40,
	height: (is.ipad) ? 600 : minDimension - 60,
	top: 5,
	left: 18,
	noarrow: false,
	backgroundGradient: {
        type: 'linear',
        startPoint: { x: '100%', y: '100%' },
        endPoint: { x: '100%', y: '0' },
        colors: [ { color: '#555', offset: 0}, { color: '#2a2a2a', offset: 0.5 }, { color: 'transparent', offset: 1 } ],
   },
   borderRadius: 8,
   backgroundColor: '#2a2a2a',
   padding: 5
}

var Popover = function(_args) {
	if(!_args) var args = {};
	if(is.ipad && (typeof _args.ipadOverride == undefined || _args.ipadOverride==false)) {
		// on iPad, return a native popover
		var pop = Ti.UI.iPad.createPopover({
	        width: (_args.width) ? _args.width : defaults.width,
	        height: (_args.height) ? _args.height : defaults.height,
	        backgroundColor: (_args.backgroundColor) ? _args.backgroundColor : defaults.backgroundColor,
	        title: (_args.title) ? _args.title : defaults.title,
		});
		// calculate view dimensions
		// then add the view
		if(_args.view) {
			pop.add(_args.view);
		}
		if(_args.leftNavButton) pop.leftNavButton = _args.leftNavButton;
		if(_args.rightNavButton) pop.rightNavButton = _args.rightNavButton;
	} else {
		// on iPhone & android, return a concocted popover
		var pop = Ti.UI.createView({
	        width: Ti.UI.FILL,
	        height: Ti.UI.FILL,
	        opacity: 0,
	        backgroundColor:'transparent',
	        top: 0,
	        zIndex:99
		});
		// extra: set the semi-transparent shade color
		var backshade;
		if(_args.backshadeColor) {
			backshade = Ti.UI.createView({
		        width: Ti.UI.FILL,
		        height: Ti.UI.FILL,
		        opacity: 0.7,
		        backgroundColor:_args.backshadeColor,
		        top: 0,
			});
			pop.add(backshade);
		}
		var wrapper = Ti.UI.createView({
	        width: (_args.width) ? _args.width : defaults.width,
	        height: (_args.height) ? _args.height : defaults.height,
			backgroundColor: (_args.backgroundColor) ? _args.backgroundColor : defaults.backgroundColor,
			borderRadius: (_args.borderRadius) ? _args.borderRadius : defaults.borderRadius,
		});
		var titleView = Ti.UI.createView({
			left: 0, right: 0, top: 5,
			height: 40,
		});
		var titleGradient = Ti.UI.createView({
			left: 0, right: 0, top: -20, bottom: 0,
			height: 40, width: Ti.UI.FILL,
			backgroundGradient: defaults.backgroundGradient
		});
		titleView.add(titleGradient);
		var title = Ti.UI.createLabel({
	        text: (_args.title) ? _args.title : defaults.title,
	        color:"#fff",
	        textAlign:"center",
	        height: Ti.UI.SIZE,
	        top: 5,
	        font:{fontSize:18,fontWeight:"bold"},
		});
		titleView.add(title);
		if(_args.leftNavButton) {
			titleView.add(_args.leftNavButton);
		}
		if(_args.rightNavButton) {
			titleView.add(_args.rightNavButton);
		}
		wrapper.add(titleView);

		// calculate view dimensions
		var viewWidth = (_args.width) ? _args.width-defaults.padding*2 : defaults.width-defaults.padding*2,
			viewHeight = (_args.height) ? _args.height-(defaults.padding*2+40) : defaults.height-(defaults.padding*2+40);
		// then add the view
		if(_args.view) {
			_args.view.width = viewWidth;
			_args.view.height = viewHeight;
			_args.view.top = 40 + defaults.padding;
			_args.view.borderRadius = defaults.borderRadius;
			wrapper.add(_args.view);
		}


		pop.add(wrapper);

		/* some animation fanciness pulled from Matt Apperson's TiPopover */
		// animation objects to control opening and closing
		var duration = 200,
			a1 = Titanium.UI.createAnimation(),
			a2 = Titanium.UI.createAnimation();
		a1.opacity = 1;a1.duration = duration;
		a2.opacity = 0;a2.duration = duration/2; // closes quicker than opens
		// add event listeners that will fade in/out the popover rather than it just appearing
		var showme = function() {
			pop.animate(a1);
			pop.removeEventListener('postlayout', showme);
		}
	    pop.addEventListener('postlayout', showme);
	    pop.addEventListener('click', function(e) {
	        if(e.source === pop || e.source === backshade) {
	        	if(_args.hideCallback) _args.hideCallback();
	        	pop.animate(a2);
		        setTimeout(function() {pop.hide();}, duration)
	        }
	    });


	}
	
	
	return pop;
}

exports.createPopover = Popover;

/*
	SAVE CODE - THE ARROW STUFF FROM MATT'S ORIGINAL
    var arrow = Ti.UI.createImageView({
        width: 40,
        height: 20,
        top: arrowTop,
        image:'/images/popover/PopoverPortraitArrow.png'
    });
    if(!_args.noarrow || _args.noarrow == false) {
	    wrapperView.add(arrow);
    }

    if(_args.left !== undefined && arrow.right === undefined) {
        arrow.left = _args.left;
    }

    if(_args.right !== undefined && arrow.left === undefined) {
        arrow.right = _args.right;
    }

    if(arrow.right === undefined && arrow.left === undefined) {
        arrow.left = 15;
    }

 */