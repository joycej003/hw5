const update = document.querySelector('#update-button')


update.addEventListener('click', () => {
  const updateTitle = document.querySelector('#update-title').value
  const newTitle = document.querySelector('#new-title').value
  const newAuthor = document.querySelector('#new-author').value

  fetch('/books', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      newTitle: updateTitle,
      title: newTitle,
      author: newAuthor
    })
  })
    .then(res => {
    if (res.ok) return res.json()
    })
    .then(response => {
    console.log(response) 
    window.location.reload()
    })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', () => {
  const deleteTitle = document.querySelector('#delete-title').value
  fetch('/books', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: deleteTitle })
  })
  .then(res => { if (res.ok) return res.json() })
  .then(response => {
    if (response === 'No book to delete') {
      messageDiv.textContent = 'No book to delete'
    } else {
      window.location.reload()
    }
  })
  .catch(error => console.error(error))
})

document.querySelectorAll('.delete-btn').forEach(button => {
  button.addEventListener('click', () => {
    const title = button.getAttribute('data-title')
    fetch('/books', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title })
    })
    .then(res => { if (res.ok) return res.json() })
    .then(response => {
      if (response === 'No book to delete') {
        document.querySelector('#message').textContent = 'No book to delete'
      } else {
        window.location.reload()
      }
    })
    .catch(error => console.error(error))
  })
})

