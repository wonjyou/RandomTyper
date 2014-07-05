# RandomTyper

A jQuery plugin to replicate Yugo Nakamura's random text animation as seen on [yugop.com](http://yugop.com)


The plugin should be chainable and allows you to set the following options:
* speed - the number of milliseconds per frame to use
* callback - a function to call once the animation is complete
* autostart - determines whether the animation should start automatically or manually.  If used, then you need to call the .start() method manually.

## Example Usage

$("#hello").randomTyper({message:"hello world"});	

Here's a callback function example:

			function exampleCallback(){
				console.log("exampleCallback called");
			}
			
			$("#hello").randomTyper({message:"hello world", callback: exampleCallback});
			
