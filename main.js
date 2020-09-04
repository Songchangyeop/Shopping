'use strict';

// main
loadItems() // json 파일 읽는 함수
  .then((items) => {
      displayItems(items);
      setEventListener(items)
  })
  .catch(console.log);
