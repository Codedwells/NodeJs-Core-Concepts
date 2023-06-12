import { Buffer } from "buffer";

const convertToBinary = (decimal) => {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32BE(decimal, 0);
  const binary = buffer.toString("binary");

  return binary;
};

console.log(`${convertToBinary(155)}`);
