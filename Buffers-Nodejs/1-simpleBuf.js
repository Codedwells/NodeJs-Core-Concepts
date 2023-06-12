// A place used to temporarily hold a fixed length of sequence of bytes
import { Buffer } from "buffer";

const buff = new Buffer.alloc(8);

buff.write("stringtom  ", "utf-8");

// You can create a buffer directly from a string
const buff2 = Buffer.from ("string",'utf-8')

// Wrire a buffer directly

const buff3 = Buffer.from([115]);
const buff3Utf8 = buff3.toString('utf-8') // fs



console.log(buff3Utf8)