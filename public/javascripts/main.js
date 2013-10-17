$(document).ready(function(){
    console.log('script loads')
    var source = $('#resultsTemplate').html()
    var template = Handlebars.compile(source)

    $('#theSearch').on('submit', function(event){
        event.preventDefault()
        $.get('/search', {query : $('#searchQuery').val()}, function(data){
            var html = template(data)
            $('#results').html(html)
        })
    })
})