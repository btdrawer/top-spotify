const axios = require('axios');
const fs = require('fs');

module.exports = async timeRange => {
    try {
        const { data } = await axios.get(
            `https://api.spotify.com/v1/me/top/tracks`,
            {
                params: {
                    time_range: timeRange,
                    limit: 50
                },
                headers: {
                    Authorization: `Bearer ${process.env.access_token}`
                }
            }
        );
        const processedItems = data.items.map(({ album, artists, name }) => ({
            album: {
                name: album.name,
                type: album.album_type
            },
            artists: artists.map(artist => artist.name),
            title: name
        }));
        console.log(processedItems);
        if (!fs.existsSync('./out')) {
            fs.mkdirSync('./out');
        }
        fs.writeFileSync(
            `./out/${timeRange}.json`, 
            JSON.stringify(processedItems)
        );
    } catch (err) {
        console.error(err.response.data);
    }
};
