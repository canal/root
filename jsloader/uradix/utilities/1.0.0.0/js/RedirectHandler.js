
function uRadixRedirectHandler()
{
  /*
   * This function will redirect the user to the url specified by appending the cookie parameter flag
   */
  this.redirect = function(url)
  {
    if(url.indexOf("?") == -1)
    {
      url = url + "?";
    }

    // Mask the main window
    Ext.get(document.body.id).mask("<b> Loading...</b> ", "x-mask-loading");

    document.location=url+"&"+uRadixCookieManager.MPI_COOKIE_PARAMETER+"="+uRadixCookieManager.MPI_COOKIE_PARAMETER_VALUE;
  };
};

uRadixRedirectHandler = new uRadixRedirectHandler();
