// import Recipes from "./data.json";

// console.log(Recipes);

var selectedRow = null;

class Recipe {
  constructor(title, description, uuid) {
    this.title = title;
    this.description = description;
    this.uuid = uuid;
  }
}

class UI {
  static displayrecipe() {
    const Recipes = [
      {
        title: "Chicken Adobe",
        description: "A native Filipino Dish.",
        uuid: "32432432",
      },
      {
        title: "Dinuguan",
        description: "A stew made from Pigs blood.",
        uuid: "32432432",
      },
    ];
    const recipe = Recipes;

    recipe.forEach((menu) => UI.AddRecipeToList(menu));
  }

  static AddRecipeToList(recipe) {
    const list = document.querySelector("#recipe-list");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${recipe.title}</td>
        <td>${recipe.description}</td>
        <td>${recipe.uuid}</td>
        <td><a href="#" class="btn btn-success btn-sm edit">Edit</a></td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        `;
    list.appendChild(row);
  }

  static editRecipeToList(recipe) {
    selectedRow.children[0].textContent = recipe.title;
    selectedRow.children[1].textContent = recipe.description;
    selectedRow.children[2].textContent = recipe.uuid;

    document.querySelector(".sumbit_btn").value = "Submit";
    document.querySelector(".sumbit_btn").classList =
      "btn btn-success btn-block add-btn sumbit_btn";
  }
  static deleteRecipe(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
      UI.showAlert("Recipe deleted", "danger");
    } else {
      null;
    }
  }

  static editRecipe(el) {
    if (el.classList.contains("edit")) {
      selectedRow = el.parentElement.parentElement;
      document.querySelector("#title").value =
        selectedRow.children[0].textContent;
      document.querySelector("#description").value =
        selectedRow.children[1].textContent;
      document.querySelector("#uuid").value =
        selectedRow.children[2].textContent;

      document.querySelector(".sumbit_btn").value = "Update";
      document.querySelector(".sumbit_btn").classList =
        "btn btn-primary btn-block add-btn sumbit_btn";
    } else {
      null;
    }
  }

  // message toast
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);
    div.style.position = "absolute";
    div.style.top = "30px";
    div.style.left = "90%";
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }

  // reset fields
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#uuid").value = "";
  }
}
//  end of UI CLASS

document.addEventListener("DOMContentLoaded", UI.displayrecipe);

document.querySelector("#recipe-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const uuid = document.querySelector("#uuid").value;

  if (title === "" || description === "" || uuid === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    const recipe = new Recipe(title, description, uuid);

    if (selectedRow == null) {
      UI.AddRecipeToList(recipe);
      selectedRow = null;
      UI.showAlert("Recipe Added", "success");
    } else {
      UI.editRecipeToList(recipe);
      selectedRow = null;
      UI.showAlert("Recipe Info Edited", "info");
    }
    UI.clearFields();
  }
});

document.querySelector("#recipe-list").addEventListener("click", (e) => {
  UI.deleteRecipe(e.target);
  UI.editRecipe(e.target);
});



// (function() {
//   'use strict';
//
//   $(function(){
//
//     function recipeList() {
//       $.ajax({
//         url: 'recipes',
//         type: 'GET',
//         dataType: 'json',
//         success: function (data) {
//           recipeListSuccess(data);
//         },
//         error: function (request, message, error) {
//           handleException(request, message, error);
//         }
//       });
//     };
//
//     function recipeListSuccess(data) {
//       $.each(data, function(k, v) {
//         var content = `<li class="media">
//             <a href="detail.html#${v.uuid}" title="${v.title}"><img src="${v.images.small}" class="rounded mr-3" alt="${v.title}"></a>
//             <div class="media-body">
//               <h5 class="mt-0 mb-1">${v.title}</h5>
//               <p>${v.description}</p>
//               <p><a href="" onclick="recipeGet(this)" data-id="${v.uuid}">Read more..</a></p>
//             </div>
//           </li>`;
//          $('.this-content > ul').append(content);
//
//          // recipeAddNew(data);
//       });
//     }
//
//     function recipeAddNew(data) {
//       if ($(".this-content ul").length == 0) {
//        $(".this-content").append("<ul class='list-unstyled'></ul>");
//       }
//
//       $(".this-content ul").append(recipeBuildNewItem(data));
//     }
//
//     function recipeBuildNewItem(data) {
//       var ret =
//         "<li class='media'>" +
//         "<img src='"+ data.images.small + "' class='rounded mr-3' alt='"+ data.title +"'>" +
//         "<div class='media-body'>" +
//         "<h5 id='recipe-title'>"+ data.title + "</h5>" +
//         "<p id='recipe-description'>" + data.description + "</p>" +
//         "<p><a href='' id='recipe-url' onclick='recipeGet(this)' data-id='"+ data.uuid +"'>Read more..</a></p>" +
//         "</div>" +
//         "</li>";
//       return ret;
//     }
//
//     function recipeGet(ctl, data) {
//         var id = $(ctl).data("id");
//         $("#recipe-id").val(id);
//
//         $.ajax({
//             url: "recipes/" + id,
//             type: 'GET',
//             dataType: 'json',
//             success: function (data) {
//                 recipeToFields(data);
//                 // $("#updateButton").text("Update");
//             },
//             error: function (request, message, error) {
//                 handleException(request, message, error);
//             }
//         });
//     }
//
//     function recipeToFields(data) {
//         $("#recipe-title").val(data.title);
//         $("#recipe-description").val(data.description);
//         $("#recipe-url").val(data.uuid);
//     }
//
//
//
//     function handleException(request, message, error) {
//       var msg = "";
//       msg += "Code: " + request.status + "\n";
//       msg += "Text: " + request.statusText + "\n";
//       if (request.responseJSON != null) {
//         msg += "Message: " + request.responseJSON.Message + "\n";
//       }
//       console.log(msg);
//     }
//
//     recipeList();
//
//
//   });
// })();
