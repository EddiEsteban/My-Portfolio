homeTitle = 'Eddi Esteban'
portfolioTitle = `Eddi's Portfolio`
contactTitle = `Contact Eddi`

function pageNameToggle(name){return name == document.title ? ' active' : ''}

function portfolioItemGenerator(repo, index){
    console.log(repo)
    let {name:title, html_url: url, homepage:deployment, description:desc} = repo
    let img = `./assets/img/me-2020-05-14.png`
    document.querySelector(`#portfolio`).innerHTML += `<div class="col-12 col-sm-6 col-md-4 mt-2">`+
        `<div class="card"  href="index.html">`+
            `<img src="${img}" class="card-img-top" alt="...">`+
                `<div class="card-body">`+
                `<h5 class="card-title">${title}</h5>`+
                `<p class="card-text">${desc}</p>`+
                `</div>`+
                `<div class="card-footer">`+
                    `<button type="button" class="btn btn-primary btn-sm btn-block" onClick='document.location = "${deployment}"'>`+
                        `Go to deployed app`+
                    `</button>`+
                    `<button type="button" class="btn btn-primary btn-sm btn-block" onClick='document.location = "${url}"'>`+
                        `Go to repository`+
                    `</button>`+
                `</div>`+
            `</div>`+
        `</div>`
}

function init(){
    document.querySelector(`#navbar`).innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark">`+
    `<a class="navbar-brand" href="#">Eddi Esteban</a>`+
    `<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">`+
        `<span class="navbar-toggler-icon"></span>`+
    `</button>`+
    `<div class="collapse navbar-collapse" id="navbarNavAltMarkup">`+
        `<div class="navbar-nav">`+
            `<a class="nav-item nav-link${pageNameToggle(homeTitle)}" href="index.html">Home</a>`+
            `<a class="nav-item nav-link${pageNameToggle(portfolioTitle)}" href="portfolio.html">Portfolio</a>`+
            `<a class="nav-item nav-link${pageNameToggle(contactTitle)}" href="contact.html">Contact</a>`+
        `</div>`+
    `</div>`+
    `</nav>`
    
}
init()

async function requestRepos(){
    let request = `https://api.github.com/users/EddiEsteban/repos`
    return fetch(request)
        .then(function(response){
            if (response.ok) {
                console.log('hi')
                return response.json()
            } else {Promise.reject(localStorage.exists = 'false')}
        })
        .catch(e => console.warn(e))
}  

(async()=>{
    if (document.title == portfolioTitle){
        let repos = await requestRepos()
        for (let i = 0; i < repos.length; i ++){
            let repo = repos[i]
            console.log(repo)
            portfolioItemGenerator(repo, i)
    }
    
    
    }
})()


// const codeQuiz = {
//     name: 'Javascript Quiz',
//     img: '',

// }