'use strict'

(async function roboHoover() {
    // read inputs
    const input = await window.fetch('./input.txt')
                              .then(response => response.text());

    // split inputs
    const inputs = input.split('\n');
    const movements = inputs.slice(-1)[0];
    const points = inputs.slice(0, -1)
                             .map(line => line.split(' ').map(point => parseInt(point)));

    // create grid
    const gridX = points[0][0];
    const gridY = points[0][1];
    const emptyGrid = new Array(gridY).fill(null)
                             .map(() => new Array(gridX).fill(null));

    const grid = emptyGrid.map((row, y) => row.map((column, x) => new Point()));

    // mark dirt patches
    const dirtPatches = points.slice(2)
                              .map(dirtPatchCoordinates => {
                                  const dirtVal = 1;
                                  const x = dirtPatchCoordinates[0];
                                  const y = dirtPatchCoordinates[1];

                                  if (grid[y] && grid[y][x]) grid[y][x].dirt = dirtVal;
                                  return dirtVal;
                              });

    // initiate hoover
    const hooverStart = points[1];
    const hoover = new Hoover(hooverStart[0], hooverStart[1]);

    // run through all directions and keep a record of the path taken
    const path = movements.split('').map(direction => Object.assign({}, hoover.move(direction)));
    
    class Hoover {
        constructor(x = 0, y = 0) {
            if (x < 0 || x > gridX || y < 0 || y > gridY) throw new ValidationError('Not a valid starting position');

            this.x = x;
            this.y = y;
            this.dirt = grid[this.y][this.x].dirt;

            this.move = function(direction) {
                const currentX = this.x;
                const currentY = this.y;

                if (direction === 'N' && currentY < gridY) this.y = currentY + 1;
                if (direction === 'S' && currentY > 0) this.y = currentY - 1;

                if (direction === 'E' && currentX < gridX) this.x = currentX + 1;
                if (direction === 'W' && currentY > 0) this.x = currentX - 1; 

                this.dirt = this.dirt + grid[this.y][this.x].dirt;
                return this;
            }
        }
    }

    class Point {
        constructor() { 
            this.dirt = 0;
        }
    }

})();