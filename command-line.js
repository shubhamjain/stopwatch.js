(function($){

	var commandObj = null;
	var isProcessing = false;
	var commandInterval;
	var QUIT = 2;

	function bodyEventListner( opts )
	{

		var commandStr = "";

		// Listen to two events because keypress can't capture Backspace key 
		// and Keyup can't capture the case of pressed key.
		$("body").on('keyup keypress', function(e){

			//Don't process input key if another command is still in progress
			if( ! isProcessing )
				//if "Enter" is pressed, process command				
				if(e.type === "keypress" && e.keyCode === 13)
				{
					processCommand( commandStr, opts, this );				
					commandStr = "";
				} else if( e.keyCode === 8 && e.type === "keyup" ) {
					commandStr = commandStr.slice(0, -1);
				} else if( e.charCode ){
					commandStr += String.fromCharCode( e.charCode  );				
				}

			$( "."+opts.commandTextClass ).text( commandStr );
		});
	}

	function processCommand( command, opts, commandsEle )
	{
		var commandName;
		var commandArgs;

		commandName = command.split(' ')[0];
		commandArgs = command.split(' ')[1];	//Not yet implemented.

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
						clearInterval( commandObj.intervalId );
						isProcessing = false;

						$(commandsEle).find("*").each(function(){
							$(this).removeClass();
						}); 

						$("body").unbind("keypress keyup");
						bodyEventListner( opts );

						$(commandsEle).append( nano(opts.commandRowTemplate, opts) );
					}
				});

				commandInterval = setInterval( function(){
					$(opts.outputEle).html( commandObj.show() )
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

		var opts = $.extend({}, $.fn.commandLine.defaults, args);
	
		this.html( nano(opts.commandRowTemplate, opts) ); //Construct the default template

		bodyEventListner( opts );
	};

	$.fn.commandLine.defaults = {
		outputEle: "pre.output", 		//Element in which the output is to be shown
		commandRowClass: "command-row", //Class of a new command line inserted ater command finished executing
		commandTextClass: "command-text", //Class of a new command line inserted ater command finished executing
		username: "Guest",			
		computerName: "localhost",
		blinkingCursorClass: "blinking-cursor", //Used to destroy blinking cursor after command finished exceucting
		commandRowTemplate: '<div class="command-row"> \
				                <span class="computer-name">{username}@{computerName}:~$</span> \
				                <span class="{commandTextClass}"></span><span class="{blinkingCursorClass}">&#9608;</span> \
				            </div> \
				            <pre class="output"></pre> \
				            </div>'
	}
})(jQuery);