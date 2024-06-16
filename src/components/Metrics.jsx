const Metrics = (props) => {
    return <>
        <div className="grid grid-cols-2 max-w-screen-xl w-full p-4 h-[45rem]">
            <div className="grid grid-cols-5 bg-gray-800 p-2 gap-2 overflow-auto w-[48rem]"> {/*sm:justify-self-center sm:m-4">*/}
                {props.images && props.images.map((image, idx) => (
                    <img key={idx} src={"data:image/png;base64,"+image} alt={""} className="w-36 h-36" />
                ))}
            </div>

            {/* Evaluation Results Card */}
            {/* Shamelessly copied from src: https://flowbite.com/docs/components/card/#crypto-card */}
            {/* <div className="flex justify-end mx-8"> */}
            <div className="justify-self-end w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700 h-[30rem]">
                <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Evaluation Metrics
                </h5>
                <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p>
                <ul className="my-4 space-y-3">
                    {props.metrics && Object.keys(props.metrics).map((metric_name, idx) => {
                        return <li key={idx}>
                            <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 group hover:shadow dark:bg-gray-600 dark:text-white">
                                <span className="flex-1 ms-3 whitespace-nowrap">{metric_name}: {props.metrics[metric_name]}</span>
                            </div>
                        </li>
                    })
                    }
                </ul>
            </div>
        </div>
    </>
}

export default Metrics
