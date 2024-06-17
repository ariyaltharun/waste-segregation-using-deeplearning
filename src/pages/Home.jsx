import { useState } from "react"
import { Link } from "react-router-dom"

export default () => {
    // src: https://floatui.com/components/heroes
    const [isVideoPoppedUp, setVideoPopUp] = useState(false)

    return (
        <section className="dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 md:px-8 xl:flex">
                <div className="space-y-5 max-w-2xl mx-auto text-center xl:text-left">
                    <h1 className="text-4xl dark:text-green-500 font-extrabold mx-auto md:text-5xl">
                        Waste Segregation Using Deep Learning 
                    </h1>
                    <p className="max-w-xl mx-auto xl:mx-0 dark:text-cyan-400">
                        Waste Segreation using Deep Learning, where we use Inception-Resnet-V2 model to classify different types/classes of waste.
                        This website is for Evaluating the performance of Inception-Resnet-V2 model on user provided dataset.
                        {/* Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae. */}
                    </p>
                    <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0 xl:justify-start">
                        <Link className="flex items-center justify-center gap-x-2 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex" to={"/UploadImages"}>
                            Get Started
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>
                </div>
                <div className="flex-1 max-w-xl mx-auto mt-14 xl:mt-0">
                    <div className="relative">
                        <img src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2018/10/03/738918-waste-segregation-shutterstock.jpg" className="rounded-lg" alt="" />
                        {/* <button className="absolute w-16 h-16 rounded-full inset-0 m-auto duration-150 bg-blue-500 hover:bg-blue-600 ring-offset-2 focus:ring text-white"
                            onClick={() => setVideoPopUp(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 m-auto">
                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                            </svg>
                        </button> */}
                    </div>
                </div>
            </div>
            {
                isVideoPoppedUp ? (
                    <div className="fixed inset-0 w-full h-full flex items-center justify-center">
                        <div className="absolute inset-0 w-full h-full bg-black/50" onClick={() => setVideoPopUp(false)}></div>
                        <div className="px-4 relative">
                            <button
                                className="w-12 h-12 mb-5 rounded-full duration-150 bg-gray-800 hover:bg-gray-700 text-white"
                                onClick={() => setVideoPopUp(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 m-auto">
                                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                                </svg>
                            </button>
                            <video className="rounded-lg w-full max-w-2xl" controls autoPlay={true}>
                                <source src="https://raw.githubusercontent.com/sidiDev/remote-assets/main/FloatUI.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                ) : ""
            }
        </section>
    )
}


// const Home = () => {
//     return <h1>This is HOME Page</h1>
// }


// export default Home