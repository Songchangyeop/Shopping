

function loadJson() {
    return fetch('data/data.json')
    .then(response => response.json())
    .then(json => json.item);
}

function displayItems(items) {
    console.log(items);
    const shoppingList = document.querySelector('.shopping-list');
    shoppingList.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
    return `
    <li class="shopping-item" data-type = "${item.type}" data-color = "${item.color}">
        <img src="${item.image}" alt=""/>
        <span>${item.gender}, ${item.size} size</span>
    </li>`
}


function setEvent(items) {
    const logo = document.querySelector('.logo');
    let shoppingItem = document.querySelectorAll('.shopping-item');
    const buttons = document.querySelector('.buttons');
    
    logo.addEventListener('click', () => {
        shoppingItem.forEach(item => {
            item.classList.remove('invisible');
        });
    });

    buttons.addEventListener('click', (event) => {
        const target = event.target;
        const key = target.dataset.key; 
        const value = target.dataset.value;
        if(key == null || value == null) {
            return;
        }
        shoppingItem.forEach(item => {
            if(item.dataset[key] == value) {
                item.classList.remove('invisible');
            } else if (item.dataset[key] !== value) {
                item.classList.add('invisible');
            }
        });
    });
}

loadJson()
    .then(items => {
        displayItems(items);
        setEvent(items);
    })
