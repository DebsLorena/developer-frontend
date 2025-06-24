/*barra de navegação*/
const list = document.querySelectorAll('.list');

function activeLink() {
    list.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

list.forEach(item => item.addEventListener('click', activeLink));


/*animação time line*/
function qs(selector, all = false) {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector);
}

const sections = qs('.section', true);
const timeline = qs('.timeline');
const line = qs('.line');
line.style.bottom = `calc(100% - 20px)`;

let prevScrollY = window.scrollY;
let up, down;
let full = false;
let set = 0;
const targetY = window.innerHeight * 0.8;

function scrollHandler() {
    const scrollY = window.scrollY;
    up = scrollY < prevScrollY;
    down = !up;

    const timelineRect = timeline.getBoundingClientRect();

    const dist = targetY - timelineRect.top;
    // console.log(dist);

    if (down && !full) {
        set = Math.max(set, dist);
        line.style.bottom = `calc(100% - ${set}px)`;
    }

    if (dist > timeline.offsetHeight + 50 && !full) {
        full = true;
        line.style.bottom = `-50px`;
    }

    sections.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top + item.offsetHeight / 5 < targetY) {
            item.classList.add('show-me');
        }
    });

    prevScrollY = scrollY;
}

scrollHandler();
line.style.display = 'block';
window.addEventListener('scroll', scrollHandler);


/*back - botão voltar ao topo*/
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

function toggleBackToTop() {
    if (window.scrollY > 100) {
        header.classList.add("active");
        backTopBtn.classList.add("active");
    } else {
        header.classList.remove("active");
        backTopBtn.classList.remove("active");
    }
}

// Usa o evento scroll do window para chamar essa função
window.addEventListener('scroll', toggleBackToTop);

// Opcional: botão sobe a página suavemente ao clicar
backTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
