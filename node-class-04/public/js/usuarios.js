async function getUsers() {
    const response = await fetch("/api/users")
    const users = await response.json()
    return users[0]
}

//todo create api route for deleting
async function deleteUser(id){
    await fetch(`/api/users/${id}`, {
        method: "DELETE"
    })
}

async function createusersOnDocument() {
    const mainDiv = document.getElementById("main-div")
    const users = await getUsers()

    users.forEach(user => {
        const accordionDiv = document.createElement("div")
        accordionDiv.classList.add("accordion")

        const headerDiv = document.createElement("div")
        headerDiv.classList.add("accordion-header")
        headerDiv.innerHTML = user.nome

        const bodyDiv = document.createElement("div")
        bodyDiv.classList.add("accordion-body")

        const contentDiv = document.createElement("div")
        contentDiv.classList.add("accordion-content")

        const footerDiv = document.createElement("div")
        footerDiv.classList.add("accordion-footer")

        const deleteButton = document.createElement("button")
        deleteButton.classList.add("delete-button")
        deleteButton.innerHTML = "Excluir"
        deleteButton.addEventListener("click", async () => {
            await deleteUser(user.id)
            location.reload()
        })

        footerDiv.appendChild(deleteButton)

        contentDiv.appendChild(footerDiv)

        bodyDiv.appendChild(contentDiv)

        headerDiv.appendChild(bodyDiv)

        accordionDiv.appendChild(headerDiv)

        mainDiv.appendChild(accordionDiv)
    
        headerDiv.addEventListener("click",  () => {
            accordionDiv.classList.toggle("active")
        })
    })
}

createusersOnDocument()
