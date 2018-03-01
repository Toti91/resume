import './main.scss';
import './public/fontawesome/fontawesome-all';

window.onload = () => {
    document.getElementById('resume').classList.add('wiggle');
}

window.MoveProgress = (name, amount) => {
    let bar = document.getElementById('bar');
    let tech = document.getElementById('tech-name');

    bar.style.width = amount + '%';
    bar.style.backgroundColor = getColorAtScalar(amount, 100);

    if (amount !== 0) {
        bar.innerHTML = amount + '%';
        tech.innerHTML = name;
    }
    else {
        bar.innerHTML = '';
        tech.innerHTML = '';
    }
}

function getColorAtScalar(n, maxLength) {
    var n = n * 240 / (maxLength);
    return 'hsl(' + n + ',100%,50%)';
}

window.ScrollTo = (name) => {
    let oTop = document.getElementById(name).offsetTop;
    ScrollToResolver(document.documentElement, oTop, 400);
}

function ScrollToResolver(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function () {
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        ScrollToResolver(element, to, duration - 10);
    }, 10);
}

