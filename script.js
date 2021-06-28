$(function () {
    
  function change_page(){
    window.location.href = "contact.html";
  } 
    const inViewport = (entries, observer) => {
        entries.forEach(entry => {
          entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
        });
      };
      
      const Obs = new IntersectionObserver(inViewport);
      const obsOptions = {}; //See: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options
      
      // Attach observer to every [data-inviewport] element:
      const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
      ELs_inViewport.forEach(EL => {
        Obs.observe(EL, obsOptions);
      });


    let open = false;
    const rotate = (deg, ele) => {
        $(ele).css({ WebkitTransform: 'rotate(' + deg + 'deg)' }).css('transition', 'ease-in-out').css('transition', '0.3s');
        $(ele).css({ '-moz-transform': 'rotate(' + deg + 'deg)' }).css('transition', 'ease-in-out').css('transition', '0.3s');
    }

    $(".operator").on('click', function () {
        switch (open) {
            case false:
                $('.navbar-mobil').css('height', '260px').css('transition', 'ease-in-out').css('transition', '0.5s');
                rotate(360, ".operator");
                $(this).text("\u03A7");
                open = !open;
                break;
            case true:
                $('.navbar-mobil').css('height', '50px').css('transition', 'ease-in-out').css('transition', '0.5s');
                rotate(-360, ".operator");
                $(this).text("\u2261");
                open = !open;
                break;
        }

    });

    
});
