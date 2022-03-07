
const posts = [
    {
        id: 1,
        title: "Post 1"
    },
    {
        id: 2,
        title: "Post 2"
    },
    {
        id: 3,
        title: "Post 3"
    },
    {
        id: 4,
        title: "Post 4"
    },
]

const StaticId = ({ post }) => {

    return (
        <div>
            <h1>{post.title}</h1>
            <div>{post.id}</div>
        </div>
    )
}

export default StaticId

export async function getStaticProps(context) {

    console.log("context: ", context)

    const post = posts.find((_post) => {
        return _post.id == context.params.id
    })

    if (!post) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            post,
        }
    }
}