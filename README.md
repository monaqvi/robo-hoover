# robo-hoover
A virtual robot that cleans up a virtual room in virtually no time!

## Introduction

This is a program that navigates a imaginary robotic hoover (much like a [Roomba](https://en.wikipedia.org/wiki/Roomba)) through an equally imaginary room based on:

* room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* an initial hoover position (X and Y coordinates like patches of dirt)
* driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively) 

## Goal

The goal of the program is to take the room dimensions, the locations of the dirt patches, the hoover location and the driving instructions as input and to then output the following:

* The final hoover position (X, Y)
* The number of patches of dirt the robot cleaned up

## Deployment

This program runs in the browser. The easiest way to run it is to clone the repository (whether through git or by downloading the zip file), and running a static web server in the downloaded folder. On Mac OS, the easiest way to do this is by running the following command while inside the folder and navigating:
```
python -m SimpleHTTPServer 8000
```
Then, navigate to localhost:8000 in a modern browser (preferably Chrome)

A hosted version of this site, run with the sample inputs provided (see below) can be found at: https://github.com/monaqvi/robo-hoover

## Input

Program input will be received in a file with the format described here. You can process it however you like.

The file will be named `input.txt` and reside in the same directory as your executable program / web page.

Example:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```

* the first line holds the room dimensions (X Y), separated by a single space (all coordinates will be presented in this format)
* the second line holds the hoover position
* subsequent lines contain the zero or more positions of patches of dirt (one per line)
* the next line then always contains the driving instructions (at least one)

## Output

Program output should be printed to the standard output (STDOUT) of the terminal (or equivalent in the browser, console.log())

* The first line of your program output should display the X and Y coordinates marking the position of the hoover after processing all commands.
* The second line of the program output should display the number of patches of dirt the robot cleaned up

Example (matching the input above):

```
1 3
1
```

## Constraints

* The room is be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input
* Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run
* The hoover is always on - there is no need to enable it.

## Edge-cases

Some scenarios to consider:

* Starting position (X, Y) on a dirt patch should immediately hoover it
* Starting position (X, Y) outside the room dimensions should raise an error
* Driving into a wall has no effect (the robot skids in place)
* If no driving instructions are provided, the vaccuum does nothing but the output is still reported