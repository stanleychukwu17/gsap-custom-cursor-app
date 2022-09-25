// Linear interpolation
const lerP = (a: number, b: number, n: number): number => {
    return (1-n) * a+n * b;
}

// Gets the mouse position
const getMousePosition = (e:MouseEvent): {x: number, y:number} => {
    let posX = 0
    let posY = 0
    if (!e) e = window.event as MouseEvent;
    // or you can rewrite the above as = if (!e) e = window.event!;

    if (e.clientX || e.clientY) {
        posX = e.clientX
        posY = e.clientY
    }

    return {x: posX, y: posY}
};


// Get siblings
const getSiblings = (e:HTMLElement) => {
    // for collecting siblings
    let siblings: HTMLElement|ChildNode[] = []

    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings
    }

    // first child of the parent node
    let sibling = e.parentNode.firstChild
    //collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling)
        }

        sibling = sibling.nextSibling
    }

    return siblings
}

// this Cursor class can be used for any element that you'd like to use as a custom cursor
class Cursor {
    public cursor:HTMLDivElement;
    public item:NodeListOf<HTMLDivElement>;
    public cursorConfigs = {
        x: {previous: 0, current: 0, amt:.2},
        y: {previous: 0, current: 0, amt:.2}
    }
    public onMouseMoveEv: Function;

    constructor(el: HTMLDivElement, mouse: {x: number, y: number}) {
        this.cursor = el
        this.cursor.style.opacity = '0'
        this.item = document.querySelectorAll('.Bsk-Ech')

        // updates the cursor position every time the mouse moves
        this.onMouseMoveEv = () => {
            this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x
            this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y
            this.cursor.style.opacity = '1'

            console.log('now moving')
            /** 
                calls the windows.requestAnimationFrame() method, this method tells the browser that you wish to perform an animation and makes sure the browser calls a specified function to update an animation
                before the next browser repaint. the method takes a callback as an argument to be executed before the repaint is done.
                e.g
                    let request;
                    const performAnimation = () => {
                        request = window.requestAnimationFrame(performAnimation)
                    }
                    requestAnimationFrame(performAnimation)
            */
            requestAnimationFrame(this.Render)
        }


        // assign the mouse function to update the mouse position
        window.addEventListener("mousemove", (ev:MouseEvent) => {
            console.log(this)
            this.onMouseMoveEv()
        });
    }

    Render () {

    }
}

export {getMousePosition, lerP, getSiblings, Cursor}