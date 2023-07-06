const filas = document.querySelectorAll(".fila")

filas.forEach((f, i) => {
	filas[i].addEventListener("click", (e) => {
		const id = e.target.parentElement.id
		window.location.href = `/products/${id}`
	})
})