class Login {
    constructor(){
        const form = document.getElementById('login-form');
        form.addEventListener('submit', this.submitHandleForm);
        const inputs = document.querySelector('.form__input')
        inputs.addEventListener('focus', this.clearError, false);
    }

    submitHandleForm = (e)=>{
        e.preventDefault();
        const user = this.getUser();
        if(this.validationForm(user)){
            store.setCurrentUser(user.userName, user.remember)
            location.href="app.html"
        }
    }
    getUser =() =>{
        return {
            userName : document.getElementById("username").value,
            password:document.getElementById("password").value,
            remember :document.querySelector('#remember').checked === true 
        }
    }
    clearError =()=>{
        const element = document.getElementById("err")
        element.classList.add("hide");
        
        element.innerHTML=""
    }
    setError =(error) =>{
        const element = document.getElementById("err")
        element.classList.remove("hide");
        element.innerHTML=error
        return false
    }
    validationForm =(user) =>{
        if(!user.userName || !user.password ) return this.setError("כל השדות חובה")
        const users = store.getUsers()
        if(users && users.length){ //find if this user alrady exists
           const exists =  users.filter((c)=>c.userName === user.userName && c.password == user.password)
           if(!exists?.length) return this.setError("שם או סיסמא שגויים   ")
           else{
            this.clearError();
            return true
           }
        }
        return this.setError("המשתמש לא נמצא במערכת")
       
    }

}
const login = new Login()
