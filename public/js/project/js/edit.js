// =========================
// edit.js (완성본)
// =========================

// ----------------- 카테고리 드롭다운 -----------------
(() => {
  const btn = document.getElementById("category-btn");
  const menu = document.getElementById("category-menu");
  if (btn && menu) {
    btn.addEventListener("click", () => menu.classList.toggle("show"));
    window.addEventListener("click", (e) => {
      if (!e.target.matches("#category-btn")) menu.classList.remove("show");
    });
  }
})();

// ----------------- 로그인 상태 확인 및 로그아웃 -----------------
window.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loggedInUserName = localStorage.getItem("loggedInUserName");
  const authBox = document.querySelector(".auth-box");

  if (authBox) {
    if (loggedInUser) {
      authBox.innerHTML = `
        <span>🎈${loggedInUserName || loggedInUser}</span>
        <a href="infoEdit.html">정보수정</a>
        <a href="#" id="logoutBtn">로그아웃</a>
      `;
      const logout = document.getElementById("logoutBtn");
      logout?.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInUserName");
        alert('상품을 수정하려면 로그인 상태를 유지해야합니다.\n로그인 후 다시 시도해주세요');
        location.href = 'product.html';
      });
    } else {
      authBox.innerHTML = `
        <a href="register.html">회원가입</a>
        <a href="login.html">로그인</a>
      `;
    }
  }
});

// ----------------- 전역 상태 -----------------
const prodNo = localStorage.getItem("selectedProductNo");
const loggedInUser = localStorage.getItem("loggedInUser");

// 주소 직접 접근 차단
if (!prodNo || !loggedInUser) {
  alert("잘못된 접근입니다. 메인으로 이동합니다.");
  location.href = "main.html";
}

let product = null;

// 필드 캐싱
const form = document.getElementById("editProductForm");
const nameEl = document.getElementById("prodName");
const desEl = document.getElementById("prodDes");
const cateEl = document.getElementById("prodCate");
const countEl = document.getElementById("prodCount");
const priceEl = document.getElementById("prodPrice");

// 이미지 요소(있으면 사용)
const fileInput = document.getElementById("productImage");
const currentImgEl = document.getElementById("currentImg");

// ----------------- 이미지 미리보기 -----------------
fileInput?.addEventListener("change", (e) => {
  const file = e.target.files?.[0];
  if (!file || !currentImgEl) return;
  const url = URL.createObjectURL(file);
  currentImgEl.src = url;
});

// ----------------- 상품 로드 -----------------
async function loadProduct() {
  try {
    const res = await fetch(`http://localhost:3000/products/${prodNo}`);
    const result = await res.json();
    if (!res.ok || !result.success) throw new Error(result.message || "상품 조회 실패");

    product = result.data;

    // 판매자 권한 확인
    if (product.PRODSELLER !== loggedInUser) {
      alert("권한이 없습니다. 판매자만 수정할 수 있습니다.");
      location.href = "main.html";
      return;
    }

    // 입력값 채우기
    if (nameEl) nameEl.value = product.PRODNAME ?? "";
    if (desEl) desEl.value = product.PRODDES ?? "";
    if (cateEl) cateEl.value = String(product.PRODCATE ?? "1");
    if (countEl) countEl.value = String(product.PRODCOUNT ?? "0");
    if (priceEl) priceEl.value = String(product.PRODPRICE ?? "0");

    // 현재 이미지 프리뷰
    if (currentImgEl) {
      const imgPath = product.IMGPATH
        ? "/" + String(product.IMGPATH).replace(/\\/g, "/")
        : "/js/project/img/default.png";
      currentImgEl.src = imgPath;
    }
  } catch (err) {
    console.error("상품 불러오기 오류:", err);
    alert("상품 정보를 불러올 수 없습니다.");
    location.href = "main.html";
  }
}

// ----------------- 수정 제출 -----------------
form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 간단 검증
  const prodName = nameEl?.value.trim();
  const prodDes = desEl?.value.trim();
  const prodCate = Number(cateEl?.value ?? "1");
  const prodCount = Number(countEl?.value ?? "0");
  const prodPrice = Number(priceEl?.value ?? "0");

  if (!prodName || !prodDes || isNaN(prodCate) || isNaN(prodCount) || isNaN(prodPrice)) {
    alert("모든 값을 올바르게 입력해 주세요.");
    return;
  }

  const fd = new FormData();
  fd.append("prodName", prodName);
  fd.append("prodDes", prodDes);
  fd.append("prodCate", String(prodCate));
  fd.append("prodCount", String(prodCount));
  fd.append("prodPrice", String(prodPrice));
  fd.append("loggedInUser", loggedInUser); // 서버 판매자 검증용

  const file = fileInput?.files?.[0];
  if (file) {
    fd.append("productImage", file);
  }

  try {
    const res = await fetch(`http://localhost:3000/products/${prodNo}`, {
      method: "PUT",
      body: fd, // FormData 사용 시 Content-Type 수동 지정 금지
    });
    const result = await res.json();

    if (res.ok && result?.success) {
      alert("상품이 성공적으로 수정되었습니다.");
      location.href = "product.html";
    } else {
      alert(result?.message || "수정 실패(서버 오류)");
    }
  } catch (err) {
    console.error("상품 수정 오류:", err);
    alert("상품 수정 중 오류가 발생했습니다.");
  }
});

// ----------------- 카테고리 클릭 시 localStorage에 저장 -----------------
document.querySelectorAll("#category-menu a").forEach(link => {
  link.addEventListener("click", function () {
    const cateNo = this.getAttribute("data-cate");
    localStorage.setItem("selectedCategory", cateNo);
  });
});

// ----------------- 초기 로드 -----------------
document.addEventListener("DOMContentLoaded", loadProduct);
