import { Outlet } from "@tanstack/react-router";
 
export const Layout =() => {
    return (
        <div>
            <header>
                <h1>E-commerce  Store  </h1>
            </header> 
            <Outlet/>
            <footer>
                <p>© 2026 GSG-G5</p>
            </footer>   
        </div>
    );
}