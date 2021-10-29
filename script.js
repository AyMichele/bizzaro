$(function () {

  function change_page() {
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



  const removeNonNumber = (toRemove) => {
    return number = toRemove = toRemove.replace(/\D/g, '');
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

  const putPoint = (number) => {
    let arrNumber = number.split('').reverse();
    for (let i = 0; i < arrNumber.length; i++) {
      if (i % 3 === 0 && i > 1) {
        arrNumber.splice(i, 0, '.');
      }
    }
    let pointArray = arrNumber.reverse();
    return pointArray.join('');
  }

  $('#rate-num').text()
  const calculateTotal = () => {
    let money = parseInt(removeNonNumber($('#amount-num').text()));
    let interest = $('#interest-num').text() === "5.1%" ? 510 : 730;
    let interestPlus = money * interest / 100
    let total = money += interestPlus / 100
    let divider = 0;
    switch ($('#years').text()) {
      case '1J.':
        divider = 12;
        break;
      case '2J.':
        divider = 24;
        break;
      case '3J.':
        divider = 36;
        break;
    }

    console.log(total * 100 / divider);
    parseInt(total * 100  / divider)
    $('#total-num').text(Dinero({ amount: parseInt(total * 100), currency: 'EUR' }).toFormat('$0,0.00'));
    $('#rate-num').text(Dinero({ amount: parseInt(total * 100  / divider), currency: 'EUR' }).toFormat('$0,0.00'));
  }

  let creditSlider = document.getElementById('credit-slider');
  let creditAmount = document.getElementById('credit-amount')
  let amount = document.getElementById('amount-num');
  creditAmount.innerHTML = "Kreditbetrag " + Dinero({ amount: creditSlider.value * 100, currency: 'EUR' }).toFormat('$0,0.00');
  amount.innerHTML = creditSlider.value + "€";
  const interestNum = document.getElementById('interest-num');


  creditSlider.oninput = function () {
    creditAmount.innerHTML = "Kreditbetrag " + Dinero({ amount: this.value * 100, currency: 'EUR' }).toFormat('$0,0.00');
    amount.innerHTML = putPoint(this.value) + "€";
    interestNum.innerHTML = parseInt(this.value) > 15000 ? "5.1%" : " 7.3%";
    calculateTotal();
  };


  const runningTime = document.getElementById('running-time');
  const timeInDays = document.getElementById('time-days');

  $('#increment').click(function () {
    let years = parseInt($('#years').text());
    if (years < 3) {
      ++years;
      $('#years').text(years + "J.");
      $('#time-days').text(years + "J.");
    }
    let money = parseInt(removeNonNumber($('#amount-num').text()));
    let interest = $('#interest-num').text() === "5.1%" ? 510 : 730;
    let interestPlus = money * interest / 100
    let total = money += interestPlus / 100
    let divider = 0;
    switch ($('#years').text()) {
      case '1J.':
        divider = 12;
        break;
      case '2J.':
        divider = 24;
        break;
      case '3J.':
        divider = 36;
        break;
    }
    const finalRate = total / divider * 100;
    console.log(finalRate)
    $('#rate-num').text(Dinero({ amount: parseInt(finalRate), currency: 'EUR' }).toFormat('$0,0.00'))
  })

  $('#decrement').click(function () {
    let years = parseInt($('#years').text());
    if (years > 1) {
      --years;
      $('#years').text(years + "J.")
      $('#time-days').text(years + "J.");
    }
    let money = parseInt(removeNonNumber($('#amount-num').text()));
    let interest = $('#interest-num').text() === "5.1%" ? 510 : 730;
    let interestPlus = money * interest / 100
    let total = money += interestPlus / 100
    let divider = 0;
    switch ($('#years').text()) {
      case '1J.':
        divider = 12;
        break;
      case '2J.':
        divider = 24;
        break;
      case '3J.':
        divider = 36;
        break;
    }
    const finalRate = total / divider * 100;
    console.log(finalRate)
    $('#rate-num').text(Dinero({ amount: parseInt(finalRate), currency: 'EUR' }).toFormat('$0,0.00'));

  });


  $(".ask-button").on('click', function () {
    const amount = "Kreditbetrag: " + $('#amount-num').text();
    const interest = "eff. Zinssatz: " + $('#interest-num').text() + "%";
    const rate = "Monatliche Rate: " + $('#rate-num').text();
    const time = "Kreditlaufzeit: " + $('#time-days').text();
    const total = "Gesamtbetrag: " + $('#total-num').text();
    const fullText = amount + "\n" + interest + "\n" + rate + "\n" + time + "\n" + total
    // Store it in the local storage
    sessionStorage.setItem('selected', fullText);
    document.getElementById('text-area').value = fullText;
    console.log(localStorage.getItem('selected'))
  });

});
