const $deleteBtn = document.querySelector('.delete-post-btn');

const deleteFormHandler = async event => {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    let response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE'
      });
      response.ok ? 
      document.location.replace('/dashboard') :
      new Error('Something went wrong in the deleteFormHandler function');

  
  }
  
  $deleteBtn.addEventListener('click', deleteFormHandler);