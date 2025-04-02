import moriAxios from '../../dist/index.mjs'

const url = 'https://npm.antfu.dev/create-mori'

async function main() {
  const res = await moriAxios.request(url)
  return res.data
}

const res = await main()
console.log('--normal request--', JSON.parse(res))
