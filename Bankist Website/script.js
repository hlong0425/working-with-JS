const header = document.querySelector('.header');
const nav = document.querySelector('.nav');
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.section');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');

const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const navLinksEl = document.querySelector('.nav__links');



const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}
function openModal() {
  overlay.classList.remove('hidden');
  modal.classList.remove('hidden');
}

btnsOpenModal.forEach(btn => btn.addEventListener('click', function (e) {
  e.preventDefault();
  openModal();
}))

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);


document.addEventListener('keydown', function (e) {
  if (e.key === "Escape" && !modal.classList.contains('hidden')) {
    closeModal();
  }
})


document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
})

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  const id = e.target.getAttribute('data-tab');

  if (!clicked) return;
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove('operations__tab--active');
    tabsContent[i].classList.remove('operations__content--active');
  }

  this.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${id}`).classList.add('operations__content--active');
})

function handleHover(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const img = link.closest('.nav').querySelector('img');


    siblings.forEach(sl => {
      if (link !== sl)
        sl.style.opacity = this;
    })
    img.style.opacity = this;
  }
}

const stickyNav = function (entries) {
  entries.forEach(entry => {
    nav.classList.remove('sticky');

    if (entry.isIntersecting === false) {
      nav.classList.add('sticky');
    }
  })
}


const navHeight = nav.getBoundingClientRect().height;


let observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

observer.observe(header);


// Section Observe
const revealSection = function (entries, observer) {
  const section = entries[0].target;
  if (entries[0].isIntersecting) {
    section.classList.remove('section--hidden');
    observer.unobserve(section);
  }
}

let observerSection = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})

sections.forEach(section => {
  // section.classList.add('section--hidden');
  observerSection.observe(section);
})


// IMG observe
let observerImg = new IntersectionObserver(function loadImg(entries, observer) {
  const img = entries[0].target;
  if (!entries[0].isIntersecting) return;
  img.src = img.dataset.src;
  img.addEventListener('load', function () {
    img.classList.remove('lazy-img');
  })
  observer.unobserve(img);
}, {
  root: null,
  threshold: 0
})

const imgTargets = document.querySelectorAll('img[data-src]');
imgTargets.forEach(img => {
  observerImg.observe(img);
})

navLinksEl.addEventListener('mouseover', handleHover.bind('.5'));

navLinksEl.addEventListener('mouseout', handleHover.bind('1'));

// Slider 
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');

slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * i}%)`);


const gotoSlide = function (currentSlide) {
  slides.forEach((slide, i) => slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`);
}

const dotActive = function (currentSlide) {
  const dots = dotContainer.querySelectorAll('.dots__dot');
  dots.forEach((dot, i) => {
    if (currentSlide === i) {
      dot.classList.add('dots__dot--active');
    }
    else {
      dot.classList.remove('dots__dot--active');
    }
  });
}

const nextSilde = function () {
  currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
  gotoSlide(currentSlide);
  dotActive(currentSlide);
}

const preSlide = function () {
  currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
  gotoSlide(currentSlide);
  dotActive(currentSlide);
}
let currentSlide = 0;
btnRight.addEventListener('click', nextSilde);

btnLeft.addEventListener('click', preSlide);

// Slider (Key/Dot): 
const dotContainer = document.querySelector('.dots');
slides.forEach((slide, i) => {
  const dot = `<button class="dots__dot" data-slide='${i}'></button>`;
  dotContainer.insertAdjacentHTML('beforeend', dot)
})



dotContainer.addEventListener('click', function (e) {
  const dot = e.target.closest('.dots__dot');

  if (e.target === dot) {
    currentSlide = Number(dot.dataset.slide);
    dotActive(currentSlide);
    gotoSlide(currentSlide);
  }
})


document.addEventListener('keydown', function (e) {
  e.key === 'ArrowRight' && nextSilde();
  e.key === 'ArrowLeft' && preSlide();
})



/* New knowledge */
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect(e); //DOCRECT
  // console.log(s1coords.top); // Chiều cao từ "đầu section1" đến phần 'màn ảnh nhìn thấy';
  console.log(s1coords.height); //Chiều cao từ "đầu trang web đến "chân section-1"
  // console.log(window.pageYOffset); //Chiều cao của phần "màn ảnh" bị mất; 
  // console.log(s1coords);

  //Old way to Scroll
  // window.scrollTo(s1coords.width + window.pageXOffset, s1coords.height);

  //new
  section1.scrollIntoView({ behavior: "smooth" });
})




// const alertH1 = function () {
//   alert('hello');
//   h1.removeEventListener('mouseenter', alertH1);
//}






function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomColor = () => `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
console.log(randomColor());


const h1 = document.querySelector('h1');
console.log(h1.querySelector('.hightlight'));
console.log(h1.childNodes); //Trã về text, commment,ele,... 
console.log(h1.children); //Trã về ELE con

console.log(h1);
