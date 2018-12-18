$(document).ready(function() {
    $('select').material_select();
    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true
      }
    );
    $('.parallax').parallax();
    $('.modal').modal();
});
