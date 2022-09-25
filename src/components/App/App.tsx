import { useEffect, useState } from 'react';
import './app.scss';
// import { motion } from 'framer-motion';
// import { gsap } from 'gsap';

import { getMousePosition } from '../../functions/utils';


// import the video files
const website = require('../../assets/video/website.mp4')
const app = require('../../assets/video/app.mp4')
const brand = require('../../assets/video/brand.mp4')


// types
type mouseType = {x:number, y:number}

const App = () => {
    const [mouse, setMouse] = useState<mouseType>({} as mouseType)

    useEffect(() => {

        // adds an event listener that allows us to know the current position of the user mouse.. if this was a production app, i would have removed the event when the user left the page
        window.addEventListener("mousemove", (ev:MouseEvent) => {
            // updates the mouse position
            setMouse(getMousePosition(ev))
        })

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
                    <div className="">Websites</div>
                    <div className="">Apps</div>
                    <div className="">Brands</div>
                </div>
            </div>


            {/* Cursor */}
            <div className="cursor">
                <div className="cursor-media">
                    <video src={website} preload="auto" autoPlay muted loop id="websites"></video>
                    <video src={app} preload="auto" autoPlay muted loop id="apps"></video>
                    <video src={brand} preload="auto" autoPlay muted loop id="branding"></video>
                </div>
            </div>
        </div>
    )
}

export default App;