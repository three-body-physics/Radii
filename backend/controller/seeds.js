var products = [
{
	img: "/img/p2.jpg",
	label: "SWISS",
	price: 39.99
},
{
	img: "/img/p3.jpg",
	label: "Biker Leather",
	price: 49.99
},
{
	img: "/img/p4.jpg",
	label: "Winter",
	price: 29.99
},
{
	img: "/img/p1.jpg",
	label: "Fiber Bag",
	price: 29.99
},
{
	img: "/img/p2.jpg",
	label: "SWISS",
	price: 39.99
},
{
	img: "/img/p3.jpg",
	label: "Biker Leather",
	price: 49.99
},
{
	img: "/img/p4.jpg",
	label: "Winter",
	price: 29.99
},
{
	img: "/img/p1.jpg",
	label: "Fiber Bag",
	price: 29.99
}
]



module.exports.seed = function(product) {

	products.forEach(function(p) {
		product.create(p, function(err, pro) {
			if(err) {
				console.log(err);
			} else {
				console.log(pro);
			}
		})
	})
}