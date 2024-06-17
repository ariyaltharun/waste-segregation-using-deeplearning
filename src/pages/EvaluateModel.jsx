import { useState } from "react"
import Features from "../components/Features"
import Metrics from "../components/Metrics"

// const base_url = "http://localhost:5000"
const base_url = "https://3cf5-104-198-139-211.ngrok-free.app"


const EvaluateModel = () => {
    // ----------------------- Experiments ----------------------------------- //
    // const data = {
    //     "Accuracy": 100.00,
    //     "Loss": 0.45,
    //     "F1-Score": 234,
    //     "Precision": 2345.2342,
    //     "Recall": 234.2023,
    // }
    // ----------------------------------------------------------------------- //    
    const [disable, setDisable] = useState(false)
    const [display, setDisplay] = useState(false)
    const [images, setImages] = useState()
    const [metrics, setMetrics] = useState()
    const [progress, setProgress] = useState(0)


    const handleStart = async (event) => {
        setDisable(true)
        event.preventDefault()

        // Send request to server
        const response = await fetch(`${base_url}/evaluate-model`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "any"
            },
        })

        // Get reponse from server
        let data = await response.json()

        console.log(data);
        // Update state variables
        setImages(data["images"]) // Lets see later
        setMetrics(data["metrics"]) // Lets see later
    }

    const updateProgress = async (event) => {
        event.preventDefault()
        // Send request to server
        let res = await fetch(`${base_url}/get-inference-time-and-no-images`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "any"
            },
        })
        let data = await res.json();

        let time_per_image = data["inference_time_per_image"]; // in seconds
        let total_images = data["total_images"];
        let total_time = time_per_image * total_images;
        let cur_time = 0; // in seconds
        
        var interval_id = setInterval(() => {
            cur_time += 1;
            let percentage = Math.floor((cur_time / total_time) * 100)
            percentage = (percentage >= 100) ? 100 : percentage
            setProgress(percentage)
            if (percentage === 100) {
                clearInterval(interval_id)
                setDisplay(true)
            }
        }, 1000)
    }

    return <section className="dark:bg-gray-900">
        <div className="max-w-screen-xl w-full mx-auto p-8 items-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">Evaluation Results</h1>
            <button disabled={disable} onClick={(e) => { handleStart(e); updateProgress(e) }} className="relative inline-flex items-center justify-center p-0.5 mt-8 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Start Model Evaluation
                </span>
            </button>

            {!display &&
                <>
                    <div className="max-w-screen-xl w-full mx-auto mt-8 p-8 items-center h-96 border-4 border-cyan-300 border-dashed flex justify-center">
                        <div className="text-4xl text-gray-400 font-bold relative">
                            <p className="text-center">After model evaluation</p>
                            <p>Evaluation Results will be deplayed</p>
                        </div>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div className="h-6 bg-blue-600 rounded-full dark:bg-blue-500 text-center" style={{ width: progress + "%" }}>{progress + "%"}</div>
                    </div>
                </>
            }

            {display && <Metrics metrics={metrics} images={images}/>}
        </div>

        {/* Place Holder: Website page is not filling, so only i used this */}
        <Features />
    </section>
}


export default EvaluateModel
