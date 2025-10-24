//------ Hero section animation ------//

document.addEventListener("DOMContentLoaded", () => {
    const typingText = document.getElementById("typing-text");
    const cursor = document.getElementById("cursor");
    const words = ["Backend Developer", "University Student"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        const displayedText = currentWord.substring(0, charIndex);
        typingText.textContent = displayedText;

        if (!isDeleting && charIndex < currentWord.length) {
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 300);
        }
    }

    type();
});

//------ Skill bar animation ------//
const skillBars = document.querySelectorAll(".skill__bar");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const bar = entry.target;
            if (entry.isIntersecting) {
                bar.classList.add("active");
            } else {
                setTimeout(() => {
                    bar.classList.remove("active");
                }, 100);
            }
        });
    }, {
        threshold: 1,
    }
);

skillBars.forEach((bar) => observer.observe(bar));

const sections = document.querySelectorAll('section[id]');
const menuItems = document.querySelectorAll('.header__navbar li');

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const menuItem = document.querySelector(`.header__navbar a[href="#${id}"] li`);
        if (entry.isIntersecting) {
            menuItems.forEach(item => item.classList.remove('active'));
            if (menuItem) menuItem.classList.add('active');
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => sectionObserver.observe(section));