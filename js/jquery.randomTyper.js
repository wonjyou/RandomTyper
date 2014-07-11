/*!
 * jQuery Text Randomizer Animation Plugin
 * Copyright (c) 2014 Won You
 * Version: 1.0 (July 4, 2014)
 * Free to use under the GPLv2 license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 */
(function($) {

	function Randomizer(element, settings) {
		
		this.el = element;
		this.$el = $(element);
		this.settings = $.extend( {}, $.fn.randomTyper.defaults, settings );

		this._init();
	}

	Randomizer.prototype = {
		_init: function() {
				this.str = this.settings.message;  //the user-defined string
				this.speed = this.settings.speed;  //The time interval to use for rendering text
				this.len = this.str.length; //The string length 
				this.tracker = 0;
				this.charStart = 33; //the starting index of the character code to randomly pull
				this.charEnd = 122;  //the end index of the random character code range
				this.typoText = ""; //the output string
				this.autostart = this.settings.autostart;
				this.trigger = this.len * 0.75; //when to start resolving the random text to the proper characters
				this.delay = this.settings.delay; //time delay in milliseconds if autostart is true
				
				if (this.autostart){		
					var self = this;						
					setTimeout(function(){self.start();}, this.delay);
				}
		},
		
		destroy: function(){
			this.stop();
			// Remove data
			this.$el.removeData();
		},
		
		stop: function(){
			this.tracker = 0;
			clearInterval(this.typeInterval);
			if (this.fixer){
				clearInterval(this.fixer);
			}
		},
		
		changeMessage: function(msg){
			this.str = msg;
		},
		
		randRange: function(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
		
		_randomText: function () {
	
			if (this.tracker >= this.trigger) {					
				
				this.stop();
				this.tracker = 0;
				var self = this;
				this.fixer = setInterval(function(){self.correctText();}, this.speed);
			} 
			else {
				this.typoText = "";

				for (var i=0; i<this.tracker; i++) {
					if (this.str.charAt(i) != " "){

						var randomNum = this.randRange(this.charStart, this.charEnd); //pull a random character code from this range
						
						this.typoText += String.fromCharCode(randomNum);
					}
					else{
						this.typoText += " ";
					}
						
				}
				
				//Create a probabilistic throttle
				//if (this.randRange(0, 10) > 5){
					this.tracker++;
				//}
				this.$el.text(this.typoText);
			}
		},
		
		correctText: function(){

			if (this.tracker >= this.len) {	
				clearInterval(this.fixer);
				this.$el.text(this.str);
				this.settings.callback();
			} 
			else {
				this.typoText = "";
				
				for (var i = 0; i<this.len; i++){
					if (i < this.tracker){
						this.typoText += this.str.charAt(i);

					}
					else{
						var randomNum = this.randRange(this.charStart, this.charEnd); 
						//Skip spaces
						if (this.str.charAt(i) != " "){
							this.typoText += String.fromCharCode(randomNum);
						}
						else{
							this.typoText += " ";
						}						
					}
				}
				
				this.$el.text(this.typoText);
				this.tracker++;
			}		
		},
		
		start: function(){
			var self = this;
	
			this.typeInterval = setInterval(function(){self._randomText();}, this.speed);
	
		}
	}

	
	$.fn.randomTyper = function(options) {
		var args = arguments;

		if (options === undefined || typeof options === 'object') {

			return this.each(function() {
				if (!$.data(this, 'plugin_randomTyper')) {
					$.data(this, 'plugin_randomTyper', new Randomizer(this, options));
				}
			});
		} else if (typeof options === 'string' && options[0] !== '_' ) {

			if (Array.prototype.slice.call(args, 1).length == 0) {

				var instance = $.data(this[0], 'plugin_randomTyper');
				return instance[options].apply(instance, Array.prototype.slice.call(args, 1));
			} else {

				return this.each(function() {
					var instance = $.data(this, 'plugin_randomTyper');
					if (instance instanceof Randomizer && typeof instance[options] === 'function') {
						instance[options].apply(instance, Array.prototype.slice.call(args, 1));
					}
				});
			}
		}

	}
	
	$.fn.randomTyper.defaults = {
			message: '', 
			speed: 20,
			delay: 0,
			autostart: true,
			callback: function(){}
	}
})(jQuery);