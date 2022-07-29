/*export function someAction ( context) {
}*/
import api from '../../boot/axios'
import axios from "axios";
export const loginUser = async ({commit}, user) =>{
  console.log(user)
  const { email, pass} = user

  try {
      const {data} = await axios.post('http://localhost:8001/public/authenticate', {email, pass})
     const jwtToken = data.jwtToken;
     const user = data.user;
     const message = data.message;
//  delete user.pass
 commit('loginUser', {user, jwtToken})
   return {ok:true, message}
    //mutacion
  } catch (error){
    console.log(error.response)
    return {ok: false, message: '....'}
  }
};

export const openModal = async ({commit}, user)=>{
  try {
  await console.log(user, "sadsdasd")
  commit('openModal', user)
  return {ok:true, message}
  } catch (error){
    console.log(error.response)
    return {ok: false, message: '....'}
  }
};


