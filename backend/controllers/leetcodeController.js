const leetcodeService = require('../services/leetcodeService');
const statsRepository = require('../db/statsRepository');

class LeetcodeController {

  async updateUserStats(req, res, next) {
    try {
      const { username } = req.params;
      const userData = await leetcodeService.fetchUserComprehensiveData(username);
      const updatedStats = await statsRepository.storeUserStats(userData);
      res.json({
        success: true,
        message: `Stats updated for user: ${username}`,
        data: updatedStats
      });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = new LeetcodeController();