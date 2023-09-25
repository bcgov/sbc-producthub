// apollo.config.js
module.exports = {
  client: {
    service: {
      name: 'release-notes',
      // URL to the GraphQL API
      url: 'https://api.zenhub.com/public/graphql'
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts']
  }
}
