'use client'
import { Player, Controls } from "@lottiefiles/react-lottie-player";
export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div className="h-screen w-screen flex justify-center items-center"> <Player
    autoplay
    loop
    src="https://lottie.host/6805faec-01b0-4b56-ae7a-23bf0071ef5c/uGFFr6WHIO.json"
    style={{ height: "300px", width: "300px" }}
  ></Player></div>
  }