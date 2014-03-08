(function($){

	function processCommand( command )
	{
		var commandName;
		var commandArgs;

		commandName = command.split(' ')[0];
		commandArgs = command.split(' ')[1];
	}

	$.fn.commandLine = function(){
	
		var tempCommandStr = null;
		var command;

		var commandE = this; //Store the element to jQuery plugin is called, since this is overrided

		$("body").keypress(function(e){

			//if "Enter" is pressed, process command
			if(e.charCode === 13)
			{
				command = tempCommandStr;
				tempCommandStr = null;
				processCommand( command );
			}

			tempCommandStr += String.fromCharCode( e.charCode );
			$(commandE).text( tempCommandStr );
		});
	}
})(jQuery);