function render(item) {
  const div = document.createElement("div")
  div.className = "comfy"
  div.innerHTML = `
  <img src="${item.png}">`
  document.querySelector("#commentSide").appendChild(div)

}
function getting() {
fetch(' http://localhost:3000/comments')
.then(response => response.json())
.then(comments => comments.forEach(item => render(item)))
}
getting()