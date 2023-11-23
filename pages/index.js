import { getFeaturedPosts } from '../lib/posts-util'
import { Fragment } from 'react'

import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'

function HomePage(props) {
  return (
    <Fragment>
      <Hero></Hero>
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts()
  return {
    props: { posts: featuredPosts },
  }
}

export default HomePage
