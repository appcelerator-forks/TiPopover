# TiPopover

Custom Popover, that mimics Ti.UI.iPad.createPopover()

- by @skypanther as a largely rewritten fork of https://github.com/mattapperson/TiPopover/
- published at https://github.com/skypanther/TiPopover

Works on iPhone, iPod, and should work on iPad & Android but they're having some issues at the moment

Create like:
```
var table = someViewLikeATable;
pop = popover.createPopover({
   title: 'Foo',
   view: table,
   backshadeColor: '#aaa', // optional background shading on non-iPad
});
win.add(pop);
// if you run this on iPad, you must provide a view param
// in the show() method or it will fail
pop.show({view: button});

```
See popover.js and the defaults{} object for a list of parameters that can be passed in

Doesn't use any graphics. Though, I might use some once I add back in the arrow/pointer that was in Matt's original.

## Known issues

- On iPad, the child view is offset, shown centered in the window, and behind the popover!
- On Android, force closes with a message about a hashMap problem
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