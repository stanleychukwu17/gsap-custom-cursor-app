import {gsap, Power3} from "gsap";

// Linear interpolation
const lerP = (a: number, b: number, n: number): number => {
    return (1-n) * a+n * b;

    //WTF IS LER.P?
    // Ler.p - A ler returns the value between two numbers at a specified, decimal midpoint
    // please check the video for more links regarding this lerP function
    // honestly, i still don't know what the hell a lerP function is, so you can use the link below to learn more on lerp
    // https://www.trysmudford.com/blog/linear-interpolation-functions/
}

// Gets the mouse position
const getMousePosition = (e:MouseEvent): {x: number, y:number} => {
    let posX:number = 0
    let posY:number = 0
    if (!e) e = window.event as MouseEvent;
    // or you can rewrite the above as = if (!e) e = window.event!;

    if (e.clientX || e.clientY) {
        posX = e.clientX
        posY = e.clientY
    }

    return {x: posX, y: posY}
};

// Get siblings
const getSiblings = (e:Element) => {
    // for collecting siblings
    let siblings:ChildNode[] = []

    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings
    }

    // first child of the parent node
    let sibling = e.parentNode.firstChild

    //collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            // remember, we only want the siblings of the Element received
            siblings.push(sibling)
        }

        // moves on to the next sibling
        sibling = sibling.nextSibling
    }

    return siblings
}


// this Cursor class can be used for any element that you'd like to use as a custom cursor
class Cursor {
    public cursor:HTMLDivElement;
    public item:NodeListOf<HTMLDivElement>; // this should have been 'items' instead of 'item'

    // previous: the previous position of mouse, current: the current position of the mouse, amt: the percentage of which to animate from previous to current
    public cursorConfigs = {
        x: {previous: 0, current: 0, amt:.1},
        y: {previous: 0, current: 0, amt:.1}
    }
    public mouse: {x:number, y:number} = {x:0, y:0} // the mouse position, updated everyTime the mouse position changes

    constructor(el: HTMLDivElement, mouse: {x: number, y: number}) {
        this.cursor = el
        this.cursor.style.opacity = '0'
        this.item = document.querySelectorAll('.Bsk-Ech') // these are the special links, anytime the mouse hovers on any of them, the .onScaleMouse() method is called so that the custom cursor can scale and display custom information
        this.mouse = mouse // the updated mouse position

        this.onMouseMoveEv()
        this.onScaleMouse() // calls the function to scale the mouse when ever we hover on any of the special links

        //@ts-ignore
        window.addEventListener("mousemove", this.onMouseMoveEv);
    }

    // a setter method responsible for setting the mouse position, also calls the .onMouseMoveEv() function
    updateMouse(mouse: {x:number, y:number}): void {
        this.mouse = mouse
        this.onMouseMoveEv()
        // console.log('calling from update mouse function', mouse)
    }

    // moves the custom cursor to the current position of the user mouse
    onMouseMoveEv (): void {
        // console.log(mouse, this, 'from her!')
        const mouse = this.mouse

        // update the configuration that will be used to animate the custom cursor
        this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x
        this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y

        // changes the cursor opacity, you know we made the custom-cursor opacity 0 in the constructor method
        gsap.to(this.cursor, {opacity: '1', duration: 1, ease: Power3.easeOut})

        /** 
            calls the windows.requestAnimationFrame() method, this method tells the browser that you wish to perform an animation and makes sure the browser calls a specified function to update an animation
            before the next browser repaint. the method takes a callback as an argument to be executed before the browser repaint is done.
        */
        requestAnimationFrame(() => this.Render())
    }

    // kills all the events added to the window object
    killAllEventListeners (): void {
        //@ts-ignore
        window.removeEventListener('mousemove', this.onMouseMoveEv)
    }

    // the method that scales the custom cursor. once the mouse comes over any of the custom links, then onScaleMouse() method is called.
    onScaleMouse() {
        const $base = this
        const cursorMedia: Element = $base.cursor.children[0]

        this.item.forEach((echElement, index) => {
            if (echElement.matches(':hover')) {
                /**
                    there is a small issue, if you refresh the page and your mouse is on the element.. the scale will not occur because we are relying on mousemove to detect if the mouse is on the element. but the below fixes it
                    i didn't even know much on .matches until today, use the links below to learn more about .matches() which is a javascript method.
                    https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                    https://www.w3schools.com/jsref/met_element_matches.asp
                */
                // this.scaleAnimation(cursorMedia, 1.2)
                // decided not to use it again, didn't see any difference and am not ready to debug
            }

            echElement.addEventListener('mouseenter', () => {
                this.showMedia4ThisElement(echElement) // shows the video
                this.scaleAnimation(cursorMedia, 1.2) // scales the cursor
                $base.cursor.classList.add('media-blend') // add the special filter to the this.cursor
            })

            echElement.addEventListener('mouseleave', () => {
                this.scaleAnimation(cursorMedia, 0)
                $base.cursor.classList.remove('media-blend')
            })
        })
    }

    // gsap handling the scaling up and down of the custom cursor
    scaleAnimation(el: Element, amt: number) {
        gsap.to(el, {duration: .6, scale: amt, ease: Power3.easeOut})
    }

    // shows the correct media(in this case, the correct video). i.e depending on the special-links been hovered on
    showMedia4ThisElement(el: Element) {
        const srcAttr = el.getAttribute('data-src-show')
        const theMediaToShow = document.querySelector(`[data-media="${srcAttr}"]`)
        const siblingsOfThisMedia = getSiblings(theMediaToShow!)

        // we bring the media to show to the front of the que
        gsap.set(theMediaToShow, {zIndex: 4, opacity: 1})

        // we take siblings to the back of the que
        siblingsOfThisMedia.forEach(s => {
            gsap.set(s, {zIndex: 1, opacity: 0})
        })
    }

    Render () {
        this.cursorConfigs.x.previous = this.mouse.x
        this.cursorConfigs.y.previous = this.mouse.y

        /**
            i feel like he over engineered the problem below, we could simply have done
            let x = this.cursorConfigs.x
            let y = this.cursorConfigs.y

            this.cursorConfigs.x.previous = lerP(x.previous, x.current, x.amt)
            this.cursorConfigs.y.previous = lerP(y.previous, y.current, y.amt)

            as simple as the above and readable as well, i've also tested the code and it works perfectly
        */
        for (const key in this.cursorConfigs) {
            //@ts-ignore
            this.cursorConfigs[key].previous = lerP(this.cursorConfigs[key].previous, this.cursorConfigs[key].current, this.cursorConfigs[key].amt)
        }

        // updates the css transform property of the custom cursor.. i tried using gsap to run this animation, but it was not smooth. So i decided to edit the transition property of the custom cursor
        // i.e transition: transform .1s linear; targets only the transform property, you know we are animating the opacity
        this.cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`
        // gsap.to(this.cursor, { x: `${this.cursorConfigs.x.previous}px`, y:`${this.cursorConfigs.y.previous}px`, duration: 0.01, ease: Power3.easeOut})

        requestAnimationFrame(() => this.Render())
    }
}

export {getMousePosition, lerP, getSiblings, Cursor}