async function searchPokemon() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonResult = document.getElementById('pokemonResult');

    if (!pokemonName) {
        pokemonResult.innerHTML = '<p class="text-danger">Please enter a Pokémon name or ID.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const pokemonData = await response.json();

        pokemonResult.innerHTML = `
            <div class="card mt-3">
                <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemonData.name.toUpperCase()}</h5>
                    <p class="card-text">ID: ${pokemonData.id}</p>
                    <p class="card-text">Type: ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                    <a href="details.html?id=${pokemonData.id}" class="btn btn-primary">View Details</a>
                </div>
            </div>
        `;
    } catch (error) {
        pokemonResult.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
}


async function displayPokemonDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    const pokemonDetails = document.getElementById('pokemonDetails');

    if (!pokemonId) {
        pokemonDetails.innerHTML = '<p class="text-danger">No Pokémon ID provided.</p>';
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error('Pokémon not found');
        const pokemonData = await response.json();

        pokemonDetails.innerHTML = `
            <div class="card">
                <img src="${pokemonData.sprites.front_default}" class="card-img-top" alt="${pokemonData.name}">
                <div class="card-body">
                    <h5 class="card-title">${pokemonData.name.toUpperCase()}</h5>
                    <p class="card-text"><strong>ID:</strong> ${pokemonData.id}</p>
                    <p class="card-text"><strong>Abilities:</strong> ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}</p>
                    <p class="card-text"><strong>Type:</strong> ${pokemonData.types.map(type => type.type.name).join(', ')}</p>
                    <p class="card-text"><strong>Stats:</strong></p>
                    <ul>
                        ${pokemonData.stats.map(stat => `<li>${stat.stat.name}: ${stat.base_stat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    } catch (error) {
        pokemonDetails.innerHTML = `<p class="text-danger">${error.message}</p>`;
    }
}


if (window.location.pathname.includes('details.html')) {
    displayPokemonDetails();
}