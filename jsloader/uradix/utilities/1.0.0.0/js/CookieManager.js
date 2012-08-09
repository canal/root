
function uRadixCookieManager()
{
  this.MPI_COOKIE_NAME            = "$$mpistatus$$";
  this.MPI_COOKIE_PARAMETER       = "$$statusmessage$$";
  this.MPI_COOKIE_PARAMETER_VALUE = "1";

  /*
   * This function will create a cookie with the name/value passed
   */
  this.createCookie = function(name,value,days)
  {  
    if(days)
    {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    
    document.cookie = name+"="+value+expires+"; path=/";
  };

  /*
   * This function will read the value for the passed cookie name
   */
  this.readCookie = function(name)
  {
    var returnVal = null;

    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++)
    {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) returnVal = c.substring(nameEQ.length,c.length);
    }

    return returnVal;
  };

  /*
   * This function will clear the value for the passed cookie.
   */
  this.eraseCookie = function(name)
  {
    this.createCookie(name,"",-5);
  };
};

uRadixCookieManager = new uRadixCookieManager();

