db.rushing.find({}, { Yds: 1 }).forEach(function (doc) {
  var yds = doc.Yds + '';
  yds = yds.replace(/,/g, '');
  db.rushing.update(
    { _id: doc._id },
    {
      $set: { Yds: parseInt(yds) }
    }
  );
});
