import os
import sys
import json
from ultralytics import YOLO
import contextlib
import cv2

@contextlib.contextmanager
def suppress_stdout():
    with open(os.devnull, 'w') as devnull:
        old_stdout = sys.stdout
        old_stderr = sys.stderr
        sys.stdout = devnull
        sys.stderr = devnull
        try:
            yield
        finally:
            sys.stdout = old_stdout
            sys.stderr = old_stderr

def detect_cavity(image_path):
    model = YOLO('model/yolov8.pt')

    with suppress_stdout():
        results = model(image_path)

    result = results[0]
    output_dir = 'output'
    output_path = os.path.join(output_dir, 'result.jpg')

    
    os.makedirs(output_dir, exist_ok=True)

    
    plotted_img = result.plot()
    cv2.imwrite(output_path, plotted_img)

    cavity_count = len(result.boxes)

    output = {
        'cavity_count': cavity_count,
        'output_image': 'output/result.jpg'
    }

    print(json.dumps(output))

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No image path provided'}))
        sys.exit(1)

    image_path = sys.argv[1]
    detect_cavity(image_path)
