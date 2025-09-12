function calculate() {
    let first = parseInt(document.querySelector("#user1").value);
    let last = parseInt(document.querySelector("#user2").value);

    let opr = document.querySelector("#oper").value;
    let result = 0;

    console.log(first, last, opr);

    if (opr == '+') {
        result = first + last;
    } else if (opr == '-') {
        result = first - last;
    } else if (opr == '*') {
        result = first * last;
    } else {
        result = first / last;
    }
    document.querySelector("#result").value = result;
}