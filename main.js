'use strict';

// JSON 파일의 아이템을 Fetch
function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items); //json 객체 배열
}

// 받은 아이템으로 리스트 업데이트
function displayItems(items) {
  const container = document.querySelector('.items');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// 받은 아이템으로 HTML <li> 생성
function createHTMLString(item) {
  return `
  <li class="item">
     <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
     <span class="item__desctiption">${item.gender}, ${item.size}</span>
  </li>
  `;
}

// 버튼클릭 시
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  const filtered = items.filter((item) => item[key] === value);
  displayItems(filtered);
}

function setEventListener(items) {
  const logo = document.querySelector('.logo');
  const button = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  button.addEventListener('click', (event) => onButtonClick(event, items));
}

// 메인
loadItems() // json 파일 읽는 함수
  .then((items) => {
    displayItems(items);
    setEventListener(items);
  })
  .catch(console.log);
