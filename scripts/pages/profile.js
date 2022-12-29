class Profile {
    constructor(){
        this.userName = document.getElementById("username")
        this.password = document.getElementById("password")
        this.m_level =document.getElementById("m_level")
        this.b_level =document.getElementById("b_level")
        this.debugMode = document.getElementById("debugMode")
        const form = document.getElementById('profile-form');
        form.addEventListener('submit', this.submitHandleForm);
        const inputs = document.querySelector('.form__input')
        inputs.addEventListener('focus', this.clearError, false);
        this.fillForm()
    }

    fillForm = ()=>{
        const currentUser =store.getCurrentUser()
        this.userName.value = currentUser.userName
        this.password.value = currentUser.password
        this.m_level.value = currentUser.settings.minesweeper.level;
        this.b_level.value = currentUser.settings.bird.level;
        this.debugMode.checked = store.getDebugMode();
        document.getElementById(`bg${currentUser.settings.bird.bg}` ).checked = true;
        document.getElementById(`bird${currentUser.settings.bird.birdImg}` ).checked = true;
        
    }

    submitHandleForm = (e)=>{
        e.preventDefault();
        const profileData = this.getProfileData();
       if(this.validationForm(profileData)){
            store.setProfile(profileData)
            location.href="Profile.html"
        }
    }
    getProfileData =() =>{
       
        return {
            userName : this.userName.value,
            password:this.password.value,
            m_level :this.m_level.value,
            b_level :this.b_level.value,
            bg: document.querySelector("input[type='radio'][name=bg]:checked").value,
            birdImg: document.querySelector("input[type='radio'][name=bird]:checked").value,
            debugMode : this.debugMode.checked? true : false
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
    validationForm =(profileData) =>{
        if(!profileData.userName || !profileData.password || !profileData.m_level || !profileData.b_level || !profileData.bg ||!profileData.birdImg ) return this.setError("כל השדות חובה")
        this.clearError();
        return true
    }

}
const profile = new Profile()
