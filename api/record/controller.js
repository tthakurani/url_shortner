const csv = require("fast-csv");
const { getValidUrl, createRecord, getRecord, bulkCreate } = require("./service");

exports.createRecord = (req, res, next) => {
    const url = getValidUrl(req.body.url);
    if(!url) {
        return res.status(400).send({success: false, message: "invalid url provided"});
    }
    createRecord(url).then((shortenPath) => {
        res.send({success: true, shortenPath });
    }).catch(next)
}

exports.getRecords = (req, res, next) => {
    global.DB.models.record.findAll()
        .then(r => res.send(r))
        .catch(next)
}

exports.getFullPath = (req, res, next) => {
    getRecord(req.params.shortPath)
        .then((obj) => {
            if(obj && obj.id) {
                return res.status(301).redirect(`http://${obj.path}`)
            }
            return res.status(404).send({success: false, message: "no record found"});
        })
        .catch(next)
}

exports.deleteRecord = (req, res, next) => {
    getRecord(req.params.shortPath)
        .then((obj) => {
            if(obj && obj.id) {
                return obj.destroy()
                    .then(() => res.send({success: true}));
            }
            return res.status(404).send({success: false, message: "no record found"});
        })
        .catch(next)
}


exports.bulkCreate = (req, res, next) => {
    if(!req.files || !req.files.csvFile || req.files.csvFile.mimetype !== "text/csv") {
        return res.status(400).send({message: "Invalid/Missing csvFile"});
    }
    const urls = []
    csv.fromString(req.files.csvFile.data, {objectMode: true})
        .on("data", (d=[]) => urls.push((d[0])))
        .on("error", next)
        .on("end", () => {
            bulkCreate(urls)
                .then(r => res.send(r))
                .catch(next);
        });
}