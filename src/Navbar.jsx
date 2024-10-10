import { useEffect, useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [total , setTotal] = useState(0)
    const cart = useSelector(state => state.food.cart)
    useEffect(() => {
        setTotal(cart.reduce((acc , total) => acc + total.quantity , 0))
    } , [cart])

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-background shadow-md  text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={"/"} className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-primary">ShopStore</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/products"}>Products</Link>
                            <Link to={"/categories"}>Categories</Link>
                            <Link to={"/about"}>About</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Link to={'/cart'}>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-6 w-6" />
                            <span className="bg-destructive w-5 h-5 text-xs rounded-full flex items-center justify-center absolute top-0 right-0 text-background">
                                {total}
                            </span>
                        </Button>
                        </Link>
                        <div className="sm:hidden ml-2">
                            <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</Link>
                        <Link to="/products" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Products</Link>
                        <Link to="/categories" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Categories</Link>
                        <Link to="/about" onClick={closeMobileMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}