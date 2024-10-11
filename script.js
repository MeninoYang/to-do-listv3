const caixaescreve = document.getElementById("caixa-escreve");
const boxlista = document.getElementById("box-lista");
const deletedTasksList = document.getElementById("deletedTasksList");
const emptyMessage = document.getElementById("emptyMessage");

function addTask() {
    if (caixaescreve.value === '') {
        alert("Você deve escrever algo primeiro");
    } else {
        let li = document.createElement("li");
        li.innerHTML = caixaescreve.value;
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        boxlista.appendChild(li);
    }
    caixaescreve.value = "";
    saveTasks();
}

boxlista.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("verificado");
        saveTasks();
    } else if (e.target.tagName === "SPAN") {
        const taskText = e.target.parentElement.textContent.replace('\u00d7', '').trim();
        const taskChecked = e.target.parentElement.classList.contains("verificado");
        const currentDate = new Date();
        const dateTime = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        
        const deletedTask = document.createElement("li");
        if (taskChecked) {
            deletedTask.classList.add("checked"); 
        }
        deletedTask.innerHTML = `${taskText} <small>(${dateTime})</small> <button class="delete-btn">x</button>`;
        deletedTasksList.appendChild(deletedTask);

        e.target.parentElement.remove();
        updateEmptyMessage();
        saveTasks();
    }
}, false);

deletedTasksList.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        const taskText = e.target.innerHTML.split(' <small>')[0];
        const taskChecked = e.target.classList.contains("checked");
        
        const restoredTask = document.createElement("li");
        restoredTask.innerHTML = taskText;
        if (taskChecked) {
            restoredTask.classList.add("verificado"); 
        }
        const span = document.createElement("span");
        span.innerHTML = "\u00d7";
        restoredTask.appendChild(span);
        
        boxlista.appendChild(restoredTask);
        updateEmptyMessage();
        e.target.remove();
        saveTasks();

    } else if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
        updateEmptyMessage();
        saveTasks();
    }
}, false);

function saveTasks() {
    localStorage.setItem("tasks", boxlista.innerHTML);
    localStorage.setItem("deletedTasks", deletedTasksList.innerHTML);
}

function loadTasks() {
    boxlista.innerHTML = localStorage.getItem("tasks") || '';
    deletedTasksList.innerHTML = localStorage.getItem("deletedTasks") || '';
    updateEmptyMessage(); 
}

function updateEmptyMessage() {
    if (deletedTasksList.children.length === 0) {
        emptyMessage.style.display = 'block';
    } else {
        emptyMessage.style.display = 'none';
    }
}

function toggleLeftMenu() {
    const menuLateralEsquerda = document.getElementById('menuLateralEsquerda');
    menuLateralEsquerda.classList.toggle('show');
}

function toggleMenu() {
    const menuLateral = document.getElementById('menuLateral');
    menuLateral.classList.toggle('show');
}

function someFunction() {
    alert("Você clicou no Botão 1 do menu esquerdo!");
}

function anotherFunction() {
    alert("Você clicou no Botão 2 do menu esquerdo!");
}

document.querySelectorAll('.menu-buttons button').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); 
    });
});

function someFunction() {
    document.getElementById("cadastroModal").style.display = "block"; 
}

function mostrarCadastroModal() {
    document.getElementById("cadastroModal").style.display = "block"; 
}

function mostrarLoginModal() {
    document.getElementById("loginModal").style.display = "block"; 
}

function fecharModal(modalId) {
    const modal = document.getElementById(modalId);
    const modalConteudo = modal.querySelector(".modal-conteudo, .modal-conteudo-login");

    // Adiciona a classe de saída
    modalConteudo.classList.add('saindo');

    setTimeout(() => {
        modal.style.display = "none"; 
        modalConteudo.classList.remove('saindo'); 
    }, 500); 
}

// Configurar os eventos de fechar
document.querySelectorAll('.fechar').forEach(fechar => {
    fechar.addEventListener('click', function() {
        const modalId = this.closest('.modal').id; // Obtém o id do modal pai
        fecharModal(modalId);
    });
});

// Adiciona o evento de clique fora do modal
window.onclick = function(event) {
    const cadastroModal = document.getElementById("cadastroModal");
    const loginModal = document.getElementById("loginModal");
    
    if (event.target === cadastroModal) {
        fecharModal('cadastroModal');
    } else if (event.target === loginModal) {
        fecharModal('loginModal');
    }
};

// Event listeners para os formulários
document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!"); 
    fecharModal("cadastroModal");
});

document.getElementById("formLogin").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Login realizado com sucesso!"); 
    fecharModal("loginModal");
});

loadTasks();
