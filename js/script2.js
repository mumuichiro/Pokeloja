class Pokemon{
     constructor(nome,url){
          this.nome=nome;
          this.url=url;
          this.id=this.url.replace('https://pokeapi.co/api/v2/pokemon/','').replace('/','');
          this.imagem=`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${this.id}.png` ;
          this.preco =Math.floor(Math.random()*100);
     }

html(){
     const pokeDiv = document.createElement('div'); 
     pokeDiv.className='pokemon';
     pokeDiv.innerHTML=`
     <a href="">
     <img src="${this.imagem}"
     alt="${this.nome}">
     <p>${this.nome}</p>
     <p class="oldvalue">R$ ${this.preco}</p>
     <p>R$ ${(this.preco * 0.8).toFixed(2)}</p>
  <button data-id="1" class="poke-buy">Comprar</button></a>`; 

  return pokeDiv;
}
};

let page = 0;
async function getPokemons(page = 0){
     const pokeList = document.querySelector('.pokemon_lista');
     pokeList.innerHTML='<div>Carregando Pokemons....</div>';
     
     const limit = 20;
     const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${limit*page}`);
     
     const json = await response.json();
     const pages = Math.ceil(json.count /limit);

     console.log(pages);

    
     return json;
}




function anterior(page){
     const btnAnt = document.querySelector('.btn-ant');

     if (page === 0) btnAnt.style.visibility= 'hidden';



}

function btnProx(){
     const btnProx = document.querySelector('.btn-prox');

     btnProx.onclick = async()=>{
     
          const response = await getPokemons(page+=1);
          listaPokemons(response.results);
     }

}

function listaPokemons(pokemonsApi){
     const pokeList = document.querySelector('.pokemon_lista');
     pokeList.innerHTML='';
     
     
     const pokemons = pokemonsApi.map((pokemon)=> new Pokemon(pokemon.name,pokemon.url));
      
     
     pokemons.forEach((pokemon)=> {
        const html = pokemon.html();
        pokeList.appendChild(html)
   });


     
}


window.onload = async()=>{
    

     const response = await getPokemons();

     listaPokemons(response.results);

     btnProx();
     
     anterior(page);
     
  
     
} 

  