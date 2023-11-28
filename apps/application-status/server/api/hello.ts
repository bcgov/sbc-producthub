export default defineEventHandler(() => {
  console.log('in hello')
  return {
    hello: 'world'
  }
})
