import type { Config } from 'tailwindcss'
// import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        button: '#1669bb',
        secondary: '#E4EDF7',
        inactive: '#E2E8EE'
      },
      transitionProperty: {
        flow: 'background-position'
      },
      backgroundSize: {
        flow: '400% auto'
      },
      backgroundImage: {
        'nuxt-gradient':
          'linear-gradient(30deg,#475569,#475569 25%,#0007dc 50%,#5400dc 75%,#dc00bf)'
      }
    }
  }
}
