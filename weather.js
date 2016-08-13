$(document).ready(function(){
	var city, country, latitude, longitude, urlCel, urlFar;
	$.getJSON("http://ip-api.com/json", function(location){
			city = location.city;
			country = location.country;
			latitude = location.lat;
			longitude = location.lon;
			urlCel= "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ 
			longitude +"&units=metric&APPID=468c13e532e7023e736ce19428fecf48";
			urlFar= "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon="+ 
			longitude +"&units=imperial&APPID=468c13e532e7023e736ce19428fecf48";
			$('#location').html(city + ", " + country + ".");
			$.getJSON(urlCel, function(json){
            	var iconsDay = new Skycons({"color": "gold"}), iconsNight = new Skycons({"color": "DarkSlateBlue"}),
            	 	iconsCloud = new Skycons({"color": "DodgerBlue"}); 
            	var condId = json.weather[0].id, conditions = json.weather[0].description, i;
            	var date = new Date(), hour = date.getHours();

				if(condId == 800){ 
					if(hour < 6 || hour >= 19){
						iconsNight.set("icon", "clear-night");
						iconsNight.play();
					}
					else{
						iconsDay.set("icon", "clear-day");
						iconsDay.play();
					}
				} // clear
				else if(condId > 800 && condId < 900){
					if(condId < 803){
						if(hour < 6 || hour >= 19){
							iconsNight.set("icon", "partly-cloudy-night");
							iconsNight.play();
						}
						else{
							iconsDay.set("icon", "partly-cloudy-day");
							iconsDay.play();
						}
					}
					else{
						iconsCloud.set("icon", "cloudy");
						iconsCloud.play();
					}
				} //partly or fully cloudy
				else if(condId > 300 && condId < 400){
						iconsCloud.set("icon", "sleet");
						iconsCloud.play();

				}// drizzle
				else if(condId > 500 && condId < 600){
					iconsCloud.set("icon", "rain");
					iconsCloud.play();
				}// rain
				else if(condId > 600 && condId < 700){
					iconsCloud.set("icon", "snow");
					iconsCloud.play();					
				}//snow
				else if(condId > 700 && condId < 800){
					iconsCloud.set("icon", "fog");
					iconsCloud.play();					
				}//atmosphere
				else if(condId !== 951){
					iconsCloud.set("icon", "wind");
					iconsCloud.play();
				}//windy or storm
				if(hour < 6 || hour >= 19){
					conditions += " night";
					$('#frame').addClass('night');
				}
				else{
					conditions += " day";
					$('#frame').addClass('day');
				}
				conditions = conditions.substr(0,1).toUpperCase()+conditions.substr(1)+".";
				$('#cel').html(json.main.temp + " °C.");
				$('#conditions').html(conditions);
			});
			$.getJSON(urlFar, function(json){
				$('#far').html(json.main.temp + " °F.");
			});
		}); //Obtiene todos los datos haciendo una sola llamada.
	$('#far').fadeOut(0); //Esconde la temperatura en Farenheit.
	function changeUnits(newUnit, oldUnit){ 
		$(newUnit+"Button").addClass('active');
		$(oldUnit+"Button").removeClass('active');
		$(oldUnit).fadeOut(250, function(){
			$(newUnit).fadeIn(250);
		});
	}; //Intercambia una unidad por otra cuando se toca un boton.
	$('#celButton').click(function(){
		changeUnits("#cel","#far");
	}); //Intercambia farenheit por celsius.
	$('#farButton').click(function(){
		changeUnits("#far","#cel");
	}); //Intercambia celsius por farenheit.
    

});