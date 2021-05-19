(function() {
  'use strict';

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);

  $(function(){

    function recipeList() {
      $.ajax({
        url: 'recipes',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
          recipeListSuccess(data);
        },
        error: function (request, message, error) {
          handleException(request, message, error);
        }
      });
    };

    function recipeListSuccess(data) {
      $.each(data, function(k, v) {
        var content = `<li class="media">
            <a href="detail.html#${v.uuid}" title="${v.title}"><img src="${v.images.small}" class="rounded mr-3" alt="${v.title}"></a>
            <div class="media-body">
              <h5 class="mt-0 mb-1">${v.title}</h5>
              <p>${v.description}</p>
              <p><a href="" onclick="recipeGet(this)" data-id="${v.uuid}">Read more..</a></p>
            </div>
          </li>`;
         $('.this-content > ul').append(content);

         // recipeAddNew(data);
      });
    }

    function recipeAddNew(data) {
      if ($(".this-content ul").length == 0) {
       $(".this-content").append("<ul class='list-unstyled'></ul>");
      }

      $(".this-content ul").append(recipeBuildNewItem(data));
    }

    function recipeBuildNewItem(data) {
      var ret =
        "<li class='media'>" +
        "<img src='"+ data.images.small + "' class='rounded mr-3' alt='"+ data.title +"'>" +
        "<div class='media-body'>" +
        "<h5 id='recipe-title'>"+ data.title + "</h5>" +
        "<p id='recipe-description'>" + data.description + "</p>" +
        "<p><a href='' id='recipe-url' onclick='recipeGet(this)' data-id='"+ data.uuid +"'>Read more..</a></p>" +
        "</div>" +
        "</li>";
      return ret;
    }

    function recipeGet(ctl, data) {
        var id = $(ctl).data("id");
        $("#recipe-id").val(id);

        $.ajax({
            url: "recipes/" + id,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                recipeToFields(data);
                // $("#updateButton").text("Update");
            },
            error: function (request, message, error) {
                handleException(request, message, error);
            }
        });
    }

    function recipeToFields(data) {
        $("#recipe-title").val(data.title);
        $("#recipe-description").val(data.description);
        $("#recipe-url").val(data.uuid);
    }



    function handleException(request, message, error) {
      var msg = "";
      msg += "Code: " + request.status + "\n";
      msg += "Text: " + request.statusText + "\n";
      if (request.responseJSON != null) {
        msg += "Message: " + request.responseJSON.Message + "\n";
      }
      console.log(msg);
    }

    recipeList();


  });









})();
