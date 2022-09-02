/* ページ内リンクの際にスムーズスクロールになる */

const navbarLinks = document.querySelectorAll("nav a");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
  smoothScroll(event);
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute("href") === "#" ? "#header" : event.currentTarget.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const header = document.getElementById('header');
  const gap = header.clientHeight; /*ヘッダーの高さ*/
  const distance = targetPosition - startPosition - gap;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    window.scrollTo(0, easeOutCubic(progress, startPosition, distance, duration));

    /* SP版のスクロール */
    if (window.innerWidth < 960) {
      const distance = targetPosition - startPosition;
      window.scrollTo(0, easeOutCubic(progress, startPosition, distance, duration));
    }

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }
}

/* スクロールの速さの設定 */

function easeOutCubic(t, b, c, d) {
	t /= d;
	t--;
	return c*(t*t*t + 1) + b;
};

/*////////////////////////////*/

//PC⇔SP版切り替えができるハンバーガーメニュー

const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('nav-ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navUl.classList.toggle('show');
});

////////////////////////////////////////////