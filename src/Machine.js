import {createMachine, assign} from "xstate";

const updateDistance = assign({
    distance: (context, event) => parseInt(event.data)
});

const updateAngle = assign({
    angle: (context, event) => parseInt(context.angle) + parseInt(event.data)
});

const updateScale = assign({
    scale: (context, event) => parseFloat(context.scale) + parseFloat(event.data)
});
export const boxMachine = createMachine({
    predictableActionArguments: true,
    id: 'box',
    initial: 'idle',
    context: {
        angle: 0,
        distance: 0,
        scale: 1,
        initialAngle: 0,
        initialDistance: 0,
        initialScale: 1
    },
    states: {
        idle: {
            on: {
                TRANSLATE: 'translation',
                ROTATE: 'rotation',
                SCALE: 'scale'
            },
            entry: [
                'resetAngle',
                'resetDistance',
                'resetScale'
                ]

    },
        translation: {
            on: {
                TRANSLATE: 'translation',
                ROTATE: 'rotation',
                SCALE: 'scale',
                RESET: 'idle'
            },
            entry: 'updateDistance'
        },
        rotation: {
            on: {
                TRANSLATE: 'translation',
                ROTATE: 'rotation',
                SCALE: 'scale',
                RESET: 'idle'
            },
            entry: 'updateAngle'
        },
        scale: {
            on: {
                TRANSLATE: 'translation',
                ROTATE: 'rotation',
                SCALE: 'scale',
                RESET: 'idle'
            },
            entry: 'updateScale'
        },
    },
    },
    {
    actions: { updateDistance , updateAngle, updateScale,
        resetAngle: assign({ angle: (context, event) => parseInt(context.initialAngle)}),
        resetDistance: assign({distance: (context,event) => context.initialDistance}),
        resetScale: assign({scale: (context,event) => context.initialScale})
    }
});

