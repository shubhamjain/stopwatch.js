(function($){

	var commandObj = null;

	function processCommand( command )
	{
		var commandName;
		var commandArgs;

		commandName = command.split(' ')[0];
		commandArgs = command.split(' ')[1];

		if( typeof window[commandName] === "object")
		{
			commandObj = window[commandName];
			commandObj.init();
		} else {
			return false;
		}

	}

	$.fn.commandLine = function( inputEle ){
	
		var tempCommandStr = "";
		var command;

		var commandE = this; //Store the element to jQuery plugin is called, since this is overrided

		// Listen to two events because keypress can't capture Backspace key 
		// and Keyup can't capture the case of pressed key.
		$("body").on('keyup keypress ', function(e){

			//if "Enter" is pressed, process command
			if(e.keyCode === 13)
			{
				command = tempCommandStr;
				tempCommandStr = "";
				processCommand( command );
			} else if( e.keyCode === 8 ) {
				tempCommandStr = tempCommandStr.slice(0, -2);
			} else {
				tempCommandStr += String.fromCharCode( e.charCode  );				
			}

			$(commandE).text( tempCommandStr );
		});
	}
})(jQuery);