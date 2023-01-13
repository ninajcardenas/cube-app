import {styled} from "@stitches/react";


export const BaseButton =styled('button',{
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '9999px',
    fontSize: '13px',
    border: '0',
    padding: '1.5vh 2vw',
    margin: '10px',
    marginRight: '5px',

    '&:hover': {
        backgroundColor: '#E7F0F3',
    },

});

export const BaseDiv = styled('div',{
    textAlign: 'center',
    margin: 'auto',
    display: "flex",
    position: "absolute",
    left: '50%',
    transform: 'translate(-50%, -50%)',
    top: '90%',
    zIndex: "10000",
    backgroundColor: '#16263E',
    padding: '2vh',
    paddingLeft: '2vh',
    paddingRight: '2vh',
    borderRadius: '9999px',

});