    //Navigation bar shrink on scroll function
    var prevScrollpos = window.pageYOffset;
    var header = document.getElementById("headerbar");
    var headerHeight = header.offsetHeight;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("headerbar").style.top = "0";
    } else {
        document.getElementById("headerbar").style.top = `${6-headerHeight}px`;
    }
    prevScrollpos = currentScrollPos;
    }

    console.log(headerHeight)