//Attache une fonction anonyme à l'événement "ready" de l'objet document.
$(document).ready(function () {

// Creation d'une animation pour ouvrir le menu et ses compposants.
  $('.open-menu').on('click', function() {
  console.log("click");
  let animation = anime({
      targets: '.fa-bars',
      rotate: 360,
  });
  let animation1 = anime({
      targets: '.myNav',
      width: "100%",
      duration: 50,
      delay: 70,
  });
  let animation2 = anime({
      targets: '.accueil',
      translateX: "30%",
      endDelay: 0,
      direction: 'alternate'
  });
  let animation3 = anime({
    targets: '.produits',
    translateX: "30%",
    endDelay: 20,
    direction: 'alternate'
  });
  let animation4 = anime({
      targets: '.contacts',
      translateX: "30%",
      endDelay: 80,
      direction: 'alternate'
  });
  let animation5 = anime({
      targets: '.mentionsLegales',
      translateX: "30%",
      endDelay: 140,
      direction: 'alternate'
  });
});

// Creation d'une animation pour fermer le menu et ses compposants.
$('.close-menu').on('click', function() {
  anime({
    targets: '.fa-circle-xmark',
    rotate: 360,
  });
  $('.myNav').width("0%");
});

  // Définit une fonction nommée "chargeDetail" qui prend un paramètre nommé "classementNumber".
function chargeDetail(classementNumber) {
  // Définit une variable nommée "requestURL" contenant l'URL de l'API catalogueCars, qui permet d'obtenir des informations sur une voiture spécifique.
  let requestURL = 'json/catalogueCars.json';
  // let requestURL = 'http://127.0.0.1:5500/json/catalogueCars.json'; Si on ne lance pas le go-live de VSCode.
  // Crée une nouvelle instance de l'objet XMLHttpRequest, qui est utilisé pour envoyer des requêtes HTTP asynchrones au serveur.
  let request = new XMLHttpRequest();
  // Ouvre une connexion HTTP avec la méthode "GET" et l'URL de l'API catalogueCars.
  request.open('GET', requestURL);
  // Définit le type de réponse attendue comme étant JSON.
  request.responseType = 'json';
  // Envoie la requête HTTP.
  request.send();
  // Définit une fonction à exécuter lorsque la réponse de la requête est chargée.
  request.onload = function() {
  //Stocke la réponse JSON de la requête dans une variable nommée "catalogue" et l'affiche dans la console.
    let catalogue = request.response;
    console.log(catalogue);

    //Fin de fonction "chargeDetail" qui montre toutes les informations sur une voiture par rapport à son classement.
    $('#custom-cards').show();
    if (classementNumber == 1) {
      $('#titleSelection').text('La voiture la plus chère au monde.');
    }
    else {
      $('#titleSelection').text('La ' + classementNumber + ' ème voiture la plus chère au monde.');
    };
    $("#input-name").text(catalogue[classementNumber].name);
    $("#input-model").text(catalogue[classementNumber].model);
    $("#origin-flag").html('<img src="' + catalogue[classementNumber].originFlag + '" class="card-img-top" alt="Photo de drapeau"/>');
    $("#production-place").text('Fabriquée à ' + catalogue[classementNumber].productionPlace);
    $("#car-photo-description").html('<img src="' + catalogue[classementNumber].carPhoto1 + '" class="card-img-top" alt="Photo de voitures"/>');
    $("#engine-power").text(catalogue[classementNumber].enginePower);
    $("#car-description").text(catalogue[classementNumber].description);
    $("#production-exemplary").text("Il existe seulement " + catalogue[classementNumber].productionExemplary + " dans le monde.");
    $("#car-price").text("Prix : " + catalogue[classementNumber].price);
    $("#car-Photo1").html('<img src="' + catalogue[classementNumber].carPhoto1 + '" class="d-block w-100" alt="Photo de voitures"/>');
    $("#car-Photo2").html('<img src="' + catalogue[classementNumber].carPhoto2 + '" class="d-block w-100" alt="Photo de voitures"/>');
    $("#car-Photo3").html('<img src="' + catalogue[classementNumber].carPhoto3 + '" class="d-block w-100" alt="Photo de voitures"/>');
    $("#car-Photo4").html('<img src="' + catalogue[classementNumber].carPhoto4 + '" class="d-block w-100" alt="Photo de voitures"/>');
  }
};

// L'utilisateur rentre un numéro de classement dans la recherche.
  $('#custom-cards').hide();
  $('#name-input').on('input', function () {
    $('#custom-cards').hide();
  });
  // Lorsqu'on tape sur le bouton "Entrée", pour la recherche.
  $("#name-input").on('keyup', function (e) {
    if (e.keyCode == 13) {
      let classementNumber = $("#name-input").val();
      if ((classementNumber == "") || (classementNumber > 30) || (classementNumber < 1)) {
        swal ( "Oops" ,  "Veuillez saisir un nombre entre 1 et 30" );
        $('#custom-cards').hide();
      }
      else {
        console.log(classementNumber);
        chargeDetail(classementNumber);
      }
    }
  });
    // Lorsqu'on clique sur la souris, pour la recherche.
  $('#search-button').on('click', function () {
    let classementNumber = $("#name-input").val();
    if ((classementNumber == "") || (classementNumber > 30) || (classementNumber < 1)) {
      swal ( "Oops" ,  "Veuillez saisir un nombre entre 1 et 30" );
      $('#custom-cards').hide();
    }
    else {
      console.log(classementNumber);
      chargeDetail(classementNumber);
    }
  });
});

// Bouton pour remonter en haut de la page avec une petite animation.
$('#btn-back-to-top').on('click', function(e) {
  $("html, body").animate({scrollTop: 0}, 1000);
});

