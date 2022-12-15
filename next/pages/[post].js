
export async function getStaticPaths() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
      return {
        paths: [],
        fallback: 'blocking',
      }
    }
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`)
    const posts = await res.json()
    const paths = posts.map((post) => ({
      params: { post: post.id.toString() },
    }))
  
    return { paths, fallback: false }
  }


  export async function getStaticProps({params}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${params.post}`)
    const post = await res.json()
    return {
      props: { post },
    }
  }

  function Post({post}) {
    return <div>{post}</div>
  }
  
  export default Post