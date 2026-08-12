import Navbar from "../modules/navbar";
import Silk from "../animations/silk-bg";
import Grainient from "../animations/grainient";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="fixed inset-0 -z-10">
        <div className="w-full h-full">
          <Grainient
            color1="#ffffff"
            color2="#bbcaff"
            color3="#79b1ff"
            timeSpeed={0.3}
            colorBalance={0.77}
            warpStrength={3.45}
            warpFrequency={3.9}
            warpSpeed={0.6}
            warpAmplitude={66}
            blendAngle={131}
            blendSoftness={1}
            rotationAmount={0}
            noiseScale={0}
            grainAmount={0}
            grainScale={4.2}
            grainAnimated={false}
            contrast={1.3}
            gamma={1.05}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.9}
          />
        </div>
      </div>
      <main className="p-3">{children}</main>

      <footer></footer>
    </>
  );
}
