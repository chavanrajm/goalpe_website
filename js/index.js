function changeSecondBlockContent() {
    const width = window.innerWidth;
    const secondBlockP = document.getElementById('second-block-p');

    if (!secondBlockP) return;

    if (width <= 514) {
        secondBlockP.innerHTML =
            'Fantasy football lets you become the manager.<br/><br/>Build your dream team of real players - their real match stats earn you points.<br/><br/>Every pass, goal, and save moves you up the ranks.';
    }
}

changeSecondBlockContent();

let resizeTimeout;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(changeSecondBlockContent, 150);
});
