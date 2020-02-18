'use strict'

(async function roboHoover() {
    // read inputs
    const input = await window.fetch('./input.txt')
                              .then(response => response.text());

    const inputs = input.split('\n');
    const movements = inputs.slice(-1);
    const points = inputs.slice(0, -1)
                             .map(line => line.split(' ').map(point => parseInt(point)));

    const gridX = points[0][0];
    const gridY = points[0][1];
    const emptyGrid = Array(gridY).fill(null)
                             .map(() => Array(gridX).fill(null));

    const grid = emptyGrid.map((row, y) => row.map((column, x) => new Point()));




    

    // create grid

    // pre-process grid

    // run through all directions and output results
    class Point {
        constructor() { 
            this.dirt = 0;
        }
    }

})();