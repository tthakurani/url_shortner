//REF: https://stackoverflow.com/questions/6213227/fastest-way-to-convert-a-number-to-radix-64-in-javascript
const Base64 = {
  _Rixits :
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_",
  fromNumber : function(number) {
      if (isNaN(Number(number)) || number === null ||
          number === Number.POSITIVE_INFINITY)
          throw "The input is not valid";
      if (number < 0)
          throw "Can't represent negative numbers now";

      var rixit;
      var residual = Math.floor(number);
      var result = '';
      while (true) {
          rixit = residual % 64
          result = this._Rixits.charAt(rixit) + result;
          residual = Math.floor(residual / 64);
          if (residual == 0)
              break;
          }
      return result;
  },

  toNumber : function(rixits) {
      var result = 0;
      rixits = rixits.split('');
      for (var e = 0; e < rixits.length; e++) {
          if(this._Rixits.indexOf(rixits[e]) === -1) {
              throw "Invalid Path";
          }
          result = (result * 64) + this._Rixits.indexOf(rixits[e]);
      }
      return result;
  }
}

module.exports = Base64;