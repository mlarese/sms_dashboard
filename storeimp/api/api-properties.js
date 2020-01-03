export const rowsPerPageItems = [20, 100]

let doMock = false
let url = 'http://138.197.11.140/public/index.php'
// if (process.env.NODE_ENV === 'development') {
if (window.location.host === 'localhost:3000') {
}

export const baseURL = url
export const mockApp = doMock
