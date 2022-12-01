const game = document.getElementById("game")

async function createTable(){
    const scores = await fetch("/score").then(res => res.json())

    const table = document.createElement("table")
    const thead = document.createElement("thead")
    const tbody = document.createElement("tbody")
    const tr = document.createElement("tr")
    const th1 = document.createElement("th")
    const th2 = document.createElement("th")
    const th3 = document.createElement("th")
    
    th1.innerText = "Posição"
    th2.innerText = "Nome"
    th3.innerText = "Pontuação"

    tr.appendChild(th1)
    tr.appendChild(th2)
    tr.appendChild(th3)
    thead.appendChild(tr)

    scores.forEach((score, index) => {
        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        const td3 = document.createElement("td")

        td1.innerText = index + 1
        td2.innerText = score.name
        td3.innerText = Math.floor(score.score)

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tbody.appendChild(tr)
    })

    table.appendChild(thead)
    table.appendChild(tbody)
    
    game.appendChild(table)
}

createTable()