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
        const userDiv = document.createElement("div")

        const userName = document.createElement("h3")
        userName.innerText = user.nome

        const userEmail = document.createElement("p")
        userEmail.innerText = user.email

        const userDeleteButton = document.createElement("button")
        userDeleteButton.innerText = "Delete"
        userDeleteButton.addEventListener("click", () => {
            deleteUser(user.id)
            userDiv.remove()
        })

        userDiv.appendChild(userName)
        userDiv.appendChild(userEmail)
        userDiv.appendChild(userDeleteButton)

        mainDiv.appendChild(userDiv)
        mainDiv.classList.add("user-div")
    })
}

createusersOnDocument()
