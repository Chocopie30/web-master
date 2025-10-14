// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});

window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});

// ----------------- 로그인 상태 확인 및 로그아웃 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loggedInUserName = localStorage.getItem("loggedInUserName");
  const authBox = document.querySelector(".auth-box");

  if (loggedInUser) {
    authBox.innerHTML = `
      <span>🎈${loggedInUserName}</span>
      <a href="infoEdit.html">정보수정</a>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("loggedInUserName");
      location.reload();
    });
  } else {
    authBox.innerHTML = `
      <a href="register.html">회원가입</a>
      <a href="login.html">로그인</a>
    `;
  }
});

// ----------------- 상품 등록 -----------------
document.getElementById("addProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loggedInUser = localStorage.getItem("loggedInUser");
  if (!loggedInUser) {
    alert("상품을 등록하려면 로그인해야 합니다.");
    window.location.href = "login.html";
    return;
  }

  const form = e.target;
  const formData = new FormData(form);
  formData.append("prodSeller", loggedInUser); // ✅ 판매자 아이디 추가

  try {
    const res = await fetch("http://192.168.0.17:3000/products", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    if (result.success) {
      // alert("상품이 등록되었습니다!");
      window.location.href = "main.html";
    } else {
      alert("상품 등록 실패: " + (result.message || "서버 오류"));
    }
  } catch (err) {
    console.error("상품 등록 오류:", err);
    alert("상품 등록 중 오류가 발생했습니다.");
  }
});
