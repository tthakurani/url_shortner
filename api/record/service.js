const _ = require("lodash")
const validUrlRegex = new RegExp(/^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/);
const base64 = require("../../lib/base64");


function getValidUrl(orignalUrl) {
    let url = orignalUrl;
    if(typeof url !== "string") {
        return false;
    }
    url = url
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//,'')
    .replace(/^[w]{3}./,'');
    return validUrlRegex.test(url) ? url : false;
};

function createShortenUrl(rec) {
    rec.shortenPath = base64.fromNumber(rec.id);
    rec.save();
    return `/r/${rec.shortenPath}`;
}

function createRecord(url) {
    const options = {
        where: {path: url}
    }
    return global.DB.models.record.findOrCreate(options)
        .spread((obj) => {
            if(obj.shortenPath) {
                return obj.shortenPath
            }
            return createShortenUrl(obj);
        })
        .catch(e => {
            throw e;
        });
}

function getRecord(shortPath) {
    if(typeof shortPath !== "string" || !shortPath.trim()) {
        return Promise.resolve({});
    }
    try {
        const id = base64.toNumber(shortPath.trim());
        return global.DB.models.record.findById(id);
    } catch(e) {
        return Promise.resolve({});
    }
}

// use async js to avoid long suck
function bulkCreate(urls = []) {
    if(!Array.isArray(urls) || !urls.length) {
        promise.resolve([]);
    }
    let validUrls = [];
    const results = [];
    for(let idx = 0; idx<urls.length; idx++) {
        const url = getValidUrl(urls[idx]);
        if(url) {
            validUrls.push(url);
        } else {
            results.push({path: urls[idx], message: "Invalid Url", shortenPath: null});
        }
    }
    if(!validUrls.length) return Promise.resolve(results);
    validUrls = _.uniq(validUrls);
    return global.DB.models.record.findAll({where: {path: validUrls}})
        .then(res => {
            const existingEntries = _.map(res, r => {
                results.push({id: r.id, path: r.path, shortenPath: `/r/${r.shortenPath}`, message: "Existing"});
                return r.path;
            });
            const newEntries = _.map(_.differenceBy(validUrls, existingEntries), r => ({path: r}));
            if(!newEntries.length) return results;
            return global.DB.models.record.bulkCreate(newEntries, {returning: true})
                .then(newList => {
                    _.forEach(newList, i => {
                        results.push({id: i.id, path: i.path, shortenPath: createShortenUrl(i), message: "new"});
                    });
                    return results;
                })
        })
}

module.exports = {
    getValidUrl,
    createRecord,
    getRecord,
    bulkCreate
}