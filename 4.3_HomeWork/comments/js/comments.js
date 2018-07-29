'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  // const comments = list.map(createComment).join('');
  // commentsContainer.innerHTML += comments;
  const commentNodes = list.map(createComment);
  const fragment = commentNodes.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());

  commentsContainer.appendChild(fragment);

  // нашел клевый способ отформатировать текст в интернетах ))))
  // посредством обработки пробелов внутри элемента
  // 'pre-line' прям то что нужно
  Array.from(commentsContainer.querySelectorAll('.comment-text')).forEach(container => {
    container.style.whiteSpace = 'pre-line';
  })
}

function createComment(comment) {

  const photo = document.createElement('div');
  const avatar = document.createElement("div");
  const commentBlock = document.createElement("div");
  const commentText = document.createElement("p");
  const bottomComment = document.createElement('div');
  const commentDate = document.createElement('div');
  const commentActions = document.createElement('ul');
  const complain = document.createElement('li');
  const reply = document.createElement('li');
  const commentWrap = document.createElement('div');

  photo.className = 'photo';
  photo.setAttribute("title", comment.author.name);
  
  avatar.className = 'avatar';
  avatar.style.backgroundImage = `url(${comment.author.pic})`;
  photo.appendChild(avatar);
  
  commentBlock.className = 'comment-block';
  
  commentText.className = 'comment-text';
  commentText.textContent = comment.text;
  commentBlock.appendChild(commentText);
  
  bottomComment.className = 'bottom-comment';
  
  commentDate.className = 'comment-date';
  commentDate.textContent = new Date(comment.date).toLocaleString('ru-Ru');
  
  commentActions.className = 'comment-actions';
  
  complain.className = 'complain';
  complain.textContent = 'Пожаловаться'
  
  reply.className = 'reply';
  reply.textContent = 'Ответить';
  commentActions.appendChild(complain);
  commentActions.appendChild(reply);
  bottomComment.appendChild(commentDate);
  bottomComment.appendChild(commentActions);
  commentBlock.appendChild(commentText);
  commentBlock.appendChild(bottomComment);
  
  commentWrap.className = 'comment-wrap';
  commentWrap.appendChild(photo);
  commentWrap.appendChild(commentBlock);
  return commentWrap;

  // return `<div class="comment-wrap">
  //   <div class="photo" title="${comment.author.name}">
  //     <div class="avatar" style="background-image: url('${comment.author.pic}')"></div>
  //   </div>
  //   <div class="comment-block">
  //     <p class="comment-text">
  //       ${comment.text.split('\n').join('<br>')}
  //     </p>
  //     <div class="bottom-comment">
  //       <div class="comment-date">${new Date(comment.date).toLocaleString('ru-Ru')}</div>
  //       <ul class="comment-actions">
  //         <li class="complain">Пожаловаться</li>
  //         <li class="reply">Ответить</li>
  //       </ul>
  //     </div>
  //   </div>
  // </div>`
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
