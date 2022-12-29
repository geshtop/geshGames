class Register {
    constructor(){
        const form = document.getElementById('register-form');
        form.addEventListener('submit', this.submitHandleForm);
        const inputs = document.querySelector('.form__input')
        inputs.addEventListener('focus', this.clearError, false);
    }

    submitHandleForm = (e)=>{
        e.preventDefault();
        const user = this.getUser();
        if(this.validationForm(user)){
            store.addUser({userName:user.userName, password:user.password, remember:user.remember})
            location.href="app.html"
        }
    }
    getUser =() =>{
        return {
            userName : document.getElementById("username").value,
            password:document.getElementById("password").value,
            confirm_password:document.getElementById("confirm_password").value,
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
        if(!user.userName || !user.password || ! user.confirm_password) return this.setError("כל השדות חובה")
        const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        if(!user.password.match(regexPassword)) return this.setError("יש להכניס אותיות קטנות אותיות גדולות מספרים וסימנים מיוחדים ולפחות 8 תווים  ")
        if(user.password != user.confirm_password) return this.setError("הסיסמא ואימות הסיסמא לא שווים")
        const users = store.getUsers()
        if(users && users.length){ //find if this user alrady exists
           const exists =  users.filter((c)=>c.userName === user.userName)
           if(exists?.length) return this.setError("שם משתמש קיים במערכת")
        }
        this.clearError();
        return true
    }

}
const register = new Register()
