const apikey = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB';
const pathTendencias = `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=3`;
let gifosBuscados = 12;

// Para cargar el texto en trending y cargar las tendencias a la seccion de carrousel
async function getGiftsByText(campo, offset) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${gifosBuscados}&q=${campo}&offset=${offset}&rating=g&lang=es`;
    const response = await fetch(pathBusqueda);
    const gifs = await response.json();
    return gifs.data;
}
let tendencias = document.getElementById('tendencias');
async function cargarTendencias() {
    // utilizamos fetch y recibimos los datos para hacerlos .json
    const response = await fetch(pathTendencias);
    const tendencias = await response.json();
    return tendencias.data;
}      

window.onload = function () {
    invocarTendencias();
}
let textoTendencias = document.getElementById('p-textodeTenencias');

async function invocarTendencias() {
    let trendings = await cargarTendencias();
    textoTendencias.innerHTML = '';
    tendenciasscroll.innerHTML = '';
    trendings.forEach((t, i) => {
        textoTendencias.innerHTML += t.title +
        (i === trendings.length - 1 ? '' : ', ');
        let card = document.createElement("div");
        card.className = "card-gifo"
        card.innerHTML = `

        <div id="container-hover" class="container-hover">
            <div class="container-icon">
                <img id="${t.id}" src="./img/icon-download.png" alt="icon" class="icon-gifo">
                <img id="${t.id}" src="./img/icon-fav.png" alt="icon" class="icon-gifo fav">
                <img  id="${t.id}" src="./img/icon-max-normal.png" alt="icon" class="icon-gifo extend">
            </div>
            <div class="container-desc">
                <p class="gif-title">${t.title}</p>
            </div>
            </div>
            <img class="gifo-trend" id="${t.id}" src="${t.images.fixed_height.url}" alt="${t.title}"/>`
        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        tendenciasscroll.appendChild(card);
});
    tendenciasscroll.querySelectorAll('.scroll img').forEach((img) => {
        img.addEventListener('click', onGifClick, false);
    });
    guardarFavorito()
}

 

// Aquí es para realizar las busqudas
let resultado = document.getElementById('resultados');
let resultadoh1 = document.getElementById('resultadosh1');
let searchBtn = document.getElementById('searchBtn');
let search = document.getElementById('search');
let searchIcon = document.querySelector('.resultados img')
let btnvermas = document.getElementById('btnvermas')
let desaparecer = document.getElementById('desaparecer')


search.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
            buscarGif();
            desaparecer.style.display = "none"
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }
});
searchBtn.addEventListener('click', () => {
    if ('click') {
            buscarGif();
            desaparecer.style.display = "none"
    }if(search.value <= 1){
        desaparecer.style.display = "flex"
    }
});

async function buscarGif() {
    let campo = search.value;
    const pathBusqueda = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${gifosBuscados}&q=${campo}`;
    const respuesta = await fetch(pathBusqueda);
    console.log(respuesta);
    const json = await respuesta.json();
    console.log(json);
    let gifts = await getGiftsByText(search.value, 0);
    if (json.data.length === 0){
        resultadoh1.innerHTML = '';
         resultado.innerHTML = '';
         btnvermas.classList.add('btnvermas-hide')
         btnvermas.style.display = 'none'
            resultadoh1.innerHTML += `
            <div class="hrResBox">
                <hr class="hrRes">
                <h1 class="h1resultadobusqueda">Lorem Impsu</h1>
                <img class="" src="./img/icon-busqueda-sin-resultado.svg" alt=''/>
            </div>
        `;
    } else {
        resultadoh1.innerHTML = '';
        resultadoh1.innerHTML += `
        <h1 class="h1resultadobusqueda">${campo}</h1>
        `;
        resultado.innerHTML = '';
        btnvermas.classList.add('btnvermas-show')
        btnvermas.style.display = 'block'
            gifts.forEach((gift) => {
            resultado.innerHTML += `
                <img id="${gift.id}" src="${gift.images.fixed_height_small.url}" alt="${gift.title}"/>
            `;
        });
        document.querySelectorAll('.resultados img').forEach((img) => {
            img.addEventListener('click', onGifClick, false);
        });
    }
    guardarFavorito()
}

// Boton ver mas
let gifoContainer = document.getElementById("gifo-comtainer");
btnvermas.addEventListener("click", () => {
    if (gifosBuscados < 20) {
        gifosBuscados += 4;
        try {
            buscarGif();
            if (gifosBuscados === 20) {
                btnvermas.innerHTML = `<p>ver menos</p>`
            }
        } catch (error) {
            console.log(error);
        }
    } else if (gifosBuscados = 20) {
        gifosBuscados = 16;
        btnvermas.innerHTML = `<p>ver más</p>`
        try {
            buscarGif();
        } catch (error) {
            console.log(error);
        }
    }
})  



// Para entrar en modo nocturno 
let modoNocturno = document.getElementById('modoNocturno');
let body = document.getElementsByName('body')
let logo = document.getElementById('logobox')

modoNocturno.addEventListener('click',() => {
    if (document.body.className === 'dark') {
        document.body.classList.toggle('dark')
        modoNocturno.innerHTML =`<div>Modo Nocturno</div>`
        logo.innerHTML = `<a href="./index.html"> <img class="logo" id="logo" src="./img/Logo.png" alt="Gifoslogo" /> </a>`
        
    } else {
        document.body.classList.toggle('dark')
        console.log('Cambio de tema');
        modoNocturno.innerHTML =`<div>Modo Diurno</div>`
        logo.innerHTML = `<a href="./index.html"><img class="logo" id="logo" src="./img/LogoMobile.svg" alt="Gifoslogo" /> </a>`
    }
    
})


// ventana modal
async function getGifById(id) {
    const pathBusqueda = `https://api.giphy.com/v1/gifs/${id}?api_key=${apikey}`;
    const response = await fetch(pathBusqueda);
    const gif = await response.json();
    return gif.data;
}


let modal = document.getElementById('modal');
let selectedGif = document.getElementById('selectedGif');
let modalClose = document.querySelector('#modal .modal-close');
let gifTitle = document.querySelector('#modal h3');
let gifUser = document.querySelector('#modal h4');
let downloadGif = document.getElementById('downloadGif');

async function onGifClick(img) {
    console.log(img);
    let gifData = await getGifById(img.target.id);
    selectedGif.src = gifData.images.fixed_height_small.url;
    gifTitle.innerHTML = gifData.title;
    gifUser.innerHTML = gifData.username;
    downloadGif.href = gifData.images.downsized.url;
    modal.style.display = 'flex';
}

modal.addEventListener('click', (e) => {
    if (e.target.id === 'modal' || e.target.id === 'modal-close') {
        modal.style.display = 'none';
    }
});





// PARA GUARDAR FAVORITOS
let favorites = []

document.getElementById("favoritos").addEventListener("click", favoritos);
let scrollfav = document.getElementById('scrollfav')

function favoritos() {
    document.getElementById("favBlock").style.display = "none";
    scrollfav.style.display = "flex";
    document.getElementById("favoritesSect").style.display = "block";
    
}

function guardarFavorito() {
    let favIcon = document.getElementsByClassName("icon-gifo fav");
    for (let i = 0; i < favIcon.length; i++) {
        const element = favIcon[i];
        if (localStorage.getItem("favoritos", JSON.stringify(favorites))) {
            favorites= JSON.parse(localStorage.getItem("favoritos"));
        }
        element.addEventListener("click", () => {
            let idFav = (event.target.id);
            if (element.src === "./img/icon-fav-active.svg") {
                alert("Ya has guardado este gif como favorito");
            } else {
                favorites.push(idFav);
            }
            element.src = "./img/icon-fav-active.svg";
            localStorage.setItem("favoritos", JSON.stringify(favorites))
            
        })
    }
}
async function muestraFavoritos(params) {
    const contra = 'wioJ8mi8wlULE7hExqq9lNJTkDcbiZqB';
    scrollfav.innerHTML = " "
    let favorites = JSON.parse(localStorage.getItem("favoritos"));
    // verificamos si hay algun gif guardado para poner icono
    if (favorites === null) {
        let image = document.getElementById("corazoncito");
        image.src = "./imgs/icon-fav-sin-contenido.svg";
        image.style.width = "80px"
        image.style.height = "80px"
    }
    for (let i = 0; i < favorites.length; i++) {
        const element = favorites[i];
        const path = `https://api.giphy.com/v1/gifs?api_key=${contra}&ids=${element}`;
        let llamado = await fetch(path);
        let json = await llamado.json();
        let elemento = json.data[0];
        let src = elemento.images.fixed_width.url;
        let gifoName = elemento.title;
        let download = element.bitly_url;
        let user = elemento.username;
        let id = elemento.id;
        let card = document.createElement("div");
        card.id = "card-gifo"
        card.className = "card-gifo"
        card.innerHTML = ` <div id="container-hover" class="container-hover">
            <div class="container-icon">
                <img id="${id}" src="./img/icon-download.png" alt="icon" class="icon-gifo">
                <img id="${id}" src="./img/icon-fav.png" alt="icon" class="icon-gifo fav">
                <img  id="${id}" src="./img/icon-max-normal.png" alt="icon" class="icon-gifo extend">
            </div>
            <div class="container-desc">
                <p class="gif-user">${user}</p>
            <p class="gif-title">${gifoName}</p>
            </div>
            </div>
            <img class="gifo-trend" id="${id}" src="${src}" alt="${gifoName}"/>`

        card.addEventListener("mouseover", () => {
            card.firstElementChild.style.display = "flex";
        })
        card.addEventListener("mouseout", () => {
            card.firstElementChild.style.display = "none";
        })
        scrollfav.appendChild(card);
        scrollfav.querySelectorAll('.scroll img').forEach((img) => {
        img.addEventListener('click', onGifClick, false);
    });
        let unselect = document.getElementsByClassName("icon-gifo fav");
        for (let i = 0; i < unselect.length; i++) {
            const element = unselect[i];
            element.addEventListener("click", () => {
                let id = event.target.id;
                eliminarFav(id);
            })
        }
    }

}
function eliminarFav(id) {
    let deleteId = id;
    let favGuardados = JSON.parse(localStorage.getItem("favoritos"));
    for (let i = 0; i < favGuardados.length; i++) {
        const element = favGuardados[i];
        if (deleteId === element) {
            let indice = favGuardados.indexOf(element);
            favGuardados.splice(indice, 1);
            localStorage.setItem("favoritos", JSON.stringify(favGuardados));
            muestraFavoritos();
        }
    }
}
