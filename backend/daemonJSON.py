from datetime import datetime
import threading
import time
import json
import os

template = {
    "template": False,
    "posts": [
        {
            "date": "",
            "content": "",
            "opVid": "",
            "opImg": ""
        }
    ]
}

def background_task():
    lastMonth = None
    while True:
        now = datetime.now()
        year = now.year
        blogPath = f"../frontend/scripts/blogData/{year}"
        os.makedirs(blogPath, exist_ok=True)

        JSONPath = os.path.join(blogPath, f"{now.strftime('%B')}.json")
        
        if now.month != lastMonth and not os.path.exists(JSONPath):
            lastMonth = now.month
            
            # ====== DELETE EMPTY TEMPLATE FILES ======
            for root, _, files in os.walk(blogPath):
                for file in files:
                    if file.endswith(".json"):
                        checkedFile = os.path.join(root, file)

                        try:
                            with open(checkedFile, "r") as f:
                                data = json.load(f)
                                if data.get("template") is False:
                                    os.remove(checkedFile)

                        except Exception as e:
                            print(f"[ERROR] Skipping {checkedFile} — {e}")
            # ==========================================

            with open(JSONPath, "w") as f:
                print("Creation of file")
                json.dump(template, f, indent=3)
            
        print("Checking")
        time.sleep(86400)  

# Start background thread
thread = threading.Thread(target=background_task, daemon=True)
thread.start()

try:
    while True:
        time.sleep(1)
except KeyboardInterrupt:
    print("Daemon stopped manually.")