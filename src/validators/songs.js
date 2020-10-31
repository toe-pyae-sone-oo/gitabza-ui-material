export const validator = {
  title: title => (!!title && !!title.trim()) ? '' : 'title is required',
  slug: slug => (!!slug && !!slug.trim()) ? '' : 'slug is required',
  artists: artists => (artists.length > 0) ? '' : 'artists is required',
  genre: genre => (!!genre && genre.trim()) ? '' : 'genres is required',
  types: types => (!!types && !!types.trim()) ? '' : 'types is required',
  difficulty: difficulty => (!!difficulty && !!difficulty.trim())
    ? '' 
    : 'difficulty is required',
  version: version => (!!version && !!version.trim())
    ? ''
    : 'version is required',
  lyrics: lyrics => (!!lyrics && !!lyrics.trim()) 
    ? ''
    : 'lyrics is required',
  youtube: youtube => (!!youtube && !!youtube.trim())
    ? ''
    : 'youtube is required',
}