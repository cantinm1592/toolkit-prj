/* eslint-env browser, jquery */

var ko = window.ko;

$(".nav a").on('click',function(e) {
  
  e.preventDefault();
  
  // Hide/show panels
  $('.panel').hide();
  $('#' + $(this).attr('href') + '-panel').show();
  
  // Change active nav element
  $('.nav li').removeClass('active');
  $(this).parent().addClass('active');
});

$("#new-pattern-modal").on("shown.bs.modal", function() {
  $("#pattern").focus();
});

$('#new-pattern-modal .modal-footer button').on('click', function(e) {
  
  var $button = $(e.target);
  
  $(this).closest('.modal').one('hidden.bs.modal', function() {
    
    if($button.attr('id') === 'create-button') {
      window.transactionsViewModel.addPattern($("#pattern").val(), $("#budgetItem").val());
    }
    
    $("#pattern").val("");
    $("#budgetItem").val("");
    $(".btn").blur();
  });
  
});

$("#export-patterns-modal").on("shown.bs.modal", function() {
  $("#patterns-json").val(JSON.stringify(ko.toJS(window.transactionsViewModel.patterns()),null, 2));
});