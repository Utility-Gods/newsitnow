import Nav from "./app/Nav";
import SideBar from "./app/SideBar";

const Layout = (props) => (
  <div>
    <Nav />
    <div class="flex flex-1 gap-3">
      <div class="flex flex-shrink-0 flex-grow-0">
        <SideBar />
      </div>
      <div class="flex flex-1 p-6 items-center justify-center">
        {props.children}
      </div>
    </div>
  </div>
);

export default Layout;
