/*export function someMutation ( state ) {
}*/

export const loginUser =(state, {user, jwtToken})=>{
  if(jwtToken) {
    localStorage.setItem('jwtToken',jwtToken)
    state.jwtToken = jwtToken
  }
  if(user) {
    localStorage.setItem('user',JSON.stringify(user))
    state.user = user
  }
  state.authenticate = true
}
export const openModal =(state, stateModal)=>{
  console.log(stateModal)
  state.openModal = stateModal
}
