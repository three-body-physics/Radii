var body = $('html, body'),
    shop = $('#collections');

$('#scroll').click(function() {

body.animate({
    scrollTop: shop.offset().top - body.offset().top + body.scrollTop()
}, 1000);

});
