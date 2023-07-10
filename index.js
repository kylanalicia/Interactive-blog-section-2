// This code adds a comment submit event listener to a form element.
// When the submit event occurs, it prevents the default form submission behavior.
//function for updating to json and page



fetch("https://interactive-blog-section.onrender.com/comments")
.then(response => response.json())
.then(data=>{
  display(data)
  updateComment()
})


function display(details){
 let div = document.createElement("div")
  document.getElementById("commentSide").append(div)
  details.forEach( detail =>{
    console.log(detail.id)
    let h5 =document.createElement("h5")
    h5.textContent= detail.user.username

     let p = document.createElement("p")
     p.textContent= detail.content
     
     let image=document.createElement("img")
     image.src=detail.user.image.png
     image.style.width = "5%"

     var button = document.createElement("button")
     button.innerText="delete"
     remove(button,detail)

     div.append(h5,image,p,button)
  }
  )
  console.log(div)
}


function updateComment(){
const sendButton =document.getElementById("submit_btn")
sendButton.addEventListener("click",(e)=>{
  e.preventDefault()
   const content = document.getElementById("comfy").value
     
  fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({content})
})
})
}

function remove(button, detail) {
  button.addEventListener("click", () => {
    fetch(`http://localhost:3000/comments/${detail.id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log("Resource deleted successfully");
        } else {
          console.error("Error deleting resource");
        }
      })
      .catch(error => {
        console.error("Error:", error);
      });
  });
}

  // Fetch data from 'http://localhost:3000/comments' and process the retrieved data
  fetch('http://localhost:3000/comments')
    .then((response) => response.json())
    .then((data) => {
      updateComment(data)
      renderData(data)})
  
  // Render the data received from the server
  function renderData(data) {
    // Loop through each comment in the data array
    data.forEach(element => {
      displayItems(element)
    })
      // Create a new <div> element for each comment 
    
    
      function displayItems(element){
      let elementDiv = document.createElement("div")
      elementDiv.classList.add('comment-div')
  
      // Create an <img> element for the user's image and set its src attribute
      let image = document.createElement("img")
      image.src = element.user.image.png
      image.className = 'comment-img'
      elementDiv.appendChild(image);
  
      // Create a <div> element to contain the username and comment content
      let elementh2 = document.createElement("div")
  
      // Create an <h2> element for the username and set its text content
      let username = document.createElement("h2")
      username.innerText = element.user.username
      username.className = 'userName'
  
      // Create a <p> element for the comment content and set its text content
      let comment = document.createElement("p")
      comment.innerText = element.content
  
      // Append the username and comment elements to the div
      elementh2.appendChild(username);
      elementh2.appendChild(comment);
  
      // Append the user image div and the username/comment div to the comment section
      document.querySelector('#comment-section').appendChild(elementDiv);
      document.querySelector('#comment-section').appendChild(elementh2);
      }
    
  
    // Display replies for each comment
    data.forEach(element => {
      element.replies.forEach(object => {
        // Create a <p> element for each reply and set its text content
        let reply = document.createElement("p")
        reply.innerText = object.content
  
        // Create an <img> element for the user's image and set its src attribute
        let replyimage = document.createElement("img")
        replyimage.src = object.user.image.png
        replyimage.className = 'comment-img'
  
        // Create a <div> element for the reply and add the 'reply' CSS class
        let replyDiv = document.createElement("div")
        replyDiv.classList.add('reply');
  
        // Create an <h2> element for the username and set its text content
        let replyusername = document.createElement("h2")
        replyusername.innerText = object.user.username
  
        // Append the image, username, and reply elements to the reply div
        replyDiv.appendChild(replyimage)
        replyDiv.appendChild(replyusername)
        replyDiv.appendChild(reply);
  
        // Append the reply div to the comment section
        document.querySelector('#comment-section').appendChild(replyDiv);
      })
    })
  }
  
//   // Add a click event listener to the delete button
//   document.getElementById("delete-button").addEventListener("click", function () {
//     // Display the delete modal
//     document.getElementById("delete-modal").style.display = "block";
//   });
  
//   // Add a click event listener to the confirm delete button
//   document.getElementById("confirm-delete").addEventListener("click", function () {
//     // Send an HTTP DELETE request
//     var xhttp = new XMLHttpRequest();
//     xhttp.open("DELETE", "your_delete_endpoint_here", true);
//     xhttp.send();
  
//     // Handle the response or perform any necessary logic
//     xhttp.onreadystatechange = function () {
//       if (this.readyState === 4 && this.status === 200) {
//         console.log("Item deleted successfully");
//       }
//     };
  
//     // Close the delete modal
//     document.getElementById("delete-modal").style.display = "none";
//   });
  
//   // Add a click event listener to the cancel delete button
//   document.getElementById("cancel-delete").addEventListener("click", function () {
//     // Close the delete modal
//     document.getElementById("delete-modal").style.display = "none";
//   });
  
  // Function to handle reply button click event
  function handleReplyButtonClick(event) {
    var comment = event.target.closest('.comment');
    if (comment) {
      var replyFormContainer = document.getElementById('reply-form-container');
      var replyInput = document.getElementById('reply-input');
  
      // Show the reply form
      replyFormContainer.style.display = 'block';
  
      // Set focus on the reply input
      replyInput.focus();
  
      // Store data attribute in reply form to identify the comment being replied to
      replyFormContainer.dataset.commentId = comment.getAttribute('data-comment-id');
    }
  }
  
  // Function to handle reply form submission
  function handleReplyFormSubmit(event) {
    event.preventDefault();
  
    var replyFormContainer = document.getElementById('reply-form-container');
    var replyInput = document.getElementById('reply-input');
  
    // Get the comment ID from the stored data attribute in the reply form
    var commentId = replyFormContainer.dataset.commentId;
  
    // Get the comment to which the reply is being submitted
    var comment = document.querySelector('.comment[data-comment-id="' + commentId + '"]');
  
    if (comment && replyInput.value.trim() !== '') {
      // Create a new reply element
      var reply = document.createElement('div');
      reply.classList.add('reply');
      reply.innerHTML = '<p>' + replyInput.value + '</p>';
  
      // Append the reply to the comment
      comment.appendChild(reply);
  
      // Clear and hide the reply form
      replyInput.value = '';
      replyFormContainer.style.display = 'none';
    }
  }
  
  // Add event listener to handle reply button clicks using event delegation
  document.addEventListener('click', function (event) {
    if (event.target.matches('.reply-btn')) {
      handleReplyButtonClick(event);
    }
  });
  
  // Add event listener to handle reply form submission
  document.getElementById('reply-form').addEventListener('submit', handleReplyFormSubmit);
  
  // Get all the edit buttons on the page
  const editButtons = document.querySelectorAll('.edit-button');
  
  // Loop through each edit button and add event listeners
  editButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const comment = event.target.parentElement; // Get the parent element which is the comment div
      const commentText = comment.querySelector('.comment-text'); // Get the comment text element
  
      // Enable contenteditable attribute to make the comment text editable
      commentText.contentEditable = true;
      commentText.focus(); // Automatically focus on the comment text for editing
  
      // Change the edit button text to "Save" while editing and handle the save functionality
      button.textContent = 'Save';
      button.addEventListener('click', (event) => {
        commentText.contentEditable = false; // Disable contenteditable attribute after saving
        button.textContent = 'Edit'; // Change the button text back to "Edit"
      });
  
      // Prevent the default behavior of the button click event
      event.preventDefault();
    });
  });
  