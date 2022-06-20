const $editForm = document.querySelector('.edit-post-form');

let editFormHandler = async event => {
    event.preventDefault();

    const title = document.querySelector('input[name=post-title]').value.trim();
    const post_message = document.querySelector('textarea[name=message-body]').value.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

      if (title || post_message) {
        const response = await fetch(`/api/posts/${post_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            post_id,
            title,
            post_message
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }

  }
  
  $editForm.addEventListener('submit', editFormHandler);