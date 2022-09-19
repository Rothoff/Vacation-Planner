package WebScraper;

import com.gargoylesoftware.htmlunit.BrowserVersion;
import com.gargoylesoftware.htmlunit.FailingHttpStatusCodeException;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.html.HtmlForm;
import com.gargoylesoftware.htmlunit.html.HtmlPage;

import java.io.IOException;
import java.net.MalformedURLException;

public class HTMLunitClient {

    //Create a new WebClient with any BrowserVersion. WebClient belongs to the
    //HtmlUnit library.
    WebClient WEB_CLIENT = new WebClient(BrowserVersion.CHROME);

    //webClient.getOptions().setCssEnabled(true);

    //This is pretty self explanatory, these are your Reddit credentials.
    private final String username;
    private final String password;

    //Our constructor. Sets our username and password and does some client config.
    public HTMLunitClient(String username, String password) {
        this.username = username;
        this.password = password;

        //Retreives our WebClient's cookie manager and enables cookies.
        //This is what allows us to view pages that require login.
        //If this were set to false, the login session wouldn't persist.
        WEB_CLIENT.getCookieManager().setCookiesEnabled(true);
    }

    public void login() {
        //This is the URL where we log in, easy.
        String loginURL = "https://confluence.services.kambi.com/login.action?logout=true";
        try {

            //Okay, bare with me here. This part is simple but it can be tricky
            //to understand at first. Reference the login form above and follow
            //along.

            //Create an HtmlPage and get the login page.
            WEB_CLIENT.getOptions().setUseInsecureSSL(true);

            WEB_CLIENT.getOptions().setThrowExceptionOnScriptError(false);
            WEB_CLIENT.getOptions().setThrowExceptionOnFailingStatusCode(false);

            //Create an HtmlForm by locating the form that pertains to logging in.
            //"//form[@id='login-form']" means "Hey, look for a <form> tag with the
            //id attribute 'login-form'" Sound familiar?
            //<form id="login-form" method="post" ...

            HtmlPage loginPage = WEB_CLIENT.getPage(loginURL);
            HtmlForm loginForm = loginPage.getFormByName("loginform");

            //This is where we modify the form. The getInputByName method looks
            //for an <input> tag with some name attribute. For example, user or passwd.
            //If we take a look at the form, it all makes sense.
            //<input value="" name="user" id="user_login" ...
            //After we locate the input tag, we set the value to what belongs.
            //So we're saying, "Find the <input> tags with the names "user" and "passwd"
            //and throw in our username and password in the text fields.
            loginForm.getInputByName("os_username").setValueAttribute(username);
            loginForm.getInputByName("os_password").setValueAttribute(password);

            //<button type="submit" class="c-btn c-btn-primary c-pull-right" ...
            //Okay, you may have noticed the button has no name. What the line
            //below does is locate all of the <button>s in the login form and
            //clicks the first and only one. (.get(0)) This is something that
            //you can do if you come across inputs without names, ids, etc.
            loginForm.getInputByName("login").click();
            //loginForm.getElementsByTagName("button").get(0).click();

        } catch (FailingHttpStatusCodeException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public String get(String URL) {
        try {
            //All this method does is return the HTML response for some URL.
            //We'll call this after we log in!
            return WEB_CLIENT.getPage(URL).getWebResponse().getContentAsString();
        } catch (FailingHttpStatusCodeException e) {
            e.printStackTrace();
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}


