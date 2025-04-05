import moriAxios from '../../dist/index.mjs'

const url = '/create-mori'

// const adaterTest = moriAxios.create({ adapter: ['fetch'], timeout: 2000 })
// const block = await adaterTest.request(url)
// console.log(block)
// Header

async function main() {
  console.log(moriAxios)
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
