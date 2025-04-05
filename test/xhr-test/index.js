import moriAxios from '../../dist/index.mjs'

const url = 'https://npm.antfu.dev/create-mori'

// const adaterTest = moriAxios.create({ adapter: ['fetch'], timeout: 2000 })
// const block = await adaterTest.request(url)
// console.log(block)
// Header
async function main() {
  const res = await moriAxios.request(url, {
    headers: {
      'X-Custom': 'Mori',
      'Content-Type': 'application/text',
    },
  })
  return res
}

const res = await main()
console.log('--normal request--', res)
