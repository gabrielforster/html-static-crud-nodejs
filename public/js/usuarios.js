const containerDiv = document.getElementById('container');

async function deleteUser(id){
    await fetch(`http://localhost:3000/api/users/${id}`, {
        method: 'DELETE'
    })
    window.location.reload();
}

async function createUsersOnScreen(){
    const users = await fetch('http://localhost:3000/api/users')
    .then(response => response.json())
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `<p>${user.firstName} ${user.lastName} - ${new Date(user.birthdate).toLocaleDateString('pt-br')}</p>`
        userDiv.classList.add('user-container')
        
        const button = document.createElement('button');
        button.innerText = 'Deletar Usuário';
        button.classList.add('delete-button');
        userDiv.addEventListener('click', () => deleteUser(user.id))
        userDiv.appendChild(button);

        userDiv.style.textAlign = 'center';
        userDiv.style.display = 'flex';
        containerDiv.appendChild(userDiv)
    })   
}

createUsersOnScreen();