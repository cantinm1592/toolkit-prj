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
    
    var newRuleModalVisible = $('#new-rule-modal').is(':visible');
    
    if(newRuleModalVisible && e.keyCode === 13) {
      e.preventDefault();
      window.viewModel.addRule($("#descriptionPattern").val(), $("#budgetItem").val(), $("#amountPattern").val());
      $("#descriptionPattern").val("");
      $("#budgetItem").val("");
      $("#amountPattern").val("*");
      $('#new-rule-modal').modal('hide');
    }
    else if(!newRuleModalVisible && e.keyCode === 78) {
      e.preventDefault();
      if (window.getSelection) {
        $("#descriptionPattern").val(window.getSelection().toString());
      }
      $('#new-rule-modal').modal('show');
    }
  }
});

$("#new-rule-modal").on("shown.bs.modal", function() {
  if($("#descriptionPattern").val() === '') {
    $("#descriptionPattern").focus();
  }
  else {
    $("#budgetItem").focus();
  }
});

$('#new-rule-modal .modal-footer button').on('click', function(e) {
  
  var $button = $(e.target);
  
  $(this).closest('.modal').one('hidden.bs.modal', function() {
    
    if($button.attr('id') === 'create-button') {
      window.viewModel.addRule($("#descriptionPattern").val(), $("#budgetItem").val());
    }
    
    $("#descriptionPattern").val("");
    $("#budgetItem").val("");
    $(".btn").blur();
  });
  
});

$("#export-rules-modal").on("shown.bs.modal", function() {
  $("#rules-json").val(JSON.stringify(ko.toJS(window.viewModel.rules()),null, 2));
});

$('.btn').on('click', function() {
  $(".btn").blur();
});