import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

// we are using grey-matter to fetch the content of the file in the format that separates content from the metadata

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostData(postIdentifier) {
  //I am guessing in javascript we start regular expressing with /\.md$/
  const postSlug = postIdentifier.replace(/\.md$/, '') // remove the file extension
  const fileName = `${postSlug}.md`

  const filePath = path.join(postsDirectory, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const postData = {
    slug: postSlug,
    ...data,
    content,
  }
  return postData
}
export function getAllPostSlugs() {
  const postFiles = fs.readdirSync(postsDirectory)
  return postFiles.map((file) => file.replace(/\.md$/, ''))
}
export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory)
  console.log('this is the files in the director', postFiles)
  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile)
  })

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  )
  return sortedPosts
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.filter((post) => post.isFeatured)
  return featuredPosts
}
