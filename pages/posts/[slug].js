import PostContent from '../../components/posts/post-detail/post-content'
import { getAllPostSlugs, getPostData } from '../../lib/posts-util'

function PostDetailPage({ post }) {
  return <PostContent post={post} />
}

export function getStaticProps(context) {
  const { params } = context
  const { slug } = params

  const post = getPostData(slug)

  return {
    props: {
      post,
    },
    revalidate: 600,
  }
}

export function getStaticPaths() {
  const allPostSlugs = getAllPostSlugs()
  return {
    paths: allPostSlugs.map((p) => ({ params: { slug: p } })),
    fallback: false,
  }
}

export default PostDetailPage
