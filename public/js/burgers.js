$(function() {
    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var devoured = $(this).data("devoured")

        var newDevourState = {
            devoured: devoured
        };

        $.ajax("/api/burgers" + id, {
            type: "PUT",
            data: newDevourState
        }).then(function() {
            console.log("burger has been ", devoured);
            location.reload()
        })
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();

        var newBurger = {
            name: $("#bur").val().trim(),
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            console.log("created new burger");
            location.reload();
        });
    });
});