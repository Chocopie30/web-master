// ----------------- 카테고리 드롭다운 -----------------
document.getElementById("category-btn").addEventListener("click", function () {
  document.getElementById("category-menu").classList.toggle("show");
});
window.addEventListener("click", function (e) {
  if (!e.target.matches("#category-btn")) {
    document.getElementById("category-menu").classList.remove("show");
  }
});

// ----------------- 로그인 상태 확인 및 로그아웃 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const authBox = document.querySelector(".auth-box");

  if (loggedInUser) {
    authBox.innerHTML = `
      <span>${loggedInUser}님, 환영합니다!</span>
      <a href="#" id="logoutBtn">로그아웃</a>
    `;
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      alert('상품을 수정하려면 로그인 상태를 유지해야합니다\n로그인 후 다시 시도해주세요');
      location.href = 'product.html';
    });
  } else {
    authBox.innerHTML = `
      <a href="register.html">회원가입</a>
      <a href="login.html">로그인</a>
    `;
  }
});

// ----------------- 선택된 상품 불러오기 -----------------
const prodNo = localStorage.getItem("selectedProductNo");
const loggedInUser = localStorage.getItem("loggedInUser");

// ✅ 주소 직접 접근 차단
if (!prodNo || !loggedInUser) {
  alert("잘못된 접근입니다. 메인으로 이동합니다.");
  location.href = "main.html";
}

let product = null;

async function loadProduct() {
  try {
    const res = await fetch(`http://localhost:3000/products/${prodNo}`);
    const result = await res.json();
    if (!result.success) throw new Error(result.message);

    product = result.data;

    // ✅ 판매자가 아닌 경우 접근 차단
    if (product.PRODSELLER !== loggedInUser) {
      alert("권한이 없습니다. 판매자만 수정할 수 있습니다.");
      location.href = "main.html";
      return;
    }

    // 입력 폼에 값 채우기
    document.getElementById("prodName").value = product.PRODNAME;
    document.getElementById("prodDes").value = product.PRODDES;
    document.getElementById("prodCate").value = product.PRODCATE;
    document.getElementById("prodCount").value = product.PRODCOUNT;
    document.getElementById("prodPrice").value = product.PRODPRICE;
  } catch (err) {
    console.error("상품 불러오기 오류:", err);
    alert("상품 정보를 불러올 수 없습니다.");
    location.href = "main.html";
  }
}

// ----------------- 상품 수정 요청 -----------------
document.getElementById("editProductForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedData = {
    prodName: document.getElementById("prodName").value.trim(),
    prodDes: document.getElementById("prodDes").value.trim(),
    prodCate: parseInt(document.getElementById("prodCate").value),
    prodCount: parseInt(document.getElementById("prodCount").value),
    prodPrice: parseInt(document.getElementById("prodPrice").value),
    loggedInUser: loggedInUser // ✅ 서버에서도 판매자 확인할 수 있도록 전달
  };

  try {
    const res = await fetch(`http://localhost:3000/products/${prodNo}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    const result = await res.json();
    if (result.success) {
      alert("상품이 성공적으로 수정되었습니다.");
      location.href = "product.html";
    } else {
      alert("수정 실패: " + (result.message || "서버 오류"));
    }
  } catch (err) {
    console.error("상품 수정 오류:", err);
    alert("상품 수정 중 오류가 발생했습니다.");
  }
});

document.addEventListener("DOMContentLoaded", loadProduct);

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});