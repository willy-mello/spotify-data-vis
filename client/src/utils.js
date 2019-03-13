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


export const BarChartFormatter = (obj) => {
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

  let keys = Object.keys(dic)
  let values = Object.values(dic)
  const genres = []
  for (let i = 0; i < keys.length; i++) {
    genres.push({ x: keys[i], y: values[i] })
  }

  return [{ key: 'Your Music Genres', values: genres }]
}
// const data = [
//   { key: 'Group 1', values: [ { x: 'A', y: 23 }, { x: 'B', y: 8 } ] },
//   { key: 'Group 2', values: [ { x: 'A', y: 15 }, { x: 'B', y: 37 } ] },
// ]