export function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    name, email, userType, companyTitle, clientType, contactInfo, resArray, profilePic, company 
  } = req.user;
  return {
    name, email, userType, companyTitle, clientType, contactInfo, resArray, profilePic, company 
  };
};

