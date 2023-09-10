// create helper for pagination
// Path: helpers/paginate.js
module.exports = async (model, pageQuery, limitQuery, searchQuery) => {
  const page = parseInt(pageQuery) || 1;
  const limit = parseInt(limitQuery) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const results = {
    data: [],
    meta: {},
  };
  const total = await model.count();
  const totalPages = Math.ceil(total / limit);

  if (endIndex < total) {
    results.meta.next = page + 1;
  } else {
    results.meta.next = null;
  }

  if (startIndex > 0) {
    results.meta.previous = page - 1;
  } else {
    results.meta.previous = null;
  }

  results.meta.page = page;
  results.meta.total = total;
  results.meta.limit = limit;
  results.meta.totalPages = totalPages;

  try {
    results.data = await model.findAll({
      offset: startIndex,
      limit: limit,
      where: searchQuery,
    })
    
    return results;
  } catch (e) {
    return e;
  }
}
