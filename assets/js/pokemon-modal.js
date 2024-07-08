
const modalContent = document.getElementById('modal-content');

function openModal(pokemon) {

    const htmlModal = `
        <div class="modal ">
            <div class="modal-header">
                <img src="assets/icons/arrow-left.svg" alt="arrow-left" class="arrow-icon" onclick="closeModal()">
                <span class="number-pokemon" id="number-pokemon">#${pokemon.number}</span>
                <img src="assets/icons/heart-favorite.svg" alt="heart-favorite">
            </div>
    
            <div class="modal-body ">
                <div class="modal-info ${pokemon.type}">  
                    <span class="name">${pokemon.name}</span>
                    <div class="detail">
                        <ol class="types ">
                            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        
                        <div class="detail-img">
                            <img src="${pokemon.photo}" alt="${pokemon.name}">
                        </div>
                    </div>
                </div>

               
                
                <div class="modal-statistic"></div>
            </div>
            <div class="modal-footer">
                <button class="close" onclick="closeModal()">Fechar</button>
            </div>
        </div>`;
    
    modalContent.innerHTML = htmlModal;
    modalContent.classList.remove('hidden');
    
    // Obter referência ao botão closeButton depois que o modal é aberto
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);
}

function closeModal() {
    modalContent.classList.add('hidden');
}


