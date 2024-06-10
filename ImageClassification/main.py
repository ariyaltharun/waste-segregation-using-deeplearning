import numpy as np
import cv2
import requests
import logging
import skimage


logging.basicConfig(
    level=logging.NOTSET,
    format="[ %(levelname)s ] %(message)s "
)


def is_object_detected(img: np.ndarray) -> bool:
    # Creating bin image using thresholding
    threshold_img = img < 0.5

    # Dilate the image
    dilated_img = threshold_img
    for _ in range(5):
        dilated_img = skimage.morphology.dilation(dilated_img)

    # Use connected components to detect objects
    labeled_img = skimage.measure.label(dilated_img)
    regions = skimage.measure.regionprops(labeled_img)
    
    # Create bounding box
    for props in regions:
        minr, minc, maxr, maxc = props.bbox
        bx = (minc, maxc, maxc, minc, minc)
        by = (minr, minr, maxr, maxr, minr)
        # plt.plot(bx, by, '-r', linewidth=0.5)
        
    # return labeled_img
    print(len(regions))
    return True if len(regions) != 0 else False


def main():
    ############### This url's are just for testing, i will put this url in .env file ############
    # This urls might be dynamic, so please put correct url while running the code
    ESP32_IP = "http://192.168.98.183:8082"
    CAMERA_URL = "http://192.168.98.117:8080/video"
    MODEL_API_URL = "https://584e-35-188-122-240.ngrok-free.app/predict"

    cap = cv2.VideoCapture(CAMERA_URL)

    while cap.isOpened():
        ret, frame = cap.read()
        
        if ret:
            print("Something went wrong with Camera")
            break
        
        #################################### Process the frames ################################
        # Shape (1080, 1920, 3) | (H, W, C)
        # frame = frame[14:34, 56:34, :] # Croping: frame[top:bottom, left:right, channel] (Haven't confired yet)
        frame = frame[400:800, 300:900, :]

        
        # 2. Detect if any object if present

        
        # 3. If any object is detected, then send that frame to server
        # 4. Get the predict from the server
        data = {
            "frame": frame.tolist()  # Why are you converting into list? Reason: ndarray is not serializable (I got this error) but list works fine
        }
        response = requests.post(MODEL_API_URL, json=data)
        response_json_data = response.json()
        prediction = response_json_data["prediction"]

        ## Debug
        logging.info(response_json_data)
        frame = cv2.putText(
            img=frame, 
            text=f"Prediction: {prediction}", 
            org=(100, 100), 
            fontFace=cv2.FONT_HERSHEY_SIMPLEX, 
            fontScale=2.0,
            color=(255, 0, 0), 
            thickness=2, 
            lineType=cv2.LINE_AA
        )

        # 5. Trigger the ESP32 to operate (Push the waste to right bin)
        match prediction:
            case 0:
                res = requests.post(ESP32_IP + "/wetWaste")
                logging.info(res)
            case 1:
                res = requests.post(ESP32_IP + "/dryWaste")
                logging.info(res)
        

        cv2.imshow("Test", frame)
        if cv2.waitKey(30) == ord('q'):
            break

    
    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
