// const canvas = new fabric.Canvas('canvas', {
//     height: 800,
//     width: 800,
// });

// canvas.renderAll();

// fabric.Image.fromURL("https://i.ibb.co/nz5jXdJ/image1.jpg",
//     (img) => {
//         canvas.backgroundImage = img
//         canvas.renderAll()
//     })

const initCanvas = (id) => {
    return new fabric.Canvas('canvas', {
        height: 2000,
        width: 2000,
        selection: false   //remove automatic draw on canvas
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (img) => {
        canvas.backgroundImage = img
        canvas.renderAll()
    })
}

const canvas = initCanvas('canvas');
let mousePressed = false;
let currentMode;
const modes = {
    pan: 'pan',
    drawing: 'drawing'
}
let color = '#000000';

const setColorListener = () => {
    const picker = document.getElementById('colorPicker');
    picker.addEventListener('change', (event) => {
        console.log(event.target.value);
        color = '#' + event.target.value
        canvas.freeDrawingBrush.color = color
        canvas.renderAll()
    })
}

const clearCanvas = (canvas) => {
    canvas.getObject().forEach((i) => {
        if (i !== canvas.backgroundImage) {
            canvas.remove(i)
        }
    })
}

const toggleMode = (mode) => {
    if (mode === modes.pan) {
        if (currentMode === modes.pan) {
            currentMode = '';
            canvas.isDrawingMode = false;
            canvas.renderAll()
        } else {
            currentMode = modes.pan
        }
    } else if (mode === modes.drawing) {
        if (currentMode === modes.drawing) {
            currentMode = '';
            canvas.isDrawingMode = false;
            canvas.renderAll()
        } else {
            //brush
            //canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
            //canvas.freeDrawingBrush = new fabric.SprayBrush(canvas)
            // canvas.freeDrawingBrush.color = 'red'
            // canvas.freeDrawingBrush.width = 15
            currentMode = modes.drawing
            //update brush color
            canvas.freeDrawingBrush.color = color;
            canvas.isDrawingMode = true;   //for drawing
            canvas.renderAll()
        }
    }
}

const setPanEvents = (canvas) => {
    //mouse:over
    canvas.on('mouse:move', (event) => {
        // console.log(e);
        if (mousePressed && currentMode === modes.pan) {
            canvas.setCursor("crosshair");
            canvas.renderAll()
            const mEvent = event.e;
            const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
            canvas.relativePan(delta);
        }
        // else if (mousePressed && currentMode === modes.drawing) {
        //     canvas.isDrawingMode = true;   //for drawing
        //     canvas.renderAll()
        // }
    })

    //keep track of mouse down/up
    canvas.on('mouse:down', (event) => {
        mousePressed = true;
        if (currentMode === modes.pan) {
            canvas.setCursor("crosshair");
            canvas.renderAll()
        }
    })
    canvas.on('mouse:up', (event) => {
        mousePressed = false;
        canvas.setCursor("default");
        canvas.renderAll()
    })
}
setBackground("https://i.ibb.co/nz5jXdJ/image1.jpg", canvas)

setPanEvents(canvas)

setColorListener()

clearCanvas(canvas)

