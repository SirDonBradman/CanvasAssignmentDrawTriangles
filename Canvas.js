class Point {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.set = function(X, Y) {
            this.x = X;
            this.y = Y;
        }
        this.reset = function() {
            this.x = 0;
            this.y = 0;
        }
        this.equals = function(point) {
            if (this.x === point.x && this.y === point.y)
                return true;
            else
                return false;
        }
    }
}
<<<<<<< HEAD
let movePadding = 10;
=======
let moveFactor = 10,
    movePadding = 10;
>>>>>>> 9dcea2a20e449702704e9eddee8205bacb0cfbac
class Triangle {
    constructor(A, B, C, color) {
        this.p1 = A;
        this.p2 = B;
        this.p3 = C;
        this.color = color;
        this.isInViewPort = function() {
            return this.p1.x > movePadding && this.p1.y > movePadding && this.p2.x > movePadding && this.p2.y > movePadding && this.p3.x > movePadding && this.p3.y > movePadding &&
                this.p1.x + movePadding < canvas.width && this.p2.x + movePadding < canvas.width && this.p3.x + movePadding < canvas.width &&
                this.p1.y + movePadding < canvas.height && this.p2.y + movePadding < canvas.height && this.p3.y + movePadding < canvas.height;
        }
        this.offsetPoints = function(offset) {
            this.p1.x += offset.x;
            this.p1.y += offset.y;

            this.p2.x += offset.x;
            this.p2.y += offset.y;

            this.p3.x += offset.x;
            this.p3.y += offset.y;
        }
        this.isPointInPlane = function(P) {
            let A = this.p1;
            let B = this.p2;
            let C = this.p3;
            // Compute vectors        
            function vec(from, to) { return [to.x - from.x, to.y - from.y]; }
            var v0 = vec(A, C);
            var v1 = vec(A, B);
            var v2 = vec(A, P);
            // Compute dot products
            function dot(u, v) { return u[0] * v[0] + u[1] * v[1]; }
            var dot00 = dot(v0, v0);
            var dot01 = dot(v0, v1);
            var dot02 = dot(v0, v2);
            var dot11 = dot(v1, v1);
            var dot12 = dot(v1, v2);
            // Compute barycentric coordinates
            var invDenom = 1.0 / (dot00 * dot11 - dot01 * dot01);
            var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
            var v = (dot00 * dot12 - dot01 * dot02) * invDenom;
            // Check if point is in triangle
            return (u >= 0) && (v >= 0) && (u + v < 1);
        }
    }
}

function getTriangleContainingPoint(point) {
    let found = false;
    let result;
    trianglesOnCanvas.forEach(function(element) {
        let res = element.isPointInPlane(point);
        if (res) {
            console.log('Point lies in triangle', point, element);
            found = true;
            result = element;
        }
    });
    return result;
}

var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.addEventListener('mousedown', handleMouseDown, false);
canvas.addEventListener('mouseup', handleMouseUp, false);
canvas.addEventListener('mousemove', handleMouseMove, false);
canvas.addEventListener('dblclick', handleDoubleClick, false);

var context = canvas.getContext('2d');

var mouseDownStarted = false;
var currentTriangle;

var trianglesOnCanvas = [];

let initial = new Point();
let Current = new Point();

var Actions = {
    drawTriangle: "drawTriangle",
    moveTriangle: "moveTriangle"
};
var actionRequested = Actions.drawTriangle;

function handleMouseDown(event) {
    initial = new Point();
    initial.set(event.pageX, event.pageY);
    let triangle = getTriangleContainingPoint(initial);
    if (typeof triangle !== 'undefined') {
        currentTriangle = triangle;
        actionRequested = Actions.moveTriangle;
    }
    mouseDownStarted = true;
}

function handleMouseUp(event) {
    mouseDownStarted = false;
    if (actionRequested === Actions.drawTriangle) {
        Current = new Point();
        Current.set(event.pageX, event.pageY);
        if (initial.equals(Current))
            return;

        let third = new Point();
        third.set(initial.x, Current.y);
        let triangle = new Triangle(initial, Current, third, getRandomColor());
        drawTriangle(triangle);
        trianglesOnCanvas.push(triangle);
        console.log(trianglesOnCanvas);
    }
    actionRequested = Actions.drawTriangle;
}

<<<<<<< HEAD

function handleMouseMove(event) {
    if (actionRequested === Actions.moveTriangle) {
        let offsetValues = new Point();
        offsetValues.set((event.pageX - initial.x), (event.pageY - initial.y));
=======
function handleMouseMove(event) {
    if (actionRequested === Actions.moveTriangle) {
        let offsetValues = new Point();
        offsetValues.set((event.pageX - initial.x) / moveFactor, (event.pageY - initial.y) / moveFactor);
>>>>>>> 9dcea2a20e449702704e9eddee8205bacb0cfbac
        currentTriangle.offsetPoints(offsetValues);
        if (currentTriangle.isInViewPort()) {
            console.log(offsetValues, currentTriangle);
            clearCanvasFromCode();
            render();
<<<<<<< HEAD
            initial = new Point();
            initial.set(event.pageX, event.pageY);
=======
>>>>>>> 9dcea2a20e449702704e9eddee8205bacb0cfbac
        } else {
            offsetValues.x = -offsetValues.x;
            offsetValues.y = -offsetValues.y;
            currentTriangle.offsetPoints(offsetValues);
        }
    }
}

function drawTriangle(triangle) {
    context.beginPath();
    context.moveTo(triangle.p1.x, triangle.p1.y);
    context.lineTo(triangle.p2.x, triangle.p2.y);
    context.lineTo(triangle.p3.x, triangle.p3.y);
    context.lineTo(triangle.p1.x, triangle.p1.y);

    context.stroke();
    context.fillStyle = triangle.color;
    context.fill();
}

function handleDoubleClick() {
    initial = new Point();
    initial.set(event.pageX, event.pageY);
    let triangle = getTriangleContainingPoint(initial);
    if (typeof triangle !== 'undefined') {
        const index = trianglesOnCanvas.indexOf(triangle);
        trianglesOnCanvas.splice(index, 1);
        clearCanvasFromCode();
        render();
        console.log(trianglesOnCanvas);
    }
}

function render() {
    trianglesOnCanvas.forEach(function(element) {
        drawTriangle(element);
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function clearCanvasFromCode() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
    trianglesOnCanvas = [];
    context.clearRect(0, 0, canvas.width, canvas.height);
    console.log(trianglesOnCanvas);
}
