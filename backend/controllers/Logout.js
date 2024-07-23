const Logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), 
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Logout Successful",
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
const AdminLogout = async (req, res) => {
  try {
    res.cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(0), 
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Logout Successful",
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};



module.exports = {Logout,AdminLogout};
