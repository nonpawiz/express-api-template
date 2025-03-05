var bcrypt = require("bcrypt");

export default () => {
  const hash = async (value: string) => {
    return await bcrypt.hash(value, 12);
  };
  const compare = async (
    value: string,
    encrypted: string
  ): Promise<boolean> => {
    return await bcrypt.compare(value, encrypted);
  };

  return { hash, compare };
};
