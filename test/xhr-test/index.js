import moriAxios from '../../dist/index.mjs'

const url = '/create-mori'

// const adaterTest = moriAxios.create({ adapter: ['fetch'], timeout: 2000 })
// const block = await adaterTest.request(url)
// console.log(block)
// Header

// Interceptor
// moriAxios.interceptors.request.use((config) => {
//   console.log('req interceptor1', config)
//   return config
// }, (err) => {
//   console.log(err)
// })

// moriAxios.interceptors.request.use((config) => {
//   console.log('req interceptor2', config)
//   return config
// }, (err) => {
//   console.log(err)
// })

// moriAxios.interceptors.request.use((config) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('req interceptors3')
//       resolve(config)
//     }, 300)
//   })
// })

moriAxios.interceptors.response.use((response) => {
  console.log('res interceptor', response)
  return response
})

// moriAxios.request(`https://npm.antfu.dev${url}`).then((res) => {
//   console.log(res)
// })

async function main() {
  const res = await moriAxios.request(url, {
    baseURL: 'https://npm.antfu.dev',
    headers: {
      'X-Custom': 'Mori',
      'Content-Type': 'application/text',
    },
  })
  return res
}

const res = await main()
console.log('--normal request--', res)
