/* Author:

*/

!(function(){

	panda = {

		lang : ['en','cy'],
	
		abbr : function(){
			$('#paste_container').html('');
			$('#controls,#ta').slideUp();
			$('#paste').fadeIn();
			abbr_holder = {};
			tags_holder = {};
			ta_text = [];
			text = $('#ta').val();

			// Check for existing abbreviations and add them to
			// abbr_holder object and replace with a placeholder in the text
			original_abbr = text.match(/<abbr (.*?)>(.*?)<\/abbr>/gi);

			if(original_abbr != null)
			{
				for(var i = 0; i < original_abbr.length; i++){
					abbr_holder['###PANDA_ABBR###' + i] = original_abbr[i];
					text = text.replace(original_abbr[i],' ###PANDA_ABBR###' + i + ' ');
				}					
			}

			// Check for tags and add them to
			// tags_holder object and replace with a placeholder in the text
			tags = text.match(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/gi);
			
			if(tags != null)
			{
				for(var i = 0; i < tags.length; i++){
					tags_holder['###PANDA_TAGS###'+i] = tags[i];
					text = text.replace(tags[i], ' ###PANDA_TAGS###'+i+' ');
				}
			}

			// Add all the words and placeholders to ta_text array
			words = text.split(' ');
			for(var i = 0; i < words.length; i++){
				ta_text.push(words[i]);
			}

			// Stop cachine issues
			var noCache = Date();

			// Get abbrevations from json
			$.getJSON("json/abbr/en.json",{format: "json", "noCache" : noCache},function(data) {
				// Loop through each item in ta_text
				// ignoring any placeholders
				// check to see if the words match a possible abbreviation
				for(var i = 0; i < ta_text.length; i++){
					option = '';
					if( ta_text[i].match(/[^###PANDA_ABBR###(0-9)]/gi) && 
						ta_text[i].match(/[^###PANDA_TAGS###(0-9)]/gi))
					{
						$.each(data.abbr,function(index, value){
							//console.log(words[i] + ' ' + value.abbr + ' ' + value.value);
							var re = new RegExp(value.abbr, 'ig');
							if(ta_text[i].match(re))
							{
								//console.log('match ' + ta_text[i] + ' ' + value.abbr + ' ' + value.value);
								option += '<option value="<abbr title=\''+value.value+'\'>'+ta_text[i]+'</abbr>">'+value.value+'</option>';
							}
						});		
						if(option != '') ta_text[i] = '<select class="abbr_choice"><option value="'+ta_text[i]+'">'+ta_text[i]+'</option>'+option+'</select>';
					}

					// Replace all the palceholders with the orginal tags
					if( ta_text[i].match(/###PANDA_ABBR###.*/gi))
						ta_text[i] = abbr_holder[ta_text[i]];

					if( ta_text[i].match(/###PANDA_TAGS###.*/gi))
						ta_text[i] = tags_holder[ta_text[i]];

					$('#paste_container').append(ta_text[i] + ' ');
				}
			});	
		},

		process_abbrs : function(){
			$('.abbr_choice').each(function(){
				$(this).replaceWith($(this).val());
			});
			$('#ta').val($('#paste_container').html());
			$('#paste_container').html('');
			$('#controls,#ta').slideDown();
			$('#paste').fadeOut();
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

		file_extension : function(){

		}

	};

	// Onclick handlers
	$('#abbr').click(panda.abbr);
	$('#confirm_abbr').click(panda.process_abbrs);

})();





