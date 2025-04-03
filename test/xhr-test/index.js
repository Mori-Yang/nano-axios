import moriAxios from '../../dist/index.mjs'

const a = moriAxios.create()
console.log(a, moriAxios)

const url = 'https://npm.antfu.dev/create-mori'

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

// Header
