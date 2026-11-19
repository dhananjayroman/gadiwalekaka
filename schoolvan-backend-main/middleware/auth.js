export const isStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'student') {
    return next();
  }
  return res.status(401).json({ ok: false, error: "Unauthorized access: Student only" });
};

export const isCarOwner = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'carowner') {
    return next();
  }
  return res.status(401).json({ ok: false, error: "Unauthorized access: Car Owner only" });
};

// Generic authenticated check if needed
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ ok: false, error: "Unauthorized access" });
};
