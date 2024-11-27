const dataToPostMapper = (data) => {
    const { id, title, preview, score, author, created_utc, num_comments} = data
    const imgUrl = preview.images.source.url

    return {
        id: id,
        title: title,
        img: imgUrl,
        score: score,
        postedBy: author,
        date: created_utc,
        comments: num_comments,
    }
}

const Reddit = {
    async getPosts() {
        return fetch('https://reddit.com/r/pics.json')
            .then(response => {
                return response.json()
            })
            .then(json => {
                return json.data.children.map(child => dataToPostMapper(child.data))
            })
    }
}

export default Reddit;