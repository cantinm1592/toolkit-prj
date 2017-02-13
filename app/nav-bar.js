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

$("#pattern-modal").on("shown.bs.modal", function() {
  $("#pattern").focus();
});

$('#pattern-modal .modal-footer button').on('click', function(e) {
  
  var $button = $(e.target);
  
  $(this).closest('.modal').one('hidden.bs.modal', function() {
    
    if($button.attr('id') === 'create-button') {
      window.patternsViewModel.addPattern($("#pattern").val(), $("#budgetItem").val());
    }
    
    $("#pattern").val("");
    $("#budgetItem").val("");
    $(".btn").blur();
  });
  
});