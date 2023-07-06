(async () => {
	const $ = (item) => document.querySelector(`${item}`)
	const buttonAddToCart = $(".button-add-to-cart")

	const apiCarts = "http://localhost:8080/api/carts"
	const apiUser = "http://localhost:8080/api/session/current"

	buttonAddToCart.addEventListener("click", e => {
		e.preventDefault()
		const idProduct = e.target.id
		fetch(apiUser)
			.then(data => data.json())
			.then(data => {
				if (data.status === 200) {
					const { cart } = data.payload
					fetch(`${apiCarts}/${cart}/product/${idProduct}`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(data => data.json())
						.then(data => {
							if (data.status === 200) {
								alert("Product added to cart successfully")
							}
						})
				}
			})
	})
})()