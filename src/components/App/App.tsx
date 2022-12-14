import { useEffect, useState, useRef } from 'react';
import './app.scss';

//getMousePosition: gets the position of the mouse anytime the user moves their mouse
//Cursor: this is the class object that handles everything with how the custom cursor reacts to different elements on the page
import { getMousePosition, Cursor } from '../../functions/utils';

// import the video files
const website = require('../../assets/video/website.mp4')
const app = require('../../assets/video/app.mp4')
const brand = require('../../assets/video/brand.mp4')

// types
type mouseType = {x:number, y:number}

const App = () => {
    const [mouse, setMouse] = useState<mouseType>({} as mouseType) // stores the co-ordinates of the mouse position
    const cursor = useRef<Cursor>({} as Cursor) // Inside the useEffect, this.current will be an instanceof cursor

    // runs only when the coordinates of the mouse changes
    useEffect(() => {
        // you know everyTime the mouse position changes, this useEffect function is called. so we do not want to create a new instance everyTime, instead, we update the mouse values of the Cursor class
        if (cursor.current instanceof Cursor) {
            cursor.current.updateMouse(mouse)
        } else {
            cursor.current = new Cursor(document.querySelector('.cursor')!, mouse) // passes the .cursor, class to be used as our custom cursor
        }
    }, [mouse])

    useEffect(() => {
        // updates the mouse position
        const trackMouse = (ev:MouseEvent) => setMouse(getMousePosition(ev))

        // adds an event listener that allows us to know the current position of the user mouse..
        window.addEventListener("mousemove", trackMouse)

        return function cleanup() {
            window.removeEventListener("mouseenter", trackMouse)
            cursor.current.killAllEventListeners() // this .killAllEventListeners() method, kills all the event listeners added to the window object
        };
    }, [])

    return (
        <div className="AppMain">
            <div className="BskHeader">
                <div className="BskLogo">STANLEY TO!</div>
                <div className="BskLinks">
                    <div className="">Show reel</div>
                    <div className="">Menu</div>
                </div>
            </div>
            <div className="BskDownCvr">
                <div className="BskDown1">We make it happen!</div>
                <div className="BskDown2">
                    <div className="Bsk-Ech" data-src-show='website'>Websites</div>
                    <div className="Bsk-Ech" data-src-show='app'>Apps</div>
                    <div className="Bsk-Ech" data-src-show='brand'>Brands</div>
                </div>
            </div>


            {/* Cursor */}
            <div className="cursor">
                <div className="cursor-media">
                    <video data-media='website' src={website} preload="auto" autoPlay muted loop></video>
                    <video data-media='app' src={app} preload="auto" autoPlay muted loop></video>
                    <video data-media='brand' src={brand} preload="auto" autoPlay muted loop></video>
                </div>
            </div>
        </div>
    )
}

export default App;