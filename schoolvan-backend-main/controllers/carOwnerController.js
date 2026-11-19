export const carOwnerLogin = async (req, res) => {
  // If we reach this point, passport has successfully authenticated the user.
  // req.user contains the authenticated car owner object.
  
  // Return the exact JSON payload the frontend expects.
  return res.status(200).json({ ok: true, message: "Login success", token: "dummy-token-123" });
};

export const carOwnerLogout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ ok: false, error: "Logout failed" });
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ ok: true, message: "Logged out successfully" });
    });
  });
};
