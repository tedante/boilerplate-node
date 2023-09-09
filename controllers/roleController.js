const { Role } = require('../models/index');
const BaseController = require('./baseController');

class RoleController extends BaseController {
  constructor() {
    super(Role);
  }
} 

module.exports = RoleController;