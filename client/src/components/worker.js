function convertToAsync(code) {
  return code.replaceAll("window.prompt", "await window.prompt");
}

const getWorkerCode = (code) => `
(async () => {
    const window = {};
    window.input = ""
    window.alert = (text) => {
        if ((typeof text) !== "string" && text !== null)
            text = text.toString();
        self.postMessage({ text: text, waitForInput: false, status: "running" })
    };

    function getInput() {
        return new Promise(resolve => {
            function check() {
                setTimeout(()=>{
                    if (window.input !== "")
                        resolve(window.input);
                    else check();
                }, 100);
            }

            check();
        });
    }

    window.prompt = async (text) => {
        self.postMessage({ text, waitForInput: true });
        return await getInput();
    }

    self.addEventListener("message", (e) => window.input = e.data);

    try {
        ${convertToAsync(code)}
        self.postMessage({status: "done"})
    }
    catch (err) {
        self.postMessage({status: "error", err: err});
    }
})()`;

export default getWorkerCode;
