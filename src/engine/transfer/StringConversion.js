var deepcopy = require('deep-copy');

const binStrToBinArr = (inBinStr) => {
  //Will include null padding
  var binArr = [];
  for(var i = 0;i < inBinStr.length;i++) {
    binArr.push(inBinStr.charCodeAt(i) & 255);
  }
  return binArr;
}
const binArrToBinStr = (inBinArr) => {
  //Will be null padded to nearest 2 bytes
  var output = '';
  for(var i = 0;i < inBinArr.length;i++) {
    output += String.fromCharCode(inBinArr[i] & 255);
  }
  return output;
}
const binArr3ToNumString = (inBinArr) => {
  var output = '';
  for(var i = 0;i < inBinArr.length;i++) {
    output += (inBinArr[i] & 7).toString();
  }
  return output;
}
const numStringToBinArr3 = (inStr) => {
  var output = [];
  for(var i = 0;i < inStr.length;i++) {
    output.push(Number.parseInt(inStr[i]));
  }
  return output;
}
const binArr8ToBinArr3 = (inBinArr) => {
  var outBinArr3 = [];
  var inBinArr8 = inBinArr.slice();
  while(inBinArr8.length > 0) {
    var b = [];
    var o = [];
    b[0] = (inBinArr8.length > 0 ? inBinArr8[0] : 0);
    inBinArr8.splice(0, 1);
    b[1] = (inBinArr8.length > 0 ? inBinArr8[0] : 0);
    inBinArr8.splice(0, 1);
    b[2] = (inBinArr8.length > 0 ? inBinArr8[0] : 0);
    inBinArr8.splice(0, 1);
    o[0] = ((b[0] & 224) >> 5);
    o[1] = ((b[0] & 28) >> 2);
    o[2] = ((b[0] & 3) << 1) + ((b[1] & 128) >> 7);
    o[3] = ((b[1] & 112) >> 4);
    o[4] = ((b[1] & 14) >> 1);
    o[5] = ((b[1] & 1) << 2) + ((b[2] & 192) >> 6);
    o[6] = ((b[2] & 56) >> 3);
    o[7] = ((b[2] & 7));
    outBinArr3.push(o);
  }
  return outBinArr3.flat();
}
const binArr3ToBinArr8 = (inBinArr) => {
  var outBinArr8 = [];
  var inBinArr3 = inBinArr.slice();
  while(inBinArr3.length > 0) {
    var b = [];
    var o = [];
    b[0] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[1] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[2] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[3] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[4] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[5] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[6] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    b[7] = (inBinArr3.length > 0 ? inBinArr3[0] : 0);
    inBinArr3.splice(0, 1);
    o[0] = (b[0] << 5) + (b[1] << 2) + ((b[2] & 6) >> 1);
    o[1] = ((b[2] & 1) << 7) + (b[3] << 4) + (b[4] << 1) + ((b[5] & 4) >> 2);
    o[2] = ((b[5] & 3) << 6) + (b[6] << 3) + b[7];
    outBinArr8.push(o);
  }
  return outBinArr8.flat();
}

export const strToNumStr = (inStr) => {
  var output = binStrToBinArr(inStr);
  console.log('binStrToBinArr');
  console.log(output);
  output = binArr8ToBinArr3(output);
  console.log('binArr8ToBinArr3');
  console.log(output);
  output = binArr3ToNumString(output);
  console.log('binArr3ToNumString');
  console.log(output);
  return output;
}
export const numStrToStr = (inNumStr) => {
  var output = numStringToBinArr3(inNumStr);
  console.log('numStringToBinArr3');
  console.log(output);
  output = binArr3ToBinArr8(output);
  console.log('binArr3ToBinArr8');
  console.log(output);
  output = binArrToBinStr(output);
  console.log('binArr8ToBinStr');
  console.log(output);
  return output;
}
