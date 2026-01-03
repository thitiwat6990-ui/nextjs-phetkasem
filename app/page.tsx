import Header from "./header/page";
import Home from "./home/page";

export default function Mainpage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <main>
        <Home/>
      </main>
    </div>
  );
}
