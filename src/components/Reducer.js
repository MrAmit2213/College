const initState = {
    userId:'',
    name : '',
    email : '',
    token : '',
    campus:'',
    role : '',
    isLoggedIn: false
};

const Reducer = (state = initState, action) =>{
    switch(action.type){
        case 'ADNIN_LOGIN' :
            return {...state, userId:action.id,name:action.name, email:action.e_mail, token: action.token, campus: action.campus, role: action.role, isLoggedIn: true}
        case 'ADNIN_LOGOUT' :
            return {...state, userId:'', name : '', email : '', token : '', campus : '', role : '', isLoggedIn: false}
        default: 
            return state;
    }
}

export default Reducer;