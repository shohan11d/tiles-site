'use client'
import Marquee from "react-fast-marquee";

export default function Work() {
    return (
        <div className="mt-12">
            <Marquee className="" gradient={true} onFinish={() => { console.log(2) }} direction="right" speed={400} pauseOnHover={true} >
                <span className="mx-4">logo 1</span>
                <span className="mx-4">logo 2</span>
                <span className="mx-4">logo 3</span>
                <span className="mx-4">logo 4</span>
                <span className="mx-4">logo 5</span>
            </Marquee>
        </div>
    );
}
