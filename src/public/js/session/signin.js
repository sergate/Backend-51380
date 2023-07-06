const $ = (item) => document.querySelector(`${item}`)

const form = $("#form-login")

form.addEventListener("submit", e => {
	e.preventDefault()

	const user = {
		email: form.email.value,
		password: form.password.value
	}

	fetch("http://localhost:8080/api/session/cookie", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ email: user.email })
	})
		.then(data => data.json())
		.then(data => {
			if (data.status === 200) {
				fetch("http://localhost:8080/api/session/signin", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(user)
				})
					.then(data => data.json())
					.then(data => {
						console.log(data)
						if (data.status === 200) window.location = "/products"
					})
			}
		})
})