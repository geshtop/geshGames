class Main {
     constructor(){


        // fetch('shared/header.html')
        // .then((response) => {
        //     return response.text();
        // })
        // .then((html) => {
        //     document.body.innerHTML = html     
        // });

        

        const currentUser =store.getCurrentUser()
        if(!currentUser?.userName) location.href = "index.html"
        const logoutBtn  = document.getElementById("logout-btn")
        logoutBtn?.addEventListener('click', ()=>{store.removeCurrentUser(); location.href="index.html"});
        document.querySelectorAll(".fill_user").forEach(tag => tag.innerHTML = currentUser?.userName)
        
    }
}

const main = new Main()