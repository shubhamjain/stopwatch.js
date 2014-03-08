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

	$.fn.commandLine = function( outputEle ){
	
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