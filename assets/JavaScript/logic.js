$(document).ready(function(){
    var displayedButtons = ["Mermaids", "Dolphins", "Coral Reef", "Fish", "Turtle"];
    function displayImage(){
        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";   

        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var results=response.data;
            for(var j = 0; j < limit; j++) {    
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", results[j].images.original_still.url);
                image.attr("data-still", results[j].images.original_still.url);
                image.attr("data-animate", results[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = results[j].rating;
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
                $("#display-images").append(displayDiv);
            }
        });
    }
    function renderButtons(){ 
        $("#display-buttons").empty();

        for (var i = 0; i < displayedButtons.length; i++){
            var newButton = $("<button>");
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", displayedButtons[i]); 
            newButton.text(displayedButtons[i]); 
            $("#display-buttons").append(newButton); 
        }
    }
    function imageState() {          
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }
    $("#submit").on("click", function(event){
        event.preventDefault();
        var input = $("#user-input").val().trim();
        displayedButtons.push(input);
        renderButtons();
    })

    renderButtons();
    $(document).on("click", "#input", displayImage);
    $(document).on("click", ".gif", imageState);
});