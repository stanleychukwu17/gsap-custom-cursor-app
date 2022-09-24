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


export {getMousePosition, lerP, getSiblings}