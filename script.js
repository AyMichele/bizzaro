$(function () {
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
