export const genreFinder = (obj) => {
  let allTracks = obj
  let justGenres = allTracks.map((elem) => {
    return elem.genres
  })

  let reducer = (acc, currVal) => acc = acc.concat(currVal)
  let flattened = justGenres.reduce(reducer, [])
  let simpleTaste = flattened.map((elem) => {
    let splitElem = elem.split(' ')
    if (splitElem[splitElem.length - 1] === 'hop') {
      return 'hip-hop'
    }
    return splitElem[splitElem.length - 1]
  })

  let distinctGenres = [...new Set(simpleTaste)]

  const dic = {}
  for (let i = 0; i < distinctGenres.length; i++) {
    let n = 0
    for (let j = 0; j < simpleTaste.length; j++) {
      if (simpleTaste[j] === distinctGenres[i]) { n++ }
    }
    dic[distinctGenres[i]] = n
  }
  for (let key in dic) {
    if (dic[key] === 1) {
      delete dic[key]
    }
  }
  let keys = Object.keys(dic)
  let values = Object.values(dic)
  const genres = []
  for (let i = 0; i < keys.length; i++) {
    genres.push([keys[i], values[i]])
  }

  return genres.sort((a, b) => a[1] - b[1]).reverse()
}

//for the API call to get track info iterate through an array of objects
//and return a string of comma deliniated idnumbers
export const stringifyIds = (arr) => {
  const arrayOfIds = arr.map((elem) => elem.id).join(',');
  return arrayOfIds
}



//for discs, need to reduce the whole song data arrayofObjs into an array
//of agregate scores ie.= [["loudness",45],["energy",65],['danceability',24],["liveness",20],["instrumetal",44],["speechiness",35]]
export const reduceTopTracksData = (arr) => {

  const dic = {
    loudness: [],
    energy: [],
    danceability: [],
    liveness: [],
    instrumentalness: [],
    speechiness: []
  }

  const arrToReturn = []
  let arrOfkeys = Object.keys(dic)
  arr.forEach((elem) => {
    for (let i = 0; i < arrOfkeys.length; i++) {
      if (!isNaN(elem[arrOfkeys[i]])) {
        dic[arrOfkeys[i]].push(elem[arrOfkeys[i]])
      }
    }
  })

  for (let key in dic) {
    let total = dic[key].reduce((acc, cur) => acc + cur) * 100
    dic[key] = Math.round(total / arr.length)

  }


  let keys = Object.keys(dic)
  let values = Object.values(dic)
  for (let i = 0; i < keys.length; i++) {
    arrToReturn.push([[keys[i]], [values[i]]])
  }

  return arrToReturn
}

export const popularityScore = (arr) => {
  const divisor = arr.length
  const total = arr.map((elem) => elem.popularity).reduce((acc, cur) => acc + cur)
  const answer = Math.round(total / divisor)
  return answer
}

export const postiveExplainations = ['loudness', 'energy level', 'danceability', 'live music', 'instrumentality', 'spoken lyrics']

export const mostPopularArtist = (arr) => {
  const artist = arr.reduce((acc, cur) => {
    if (cur.popularity > acc.popularity) {
      acc = cur
    }
    return acc
  })
  console.log('artist in mostPop', artist)
  return artist
}

export const leastPopularArtist = (arr) => {
  const artist = arr.reduce((acc, cur) => {
    if (cur.popularity < acc.popularity) {
      acc = cur
    }
    return acc
  })
  console.log('artist in leastPop', artist)
  return artist
}
