function searchAndHighlight(searchTerm, selector) {
    console.log("inside find function");
    if (searchTerm) {
        var selector = selector || "#realTimeContents"; //use body as selector if none provided
        var searchTermRegEx = new RegExp(searchTerm, "ig");
        var matches = $(selector).text().match(searchTermRegEx);
        if (matches != null && matches.length > 0) {
            $(".highlighted").removeClass("highlighted"); //Remove old search highlights

            //Remove the previous matches
            $span = $("#realTimeContents span");
            $span.replaceWith($span.html());

            if (searchTerm === "&") {
                searchTerm = "&amp;";
                searchTermRegEx = new RegExp(searchTerm, "ig");
            }
            $(selector).html(
                $(selector)
                    .html()
                    .replace(
                        searchTermRegEx,
                        "<span class='match'>" + searchTerm + "</span>"
                    )
            );
            $(".match:first").addClass("highlighted");

            var i = 0;

            $(".next_h")
                .off("click")
                .on("click", function () {
                    i++;

                    if (i >= $(".match").length) i = 0;

                    $(".match").removeClass("highlighted");
                    $(".match").eq(i).addClass("highlighted");
                    $(".ui-mobile-viewport").animate(
                        {
                            scrollTop: $(".match").eq(i).offset().top,
                        },
                        300
                    );
                    return false;
                });
            $(".previous_h")
                .off("click")
                .on("click", function () {
                    i--;

                    if (i < 0) i = $(".match").length - 1;

                    $(".match").removeClass("highlighted");
                    $(".match").eq(i).addClass("highlighted");
                    $(".ui-mobile-viewport").animate(
                        {
                            scrollTop: $(".match").eq(i).offset().top,
                        },
                        300
                    );
                    return false;
                });

            if ($(".highlighted:first").length) {
                //if match found, scroll to where the first one appears
                $(window).scrollTop($(".highlighted:first").position().top);
            }
            return true;
        }
    }
    return false;
}

$(document).on("click", ".searchButtonClickText_h", function (event) {
    $(".highlighted").removeClass("highlighted").removeClass("match");
    if (!searchAndHighlight($(".textSearchvalue_h").val())) {
        alert("No results found");
    }
    return false;
});
