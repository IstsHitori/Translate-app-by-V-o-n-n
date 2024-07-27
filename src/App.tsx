import Segment from "./components/Segment";
import Translation from "./components/Translation";

export default function App() {
  return (
    <main className="bg-[url('./public/hero_img.jpg')] min-h-screen bg-no-repeat bg-cover grid place-items-center md:grid-cols-2 grid-cols-1 gap-5">
      <Translation />
      <Segment />
    </main>
  )
}
