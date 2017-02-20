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

$(document).keydown(function(e) {
  
  if(e.keyCode === 13 || e.keyCode === 78) {
    
    var newPatternModalVisible = $('#new-pattern-modal').is(':visible');
    
    if(newPatternModalVisible && e.keyCode === 13) {
      e.preventDefault();
      window.transactionsViewModel.addPattern($("#pattern").val(), $("#budgetItem").val());
      $("#pattern").val("");
      $("#budgetItem").val("");
      $('#new-pattern-modal').modal('hide');
    }
    else if(!newPatternModalVisible && e.keyCode === 78) {
      e.preventDefault();
      if (window.getSelection) {
        $("#pattern").val(window.getSelection().toString());
      }
      $('#new-pattern-modal').modal('show');
    }
  }
});

$("#new-pattern-modal").on("shown.bs.modal", function() {
  if($("#pattern").val() === '') {
    $("#pattern").focus();
  }
  else {
    $("#budgetItem").focus();
  }
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

$('.btn').on('click', function() {
  $(".btn").blur();
});