import { NavLink } from "react-router-dom";
import { FaBars, FaDribbble, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Modal from "./Modal";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	// navItems
	const navItems = [
		{ path: "/", link: "Home" },
		{ path: "/blogs", link: "Blogs" },
		{ path: "/about", link: "About" },
		{ path: "/contact", link: "Contact" },
		{ path: "/services", link: "Services" },
	];

	// Modal details
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<header className="bg-black text-white fixed top-0 left-0 right-0">
			<nav className="p-4 max-w-7xl mx-auto flex justify-between items-center">
				<a href="/" className="text-xl font-bold">
					Design<span className="text-orange-500">DK</span>
				</a>

				{/* Nav items for large devices */}
				<ul className="md:flex gap-12 text-lg hidden">
					{navItems.map((item) => (
						<li key={item.path} className="text-white">
							<NavLink
								className={({ isActive, isPending }) =>
									isActive ? "active" : isPending ? "pending" : ""
								}
								to={item.path}
							>
								{item.link}
							</NavLink>
						</li>
					))}
				</ul>

				{/* Menu icons */}
				<div className="text-white lg:flex gap-4 items-center hidden">
					<a href="/" className="hover:text-orange-500">
						<FaFacebook />
					</a>
					<a href="/" className="hover:text-orange-500">
						<FaDribbble />
					</a>
					<a href="/" className="hover:text-orange-500">
						<FaTwitter />
					</a>
					<button
						onClick={openModal}
						className="bg-orange-500 px-6 py-2 font-medium rounded hover:bg-white hover:text-orange-500 transition-all duration-200 ease-in"
					>
						Sign In
					</button>
				</div>

				{/* Modal component is here */}
				<Modal isOpen={isModalOpen} onClose={closeModal} />

				{/* Mobile menu button */}
				<div className="md:hidden">
					<button onClick={toggleMenu} className="cursor-pointer">
						{isMenuOpen ? (
							<FaXmark className="w-5 h-5" />
						) : (
							<FaBars className="w-5 h-5" />
						)}
					</button>
				</div>
			</nav>

			{/* Menu items only for mobile */}
			<div>
				<ul
					className={`md:hidden gap-12 text-lg block space-y-4 px-4 py-6 mt-14 bg-white ${
						isMenuOpen
							? "fixed top-0 left-0 w-full transition-all ease-out duration-150"
							: "hidden"
					}`}
				>
					{navItems.map((item) => (
						<li key={item.path} className="text-black">
							<NavLink onClick={toggleMenu} to={item.path}>
								{item.link}
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</header>
	);
};

export default Navbar;
