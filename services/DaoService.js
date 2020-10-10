class DaoService {
  constructor(Model) {
    this.model = Model;
  }

  save(body) {
    return this.model.create(body);
  }

  findAll(query = null, limit = 100, offset = 0, options = {}) {
    return this.model.findAll({
      where: query,
      limit,
      offset,
      ...options,
    });
  }

  findById(id, options) {
    return this.model.findByPk(id, options);
  }

  update(id, body, options) {
    return this.model.update(body, {
      where: { id },
      ...options,
    });
  }

  delete(id, options = {}) {
    return this.model.destroy({
      where: { id },
      ...options,
    });
  }
}

module.exports = DaoService;
