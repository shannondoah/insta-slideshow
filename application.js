$(document).ready(function(){
 
  // we use submit instead of click to take advantage of things like
  // using the enter key to submit
  $('form').on('submit', function(e){
      e.preventDefault();

      var query = $('#query').val();

      var url = 'https://api.instagram.com/v1/tags/' + query +'/media/recent?client_id=c428456c3f1344b2998a55c21dc0dda2';
      
      var urls = []
      var tags = []

      $.ajax(url, {
          success: function(response) {

            $.each(response.data, function(index, object) {
              var img_url = object.images.standard_resolution.url;
              urls.push(img_url);

              var tag = object.tags ;
              tags.push(tag);

            })

          },
          dataType: "jsonp",
      });

      var i = 0
      
      var slideInterval = setInterval(function(){
        $("img").attr("src", urls[i]).hide().fadeIn(600).delay(1800).fadeOut(600);

        $("p").text(tags[i].join(" ")).fadeIn(600).delay(1800).fadeOut(600);

        i += 1;
        if (i === urls.length) {
          i = 0
        }
      }, 3000)
  });
});