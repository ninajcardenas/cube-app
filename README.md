<div align="center">

![Vention](https://mma.prnewswire.com/media/1925111/Vention_Vention_announces_MachineCloud__the_first_of_its_kind_so.jpg?p=facebook)
# 3D Cube Application


[About](#about) •
[Frameworks & Libraries](#frameworks-and-libraries) •
[Installation](#installation) •
[Instructions](#instructions) •
[Project Status](#project-status)


## About

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). 
The aim of this project is to manipulate a 3D object built within `three-react-fiber's` Canvas using the powerful state management library XState.
Made by Nina Cardenas following the instruction guide provided by Vention. 

### Frameworks and Libraries

React.js\
Three.js\
react-three-fiber\
drei\
xstate\
material-UI


## Installation

</div>

### Run local
In a Terminal window, run the following commands:
````
git clone https://github.com/ninajcardenas/cube-app
cd cube-app
npm install
npm start
````

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

<div align="center">

## Instructions

</div>

1. To orbit/zoom/pan around the 3D scene, use mouse left and right-click, as shown below:

![Orbit Controls](gifs/pan-gif.gif)

2. The 3D cube in the middle of the scene can be manipulated by the following commands:

<kbd> Scale</kbd> : Scale the existing 3D cube by a multiplier. The scale command accepts integer and float values.

<n><kbd> Rotate</kbd> : Rotate the 3D cube along its x-axis by a specified angle in degrees. Accepts positive and negative integers.

<kbd> Translate</kbd> : Translate the 3D cube by an integer position along its x-axis.

<n><kbd> Reset</kbd> : Reset 3D cube properties and state to original values.



3. Click on the desired button to activate a dialog form and input the property value. See example below:

<div align="center">

![Scale Reset](gifs/scale-reset.gif)

</div>

## Project Status

- [x] Implement R3F 3D world and mesh element
- [x] Adapt XState state machine to manage app controls
- [x] Create toolbar with text input
- [x] Add README.md
- [ ] Add 3D animations of cube for each command
- [ ] Add intro page
- [ ] Add Transform control visual helpers for commands
  - [ ] Integrate it with XState
