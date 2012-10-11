/* Author:
@404mike
*/

!(function(){

	panda = {

		lang : ['en','cy'],
		current_lang : '',

		lang_setup : function(){
			var _this = this;
			_this.current_lang = _this.lang[0];

			lng_string = '<select id="lang_switch">';

			for(var i = 0; i < _this.lang.length; i++){
				lng_string += '<option value="'+_this.lang[i]+'">'+_this.lang[i]+'</option>';
			}

			lng_string += '</select>';
			$('#lang').html(lng_string);
		},

		lang_change : function(){
			panda.current_lang = $('#lang_switch').val();
		},
	
		abbr : function(){
			$('#paste_container').html('');
			$('#controls,#ta').slideUp();
			$('#paste').fadeIn();
			abbr_holder = {};
			tags_holder = {};
			ta_text = [];
			text = $('#ta').val();
			preview = '';
			possible_abbr ={};

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
			$.getJSON("json/abbr/"+panda.current_lang+".json",{format: "json", "noCache" : noCache},function(data) {
				// Loop through each item in ta_text
				// ignoring any placeholders
				// check to see if the words match a possible abbreviation
				for(var i = 0; i < ta_text.length; i++){
					option = '';
					if( ta_text[i].match(/[^###PANDA_ABBR###(0-9)]/gi) && 
						ta_text[i].match(/[^###PANDA_TAGS###(0-9)]/gi))
					{
						$.each(data.abbr,function(index, value){
							var re = new RegExp(value.abbr, 'ig');
							if(ta_text[i].match(re))
							{
								option += '<option value="<abbr lang=\''+panda.current_lang+'\' title=\''+value.value+'\'>'+ta_text[i]+'</abbr>">'+value.value+'</option>';
							}
						});		
						if(option != '') 
						{
							ta_text[i] = '<select id="panda'+i+'" class="abbr_choice"><option value="'+ta_text[i]+'">'+ta_text[i]+'</option>'+option+'</select>';
							possible_abbr['###PANDA_POSS_ABBR'+i+'###'] = '###PANDA_POSS_ABBR'+i+'###';
						}
					}

					// Replace all the palceholders with the orginal tags
					if( ta_text[i].match(/###PANDA_ABBR###.*/gi))
						ta_text[i] = abbr_holder[ta_text[i]];

					if( ta_text[i].match(/###PANDA_TAGS###.*/gi))
						ta_text[i] = tags_holder[ta_text[i]];					
					
					preview += ta_text[i] + ' ';
				}				
			}).success(function(){
				$('#paste_container').html(preview);
			});	
		},

		process_abbrs : function(){
			loc = preview;
			$('.abbr_choice').each(function(){
				a = this;
				var re = new RegExp('\<select id\="'+a.id+'"(.*?)\<\/select\>', 'ig');
				loc = loc.replace(re,$(this).val());
			});

			$('#ta').val(loc);
			$('#paste_container').html('');
			$('#controls,#ta').slideDown();
			$('#paste').fadeOut();			
		},

		entities : function(){
			// List of html entities
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

			// Get textarea text
			ta_string = $('#ta').val();
			ta_string_arr = [];
			ta_string_complete = '';

			// split textarea text into array
			for (var i = 0; i < ta_string.length; i++){
			    c = ta_string.charAt(i);
			    ta_string_arr.push(c);
			}
			
			// Loop through array checking each item to 
			// see if it matches a html entity
			// if we find a match replace it with the HTML equivalent
			for(var i = 0; i < ta_string_arr.length; i++){
				if(entity_list[ta_string_arr[i]] != undefined) 
					ta_string_arr[i] = entity_list[ta_string_arr[i]];

				ta_string_complete += ta_string_arr[i];
			}
			$('#ta').val(ta_string_complete);
		},

		file_extension : function(){
			text = $('#ta').val();
			doc_links = text.match(/<a (.*?)>(.*?)<\/a>/gi);
			for(var i = 0; i < doc_links.length; i++){
				// Match PDF files
				if(doc_links[i].match(/<a (.*?)\.pdf(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (<abbr title='Portable Document Format'>PDF</abbr>)");
				// Match Microsoft Word Documents
				if(doc_links[i].match(/<a (.*?)\.doc(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (<abbr title='Microsoft Word Document'>DOC</abbr>)");	
				// Match Microsoft Word Documents - docx
				if(doc_links[i].match(/<a (.*?)\.docx(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (<abbr title='Microsoft Word Document'>DOC</abbr>)");	
				// Match Microsoft Powerpoint Documents
				if(doc_links[i].match(/<a (.*?)\.ppt(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (<abbr title='Microsoft Powerpoint Document'>PPT</abbr>)");					
				// Match Microsoft Excel Documents
				if(doc_links[i].match(/<a (.*?)\.xls(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (<abbr title='Microsoft Excel Document'>XLS</abbr>)");	
				// Match ZIP file
				if(doc_links[i].match(/<a (.*?)\.zip(.*?)>(.*?)<\/a>/gi)) 
					text = text.replace(doc_links[i],doc_links[i]+" (ZIP File)");																		
			}

			$('#ta').val(text);
		},

		table_of_contents : function(){
			var toc = "<div id='table_of_contents'>\n";
			var level = 0;
			
			// First we need to copy the contents of the textarea to a div. In this case
			// the div is 'tocDiv' the purpose is that the generation of table of contents is
			// easier to do on a div rather than inside the textarea.
			$("#toc_container").html($("#ta").val());

			var tocDivContent = $("#toc_container").html();
					
			document.getElementById("toc_container").innerHTML = tocDivContent.replace(/<h([1-6])>(.+?)<\/h(\d)>/gi,

				function toc_regex_generation (str, openLevel2, titleText, closeLevel) 
				{
					if (openLevel2 > level) 
					{
						toc += (new Array(openLevel2 - level + 1)).join("<ul>\n");
					} else 
					{
						toc += (new Array(level - openLevel2 + 1)).join("</ul>\n");
					}

					level = parseInt(openLevel2);

					var anchor = titleText.replace(/ /g, "_");
					toc += "\t<li><a href=\"#" + anchor + "\">" + titleText	+ "</a></li>\n";
					
					return "<span><a name=\"" + anchor + "\"></a></span>\n<h" + openLevel2 + ">" + titleText + "</h" + closeLevel + ">";
				}); //End of replace regex
				

			toc += (new Array(level + 1)).join("</ul>\n</div>\n");

			document.getElementById("toc_list").innerHTML += toc;

			// Get the genrated table of content from the div + the HTML from the div underneath
			var toc_content = document.getElementById("ta").value=document.getElementById("toc_list").innerHTML;
			var div_content = document.getElementById("ta").value=document.getElementById("toc_container").innerHTML;
			// Clean the divs - set them to be empty
			document.getElementById("toc_container").innerHTML= "";
			document.getElementById("toc_list").innerHTML= "";
			// Get the content from the toc and theDiv div and put the HTML back into the textarea
			document.getElementById("ta").value = toc_content + div_content;
		}

	};

	// Set up language settings
	panda.lang_setup();

	// Onclick handlers
	$('#abbr').click(panda.abbr);
	$('#confirm_abbr').click(panda.process_abbrs);
	$('#entities').click(panda.entities);
	$('#lang_switch').change(panda.lang_change);
	$('#toc').click(panda.table_of_contents);
	$('#doc_links').click(panda.file_extension);

})();





