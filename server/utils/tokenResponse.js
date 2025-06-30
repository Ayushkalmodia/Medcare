const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    const refreshToken = user.getRefreshToken();
    user.save({ validateBeforeSave: false });
  
    const options = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    };
  
    const refreshOptions = {
      ...options,
      expires: new Date(Date.now() + process.env.REFRESH_TOKEN_COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    };
  
    res.status(statusCode)
      .cookie('token', token, options)
      .cookie('refreshToken', refreshToken, refreshOptions)
      .json({
        success: true,
        token,
        refreshToken,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          profileImage: user.profileImage
        }
      });
  };
  
  module.exports = sendTokenResponse;
  