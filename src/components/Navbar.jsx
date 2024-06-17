import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
	const routes = [
		{
			name: "Home",
			path: "/"
		},
		{
			name: "Evaluate Model",
			path: "/UploadImages"
		},
		{
			name: "About",
			path: "/About"
		}
	]

	
    const navigate = useNavigate();

	return <>
		{/* This Navbar component has been shamelessly stolen from flowbite website | src: https://flowbite.com/docs/components/navbar/#navbar-with-cta-button */}
		<nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-transparent">
			<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
				<a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
					<img src="https://cdn.imgbin.com/11/9/24/imgbin-swachh-bharat-abhiyan-government-of-india-open-defecation-india-black-sunglasses-9JBpDWsnA87R8Jwhb9ahgQmXc.jpg" className="h-8" alt="Flowbite Logo" />
					<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Swatch Bharat</span>
				</a>
				<div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
					<Link type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" to={"/UploadImages"}>Get started</Link>
					{/* Something wrong in this line */ }<button datacollapsetoggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
							<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
						</svg>
					</button>
				</div>
				<div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
					<ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
						{routes.map((route, idx) => (
							<Link key={idx} to={route["path"]} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">
								{route["name"]}
							</Link>
						))}
					</ul>
				</div>
			</div>
		</nav>
	</>
}

export default Navbar