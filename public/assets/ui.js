$(document).ready(function () {


    var cardShowHeight = parseInt($(".mdl-card__title").outerHeight(true) + $(".mdl-card__actions").outerHeight() + $(".mdl-card__supporting-text:first").outerHeight());
  
  
  
    $(".showComment").click(function () {
  
      var currComment = $(this).closest("div").siblings(".comments");
      //$(this).closest("div").siblings(".comments").toggle();
  
      $(currComment).toggle();
  
      if ($(this).parents(".mdl-card").siblings().not(currComment).height() >= cardShowHeight) {
  
        //check if other comment section is open
        if ($(this).parents(".mdl-card").siblings().children(".comments").not(currComment).is(":visible")) {
          //other comment section is open when the current one is clicked, hide the other comment section, reset the current card's height
          $(this).parents(".mdl-card").siblings().children(".comments").not(currComment).hide();
          $(this).closest(".mdl-card").height("auto");
        }
        if(currComment.is(":hidden")){
          $(this).parents(".mdl-card").siblings().height("auto");
        }
  
        //this is set for when the other comment section is closed before the current one is clicked to be expanded.
        $(this).parents(".mdl-card").siblings().not(currComment).height(cardShowHeight);
  
      }
      else {
        $(this).parents(".mdl-card").siblings().height("auto");
      }
  
      if(currComment.is(":visible") && $(this).closest(".mdl-card").height()<= cardShowHeight)
        {
          $(this).closest(".mdl-card").height("auto");
          $(this).parents(".mdl-card").siblings().not(currComment).height(cardShowHeight);
        }
  
  
    });
  
  });
  
  
  //   // When you click the add comment button
  $(document).on("click", ".addComment", function (e) {
  
    e.preventDefault();
    var currName = $(this).siblings().find(".uname-input");;
    //var currName="test";
    var currCommentText = $(this).siblings().find(".comment-input");
  
  
    //console.log($(this).closest("div.comments").html());
    var currCommentSec = $(this).closest("div.comments");
  
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/article/" + thisId,
      data: {
        // Value taken from title input
        author: currName.val(),
        // Value taken from note textarea
        body: currCommentText.val()
      }
    })
      // With that done
      .done(function (data) {
        $.ajax({
          method: "GET",
          url: "/article/" + thisId
        })
          // With that done, add the note information to the page
          .done(function (data) {
  
            if (data.comments) {
              console.log(data.comments[0].author);
  
              var commentHtml = "<div class=\"mdl-card__supporting-text mdl-card--border\"><div class=\"comment-body\">" +
                "<strong>" + data.comments[data.comments.length - 1].author + "</strong><p>" +
                data.comments[data.comments.length - 1].body + "</p></div><div><button class=\"mdl-button mdl-js-button mdl-button--icon comment-action\"> <i class=\"material-icons\">delete_forever</i></button></div></div>";
  
              $(currCommentSec).prepend(commentHtml);
              // // Also, remove the values entered in the input and textarea for comments
              currName.val("").parent().removeClass("is-dirty");
              currCommentText.val("").parent().removeClass("is-dirty");
  
            }
  
  
  
          });
  
  
  
      });
  
  
  });
  
  //delete a comment
  $(document).on("click", ".comment-action", function (e) {
    $(this).closest(".mdl-card__supporting-text").hide();
  });