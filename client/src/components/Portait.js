import React from 'react'

export const Portrait = props => {
  let artist = {}
  let morePopular = false
  if (props.cool) {
    artist = props.cool
    morePopular = true
  } else {
    artist = props.uncool
    morePopular = false
  }

  if (morePopular) {
    return (
      <div>
        <span>most popular artist</span>
        <img className='portrait' alt={''} src={artist.images[2].url} />
        <span>{artist.name}</span>
        <span>Popularity {artist.popularity}</span>

      </div>
    )

  }
  return (
    <div>
      <span>least popular artist</span>
      <img className='portrait' alt={''} src={artist.images[2].url} />
      <span>{artist.name}</span>
      <span>Popularity {artist.popularity}</span>
    </div>
  )
}

// external_urls: {spotify: "https://open.spotify.com/artist/4NpFxQe2UvRCAjto3JqlSl"}
// followers: {href: null, total: 740622}
// genres: (3) ["modern blues rock", "modern hard rock", "rock"]
// href: "https://api.spotify.com/v1/artists/4NpFxQe2UvRCAjto3JqlSl"
// id: "4NpFxQe2UvRCAjto3JqlSl"
// images: Array(3)
// 0: {height: 640, url: "https://i.scdn.co/image/16780bbba1dac8ee13f1023bbdafe6f7a6cb6f2e", width: 640}
// 1: {height: 320, url: "https://i.scdn.co/image/a3fa5ca55fffac9e1b4cf6b4db7107421a5c9b7f", width: 320}
// 2: {height: 160, url: "https://i.scdn.co/image/fb553d4ca001055b316342dfedcd1b9496a15a42", width: 160}
// length: 3
// __proto__: Array(0)
// name: "Greta Van Fleet"
// popularity: 72
// type: "artist"
// uri: "spotify:artist:4NpFxQe2UvRCAjto3JqlSl"