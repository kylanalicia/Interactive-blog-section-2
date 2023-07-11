function render(item) {
  const div = document.createElement("div")
  div.className = "comfy"
  div.innerHTML = `
  <img class = "pfpimage" src="${item.png}"> `
  document.querySelector("#commentSide").appendChild(div)
  const comment = document.createElement("p")
  comment.innerText= item.content;
  div.appendChild(comment)
 


}
function getting() {
fetch(' http://localhost:3000/comments')
.then(response => response.json())
.then(comments => comments.forEach(item => render(item)))
}
getting()

document.addEventListener("submit",(e) => {
  e.preventDefault();
  fetch(' http://localhost:3000/comments',{
  method:"POST",
  headers: {
    'Content-Type': 'application/json'
    },
    body : JSON.stringify({
      content: document.getElementById("newCommentInput").value,
      png: 'https://images.unsplash.com/photo-1589156191108-c762ff4b96ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80'
    })
  })
})

  
