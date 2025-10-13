document.forms[0].addEventListener('submit', async function (e) {
  e.preventDefault();

  const userId = document.querySelector('#userId').value.trim();
  const userPw = document.querySelector('#userPw').value.trim();

  if (!userId || !userPw) {
    alert("아이디와 비밀번호를 모두 입력하세요.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ userId, userPw })
    });
    const result = await res.json();

    if (!res.ok || !result.success) {
      alert(result.message || "로그인에 실패했습니다.");
      return;
    }

    // ✅ 로그인 성공: 아이디 저장
    localStorage.setItem("loggedInUser", userId);

    // ✅ 1순위: 서버가 userName을 주면 바로 저장
    if (result.userName) {
      localStorage.setItem("loggedInUserName", result.userName);
    } else {
      // ✅ 2순위(보조요청): 프로필 조회해서 이름 저장 (엔드포인트 예시)
      try {
        const profRes = await fetch(`http://localhost:3000/user/profile?userId=${encodeURIComponent(userId)}`);
        if (profRes.ok) {
          const prof = await profRes.json();
          if (prof?.success && prof?.data?.userName) {
            localStorage.setItem("loggedInUserName", prof.data.userName);
          }
        }
      } catch (_) { /* 프로필 조회 실패해도 로그인은 진행 */ }
    }

    alert("로그인 성공!");
    window.location.href = "main.html";
  } catch (err) {
    console.error(err);
    alert("서버 오류가 발생했습니다.");
  }
});