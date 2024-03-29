const fixedList = document.querySelector('.fixedList');
const addedList = document.querySelector('.addedList');
const fixedList_ul = fixedList.querySelector('ul');
const addedList_ul = addedList.querySelector('ul');
const input = document.querySelector('input');
const addForm = document.querySelector('.addForm');
const footerText = document.querySelector('.footer__text');

const body = document.querySelector('body');
const container = document.querySelector('.container');
const sunBtn = document.querySelector('.fa-sun');
const moonBtn = document.querySelector('.fa-moon');
const addText = document.querySelector('.addText');
const chevron = document.querySelector('.fa-chevron-down');
const fixedList_li = fixedList.querySelectorAll('li');
const addedList_li = addedList.getElementsByTagName('li');
const footer = document.querySelector('footer');
const addedList_changeDark = addedList.getElementsByTagName('li');
const fixedList_changeDark = fixedList.getElementsByTagName('li');
let bodyMode = document.getElementsByTagName('body')[0];

// 다크 모드 만들기
moonBtn.addEventListener('click', () => {
  moonBtn.style.display = 'none';
  sunBtn.style.display = 'flex';
  body.classList.toggle('dark');
  container.classList.toggle('dark');
  addText.classList.toggle('dark');
  fixedList.classList.toggle('dark');
  addedList.classList.toggle('dark');
  input.classList.toggle('dark');
  chevron.classList.toggle('dark');
  footer.classList.toggle('dark');
  Array.from(addedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
  Array.from(fixedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
});

// 라이트 모드 만들기
sunBtn.addEventListener('click', () => {
  moonBtn.style.display = 'flex';
  sunBtn.style.display = 'none';
  body.classList.toggle('dark');
  container.classList.toggle('dark');
  addText.classList.toggle('dark');
  fixedList.classList.toggle('dark');
  addedList.classList.toggle('dark');
  input.classList.toggle('dark');
  chevron.classList.toggle('dark');
  footer.classList.toggle('dark');
  Array.from(addedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
  Array.from(fixedList_changeDark).forEach((li) => {
    li.classList.toggle('dark');
  });
});

let count = 0;
footerText.innerText = `${count}개의 메모`;

input.addEventListener('click', () => {
  if (input.value === '추가하기') {
    input.value = '';
  }
});

function onAdd() {
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  } else {
    const item = createItem(text);
    addedList_ul.prepend(item);
    footerText.textContent = `${(count = count + 1)}개의 메모`;
    item.scrollIntoView({ block: 'end' });
    input.value = '';
    input.focus();
  }
}

let id = 0;
// 부모에 붙일 item 만들기
function createItem(text) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const liElement = document.createElement('li');
  liElement.setAttribute('data-key', id);
  bodyMode.className === 'dark' ? liElement.classList.add('dark') : '';
  liElement.innerHTML = `
    <div class="textAndDate">
      <div class="text">${text}</div>
      <div class="date">${year}. ${month + 1}. ${date}</div> 
    </div>
    <div class="icons">
      <i class="fas fa-thumbtack" data-id=${id}></i>
      <i class="fas fa-trash-alt" data-id=${id}></i>
    </div>
`;
  liElement.addEventListener('mouseenter', (event) => {
    const key = event.target.dataset.key;
    const icons = addedList.querySelectorAll(
      `.addedList li i[data-id="${key}"]`
    );
    icons.forEach((icon) => {
      icon.style.visibility = 'visible';
    });
  });
  liElement.addEventListener('mouseleave', (event) => {
    const key = event.target.dataset.key;
    const icons = addedList.querySelectorAll(
      `.addedList li i[data-id="${key}"]`
    );
    icons.forEach((icon) => {
      icon.style.visibility = 'hidden';
    });
  });

  liElement.addEventListener('mouseenter', (event) => {
    const key = event.target.dataset.key;
    const icons = fixedList.querySelectorAll(
      `.fixedList li i[data-id="${key}"]`
    );
    icons.forEach((icon) => {
      icon.style.visibility = 'visible';
    });
  });
  liElement.addEventListener('mouseleave', (event) => {
    const key = event.target.dataset.key;
    const icons = fixedList.querySelectorAll(
      `.fixedList li i[data-id="${key}"]`
    );
    icons.forEach((icon) => {
      icon.style.visibility = 'hidden';
    });
  });
  id++;
  return liElement;
}

// 추가된 메모, 고정된 메모로 추가하기
addedList_ul.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  const isDelete = event.target.classList.contains('fa-trash-alt');
  const isPick = event.target.classList.contains('fa-thumbtack');
  const list = document.querySelector(`.addedList li[data-key="${id}"]`);
  const trash = document.querySelector(`.icons .fa-trash-alt[data-id='${id}']`);
  if (isDelete) {
    list.remove();
    footerText.textContent = `${(count = count - 1)}개의 메모`;
  } else if (isPick) {
    trash.style.display = 'none';
    fixedList_ul.prepend(list);
  }
});

// 고정된 메모 원래 자리로 돌려 놓기
fixedList_ul.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  const pin = event.target.classList.contains('fa-thumbtack');
  const list = document.querySelector(`.fixedList li[data-key="${id}"]`);
  const trash = document.querySelector(`.icons .fa-trash-alt[data-id='${id}']`);
  if (undefined) {
    return;
  } else if (pin) {
    addedList_ul.prepend(list);
    trash.style.display = 'inline';
  }
});

// 토글링으로 추가된 메모의 높이 조절
let toggling = 1;
const moreBtn = document.querySelector('.fixedList__top button');
moreBtn.addEventListener('click', () => {
  moreBtn.classList.toggle('clicked');
  fixedList_ul.classList.toggle('hidden');
  if (toggling % 2 === 1) {
    addedList_ul.style.height = '428px';
  } else {
    addedList_ul.style.height = '245px';
  }
  toggling++;
});

// form에 입력 값 넣기 시도
addForm.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});
