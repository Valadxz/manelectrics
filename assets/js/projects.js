document.addEventListener("DOMContentLoaded", function() {
    const projects = document.querySelectorAll(".project");
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightbox-img");
    const caption = document.getElementById("lightbox-caption");
    const progressFill = document.getElementById("progress-fill");
  
    const lbTitle = document.getElementById("lb-title");
    const lbText  = document.getElementById("lb-text");
  
    const closeBtn = document.querySelector(".close-btn");
    const prevBtn  = document.querySelector(".nav-btn.prev");
    const nextBtn  = document.querySelector(".nav-btn.next");
  
    // Imágenes por experiencia en assets/images/proyectos/
    const galleries = {
      exp1: ["assets/images/proyectos/exp1-1.JPG","assets/images/proyectos/exp1-2.JPG","assets/images/proyectos/exp1-3.JPG","assets/images/proyectos/exp1-4.JPG"],
      exp2: ["assets/images/proyectos/exp2-1.JPG","assets/images/proyectos/exp2-2.JPG","assets/images/proyectos/exp2-3.JPG","assets/images/proyectos/exp2-4.JPG"],
      exp3: ["assets/images/proyectos/exp3-1.JPG","assets/images/proyectos/exp3-2.JPG","assets/images/proyectos/exp3-3.JPG","assets/images/proyectos/exp3-4.JPG"],
      exp4: ["assets/images/proyectos/exp4-1.JPG","assets/images/proyectos/exp4-2.JPG","assets/images/proyectos/exp4-3.JPG","assets/images/proyectos/exp4-4.JPG"],
      exp5: ["assets/images/proyectos/exp5-1.JPG","assets/images/proyectos/exp5-2.JPG","assets/images/proyectos/exp5-3.JPG","assets/images/proyectos/exp5-4.JPG"]
    };
  
    // Descripciones fijas por experiencia (panel izquierdo)
    const descriptions = {
      exp1: {
        title: "Estación Puente Blanco",
        text: "Participación en la obra complementaria para la puesta en marcha del Trolebús Chalco–Santa Martha, realizando sistemas de obra civil, accesorios de catenaria y acometidas eléctricas en la Estación Puente Blanco."
      },
      exp2: {
        title: "Central de Abastos",
        text: "Construcción del banco de ductos e interconexión eléctrica de la subestación fotovoltaica en los techos de la Central de Abastos, incluyendo pozos de visita, perforación dirigida y caseta de control con equipos F6 Metalclad."
      },
      exp3: {
        title: "Estación Ote. 50",
        text: "Ejecución de trabajos eléctricos y de obra civil para la puesta en marcha del Trolebús Chalco–Santa Martha, con instalación de accesorios de catenaria y acometidas eléctricas en la Estación Oriente 50."
      },
      exp4: {
        title: "Talleres y Cocheras",
        text: "Desarrollo de instalaciones eléctricas y sistemas de control en los talleres y cocheras del Trolebús Chalco–Santa Martha, garantizando operación segura, eficiente y conforme a normativas CFE y NOM."
      },
      exp5: {
        title: "Perforación Dirigida y caseta de control de equipos F6 Metalclad",
        text: "Perforación dirigida para ductos subterráneos y caseta de control con equipos F6 Metalclad, integrando maniobra y protección de media tensión conforme a CFE/NOM para operación segura y continua."
    }
    };
  
    let currentKey = "";
    let currentGallery = [];
    let currentIndex = 0;
  
    projects.forEach(project => {
      project.addEventListener("click", () => {
        currentKey = project.getAttribute("data-gallery");
        currentGallery = galleries[currentKey];
        currentIndex = 0;
        openLightbox();
      });
    });
  
    function openLightbox() {
      // Set texto fijo a la izquierda
      lbTitle.textContent = descriptions[currentKey].title;
      lbText.textContent  = descriptions[currentKey].text;
  
      lightbox.classList.add("active");
      updateImage();
    }
  
    function updateImage() {
      img.classList.remove("active");
      setTimeout(() => {
        img.src = currentGallery[currentIndex];
        caption.textContent = `Imagen ${currentIndex + 1} de ${currentGallery.length}`;
        progressFill.style.width = ((currentIndex + 1) / currentGallery.length) * 100 + "%";
        img.classList.add("active");
      }, 140);
    }
  
    function closeLightbox() { lightbox.classList.remove("active"); }
    function nextImage() { currentIndex = (currentIndex + 1) % currentGallery.length; updateImage(); }
    function prevImage() { currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; updateImage(); }
  
    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);
    closeBtn.addEventListener("click", closeLightbox);
  
    // Cerrar al hacer clic fuera
    lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });
  
    // Teclado
    document.addEventListener("keydown", e => {
      if (!lightbox.classList.contains("active")) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft")  prevImage();
      if (e.key === "Escape")     closeLightbox();
    });
  });
  
