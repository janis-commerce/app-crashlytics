const formatUserData = data => {
  if (!data || (data && !Object.keys(data).length)) return {};

  const {
    email = '',
    sub = '',
    tcode = '',
    locale = '',
    isDev = '',
    tcurrency = '',
    given_name = '',
    family_name = '',
  } = data;

  return {
    userName: given_name,
    userSurname: family_name,
    userEmail: email,
    userId: sub,
    client: tcode,
    language: locale,
    currency: tcurrency,
    isDev,
  };
};

export default formatUserData;
