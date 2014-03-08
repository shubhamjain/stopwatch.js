(function($){

	var commandObj = null;
	var isProcessing = false;
	var commandInterval;
	var QUIT = 2;

	function processCommand( command, outputEle )
	{
		var commandName;
		var commandArgs;

		commandName = command.split(' ')[0];
		commandArgs = command.split(' ')[1];

		if( typeof window[commandName] === "object")
		{
			commandObj = window[commandName];
			commandObj.init();

			isProcessing = true;

			if( commandObj.isContinuous )
			{
				$("body").on('keypress', function(e){
					if( commandObj.keyAction( e.charCode ) === QUIT )
					{
						clearInterval( commandInterval );
					}
				});

				commandInterval = setInterval( function(){
					$(outputEle).html( commandObj.show() )
				}, 100);
			}
				
		} else {
			return false;
		}

	}

	//Nano templates by trix.pl
	function nano(template, data)
	{
		return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
			var keys = key.split("."), v = data[keys.shift()];
	    	for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
	    	return (typeof v !== "undefined" && v !== null) ? v : "";
		});
	}

	$.fn.commandLine = function( args ){

		var defaults = {
			outputEle: "pre.output", 		//Element in which the output is to be shown
			commandRowClass: "command-row", //Class of a new command line inserted ater command finished executing
			username: "Guest",			
			computerName: "localhost",
			blinkingCursor: "span.blinking-cursor", //Used to destroy blinking cursor after command finished exceucting
			commandRowTemplate: '<div class="command-row"> \
					                <span class="computer-name">{username}@{computerName}:~$</span> \
					                <span id="command"></span><span class="blinking-cursor">&#9608;</span> \
					            </div> \
					            <pre class="output"></pre>
					            </div>'
		}

		$.extend({}, defaults, args);
	
		var commandStr = "";
		var commandE = this; //Store the element to jQuery plugin is called, since this is overrided

		// Listen to two events because keypress can't capture Backspace key 
		// and Keyup can't capture the case of pressed key.
		$("body").on('keyup keypress', function(e){

			if( ! isProcessing )
				//if "Enter" is pressed, process command				
				if(e.charCode === 13)
				{
					processCommand( commandStr, outputEle );				
					commandStr = "";
				} else if( e.keyCode === 8 ) {
					tempCommandStr = tempCommandStr.slice(0, -2);
				} else if( e.charCode ){
					commandStr += String.fromCharCode( e.charCode  );				
				}

			$(commandE).text( commandStr );
		});
	}
})(jQuery);