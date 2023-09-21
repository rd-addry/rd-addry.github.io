// RESPONSIVE HEADER
function respHeader() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
respHeader();

// HIGHLIGHTER SIDEBAR
const links = document.querySelectorAll("li");
const sections = document.querySelectorAll("section");
const options = {
  root: document,
  rootMargin: "-50% 0px",
  threshold: 0,
};
const HIGHLIGHT_CLASS = "highlight";
const tableOfConentsMap = [...sections].reduce(
  (acc, section, i) => ({
    ...acc,
    [section.id]: links[i],
  }),
  {}
);

let selectedId = sections[0].id;

function removeHighlight(id) {
  tableOfConentsMap[id].classList.remove(HIGHLIGHT_CLASS);
}

function addHighlight(id) {
  tableOfConentsMap[id].classList.add(HIGHLIGHT_CLASS);
}

function onObserve(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { id } = entry.target;
      removeHighlight(selectedId);
      addHighlight(id);
      selectedId = id;
    }
  });
}

const observer = new IntersectionObserver(onObserve, options);

sections.forEach((section) => {
  observer.observe(section);
});

// PARALLAX HEADER
function handleParallax() {
  const scrollValue = window.scrollY;
  const introBod = document.querySelector(".banner-bod");

  introBod.style.transform = `translateY(${scrollValue * 1.4}px)`;
}

window.addEventListener("scroll", handleParallax);

handleParallax();

// RANDOM TEXT LOOP (deactivate dulu)
function initRandomTextLoop() {
  const resolver = {
    resolve: function (options, callback) {
      const resolveString =
        options.resolveString || options.element.getAttribute('random-resolver');
      const combinedOptions = { ...options, resolveString };

      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      }

      function doRandomiserEffect(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;

        let iterations = options.iterations;

        setTimeout(() => {
          if (iterations >= 0) {
            const nextOptions = { ...options, iterations: iterations - 1 };

            if (iterations === 0) {
              element.textContent = partialString;
            } else {
              element.textContent =
                partialString.substring(0, partialString.length - 1) +
                randomCharacter(characters);
            }

            doRandomiserEffect(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        }, options.timeout);
      }

      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const characters = options.characters;
        const offset = options.offset;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = { ...options, partialString };

        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = { ...options, offset: offset + 1 };

          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === 'function') {
            callback();
          }
        });
      }

      doResolverEffect(combinedOptions, callback);
    },
  };

  const strings = ['web.', 'graphics.','products.','interiors.'];

  let counter = 0;

  const options = {
    offset: 0,
    timeout: 8,
    iterations: 2,
    characters: ['!', '@', '#', '$', '%', '^', '&', '*', 't', 'u'],
    resolveString: strings[counter],
    element: document.querySelector('[random-resolver]'),
  };

  function callback() {
    setTimeout(() => {
      counter++;

      if (counter >= strings.length) {
        counter = 0;
      }

      let nextOptions = { ...options, resolveString: strings[counter] };
      resolver.resolve(nextOptions, callback);
    }, 3000);
  }

  resolver.resolve(options, callback);
}

// Initialize the random text loop
initRandomTextLoop();

//DROP DOWN ABOUT

function myCollapsibleX() {
 var coll = document.getElementsByClassName("collapsible-about");
 var i;

for (i = 0; i < coll.length; i++) {
 coll[i].addEventListener("click", function() {
   this.classList.toggle("active");
   var content = this.nextElementSibling;
   if (content.style.maxHeight){
     content.style.maxHeight = null;
   } else {
     content.style.maxHeight = content.scrollHeight + "px";
   } 
 });
}
}
myCollapsibleX();


// PROJECTS GALLERY
function projectsGallery() {

let modals = document.querySelectorAll(".modal");
let buttons = document.querySelectorAll(".myBtn");
let spans = document.querySelectorAll(".close");

buttons.forEach(function(button, index) {
 button.onclick = function() {
   modals[index].style.display = "block";
 }
});

spans.forEach(function(span, index) {
 span.onclick = function() {
   modals[index].style.display = "none";
 }
});

window.onclick = function(event) {
 modals.forEach(function(modal) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 });
}
}
projectsGallery()
