function Rover(name, x, y, direction) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.oldX = x;
    this.oldY = y;
    this.direction = direction;
    this.updatePosition = function (x, y) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x = x;
        this.y = y;
    }
    this.arrow = function () {
        switch (this.direction) {
            case 'N':
                return "/\\";
            case 'E':
                return ">";
            case 'S':
                return "\\/";
            case 'W':
                return "<";
        }
    }
}

var NUMBER_OF_COLS = 8,//TODO ser definido pela tela
    NUMBER_OF_ROWS = 8,//TODO ser definido pela tela
    BLOCK_SIZE = 100,
    PADDING_LEFT = 15,
    PADDING_TOP = 97,
    BLOCK_COLOUR_1 = '#d94e13',
    BLOCK_COLOUR_2 = '#333333';

var rovers = {};

var canvas = null,
    roverImg = null,
    ctx = null,
    canvas = null;

function getBlockColour(y, x) {
    var color;

    if (y % 2) {
        color = (x % 2 ? BLOCK_COLOUR_1 : BLOCK_COLOUR_2);
    } else {
        color = (x % 2 ? BLOCK_COLOUR_2 : BLOCK_COLOUR_1);
    }

    return color;
}

function drawBlock(iRowCounter, iBlockCounter) {
    ctx.fillStyle = getBlockColour(iRowCounter, iBlockCounter);

    ctx.fillRect(iRowCounter * BLOCK_SIZE, (NUMBER_OF_ROWS - 1 - iBlockCounter) * BLOCK_SIZE,
        BLOCK_SIZE, BLOCK_SIZE);

    ctx.stroke();
}

function getRoverByName(roverName) {
    var rover = rovers[roverName];
    if(rover === undefined) {
        return undefined;
    }
    return rover;
}

function drawPiece(rover) {
    var previousRover = getRoverByName(rover.name, false);
    if(previousRover !== undefined) {
        drawBlock(previousRover.oldX, previousRover.oldY);
    }

    rovers[rover.name] = rover;
    var px = rover.x * BLOCK_SIZE;
    var py = (NUMBER_OF_ROWS - 1 - rover.y) * BLOCK_SIZE;

    ctx.drawImage(roverImg,
        0, 0,
        BLOCK_SIZE, BLOCK_SIZE,
        px, py,
        BLOCK_SIZE, BLOCK_SIZE);

    ctx.font = "25px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(rover.name + rover.direction + " " + rover.arrow(), px + BLOCK_SIZE / 2 - PADDING_LEFT, py + PADDING_TOP);
}

function drawRow(iRowCounter) {
    var iBlockCounter;

    // Draw 8 block left to right
    for (iBlockCounter = 0; iBlockCounter < NUMBER_OF_ROWS; iBlockCounter++) {
        drawBlock(iRowCounter, iBlockCounter);
    }
}

function drawBoard() {
    var y;

    for (y = 0; y < NUMBER_OF_ROWS; y++) {
        drawRow(y);
    }

    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0,
        NUMBER_OF_ROWS * BLOCK_SIZE,
        NUMBER_OF_COLS * BLOCK_SIZE);
}

function newRover() {
    //TODO validar tamanho pra nao quebrar o canvas
    var roverName = document.getElementById('name').value;
    if(roverName === undefined || roverName == '') {
        alert('Inform the name of rover to add')
        return;
    }
    //TODO validar board
    var x = parseInt(document.getElementById('x').value);
    if(x === undefined || x < 0) {
        alert('Inform X coordinate')
        return;
    }
    //TODO validar board
    var y = parseInt(document.getElementById('y').value);
    if(y === undefined || y < 0) {
        alert('Inform Y coordinate')
        return;
    }
    //TODO validar direction
    var direction = document.getElementById('direction').value;
    if(direction === undefined || direction == '') {
        alert('Inform direction (N, E, S or W)')
        return;
    }
    drawPiece(new Rover(roverName, x, y, direction));
}

function move() {
    var roverName = document.getElementById('name').value;
    if(roverName === undefined || roverName == '') {
        alert('Inform the name of rover to Move')
        return;
    }
    var rover = getRoverByName(roverName);
    if(rover === undefined) {
        alert('Invalid Rover name');
        return;
    }
    var move = document.getElementById('move').value;
    switch (move) {
        case 'L':
            //TODO fazer como array na ordem e ir somando para R e subtraindo para L
            switch (rover.direction) {
                case 'N':
                    rover.direction = 'W';
                    break;
                case 'E':
                    rover.direction = 'N';
                    break;
                case 'S':
                    rover.direction = 'E';
                    break;
                case 'W':
                    rover.direction = 'S';
                    break;
            }
            rover.updatePosition(rover.x, rover.y);
            drawPiece(rover);
            break;
        case 'R':
            //TODO fazer como array na ordem e ir somando para R e subtraindo para L
            switch (rover.direction) {
                case 'N':
                    rover.direction = 'E';
                    break;
                case 'E':
                    rover.direction = 'S';
                    break;
                case 'S':
                    rover.direction = 'W';
                    break;
                case 'W':
                    rover.direction = 'N';
                    break;
            }
            rover.updatePosition(rover.x, rover.y);
            drawPiece(rover);
            break;
        case 'M':
            switch (rover.direction) {
                case 'N':
                    rover.updatePosition(rover.x, rover.y + 1);
                    break;
                case 'E':
                    rover.updatePosition(rover.x + 1, rover.y);
                    break;
                case 'S':
                    rover.updatePosition(rover.x, rover.y - 1);
                    break;
                case 'W':
                    rover.updatePosition(rover.x - 1, rover.y);
                    break;
            }
            drawPiece(rover);
            break;
        default:
            alert('Invalid move');
    }
}

function draw() {
    canvas = document.getElementById('mars');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        BLOCK_SIZE = canvas.height / NUMBER_OF_ROWS;

        drawBoard();

        roverImg = new Image();
        roverImg.src = 'rover-mini.jpg';
    } else {
        alert("Canvas not supported!");
    }
}
