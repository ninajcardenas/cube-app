import {styled} from "@stitches/react";


export const BaseButton =styled('button',{
    backgroundColor: 'white',
    borderRadius: '9999px',
    fontSize: '13px',
    border: '0',
    padding: '1vh 1.5vw',
    margin: '10px',
    marginRight: '5px',

    '&:hover': {
        backgroundColor: '#E7F0F3',
    },

});

export const BaseDiv = styled('div',{
    display: "flex",
    position: "absolute",
    top: "80%",
    left: "33%",
    zIndex: "10000",
    backgroundColor: '#16263E',
    padding: '30px',
    paddingLeft: '40px',
    paddingRight: '40px',
    borderRadius: '9999px',

});