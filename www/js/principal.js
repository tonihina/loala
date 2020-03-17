$(document).ready(function() {

  $.ajax({
    type: "POST",
    url: "http://192.168.1.76/ArchivosServidor/mostrarImagen.php",
    cache: false,
    data: "nombre="+localStorage.getItem("nombre"),
    beforeSend: function() {
        $("#fotoPublicar").text("Cargando...");
      },
    success: function(response)
    {
        $('#fotoPublicar').html(response+" Hola "+localStorage.getItem("nombre")+" publica algo").fadeIn();
        
        $("#fotoPublicar").listview("refresh");

    }
});  

});

$(document).ready(function() {

  $.ajax({
    type: "POST",
    url: "http://192.168.1.76/ArchivosServidor/mostrarPublicaciones.php",
    cache: false,
    beforeSend: function() {
        $("#mostrarPublicaciones").text("Cargando...");
      },
    success: function(response)
    {
        $('#mostrarPublicaciones').html(response).fadeIn();
        
        $("#mostrarPublicaciones").listview("refresh");

    }
});  

});


$(function(){
  $("input[name='imagenHistoria']").on("change", function(){
      var formData = new FormData($("#historiaSubirAservidor")[0]);
      var ruta = "http://192.168.1.76/ArchivosServidor/subirHistoria.php";
      $.ajax({
          url: ruta,
          type: "POST",
          data: formData,
          contentType: false,
          processData: false,
          success: function(datos)
          {
            if(datos=="success"){
              window.location.reload();
            }
            else{
              
            }
          
          }
      });
  });
});

$(function(){
  $("#botonPublicar").on("click", function(){
    var formData = new FormData($("#publicarAlgo")[0]);
    
    var ruta = "http://192.168.1.76/ArchivosServidor/subirPublicacion.php";

    $.ajax({
        url: ruta,
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function(datos)
        {
          if(datos=="success"){
            window.location.replace("principal.html");
          }
          else{
            
          }
        
        }
    });
    
  });
});

$(document).ready(function() {
  $.ajax({
          type: "POST",
          url: "http://192.168.1.76/ArchivosServidor/mostrarHistorias.php",
          cache: false,
         
          beforeSend: function() {
              $("#historiasTodas").text("Cargando...");
            },
          success: function(response)
          {
              $('#historiasTodas').html(response).fadeIn();
              $("#historiasTodas").listview("refresh");

              
             
          }
  });

});



  $(function() {
   $('#publicacionImagen').change(function(e) {
       addImage(e); 
      });
 
      function addImage(e){
       var file = e.target.files[0],
       imageType = /image.*/;
     
       if (!file.type.match(imageType))
        return;
   
       var reader = new FileReader();
   
       reader.onload = function(e){
          var result=e.target.result;
         $('#imgpublicar').attr("src",result);
         document.getElementById("botonPublicar").style.display="block";
       }
        
       reader.readAsDataURL(file);
      }
     });

     $(function() {
      $('#imagenHistoria').change(function(e) {
          addImage(e); 
         });
    
         function addImage(e){
          var file = e.target.files[0],
          imageType = /image.*/;
        
          if (!file.type.match(imageType))
           return;
      
          var reader = new FileReader();
      
          reader.onload = function(e){
             var result=e.target.result;
            $('#imgSalida').attr("src",result);
          }
           
          reader.readAsDataURL(file);
         }
        });
  
function detalleHistoria(usuario){
  $.ajax({
    type: "POST",
    url: "http://192.168.1.76/ArchivosServidor/mostrarDetalleHistoria.php",
    cache: false,
    data: "nombre="+usuario,
    beforeSend: function() {
        $("#mostrarDetalleHistoria").text("Cargando...");
      },
    success: function(response)
    {
        $('#mostrarDetalleHistoria').html(response).fadeIn();
       
       
    }
});  
}
 
function salir(){
  localStorage.clear();
  window.location.replace("index.html");
}



function verDetalleHis(usuario) {
  $.ajax({
    type: "POST",
    url: "http://192.168.1.76/ArchivosServidor/mostrarDetalleHistoria.php",
    data: "nombre="+usuario,
    dataType:"JSON",
    crossDomain: true,
    cache: false,
    success: function(data)
    {
      var i=0;
      var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array

var items = [
    {
        src: 'http://192.168.1.76/ArchivosServidor/historias/'+data[i].imagen,
        w: 600,
        h: 400
    }
];
i++;
while(data[i]!=null){
    items.push({
      src: 'http://192.168.1.76/ArchivosServidor/historias/'+data[i].imagen,
      w: 600,
      h: 400
  });
  i++;
}

// define options (if needed)
var options = {
    // optionName: 'option value'
    // for example:
    index: 0 // start at first slide
};

// Initializes and opens PhotoSwipe
var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
gallery.init();
    
       
    }
});

}

