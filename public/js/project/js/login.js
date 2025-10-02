document.forms[0].addEventListener('submit', function (e) {
  e.preventDefault();

  const userId = document.querySelector('#userId').value.trim();
  const userPw = document.querySelector('#userPw').value.trim();

  if (!userId || !userPw) {
    alert("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }

  fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify({
        userId,
        userPw
      })
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);

      if (result.success) {
        // 🔹 로그인 성공 시 localStorage에 저장
        localStorage.setItem("loggedInUser", userId);
        alert("로그인 성공!");
        window.location.href = "main.html";
      } else {
        alert(result.message || "로그인에 실패했습니다.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("서버 오류가 발생했습니다.");
    });
});