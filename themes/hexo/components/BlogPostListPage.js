import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationNumber from './PaginationNumber'

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalCount = postCount ?? posts?.length ?? 0
  const totalPage = Math.max(Math.ceil(totalCount / POSTS_PER_PAGE), 1)
  const currentPage = Number(page) || 1
  const showPagination = totalCount > POSTS_PER_PAGE
  if (!posts || posts.length === 0 || currentPage > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id='container' className='w-full'>
        {/* 文章列表 */}
        <div className='space-y-6 px-2'>
          {posts?.map(post => (
            <BlogPostCard
              index={posts.indexOf(post)}
              key={post.id}
              post={post}
              siteInfo={siteInfo}
            />
          ))}
        </div>
        {showPagination && (
          <PaginationNumber page={currentPage} totalPage={totalPage} />
        )}
      </div>
    )
  }
}

export default BlogPostListPage
