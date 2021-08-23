$(document).ready(function () {
    var itemcount = (localStorage.getItem('listcount')) ? localStorage.getItem('listcount') : 0;
    var tulos = {}; 

    // Laske määrät
    function laskeMaarat() {
        // Haetaan formista valuet
        var ml = $("#neste").val();
        var nikotiini = $("#nikotiinipitoisuus").val();
        var tiiviste = $("#tiivisteenmaara").val();

        //Katsotaan ettei tule vaarallisia määriä nikotiinia ym.
        if (ml < 0) {
            ml = 0;
        }
        if (ml > 100) {
            ml = 100;
        }
        if (nikotiini > 10) {
            nikotiini = 10;
        }
        if (nikotiini < 0) {
            nikotiini = 0;
        }
        if (tiiviste > 50) {
            tiiviste = 50;
        }
        if (tiiviste < 0) {
            tiiviste = 0;
        }

        //Muutetaan oikeaan muotoon ja lasketaan.
        var mlNikotiini = nikotiini / 100 * ml;
        var mlTiiviste = tiiviste / 100 * ml;
        var mlMl = ml - mlTiiviste - mlNikotiini;

        //Tulostetaan Määrät
        $(".info").html(
            mlMl.toFixed(2) + "ml" + " PG/VG nestettä" + "<br />" +
            mlNikotiini.toFixed(2) + "ml" + " Nikotiinia" + "<br />" +
            mlTiiviste.toFixed(2) + "ml" + " Tiivistettä"
        );

        window.kaikkimaarat = mlMl.toFixed(2) + "ml nestettä " + mlNikotiini.toFixed(2) + "ml nikotiinia " + mlTiiviste.toFixed(2) + "ml tiivistettä ";
    }


    //Lasketaan nikotiini määrät
    $("#laskinform").submit(function () {
        laskeMaarat();
        //Estetään submit
        return false;
    });


    //Tallenna tiedot localStorageen
    $('#tallenna').click(function () {
        var itemcount = (localStorage.getItem('listcount')) ? localStorage.getItem('listcount') : 0;
        laskeMaarat();

        tulos.tulos = "<li class='ui-li-static ui-body-inherit'>" + kaikkimaarat + "<button id='delete_" + itemcount + "' class='delete ui-btn'>Poista</button></li>"
        $('#list').append(tulos.tulos);
        
        // Tallennetaan ID ja määrät localstorageen
        localStorage.setItem('list_' + itemcount, tulos.tulos);
        itemcount++;
        // console.log(itemcount);
        localStorage.setItem('listcount', itemcount);

        // Ilmoitus tallennus onnistui
        $(".ilmoitus").delay(100).fadeIn("normal", function () {
            $(this).delay(1000).fadeOut();
        });
    
        return false;
    });


    // Lataa tiedot localstoragesta.
    for (var i = 0; i < itemcount; i++) {
        if (localStorage.getItem('list_' + i)) {
            $('#list').append(localStorage.getItem('list_' + i));
        }
    }


    //Poista rivi localstoragesta
    $('body').on('click', '.delete', function () {
        var parent = $(this).parent(),
            id = $(this).attr('id').split('_')[1];
        localStorage.removeItem('list_' + id);
        parent.remove();
        return false;
    });

    // Piilota header h1 ja h2 landscapessa
    // $(window).on("orientationchange", function(event){
    //     if (event.orientation == "landscape"){
    //         $("#header h1, #header h2").hide();
    //     } else {
    //         $("#header h1, #header h2").show();
    //     }
    // });

});