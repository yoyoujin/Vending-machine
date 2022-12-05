const itemList = document.querySelectorAll('.cont-beverage > li');
const getItemList = document.querySelector('.selected-beverage');
// 획득한 음료부분 ul 클래스 이름 바꿔주기 (지금 얘는 장바구니 목록의 ul 클래스)
const cartItems = [];
console.log(cartItems);

// 아이템 클릭하면 장바구니에 넣어주는 함수
const setCartItem = (item, id) => {
  const src = item.querySelector('.btn-beverage > img').getAttribute('src');
  const title = item.querySelector('.beverage-name').textContent;
  const findItemIdx = cartItems.findIndex((item) => {
    item.id === id;
  });
  let quantity = 1;
  cartItems.push({ id, src, title, quantity });
  console.log(title);
};

const renderCartItem = () => {};

// 콜라 목록에 클릭이벤트 달아줌~
itemList.forEach((item) => {
  // const id =
  item.addEventListener('click', () => {
    item.classList.add('active');
    setCartItem(item, id);
  });
});

// ## 3. 요구사항 명세(javascript 부분)
// 1. 판매할 음료에 대한 데이터는 따로 분리되어 있어야 합니다. (혹은 API로 받아야 합니다.)
// 2. 돈의 입금과 음료의 선택 시점은 자유롭지만 돈이 모자라면 음료가 나와서는 안됩니다.
// 3. 거스름돈이 나와야 합니다.
// 4. 버튼을 누르면 상품이 1개씩 추가됩니다. (일반적인 자판기와 동일)
