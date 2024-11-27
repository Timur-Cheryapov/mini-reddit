const dataToPostMapper = (data) => {
    const { id, title, url, score, author, created_utc, num_comments} = data

    return {
        id: id,
        title: title,
        img: url,
        score: score,
        postedBy: author,
        date: created_utc,
        comments: num_comments,
    }
}

const Reddit = {
    async getPosts() {
        try {
            const response = await fetch('https://api.reddit.com/r/pics.json')
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
            const json = await response.json()
            return json.data.children.map((child) => dataToPostMapper(child.data))
        } catch (error) {
            console.error('Error fetching posts:', error)
            throw error
        }
    },
}

export default Reddit;