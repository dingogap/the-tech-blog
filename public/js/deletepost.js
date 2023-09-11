async function deleteFormHandler(event) {
  event.preventDefault();

  const id = document.querySelector('#id').value.trim();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      post_id: id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector('.delete-btn')
  .addEventListener('click', deleteFormHandler);
