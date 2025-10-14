document.forms[0].addEventListener('submit', function (e) {
  e.preventDefault();

  let userId = document.querySelector('#userId').value.trim();
  let userPw = document.querySelector('#userPw').value.trim();
  let userName = document.querySelector('#userName').value.trim();
  let userTel = document.querySelector('#userTel').value.trim();
  let userAddress = document.querySelector('#userAddress').value.trim();

  fetch("http://192.168.0.17:3000/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userId,
        userPw,
        userName,
        userTel,
        userAddress
      }),
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.success) {
        alert("회원가입이 완료되었습니다!");
        window.location.href = "login.html";; // 성공 시 로그인 페이지로
      } else {
        alert(result.message || "회원가입에 실패했습니다."); // 실패 메시지 출력
      }
    })
    .catch((err) => {
      console.error("fetch error:", err);
      alert("네트워크 오류가 발생했습니다.");
    });
});

// 데이터 베이스 user_table 데이터와 비교해 아이디, 전화번호 겹치지않으면 생성