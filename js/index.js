'use strict'

window.onload = async function() {
    // run hoover program
    const { grid, hoover } = await roboHoover();

    // create ui from outputs of roboHoover
    document.getElementById('results').innerText = `${hoover.x} ${hoover.y}\n${hoover.totalDirt}`;
    document.getElementById('grid').innerText = '';
    gridSVG(grid, hoover);
};
