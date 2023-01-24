import colaData from './cola.js';

// 변수
const rightSection = document.querySelector('.cont-beverage');
const txtBalance = document.querySelector('.txt-balance');
const btnReturn = document.querySelector('.return-btn');
const txtPut = document.querySelector('.put-txt');
const btnPut = document.querySelector('.put-btn');
const txtPocketMoney = document.querySelector('.txt-pocket-money');
const selectedBeverage = document.querySelector('.selected-beverage');
const btnGet = document.querySelector('.get-btn');
const gotItemList = document.querySelector('.got-page');
const totalMoney = document.querySelector('.total-money');

console.log(colaData);

// 콜라 리스트 렌더링
colaData.forEach((item) => {
  const itemList = document.createElement('li');
  itemList.innerHTML = `
    <button class="btn-beverage" type="button" data-name="${item.name}" data-stock="${item.stock}" data-img="${item.img}" data-price="${item.price}">
      <img class="beverage-img" src=${item.img} alt="" />
      <strong class="beverage-name">${item.name}</strong>
      <strong class="beverage-price">${item.price}원</strong>
    </button>
  `;
  rightSection.appendChild(itemList);
});

// Form - 입금
btnPut.addEventListener('click', (event) => {
  event.preventDefault();

  const inputCost = parseInt(txtPut.value);
  const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));
  const inhandMoney = parseInt(txtPocketMoney.textContent.replaceAll(',', ''));

  if (inputCost <= inhandMoney) {
    if (balance === 0) {
      txtBalance.textContent = inputCost.toLocaleString() + '원';
      txtPocketMoney.textContent = (inhandMoney - inputCost).toLocaleString() + '원';
    } else if (balance > 0) {
      txtBalance.textContent = (inputCost + balance).toLocaleString() + '원';
    }

    txtPut.value = null;
  } else {
    alert('소지금이 부족합니다 🥹');
  }
});

// Form - 거스름돈 반환
btnReturn.addEventListener('click', (event) => {
  const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));
  const inhandMoney = parseInt(txtPocketMoney.textContent.replaceAll(',', ''));

  event.preventDefault();
  if (balance) {
    txtPocketMoney.textContent = (inhandMoney + balance).toLocaleString() + '원';
    txtBalance.textContent = 0 + '원';
  } else {
    alert('잔액이 없습니다 🥹');
  }
});

// 콜라 버튼 클릭시 카트에 리스트 생성
const btnCola = document.querySelectorAll('.btn-beverage');

btnCola.forEach((item) => {
  item.addEventListener('click', (event) => {
    const targetEl = event.currentTarget;
    const balance = parseInt(txtBalance.textContent.replaceAll(',', ''));
    const colaPrice = parseInt(item.dataset.price);
    let isSelected = false;
    const cartListBeverage = selectedBeverage.querySelectorAll('li');

    if (balance >= colaPrice) {
      for (const item of cartListBeverage) {
        if (item.dataset.name === targetEl.dataset.name) {
          item.querySelector('.count-item').textContent++;
          isSelected = true;
          break;
        }
      }

      txtBalance.textContent = (balance - colaPrice).toLocaleString() + '원';

      const cartList = document.createElement('li');

      if (!isSelected) {
        cartList.dataset.name = item.dataset.name;
        cartList.dataset.price = item.dataset.price;

        cartList.innerHTML = `
        <button type="button" class="selected-item">
          <img src=${item.dataset.img} alt=${item.dataset.name} />
          <strong class="item-title">${item.dataset.name}</strong>
          <strong class="count-item">1</strong>
        </button>
      `;
        selectedBeverage.appendChild(cartList);
      }

      targetEl.dataset.stock--;

      if (targetEl.dataset.stock === '0') {
        targetEl.classList.add('sold-out');
        targetEl.disabled = true;
        targetEl.insertAdjacentHTML(
          'afterbegin',
          '<em class="screen-out">해당상품은 품절입니다.</em>'
        );
      }
    } else {
      alert('잔액이 부족합니다 🥹 돈을 입금해주세요!');
    }
  });
});

// 획득버튼 클릭 시 획득한 음료 리스트에 렌더링해주기
btnGet.addEventListener('click', () => {
  let isGot = false;
  let totalPrice = 0;

  for (const selectedList of selectedBeverage.querySelectorAll('li')) {
    for (const gotList of gotItemList.querySelectorAll('li')) {
      let gotItemCounter = gotItemList.querySelector('.count-item');
      if (selectedList.dataset.name === gotList.dataset.name) {
        gotItemCounter.textContent =
          Number(gotItemCounter.textContent) +
          Number(selectedList.querySelector('.count-item').textContent);
        isGot = true;
      }
      break;
    }
    if (!isGot) {
      gotItemList.appendChild(selectedList);
    }
  }
  selectedBeverage.innerHTML = null;

  // 총 금액 표시하기
  gotItemList.querySelectorAll('li').forEach((gotList) => {
    console.log(gotList);
    totalPrice += gotList.dataset.price * Number(gotList.querySelector('.count-item').textContent);
  });
  totalMoney.textContent = `총금액 : ${totalPrice.toLocaleString()}원`;
});
