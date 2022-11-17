const sendAnsBtn = document.getElementById("sendAnsBtn");

sendAnsBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const ans = document.querySelector('input[name="pora_roku"]:checked')?.value;
    if (ans) {
        sendAnswer(ans);
    }
})

function sendAnswer(ans) {

    const url = '../cgi-bin/quiz.py';

    const data = encodeURI("pora_roku=" + ans)

    const headers = new Headers();
    headers.append("Content-type", "application/x-www-form-urlencoded");

    fetch(url, { method: "post", headers, body: data })
        .then(res => res.json())
        .then(data => {
            if (data.odpowiedzi) {
                drawCanvas(data.odpowiedzi)
            }
        }).catch(e => console.log(e))
}

function drawCanvas(ansList) {

    const colorArray = [
        "#0000fe",
        "#008202",
        "#f30301",
        "#ffff01"
    ]

    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 200;

    const rectSize = 100;

    const drawRect = (context, x, y, width, height, i) => {
        context.beginPath();
        context.fillStyle = colorArray[i]
        context.fillRect(x, y, width, height);
        context.stroke();
    }

    const draw = (context) => {
        let maks = 0;
        for (let key in ansList) {
            if (ansList[key] > maks) maks = ansList[key]
        }

        let i = 0;
        for (let key in ansList) {
            let h = calcHeight(ansList[key], maks)
            drawRect(context, i * rectSize, canvas.height - h * rectSize - 100, rectSize, h * rectSize, i)
            drawText(context, key, i);
            i++;
        }

    };

    const drawText = (context, text, i) => {
        context.font = '16px serif';
        context.fillText(text.toUpperCase(), i * 100 + 25, canvas.height - 75);
    }

    const calcHeight = (val, max) => {
        return (val / max);
    }

    draw(context);
}