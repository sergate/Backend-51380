(() => {
	const $ = (item) => document.querySelector(`${item}`)
	const form = $("#form-logout")
	if (form) {
		form.addEventListener("submit", e => {
			e.preventDefault()

			fetch("http://localhost:8080/api/session/logout", {
				method: "DELETE"
			})
				.then(data => data.json())
				.then(data => {
					console.log(data)
					if (data.status === 200) window.location = "/signin"
				})
		})
	}
})()