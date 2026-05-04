// ===== 导航栏滚动效果 =====
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;

      if (scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      if (scrollY > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }

      updateActiveNav();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
});

// ===== 导航链接高亮（基于滚动位置）=====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollY = window.scrollY + 100;

  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// ===== 回到顶部 =====
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== 联系卡片点击复制 =====
document.querySelectorAll('.contact-card[data-copy]').forEach(card => {
  card.addEventListener('click', (e) => {
    e.preventDefault();
    const text = card.getAttribute('data-copy');
    navigator.clipboard.writeText(text).then(() => {
      const valueEl = card.querySelector('.contact-value');
      const original = valueEl.textContent;
      valueEl.textContent = '已复制 ✓';
      setTimeout(() => {
        valueEl.textContent = original;
      }, 1500);
    }).catch(() => {});
  });
});

// ===== 汉堡菜单（移动端）=====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', !expanded);
});

// 点击导航项后关闭菜单
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// 点击页面其他区域关闭菜单
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ===== 滚动揭示动画 (Intersection Observer) =====
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.about-grid, .skills-block, .project-card, .contact-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// ===== Demo Modal =====
const demoConfig = {
  cs: {
    type: 'video',
    title: '智能客服助手 - 演示',
    video: 'demos/demo-cs.mp4',
  },
  img: {
    type: 'gallery',
    title: 'AI 图像创作工具 - 演示截图',
    images: [
      { src: 'demos/demo-img-1.png', caption: '文本到图像生成 — 支持风格选择和参数调优' },
    ],
  },
  meeting: {
    type: 'gallery',
    title: 'AI 智能会议助手 - 演示截图',
    images: [
      { src: 'demos/demo-meeting-1.png', caption: '上传录音/视频自动转文字 → AI 生成结构化会议纪要' },
    ],
  },
};

const overlay = document.getElementById('demoOverlay');
const demoTitle = document.getElementById('demoTitle');
const demoBody = document.getElementById('demoBody');
const demoClose = document.getElementById('demoClose');
let currentGalleryIdx = 0;
let currentGalleryImages = [];

function openDemo(demoKey) {
  const cfg = demoConfig[demoKey];
  if (!cfg) return;

  demoTitle.textContent = cfg.title;
  currentGalleryIdx = 0;

  if (cfg.type === 'video') {
    demoBody.innerHTML = `<video class="demo-video" src="${cfg.video}" controls autoplay playsinline></video>`;
  } else if (cfg.type === 'gallery') {
    currentGalleryImages = cfg.images;
    renderGallery();
  }

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  demoBody.innerHTML = '';
}

function renderGallery() {
  const imgs = currentGalleryImages;
  if (!imgs.length) return;

  const idx = currentGalleryIdx;
  const img = imgs[idx];

  demoBody.innerHTML = `
    <div class="demo-gallery">
      <img class="demo-gallery-main" src="${img.src}" alt="${img.caption}">
      <p class="demo-gallery-caption">${img.caption}（${idx + 1}/${imgs.length}）</p>
      ${imgs.length > 1 ? `
        <button class="demo-gallery-nav prev" id="galleryPrev" aria-label="上一张">◂</button>
        <button class="demo-gallery-nav next" id="galleryNext" aria-label="下一张">▸</button>
      ` : ''}
      ${imgs.length > 1 ? `
        <div class="demo-gallery-dots">
          ${imgs.map((_, i) => `<button class="${i === idx ? 'active' : ''}" data-idx="${i}" aria-label="第${i + 1}张"></button>`).join('')}
        </div>
      ` : ''}
    </div>
  `;

  // Bind gallery controls
  const prevBtn = document.getElementById('galleryPrev');
  const nextBtn = document.getElementById('galleryNext');
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navGallery(-1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navGallery(1); });

  document.querySelectorAll('.demo-gallery-dots button').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentGalleryIdx = parseInt(btn.dataset.idx);
      renderGallery();
    });
  });
}

function navGallery(dir) {
  const len = currentGalleryImages.length;
  currentGalleryIdx = (currentGalleryIdx + dir + len) % len;
  renderGallery();
}

// Event listeners
document.querySelectorAll('.project-link-demo').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    openDemo(btn.dataset.demo);
  });
});

demoClose.addEventListener('click', closeDemo);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeDemo();
});

document.addEventListener('keydown', (e) => {
  if (!overlay.classList.contains('open')) return;
  if (e.key === 'Escape') {
    closeDemo();
  } else if (e.key === 'ArrowLeft' && currentGalleryImages.length) {
    navGallery(-1);
  } else if (e.key === 'ArrowRight' && currentGalleryImages.length) {
    navGallery(1);
  }
});
