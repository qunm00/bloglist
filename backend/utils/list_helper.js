const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let result = 0
  blogs.forEach(blog => {
    result += blog.likes
  })
  return result
}

const favouriteBlog = (blogs) => {
  let result = null
  blogs.forEach(blog => {
    if (result === null) result = blog
    else {
      if (blog.likes > result.likes) {
        result = blog
      }
    }
  })
  return result
}

const blogCountByAuthor = (blogs) => {
  const count = _.countBy(blogs, 'author')
  let result = null
  Object.keys(count).forEach(author => {
    if (result === null) {
      result = { 
        author: author,
        blogs: count[author]
      }
    } else {
      if (count[author] > result.blogs) {
        result = {
          author: author,
          blogs: count[author] 
        }
      }
    }
  })

  return result 
}

const mostLiked = (blogs) => {
  const likesCount = {}
  blogs.forEach(blog => {
    if (blog.author in likesCount) {
      likesCount[blog.author] += blog.likes
    } else {
      likesCount[blog.author] = blog.likes
    }
  })

  const result = {}
  Object.keys(likesCount).forEach(author => {
    if (Object.keys(result).length == 0) {
      result['author'] = author
      result['likes'] = likesCount[author]
    } else {
      if (likesCount[author] > result['likes']) {
        result['author'] = author
        result['likes'] = likesCount[author]
      }
    }
  })

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  blogCountByAuthor,
  mostLiked
}