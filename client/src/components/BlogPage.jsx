import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";
import CategorySelection from "./CategorySelection";

const BlogPage = () => {
	const [blogs, setBlogs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 12; // blogs per page
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [activeCategory, setActiveCategory] = useState(null);

	useEffect(() => {
		const fetchBlogs = async () => {
			let url = `http://localhost:3000/blogs?page=$${currentPage}&limit=${pageSize}`;

			// filter by category
			if (selectedCategory) {
				url += `&category=${selectedCategory}`;
			}
			const res = await fetch(url);
			const data = await res.json();
			setBlogs(data);
		};

		fetchBlogs();
	}, [currentPage, pageSize, selectedCategory]);

	// page changing button
	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategory(category);
		setCurrentPage(1);
		setActiveCategory(category);
	};

	return (
		<div>
			{/* Category section */}
			<div>
				<CategorySelection
					onSelectCategory={handleCategoryChange}
					selectedCategory={selectedCategory}
					activeCategory={activeCategory}
				/>
			</div>

			{/* Blog cards section */}
			<div>
				<BlogCard
					blogs={blogs}
					currentPage={currentPage}
					selectedCategory={selectedCategory}
					pageSize={pageSize}
				/>
			</div>

			{/* Pagination section */}
			<div>
				<Pagination
					onPageChange={handlePageChange}
					currentPage={currentPage}
					blogs={blogs}
					pageSize={pageSize}
				/>
			</div>
		</div>
	);
};

export default BlogPage;
