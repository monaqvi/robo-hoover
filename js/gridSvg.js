'use strict'

const gridSVG = function(data, hoover) {
	var width = 50;
	var height = 50;
    
    const gridData = data.reverse()
                         .map((row, y) => row
                         .map((cell, x) => Object.assign({}, cell, 
                            {
                             xpos: width * x + 1,
                             ypos: height * y + 1
                            }
                         )));

    var gridSVG = d3.select('#grid')
        .append('svg')
        .attr('width', width * (gridData[0].length + 1) + 'px')
        .attr('height', height * (gridData.length + 1) + 'px');
	
    var row = gridSVG.selectAll('.row')
        .data(gridData.reverse())
        .enter().append('g')
        .attr('class', 'row');
        
    var column = row.selectAll('.square')
        .data(d => d)
        .enter().append('rect')
        .attr('class','square')
        .attr('x', d => d.xpos)
        .attr('y', d => d.ypos)
        .attr('width', width)
        .attr('height', height)
        .style('fill', d => {
            if (d.x === hoover.x && d.y === hoover.y) return 'grey';
            if (d.dirt > 0) return 'brown';
            return 'white';
        })
        .style('stroke', '#222');
};
