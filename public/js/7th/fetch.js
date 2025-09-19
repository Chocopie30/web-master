fetch('http://localhost:3000/posts') // Promise객체를 반환해줌
  .then(function (responese) {
    console.log(responese);
    return responese.json(); // javascript의 객체 변경
  })
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });