// DESCRIZIONE:
// Attraverso una chiamata ajax all’Api di boolean avremo a disposizione una decina di dischi musicali.
// Servendoci di handlebars stampiamo tutto a schermo. In questo momento non è importante la parte grafica.
// quindi qua o rifacciamo da capo o finiamo il layout come da screeshot (che vi metto sotto).
// BONUS: (ma solo se il resto è fatto)
//  Creare una select con i seguenti generi: pop, rock, metal e jazz. In base a cosa scegliamo nella select vedremo i corrispondenti cd.



$(document).ready(function() {

  // inizializzo template handlebars
  var source = $("#entry-template").html();
  var template = Handlebars.compile(source);

  // chiamata ajax
  $.ajax({
    url : "https://flynn.boolean.careers/exercises/api/array/music",
    method : "GET",
    // se tutto va bene
    success : function(risultato) {
      console.log(risultato.response);

      // tutti i risultati con tutte le proprietà
      var listaAlbum = risultato.response;

      for(var i = 0; i < listaAlbum.length; i++) {

        // singolo album con tutte le proprietà
        var albumCorrente = listaAlbum[i];

        // creo oggetto context che contiene tutti i dati
        var context = {
          poster: albumCorrente.poster,
          title : albumCorrente.title,
          author : albumCorrente.author,
          year : albumCorrente.year,
          genre : albumCorrente.genre
        };

        // stampo in pagina tramite handlebars
        var risultatoDaAggiungere = template(context);
        $(".cds-container").append(risultatoDaAggiungere);
      };
    },

    // se ci sono errori
    error : function(richiesta, stato, errori) {

      // stampo in pagina
      $(".cds-container").html("<p>Si è verificato un errore.</p>");
      console.log("Si è verificato un errore: ", richiesta, stato, errori);
    }
  });


  // mostro album a seconda del genere
  // andava bene ...("change", "select", function()...
  $(".filtro-album select").on("input", function() {

    // creo variabile dove salvo la scelta del genere da select
    var filtro = $(this).val().toLowerCase();

    // cerco tra tutti i cd
    $(".cd").each(function() {

      // creo variabile dove salvo il genere del singolo album
      var genereCd = $(this).data("genre").toLowerCase();

      // se il genere scelto è vuoto o è uguale a quello del singolo album
      if (filtro === "" || genereCd === filtro) {

        // mostro tutti i cd
        $(this).show();

        // altrimenti se non hanno lo stesso //data//
      } else {

        // nascondo i cd
        $(this).hide();
      }
    });
  });
});
