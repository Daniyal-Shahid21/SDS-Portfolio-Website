from http.server import HTTPServer, BaseHTTPRequestHandler
from navInsert import insert_navbar
from footerInsert import insert_footer
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
import os
import json
import smtplib

def sendEmail(recName, recEmail, attachment, myEmail, myPass):
    try:
        message = MIMEMultipart()
        message['Subject'] = "Syed Daniyal Shahid Resume Inquiry"
        message['From'] = myEmail
        message['To'] = recEmail

        body = MIMEText(
            f"Hello {recName},\n\nThank you for visiting my website! Please find my resume attached and consider me for any potential positions.\n\nBest,\nSyed Daniyal Shahid"
        )
        message.attach(body)

        with open(f"{attachment}", 'rb') as file:
            message.attach(MIMEApplication(file.read(), Name="Syed Shahid: Resume.pdf"))

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(myEmail, myPass)
            result = server.sendmail(myEmail, recEmail, message.as_string())
            return len(result) == 0  #True if no errors arose on smtp's side of things
        
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")
        return False

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        print(f"[SERVER] Received request for: {self.path}")
        if self.path == "/":
            path = "/home.html"
        else:
            path = self.path
        full_path = "../frontend" + path

        if path.endswith(".html"):
            html = insert_navbar(full_path, "../frontend/navbar.html")
            html = insert_footer(html, "../frontend/footer.html")
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(html.encode("utf-8"))
            return
        
        elif path.endswith(".ico"): 
            with open("../frontend/images/favicon.ico", "rb") as f:
                icon = f.read()
            self.send_response(200)
            self.send_header("Content-type", "image/x-icon")
            self.end_headers()
            self.wfile.write(icon)
            return

        elif path.endswith(".png"):
            with open(full_path, "rb") as f:
                image = f.read()
            self.send_response(200)
            self.send_header("Content-type", "image/png")
            self.end_headers()
            self.wfile.write(image)
            return

        elif path.endswith(".pdf"):
            with open(full_path, "rb") as f:
                doc = f.read()
            self.send_response(200)
            self.send_header("Content-type", "application/pdf")
            self.end_headers()
            self.wfile.write(doc)
            return

        elif path.endswith(".js"):
            try:
                with open(full_path, "rb") as f:
                    js = f.read()
                self.send_response(200)
                self.send_header("Content-type", "application/javascript")
                self.send_header("Content-Length", str(len(js)))
                self.end_headers()
                self.wfile.write(js)
                print(f"Served JS: {full_path}")
            except Exception as e:
                self.send_error(500, f"Error serving JS: {e}")


        elif path.endswith(".json"):
            with open(full_path, "rb") as f:
                data = f.read()
            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(data)
            return

        else:
            self.send_error(404, "File not found")

    def do_POST(self):
        print(f"[SERVER] Received request for: {self.path}")
        if self.path == "/sendEmail":
            contentLength = int(self.headers.get("Content-Length", 0))
            body = self.rfile.read(contentLength).decode("utf-8")
            data = json.loads(body)
            name = data.get("name")
            email = data.get("email")
            load_dotenv(dotenv_path="../.env")
            myEmail = os.getenv("EMAIL_ADDRESS")
            myPass = os.getenv("EMAIL_PASSWORD")

            resumeUrl = data.get("resumeUrl")
            filename = resumeUrl.split("/")[-1]  #Extracts just the resume name instead of whole URL used in frontend/resdisplay. Wonky ASF because frontend is working directory, unlike here
            actUrl = f"../frontend/images/{filename}"

            res = sendEmail(name, email, actUrl, myEmail, myPass) #True if no errors arose on smtp's side of things FROM def sendEmail
            
            if res:
                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"status": "success"}')
            else:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b'{"status": "error", "message": "Failed to send email."}')

server = HTTPServer(("localhost", 3000), Handler)
server.serve_forever()