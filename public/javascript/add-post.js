const $postForm = document.querySelector('.new-post-form');
const $postBtn = document.querySelector('#togglePost');
const $exitBtn = document.querySelector('.exit');

const newFormHandler = async event => {

    event.preventDefault();
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_message = document.querySelector('#text_contents').value;

    if (!title || !post_message) return;
    $postBtn.style.display = 'block';
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
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
  };
  
  const toggleCreatePost = async () => {

    if ($postForm.style.display != 'none' || $postForm.style.display == 'none') {
      $postForm.style.display = 'flex';
      $postBtn.style.display = 'none';
    }
    return;
  }

  const closeForm = async () => {
    $exitBtn.closest('form').style.display = 'none';
    $postBtn.style.display = 'block';
  }

$postBtn.addEventListener('click', toggleCreatePost);
 
$postForm.addEventListener('submit', newFormHandler);

$exitBtn.addEventListener('click', closeForm);
  