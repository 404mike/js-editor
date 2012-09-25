/* Author:

*/

!(function(){

	panda = {
	
		abbr : function(){
			abbr_holder = {};
			text = $('#ta').val();

			original_abbr = text.match(/<abbr (.*?)>(.*?)<\/abbr>/gi);

			if(original_abbr != null)
			{
				for(var i = 0; i < original_abbr.length; i++){
					abbr_holder['$$$PANDA_ABBR$$$' + i] = original_abbr[i];
					text = text.replace(original_abbr[i],' $$$PANDA_ABBR$$$' + i + ' ');
				}	
				console.log(text);		
			}

			
			/*foo = text.split(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/gi);
			
			for(var i = 0; i < foo.length; i++){
			    // $(html[i]) etc.
			    console.log(foo[i]);
			}*/

		},

		entities : function(){
			entity_list = {
				'Â' : '&Acirc;',
				'Ê' : '&Ecirc;',
				'Î' : '&Icirc;',
				'Ô' : '&Ocirc;',
				'Û' : '&Ucirc;',
				'Ŷ' : '&#374;',
				'Ŵ' : '&#372;',
				'â' : '&acirc;',
				'ê' : '&ecirc;',
				'î' : '&icirc;', 
				'ô' : '&ocirc;', 
				'û' : '&ucirc;', 
				'ŷ' : '&#375;',
				'ŵ' : '&#373;',
				'Á' : '&Aacute;', 
				'É' : '&Eacute;', 
				'Í' : '&Iacute;', 
				'Ó' : '&Oacute;', 
				'Ú' : '&Uacute;', 
				'Ý' : '&Yacute;', 
				'Ẃ' : '&#7810;',
				'á' : '&aacute;', 
				'é' : '&eacute;', 
				'í' : '&iacute;', 
				'ó' : '&oacute;', 
				'ú' : '&uacute;', 
				'ý' : '&yacute;', 
				'ẃ' : '&#7811;',
				'Ä' : '&Auml;', 
				'Ë' : '&Euml;', 
				'Ï' : '&Iuml;', 
				'Ö' : '&Ouml;', 
				'Ü' : '&Uuml;', 
				'Ÿ' : '&Yuml;', 
				'Ẅ' : '&#7812;',
				'ä' : '&auml;', 
				'ë' : '&euml;', 
				'ï' : '&iuml;', 
				'ö' : '&ouml;', 
				'ü' : '&uuml;', 
				'ÿ' : '&yuml;', 
				'ẅ' : '&#7813;',
				'À' : '&Agrave;',
				'È' : '&Egrave;',
				'Ì' : '&Igrave;',
				'Ò' : '&Ograve;', 
				'Ù' : '&Ugrave;', 
				'Ỳ' : '&#7922;', 
				'Ẁ' : '&#7808;',
				'à' : '&agrave;', 
				'è' : '&egrave;', 
				'ì' : '&igrave;',
				'ò' : '&ograve;', 
				'ù' : '&ugrave;', 
				'ỳ' : '&#7923;', 
				'ẁ' : '&#7809;',
				'Ā' : '&#256;',
				'Ē' : '&#274;',
				'Ī' : '&#298;',
				'Ō' : '&#332;',
				'Ū' : '&#362;',
				'Ȳ' : '&#562;',
				'ā' : '&#257;',
				'ē' : '&#275;',
				'ī' : '&#299;',
				'ō' : '&#333;',
				'ū' : '&#363;',
				'ȳ' : '&#563;'		
			};
	
		},

	};

	// Onclick handlers
	$('#abbr').click(panda.abbr);

})();





