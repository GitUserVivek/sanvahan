// let host = 'http://localhost:5000'

// const host = (window.location.hostname === 'localhost' ? 'http://localhost:5000' : 'https://sanvahan-server.onrender.com');
let host = 'https://sanvahan-server.onrender.com'

// endpoints

let loginEndpoint = `${host}/api/user/login`
let registerEndpoint = `${host}/api/user/register`



export { loginEndpoint, host, registerEndpoint }