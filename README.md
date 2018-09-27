# Spottyfi

> A spotify app clone

## Related Projects

- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo
- https://github.com/teamName/repo

## Table of Contents

1. [Usage](#Usage)
2. [API Usage](#API-Usage)
3. [Requirements](#requirements)
4. [Development](#development)

## Usage

> Some usage instructions

## API-Usage

#### POST (`/artist`) - Add a song to an artist's album with given artist and album IDs

```javascript
{
    artistId: [REQUIRED: The song's artist ID],
    albumId: [REQUIRED: The song's album ID],
    name: [REQUIRED: The name of the song],
    length: [REQUIRED: The length of the song],
    streams: [OPTIONAL: The number of times the song has been streamed],
    popularity: [OPTIONAL: The number of likes for this song]
}
```

#### GET (`/artist/:artistId`) - Get all the songs from the given artist

#### PUT (`/artist/update`) - Update a song's information using it's ID

```javascript
{
    artistId: [REQUIRED: The song's artist ID],
    albumId: [REQUIRED: The song's album ID],
    songId: [REQUIRED: The song's ID],
    name: [OPTIONAL: The name of the song],
    length: [OPTIONAL: The length of the song],
    streams: [OPTIONAL: The number of times the song has been streamed],
    popularity: [OPTIONAL: The number of likes for this song]
}
```

#### DELETE (`/artist/delete`) - Delete a song from an album

```javascript
{
    artistId: [REQUIRED: The song's artist ID],
    albumId: [REQUIRED: The song's album ID],
    songId: [REQUIRED: The song's ID],
}
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
