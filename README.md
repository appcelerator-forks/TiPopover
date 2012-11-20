# TiPopover

Custom Popover, that mimics Ti.UI.iPad.createPopover()

- by @skypanther as a largely rewritten fork of https://github.com/mattapperson/TiPopover/
- published at https://github.com/skypanther/TiPopover

Works on iPhone, iPod, and iPad. Mostly on Android.

```
Create like:
	var table = someViewLikeATable;
    pop = popover.createPopover({
		title: 'Foo',
		view: table,
		backshadeColor: '#aaa', // optional background shading on custom popover
		ipadOverride: false, // optional, to use custom rather than native popover on iPad
		hideCallback: function() { 
			// called when backshade or Done button is used to disclose the popover
			popovershowing = false;
			if(osname!='ipad') win.remove(pop);
		},
		leftNavButton: 'Done' // string or Ti.UI.Button
    });
    // if you set ipadOverride to true, then you will have to
    // win.add(pop) on iPad, otherwise, don't add it to the win
    // when running on iPad or you'll get strange view problems
    if(osname == 'ipad') pop.show({view: button});  // android will die horribly if an obj is passed to show()
    else pop.show();

	// hideCallback() -- in the example, we set a var that tracks whether the popover
	//	is showing (so we don't show it again). With this param, pass in a function that sets
	//	your tracking var to false. This will be called when the user taps the backshade.
	//	Without this, the next tap to show the popover would fail, the third would show it again.
	
	// leftNavButton -- optional button for the popover's title bar. Pass a string and a button
	// 	with that label is created; such a button would close the popover when tapped. Pass a 
	//	Ti.UI.Button to have it do something other than close.
	// rightNavButton exists, and is untested, accepts ONLY Ti.UI.Button

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

```
See popover.js and the defaults{} object for a list of parameters that can be passed in

Doesn't use any graphics. Though, I might use some once I add back in the arrow/pointer that was in Matt's original.

## Known issues

- On Android, works fine on first display. Subsequent show() calls display the popover without its child view.
- No arrow/pointer on non-iPad



(Matt's original readme follows)

----------------------------------


Titanium iPhone pop-over

This CommonJs module gives you iPad style pop-overs on iPhone…

It still needs some work.. but until I get around to it… I thought I would at least share.

ToDo:
- Create a real pop-over when on an iPad
- Test / fix android bugs
- Landscape mode

I do request, but not require that if you modify and re-release this script, that you give me some credit… but I leave that up to you :)

----------------------------------
Copyright (C) 2012 Matt Apperson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.