

  const sections = document.querySelectorAll('.panel');
  const puntos = document.querySelectorAll('.punto');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - section.clientHeight / 2) {
        current = section.getAttribute('id');
      }
    });

    puntos.forEach(punto => {
      punto.classList.remove('active');
      if (punto.getAttribute('href') === `#${current}`) {
        punto.classList.add('active');
      }
    });
  });


