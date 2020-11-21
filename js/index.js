$(document).ready(function () {
    $("#content").load("welcome.html");

    $.each($(".menuButton"), callback = function(menuButtonIndex, menuButtonValue){
        $(menuButtonValue).click(function(event){
            event.preventDefault();
            if($(this).find( selector = 'a').attr(name = "href") == "index.html"){
                open( url = "index.html", target = "_self");
            } else {
                $("#content").load($(this).find( selector = 'a').attr( name = "href"));
            }
        })
    })
});