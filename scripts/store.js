ImageOptions =
    {
        1:
            {
            src:"Bird1.png",
            width:941,
            height:680
            },
   
        2:
            {
            src:"Bird2.png",
            width:729,
            height:467
            },
  
        3:
            {
            src:"Bird3.png",
            width:310,
            height:244
            }
    }

BackgroundOptions = {
    1:"BG1.png",
    2:"BG2.png",
    3:"BG3.png",
    4:"BG4.png"
}    


class Store {
   
    defaultStore = {
        users:[],
        debugMode:false
    }
    defautUserSettings ={
        minesweeper:{
            level:1,
            win:0,
            lose:0,
            lastDate:'',
            last:''
        },
        bird:{
            birdImg:"1",
            bg:"1",
            level:1,
            //scores:[],
            games:0,
            lastDate:'',
            max:0,
            last:0
        }
    }
	constructor (){
        this.cname = "app_auth"
        const s = this.getStore()
        if(!s){
            this.setStore (this.defaultStore)
        }
        this.debugMode = this.getDebugMode()
    } ;
	
    getStore =()=>{
        const s = JSON.parse(localStorage.getItem('store'))
        //this.store = s
        return s
    }
    setStore =(store)=>{
        this.log("setStore", store)
        localStorage.setItem('store', JSON.stringify(store)) 
    }

    clearStore =()=>{
        //clear cookie
        localStorage.clear("store")
        location.href="index.html"
    }


    /*query*/
    getUsers =()=>{
        const {users} = this.getStore()
        return [...users]
    }
    getCurrentUser=() =>{
        //const userName = this.getCookie();
        let userName = sessionStorage.getItem(this.cname)
        if(!userName) userName = localStorage.getItem(this.cname)
        if(!userName) {
            return ""
        }
        try{
         const store = {...this.getStore()}
         const users =store.users
         return users.filter((c)=>c.userName === userName)[0]

        }
        catch(x){
            return ""
        }
       
    }
    getDebugMode =()=>{
        const {debugMode} = this.getStore();
        return debugMode;
    }

    getSettings=() =>{
        const {settings} = this.getCurrentUser()
        return {...settings}
    }

    // getCookie =() => {
    //     const name = this.cname + "=";
    //     let decodedCookie = decodeURIComponent(document.cookie);
    //     let ca = decodedCookie.split(';');
    //     for(let i = 0; i <ca.length; i++) {
    //       let c = ca[i];
    //       while (c.charAt(0) == ' ') {
    //         c = c.substring(1);
    //       }
    //       if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    //   }



    /*mutation*/
    addUser=(user) =>{
      const users =[...this.getUsers(), {...user, remember:undefined, settings:this.defautUserSettings}]

      const store ={...this.getStore()}
      store.users = users
      this.setStore( store)
      this.setCurrentUser(user.userName, user.remember)
    }
    setCurrentUser=(userName, remember) =>{
        this.removeCurrentUser()
        // let expires=""
        // if(remember){ //keep the user for 7 days
        //     const exdays = 7;
        //     const d = new Date();
        //     d.setTime(d.getTime() + (exdays*24*60*60*1000));
        //     expires = "expires="+ d.toUTCString();
        // }
        //document.cookie = this.cname + "=" + userName + ";" + expires ;
        //העוגיה לא עובדת כאשר עובדים עם קובץ לוקאלי ולכן עבדנו במקביל על  sessionStorage
        if(remember){
            localStorage.setItem(this.cname, userName) 
        }else{
            sessionStorage.setItem(this.cname, userName);
        }


    }
    removeCurrentUser=() => {

        localStorage.removeItem(this.cname)
        sessionStorage.removeItem(this.cname)
    }
    addMineSweeperWinLose=(status) =>{ //1==win 0==lose
        const store ={...this.getStore()}
        const {userName} = this.getCurrentUser()
        const users = this.getUsers();
        const newUsers =   users.map((user)=>{
            if(user.userName === userName){
                const d = new Date()
                if(status==1)
                    user.settings.minesweeper.win +=1
                else
                    user.settings.minesweeper.lose+=1
                user.settings.minesweeper.lastDate  = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
                user.settings.minesweeper.last = status ===1 ? "win":"lose"
                this.log("addMineSweeperWinLose", status ===1 ? "win":"lose", user)

            } 
            return user
        })
        store.users = newUsers
        this.setStore( store)
    }
    addBirdScore=(score)=>{
        this.log("score", score)
        const store ={...this.getStore()}
        const {userName} = this.getCurrentUser()
        const users = this.getUsers();
        const newUsers =   users.map((user)=>{
            if(user.userName === userName){
                const d = new Date()
                //user.settings.bird.scores.push(score);
                user.settings.bird.games +=1
                user.settings.bird.last  = score
                user.settings.bird.lastDate  = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`
                if(user.settings.bird.max <  score)user.settings.bird.max = score;
            } 
            return user
        })
        store.users = newUsers
        this.setStore( store)
    }
    setProfile=({userName, password, m_level, b_level, bg, birdImg, debugMode}) =>{
        const store ={...this.getStore()}
        const users = this.getUsers();
        const newUsers =   users.map((user)=>{
            if(user.userName === userName){
                user.password = password;
                user.settings.minesweeper.level= parseInt(m_level)
                user.settings.bird.level = parseInt(b_level)
                user.settings.bird.birdImg = parseInt( birdImg);
                user.settings.bird.bg = parseInt( bg);
            } 
            return user
        })
        store.users = newUsers
        store.debugMode = debugMode
        this.setStore( store)
        this.log("profile", {userName, password, m_level, b_level, bg, birdImg, debugMode})
    }
    log =(name,obj, obj2) =>{
        if(this.debugMode){
            if(obj2)
                console.log(name,obj, obj2)
            else
                console.log(name,obj)
        }
    }
}
const store = new Store()