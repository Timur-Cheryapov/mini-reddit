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

const relativeTime = (date) => {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = Date.now() - date * 1000;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

const numberRounder = (number) => {
    const hundreds = Math.round(number / 100)
    if (hundreds < 10) {
        return number
    }

    const thousands = Math.round(number / 1000)
    if (thousands < 1000) {
        return thousands + '.' + Math.round((number % 1000) / 100) + 'K'
    }

    const millions = Math.round(number / 1000000)
    return millions + '.' + Math.round((number % 1000000) / 100000) + 'M'
}

const dataToPostMapper = (data) => {
    const { id, title, url, is_gallery, score, author, created_utc, num_comments, permalink } = data

    if (is_gallery) return {}

    return {
        id: id,
        title: title,
        img: url,
        score: numberRounder(score),
        postedBy: author,
        date: relativeTime(created_utc),
        comments: numberRounder(num_comments),
        url: "https://www.reddit.com" + permalink
    }
}

export default Reddit;