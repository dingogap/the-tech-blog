const addCommentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('#post_id').value.trim();
  const date = dayjs();

  if (comment && date && post_id) {
    const response = await fetch(`/api/comments/`, {
      method: 'POST',
      body: JSON.stringify({ comment, date, post_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to add Comment');
    }
  }
};

document
  .querySelector('.add-comment-form')
  .addEventListener('submit', addCommentFormHandler);
