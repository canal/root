
String.prototype.trim = function()
{
  return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))
};

String.prototype.startsWith = function(str)
{
  return (this.match("^"+str)==str)
};

String.prototype.endsWith = function(str)
{
  return (this.match(str+"$")==str)
};

function uRadixUtilities()
{
  this.jsonEncode=function(o)
  {
    return Ext.encode(o);
  }
  
  this.jsonDecode=function(str)
  {
    return Ext.decode(str);
  }

  this.getParameter=function(queryString, parameterName)
  {
    var parameterName = parameterName + "=";
    if(queryString.length > 0)
    {
      var begin = queryString.indexOf(parameterName);

      if(begin != -1)
      {
        begin += parameterName.length;
        var end = queryString.indexOf("&",begin);
        if(end == -1)
        {
          end = queryString.length;
        }

        return unescape(queryString.substring(begin, end));
      }
    }

    return "";
  }

};

uRadixUtilities = new uRadixUtilities();

