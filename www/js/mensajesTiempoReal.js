var timestamp = null;
function cargar_push() 
{ 
	$.ajax({
	
    type: "POST",
    url: "http://192.168.1.76/ArchivosServidor/httpush.php",
    data: "&timestamp="+timestamp,
    beforeSend: function() {
        document.getElementById("muestradeMensajes").innerHTML = "Enviando...";
      },
    success: function(response)
	{	
		if(timestamp == null)
		{
		
		}
		else
		{
			$.ajax({
		
			type: "POST",
			url: "http://192.168.1.76/ArchivosServidor/mostrarMensajes.php",
		
		
			success: function(response)
			{	
				$('#muestradeMensajes'+tipo).html(response);
			}
			});	
		}
		setTimeout('cargar_push()',1000);
		    	
    }
	});		
}

$(document).ready(function()
{
	cargar_push();
});	 
