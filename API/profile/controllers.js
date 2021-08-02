const { Profile } = require("../../db/models");

exports.fetchProfile = async (profileId, next) => {
  try {
    const profile = await Profile.findByPk(profileId);
    return profile;
  } catch (error) {
    next(error);
  }
};

exports.profileFetch = async (req, res, next) => {
  try {
    const profiles = await Profile.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(profiles);
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const foundProfile = req.profile;
    if (req.user.id === req.profile.userId) {
      if (req.file)
        req.body.image = `http://${req.get("host")}/${req.file.path}`;
      await foundProfile.update(req.body);
    } else {
      const err = new Error(
        "Unauthorized. You cannot update another user's profile."
      );
      err.status = 401;
      return next(err);
    }
    res.json(foundProfile);
  } catch (error) {
    next(error);
  }
};
