const form = document.getElementById("emailForm") as HTMLFormElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;
const emailInput = document.getElementById("emailInput") as HTMLInputElement;
const mainRes = document.getElementById("mainResume") as HTMLIFrameElement;


form.addEventListener("submit", (event) => {
    if (!nameInput || !emailInput || !form) return;

    event.preventDefault();

    const name = nameInput.value;
    const email = emailInput.value;
    const resumeUrl = mainResume?.src;

    fetch("/sendEmail", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name, email, resumeUrl})
    })
    .then(res => res.json()) // Backend sends response here
    .then(data => {
        if (data.status == "success") {
            alert("Check your email!");
        }
        else {
            alert("Failed to send: " + (data.message))
        }
    })
    .catch (err => {
        alert("Error sending email: " + (err.message));
    })
});