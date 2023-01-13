import React, {useEffect, useRef} from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { interpret} from "xstate";
import {BaseDiv, BaseButton} from './Buttons'
import {ReactComponent as Logo} from './logo/vention-logo.svg';
import {boxMachine} from './Machine.js';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";




const service = interpret(boxMachine).onTransition((state) => {
     console.log(state);
});

service.start();

const CommandOptions = () => {
    const [openRotate, setOpenRotate] = React.useState(false);
    const [openTranslate, setOpenTranslate] = React.useState(false);
    const [openScale, setOpenScale] = React.useState(false);
    const [input, setInput] = React.useState(0);


    const handleCloseRotate = () => {
        setOpenRotate(false);
        service.send({type: "ROTATE", data: input});
        setInput(0);
    };

    const handleCloseTranslate = () => {
        setOpenTranslate(false);
        service.send({type: "TRANSLATE", data: input});
        setInput(0);
    };

    const handleCloseScale = () => {
        setOpenScale(false);
        service.send({type: "SCALE", data: input});
        setInput(0);
    };

    return (
        <div>
        <BaseDiv>
            <Logo />

            <div>
                <BaseButton variant="contained" onClick={() => setOpenScale(true)} >
                    Scale
                </BaseButton>
                <Dialog open={openScale} onClose={() => setOpenScale(false)} >
                    <DialogTitle>Scale</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please set scale multiplier:
                        </DialogContentText>
                        <TextField
                            value={input}
                            onInput={e => setInput(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="SCALE"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenScale(false)}>Cancel</Button>
                        <Button onClick={handleCloseScale}>Enter</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <BaseButton variant="contained" onClick={() => setOpenRotate(true)} >
                    Rotate
                </BaseButton>
                <Dialog open={openRotate} onClose={() => setOpenRotate(false)} >
                    <DialogTitle>Rotate</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please set rotate angle in degrees:
                        </DialogContentText>
                        <TextField
                            value={input}
                            onInput={e => setInput(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="ROTATE"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenRotate(false)}>Cancel</Button>
                        <Button onClick={handleCloseRotate}>Enter</Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div>
                <BaseButton variant="contained" onClick={() => setOpenTranslate(true)} >
                    Translate
                </BaseButton>
                <Dialog open={openTranslate} onClose={() => setOpenTranslate(false)} >
                    <DialogTitle>Translate</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please set translation distance in x
                        </DialogContentText>
                        <TextField
                            value={input}
                            onInput={e => setInput(e.target.value)}
                            autoFocus
                            margin="dense"
                            id="TRANSLATE"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenTranslate(false)}>Cancel</Button>
                        <Button onClick={handleCloseTranslate}>Enter</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <BaseButton onClick={() => service.send('RESET')}>Reset</BaseButton>
        </BaseDiv>
        </div>
    );
};

function translateBox(self,posDelta) {
    self.current.position.x += posDelta;
}

function rotateBox(self,angle) {
    let radians =  angle * (Math.PI /180);
    self.current.rotation.x += radians;
}

function scaleBox(self,scale) {
    self.current.scale.set(scale, scale, scale);

    console.log(self.current.scale);
}


function Box(props) {
    const ref = useRef();

    useEffect(() => {
        const subscription = service.subscribe((state) => {
            if (state.matches("idle")) {
                ref.current.position.x = 0;
                ref.current.position.y = 0;
                ref.current.position.z = 0;
                ref.current.rotation.x = 0;
                ref.current.scale.set(1,1,1);
            }
            if (state.matches("translation")) {
                translateBox(ref,state.context.distance);
            }
            if (state.matches("rotation")) {
                rotateBox(ref,state.context.angle);
            }
            if (state.matches("scale")) {
                scaleBox(ref,state.context.scale);
            }
        });  return subscription.unsubscribe;
    }); // note: service should never change
  return (
      <mesh ref={ref} {...props} >
        <boxGeometry attach="geometry" />
        <meshLambertMaterial attach="material" color="lightblue"/>
      </mesh>
  )
}


function Plane() {
    return (
        <mesh position={[0,0,0]} rotation={[-Math.PI/2,0,0]}>
            <planeGeometry attach="geometry" args={[100,100]} />
           <meshPhongMaterial
               attach="material" opacity={0.1} transparent/>
        </mesh>
    )
}



export default function App() {
  return (
      <div style={{ width: "100vw", height: "100vh", backgroundColor: '#16263E' }}>

      <Canvas shadows={"soft"} camera={{position: [3,3.5,3.5], fov: 100, near:0.01} }>
          <OrbitControls />
          <Stars />
          <ambientLight intensity={0.5} />
          <spotLight position={[10,15,10]} angle={0.3}/>
          <pointLight position={[-5, -5, 5]} intensity={3} />
          <pointLight position={[-3, -3, 2]} />
              <Box quaternion={[0,0,0,1]}/>
              <Plane />
              <gridHelper args={[100, 100, "blue", "lightblue"]} />

      </Canvas>
          <CommandOptions />
      </div>
  );
}
