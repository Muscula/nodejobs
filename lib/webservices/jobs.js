module.exports = function(http){
	http.post("/jobs", function(req, res, next){
		var headline = req.body.headline;
		var body = req.body.body;
		if(!headline || typeof headline !== 'string' || headline.lenght<6 || headline.length >100){
			return next(new Error('problem with headline'));
		}
		if(!body || typeof body !== 'string' || body.lenght<6 || body.length >10000){
			return next(new Error('body with headline'));
		}
		req.db.jobs.save({ data:{ headline: headline, body: body}, created: new Date()}, function(err, doc){
			if(err){
				return next(err);
			}
			var data = doc.data;
			data.id = doc._id;
			res.json(data);
		});
	});
};