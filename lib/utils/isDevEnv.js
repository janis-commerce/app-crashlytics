/**
 * @name isDevEnv
 * @returns true if node env is development
 */

export default isDevEnv = () => {
  const {env} = process;
  const {NODE_ENV} = env;
  return NODE_ENV !== 'production';
};
