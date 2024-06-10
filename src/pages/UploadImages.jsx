import { useRef, useState } from "react"
import Features from "../components/Features";
import { useNavigate } from "react-router-dom";


const base_url = "https://73d5-34-150-205-221.ngrok-free.app"


/* Shamelessly copied from stackoverflow, src: https://stackoverflow.com/questions/18650168/convert-blob-to-base64 */
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}


/* Testing */
/* Shamelessly copied from stackoverflow, src: https://stackoverflow.com/questions/12597364/how-to-save-a-javascript-object-to-file */
// function downloadObject(obj, filename) {
//     var blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json;charset=utf-8" }).slice(2, -1);
//     var url = URL.createObjectURL(blob);
//     var elem = document.createElement("a");
//     elem.href = url;
//     elem.download = filename;
//     document.body.appendChild(elem);
//     elem.click();
//     document.body.removeChild(elem);
// }
/* ============ */


const UploadImages = () => {
    const navigate = useNavigate();

    const fileInputField = useRef(null);
    const [files, setFiles] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch(`${base_url}/post-imgs`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "any"
            },
            body: JSON.stringify({ "imgs": JSON.stringify(files) })
        })
        let data = await response.json()
        console.log(data);  // Returns {'status': 'success|failure'}

        if (data['status'] === 'success')
            navigate("/EvaluateModel")
    }

    // Shamelessly copied from Copilot
    const handleFileUpload = (event) => {
        event.preventDefault()
        const imgArray = Array.from(fileInputField.current.files);
        const imgs = imgArray.map(async (file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            file: await blobToBase64(file) // URL.createObjectURL(file)
        }));

        imgs.map((val) => val.then(data => {
            let img = [data];
            setFiles(prevImgs => ([...prevImgs, ...img]))
        }))

        // ---------------- Debug (IDK how setState hook works internally) --------------------
        console.log(files);
        // ------------------------------------------------------------------------------------
    }


    return <section className="dark:bg-gray-900">
        <form action="/EvaluationResult" onSubmit={handleSubmit}>
            <h1 className="text-center p-10 text-4xl bg-gradient-to-r from-blue-500 via-yellow-500 to-green-500 text-transparent bg-clip-text font-black">Evaluate the <span>Inception-ResNet-V2</span> model by providing your own dataset</h1>  {/* Classes are added by me, so it mi8 not be responsive */}
            <div className="flex items-center justify-center max-w-screen-xl w-full mx-auto p-4 flex-wrap">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" ref={fileInputField} multiple onChange={handleFileUpload} />
                </label>
            </div>

            {/* Display Images */}
            <label htmlFor="">Display Images</label>
            <div className="w-full max-w-screen-xl mx-auto px-auto md:py-8 flex flex-wrap">
                {files && files.map((file, idx) => (
                    <div key={idx}>
                        <img className="h-40 w-40 rounded-lg p-2" src={file['file']} alt={file['name']} />
                    </div>
                ))}
            </div>


            <div className="flex flex-col items-center justify-center">
                <button type="submit" className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                    <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Start Model Evaluate
                    </span>
                </button>
            </div>
        </form>

        <Features />
    </section>
}

export default UploadImages
