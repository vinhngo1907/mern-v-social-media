const monk = require("monk");
const { DB_URL } = require("../../configs");
const db = monk(DB_URL);

const statistic = db.get('statistic');
(async () => await statistic.createIndex({ loggedAt: 1 }, { unique: true }))();

class Statistic {
    async FetchAllStats() {
        const today = moment().format("LL");
        const statisRecord = {
            repoCount: public_repos,
            gitsCount: public_gists,
            followerCount: followers,
            loggedAt: today
        }
        let result = await statistic.findOneAndUpdate({ loggedAt: today }, {
            $set: {
                // viewCount: 
            }
        });
        if (!result) {
            await statistic.insert(statisRecord)
        }
    }
}

module.exports = new Statistic