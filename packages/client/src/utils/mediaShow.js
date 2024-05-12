export const imageShow = (url, theme) => {
    return (
        <img src={url} alt="images" className="img-thumbnail"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
    )
}

export const videoShow = (url, theme) => {
    return (
        <video controls src={url} alt="video" className="img-thumbnail" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
    )
}