// input으로 2개 값 입력받기 html에
// 연산(+ - * /)
// 함수이름 plus, minus, multiply, divide

function calculate() {
  let re = 0;
  let opr = document.querySelector("#oper").value;

  switch(opr) {
    case '+' :
      re = plus(document.querySelector("#n1").value,document.querySelector("#n2").value);
      break;
    case '-' :
      re = minus(document.querySelector("#n1").value,document.querySelector("#n2").value);
      break;
    case '*' :
      re = multiply(document.querySelector("#n1").value,document.querySelector("#n2").value);
      break;
    case '/' :
      re = divide(document.querySelector("#n1").value,document.querySelector("#n2").value);
      break;
  }
  document.querySelector('#result').value = re;
}

function plus(num1,num2) { 
  return parseInt(num1) + parseInt(num2);
}

function minus(num1,num2) { 
  return parseInt(num1) - parseInt(num2);
}

function multiply(num1,num2) { 
  return parseInt(num1) * parseInt(num2);
}

function divide(num1,num2) { 
  return parseInt(num1) / parseInt(num2);
}
