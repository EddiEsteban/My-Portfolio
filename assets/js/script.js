homeTitle = 'Eddi Esteban'
portfolioTitle = `Eddi's Portfolio`
contactTitle = `Contact Eddi`
let timeNow = Date.now()
if (!localStorage.lastDateTime) localStorage.lastDateTime = Date.now()

let lastTime = Number(localStorage.lastDateTime)

function pageNameToggle(name){return name == document.title ? ' active' : ''}

function portfolioItemGenerator(
    {
        name:title, 
        html_url: url, 
        homepage:deployment, 
        description:desc
    }){
    
    // console.log({title, url, deployment, desc})
    title = title.replace(/^HW-[0-9]+-/,'' )
    title = title.replace(/-/g, ' ')
    let img
    
    let imgDir = './assets/img/'
    switch(title){
        case 'card generator': img = imgDir + 'demo_card-generator.png'; break
        case 'burger logger': img= imgDir + 'bear-tongue.png'; break
        case 'Mood Food and Chill': img= imgDir + 'demo_mfc.png'
    }

    let imgEl
    if (!img){imgEl = ''} else {imgEl = `<img src="${img}" class="card-img-top img-fluid" alt="...">`}

    const createBtn = (href, message) => `<a href='${href}'><button type='submit' class='btn btn-primary btn-sm btn-block' style='height:100%;width:100%'>${message}</button></a>`
    let deployBtn = ''
    if (deployment !== '' && deployment !== null){
        deployBtn = createBtn(deployment, 'Go to deployed app')
    }
    let repoBtn = ''
    if (url !== '' && url !== null){
        repoBtn = `<a href='${url}'><img src='./assets/img/icon_github.webp' class='imgFoot'></a>`
    }



    
    document.querySelector(`#portfolio`).innerHTML += ` <div class="col-12 col-sm-6 col-md-4 mt-2">`+
        `<section style='height:100%'><div class="card" style='height:100%' href="index.html">`+
            imgEl+
                `<div class="card-body" >`+
                `<h5 class="card-title">${title}</h5>`+
                `<p class="card-text">${desc}</p>`+
                `</div>`+
                `<div class="card-footer p-0"><div class='row no-gutters' style='width:100%;height:100%'>`+
                    `<div class='col no-gutters' style='width:100%;height:100%'> ${deployBtn}</div>`+
                    `<div class='col no-gutters' style='width:100%;height:100%'>${repoBtn}</div>`+
                `</div></div>`+
            `</div></section>`+
        `</div>`
}

const navbar = ()=>{
    document.querySelector(`#navbar`).innerHTML = `<nav class="navbar navbar-expand-lg navbar-dark">`+
        `<span class="navbar-brand" href="#">Eddi Esteban</span>`+
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

function mainApp(){
    navbar()
    
}
mainApp()

// navbar that appears when scrolling up and disappears when scrolling down
// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.querySelector("#navbar").style.top = "0";
//   } else {
//     document.querySelector("#navbar").style.top = "-3.5rem";
//   }
//   prevScrollpos = currentScrollPos;
// }

function sendEmail(event){
    event.preventDefault()
}

async function requestRepos(){
    let request = `https://api.github.com/users/EddiEsteban/repos`
    return fetch(request)
        .then(function(response){
            if (response.ok) {
                return response.json()
            } else {Promise.reject(response)}
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
        repos.forEach((repo)=>portfolioItemGenerator(repo))

    }
})()


