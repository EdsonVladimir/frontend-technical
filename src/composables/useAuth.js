import {useStore} from 'vuex';

const useAuth = () =>{
  const store = useStore()

  const loginUser = async (user) =>{
    const resp = await store.dispatch('auth/loginUser',user)
    return resp
  }

  const openModal = async (user) =>{
    console.log(user)
    const resp = await store.dispatch('auth/openModal',user)
    console.log(resp)
    return resp
  }
  return {
    loginUser,
    openModal
  }
}

export default useAuth;
