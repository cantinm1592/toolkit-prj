/* eslint-env browser, jquery */

$(".nav a").on('click',function(e) {
  
  e.preventDefault();
  
  // Hide/show panels
  $('.panel').hide();
  $('#' + $(this).attr('href') + '-panel').show();
  
  // Change active nav element
  $('.nav li').removeClass('active');
  $(this).parent().addClass('active');
});