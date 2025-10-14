// ----------------- 페이지 접근 차단 -----------------
const loggedInUser = localStorage.getItem("loggedInUser");
if (!loggedInUser) {
  alert("잘못된 접근입니다.");
  // alert 확인 후 이동 (0.1초 지연)
  setTimeout(() => {
    location.href = "qna.html";
  }, 100);
}


// 모든 초기화/검사를 DOMContentLoaded 이후에 수행
window.addEventListener("DOMContentLoaded", () => {
  // ---------- 접근 제어 ----------
  const loggedInUser = localStorage.getItem("loggedInUser");
  const fromQnA = localStorage.getItem("fromQnA"); // qna에서 버튼 눌렀을 때 set해야 함

  if (!loggedInUser) {
    alert("로그인 후 이용 가능합니다.");
    setTimeout(() => (window.location.href = "login.html"), 80);
    return;
  }

  if (!fromQnA) {
    alert("잘못된 접근입니다.\nQnA 페이지에서 '질문하기' 버튼을 이용해주세요.");
    setTimeout(() => (window.location.href = "qna.html"), 80);
    return;
  }

  // 한 번 쓰고 제거(새로고침/직접접근 방지)
  localStorage.removeItem("fromQnA");

  const loggedInUserName = localStorage.getItem("loggedInUserName");

  // ---------- 헤더/로그인 UI ----------
  const authBox = document.querySelector(".auth-box");
  if (authBox) {
    authBox.innerHTML = `
      <span>🎈${loggedInUserName}</span>
      <a href="infoEdit.html">정보수정</a>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserName");
        alert("질문을 하시려면 로그인을 다시 해주세요.");
        setTimeout(() => (window.location.href = "qna.html"), 80);
      });
    }
  }

  // ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});

// 다른 곳 클릭 시 메뉴 닫기
window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

  // ---------- 질문 폼 제출 ----------
  const form = document.getElementById("questionForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const qTitle = (document.getElementById("qTitle") ?.value || "").trim();
      const qContent = (document.getElementById("qContent") ?.value || "").trim();

      if (!qTitle || !qContent) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      try {
        const res = await fetch("http://192.168.0.17:3000/question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            qTitle,
            qContent,
            qWriter: loggedInUser,
          }),
        });

        const result = await res.json();
        if (result.success) {
          alert("질문이 등록되었습니다!");
          window.location.href = "qna.html";
        } else {
          alert("질문 등록 실패: " + (result.message || "서버 오류"));
        }
      } catch (err) {
        console.error("질문 등록 오류:", err);
        alert("서버 오류가 발생했습니다.");
      }
    });
  }

  // ---------- 취소 버튼 ----------
  const cancelBtn = document.querySelector(".btn-cancel");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      window.location.href = "qna.html";
    });
  }
});

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});