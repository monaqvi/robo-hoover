'use strict'

(async function roboHoover() {
    // read inputs
    const input = await window.fetch('./input.txt')
                              .then(response => response.text());

    // split inputs
    const inputs = input.split('\n');
    const movements = inputs.slice(-1);
    const points = inputs.slice(0, -1)
                             .map(line => line.split(' ').map(point => parseInt(point)));

    // create grid
    const gridX = points[0][0];
    const gridY = points[0][1];
    const emptyGrid = Array(gridY).fill(null)
                             .map(() => Array(gridX).fill(null));

    const grid = emptyGrid.map((row, y) => row.map((column, x) => new Point()));

    // initiate hoover
    const hooverStart = points[1];
    const hoover = new Hoover(hooverStart[0], hooverStart[1]);

    // mark dirt patches
    const dirtPatches = points.slice(2)
                              .map(dirtPatchCoordinates => {
                                  const dirtVal = 1;
                                  const x = dirtPatchCoordinates[0];
                                  const y = dirtPatchCoordinates[1];

                                  if (grid[y] && grid[y][x]) grid[y][x].dirt = dirtVal;
                                  return dirtVal;
                              });

    // run through all directions and output results

    
    class Hoover {
        constructor(x = 0, y = 0) {
            if (x < 0 || x > gridX || y < 0 || y > gridY) throw new ValidationError('Not a valid starting position');

            this.x = x;
            this.y = y;
            this.dirt = 0;
            this.move = function(direction) {
                const currentX = this.x;
                const currentY = this.y;

                if (direction === 'N' && currentY < gridY) this.y = currentY + 1;
                if (direction === 'S' && currentY > 0) this.y = currentY - 1;

                if (direction === 'E' && currentX < gridX) this.x = currentX + 1;
                if (direction === 'W' && currentY > 0) this.x = currentX - 1; 
            }
        }
    }

    class Point {
        constructor() { 
            this.dirt = 0;
        }
    }

})();