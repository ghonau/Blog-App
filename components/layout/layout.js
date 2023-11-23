import Fragment from 'react'
import MainNavigation from './main-navigation'
import Logo from './logo'

function Layout(props) {
  return (
    <>
      <MainNavigation />
      <main>{props.children}</main>
    </>
  )
}

export default Layout
