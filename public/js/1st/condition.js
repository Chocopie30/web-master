function calculate() {
  let first = parseInt(document.querySelector("#user1").value);
  let last = parseInt(document.querySelector("#user2").value);

  let opr = document.querySelector("#oper").value;
  let result = 0;

  console.log(first, last, opr);

  switch (opr) {
    case '+':
      result = first + last;
      break;
    case '-':
      result = first - last;
      break;
    case '*':
      result = first * last;
      break;
    case '/':
      result = first / last;
      break;
  }
  document.querySelector("#result").value = result;
}