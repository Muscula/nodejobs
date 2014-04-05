var JSONStream = require('JSONStream');
var through2 = require('through2');
module.exports = function (http) {
	http.post("/jobs", function (req, res, next) {
		var headline = req.body.headline;
		var body = req.body.body;
		if (!headline || typeof headline !== 'string' || headline.lenght < 6 || headline.length > 100) {
			return next(new Error('problem with headline'));
		}
		if (!body || typeof body !== 'string' || body.lenght < 6 || body.length > 10000) {
			return next(new Error('body with headline'));
		}
		req.db.jobs.save({ approved: false, data: { headline: headline, body: body}, created: new Date()}, function (err, doc) {
			if (err) {
				return next(err);
			}
			var data = doc.data;
			data.id = doc._id;
			res.json(data);
		});
	});
	http.get("/jobs", function (req, res, next) {
		var stream = req.db.jobs.find({approved: true});
		stream.on('error', next);
		var jsStream = JSONStream.stringify();
		var tr = through2.obj(function (doc, enc, callback) {
			var data = doc.data;
			data.id = doc._id;
			this.push(data);
			callback();
		});
		stream.pipe(tr);
		tr.pipe(jsStream);
		jsStream.pipe(res);
	});
};