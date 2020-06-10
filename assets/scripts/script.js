homeTitle = 'Eddi Esteban'
portfolioTitle = `Eddi's Portfolio`
contactTitle = `Contact Eddi`
let timeNow = Date.now()
if (!localStorage.lastDateTime) localStorage.lastDateTime = Date.now()

let lastTime = Number(localStorage.lastDateTime)

function pageNameToggle(name){return name == document.title ? ' active' : ''}

function portfolioItemGenerator(repo, index){
    let {name:title, 
        html_url: url, 
        homepage:deployment, 
        description:desc} = repo
    title = title.replace(/^HW-[0-9]+-/,'' )
    title = title.replace(/-/g, ' ')
    console.log(title)
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
                return response.json()
            } else {Promise.reject(localStorage.exists = 'false')}
        })
        .catch(e => console.warn(e))
}  

(async()=>{
    if (document.title == portfolioTitle){
        let repos
        // cache reset every hour
        if ((Math.abs(timeNow - lastTime) < 1000*60*60) && localStorage.repos){ //if current time is less than an hour from last checked 
            repos = JSON.parse(localStorage.repos) 
        } else{
            repos = await requestRepos()
            repos.sort((a, b) => (Date.parse(a.created_at) < Date.parse(b.created_at)) ? 1 : -1)
            localStorage.repos = JSON.stringify(repos)
        }
        console.log(repos)
        for (let i = 0; i < repos.length; i ++){
            let repo = repos[i]
            portfolioItemGenerator(repo, i)
    }
    
    
    }
})()


// const codeQuiz = {
//     name: 'Javascript Quiz',
//     img: '',

// }