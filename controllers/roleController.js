const { Role } = require('../models/index');
const BaseController = require('./baseController');

class RoleController extends BaseController {
  constructor() {
    super(Role);
  }

  get filterable() {
    return ['name']
  }

  get sortable() {
    return ['name', 'createdAt', 'updatedAt']
  }
} 

module.exports = RoleController;