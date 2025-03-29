import moriAxios, { createInstance } from '../../dist/index.mjs'

const getUrl = 'https://npm.antfu.dev/create-mori'

async function main() {
  const res = await moriAxios.request(getUrl)
  return res.data
}

const res = await main()
console.log(res)
